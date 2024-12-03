import os
import json
import numpy as np
import pandas as pd
import requests
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from datetime import timedelta
from flask import Flask, jsonify, send_file

app = Flask(__name__, static_folder='static')

class NpEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        if isinstance(obj, np.floating):
            return float(obj)
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return super(NpEncoder, self).default(obj)

@app.route('/predict', methods=['POST'])
def predict():
    #########################################
    # Cargar los datos desde el archivo CSV
    #########################################c
    dataset_url = "http://localhost:8000/dataset/MedicamentsDataset.csv"
    local_file_path = "./MedicamentsDataset2.xlsx"
    response = requests.get(dataset_url)
    print(response)
    if response.status_code == 200:
        with open(local_file_path, 'wb') as file:
            file.write(response.content)
        print(f"Dataset downloaded to {local_file_path}")
    else:
        print(f"Failed to download dataset. Status code: {response.status_code}")
        exit(1)
    df = pd.read_csv(local_file_path)


    #########################################
    # PROCESAMIENTO DE DATOS Y ENTRENAMIENTO
    #########################################
    # Convertir 'FECHA' a tipo datetime y extraer el mes y el año sin usar pandas
    def parse_date(date_str):
        day, month, year = map(int, date_str.strip().split('/'))
        return day, month, year

    df['DIA'], df['MES'], df['AÑO'] = zip(*df['FECHA'].apply(parse_date))
    df['CANTIDAD'] = df['CANTIDAD'].fillna(0)

    # Agrupar por medicamento, mes y año para obtener el total mensual por medicamento
    df_agrupado = df.groupby(['NOMBRE', 'MES', 'AÑO']).agg({'CANTIDAD': 'sum'}).reset_index()

    # Codificar 'NOMBRE' como variable categórica y guardar el mapeo
    df_agrupado['NOMBRE'] = df_agrupado['NOMBRE'].astype('category')
    NOMBRE_map = dict(enumerate(df_agrupado['NOMBRE'].cat.categories))
    df_agrupado['NOMBRE'] = df_agrupado['NOMBRE'].cat.codes

    # Definir características (X) y variable objetivo (y)
    X = df_agrupado[['MES', 'AÑO', 'NOMBRE']]
    y = df_agrupado['CANTIDAD']

    # Dividir los datos en conjuntos de entrenamiento y prueba
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Crear el modelo de predicción
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    # Crear carpetas para guardar las predicciones
    json_folder = './static/json_prediction'
    os.makedirs(json_folder, exist_ok=True)

    try:
        # Predict for all medications for each month of the current year
        current_date = pd.to_datetime('today')
        anio_pred = current_date.year

        medicamentos_unicos = df_agrupado['NOMBRE'].unique()
        all_predictions = []

        for mes_pred in range(1, 13):
            X_pred = pd.DataFrame({
                'MES': [mes_pred] * len(medicamentos_unicos),
                'AÑO': [anio_pred] * len(medicamentos_unicos),
                'NOMBRE': medicamentos_unicos
            })

            predicciones = model.predict(X_pred)

            # Prepare result DataFrame
            resultado = pd.DataFrame({
                'NOMBRE': X_pred['NOMBRE'].map(NOMBRE_map),
                'CANTIDAD': predicciones.astype(int),
                'FECHA': pd.to_datetime(dict(year=X_pred['AÑO'], month=X_pred['MES'], day=[1] * len(X_pred)))
            })

            # Save the DataFrame in a JSON file with readable format
            output_file_json = f'{json_folder}/predicciones_{anio_pred}_{mes_pred:02d}.json'
            with open(output_file_json, 'w') as json_file:
                json.dump(json.loads(resultado.to_json(orient='records', date_format='iso')), json_file, indent=4)

            all_predictions.append({
                'month': mes_pred,
                'json_file': output_file_json
            })

        # Return JSON response with file paths for all months
        return jsonify(all_predictions)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/files/<path:filename>', methods=['GET'])
def get_file(filename):
    return send_file(os.path.join(app.static_folder, filename))

@app.route('/json/<int:year>/<int:month>', methods=['GET'])
def fetch_json(year, month):
    try:
        filename = f'json_prediction/predicciones_{year}_{month:02d}.json'
        return send_file(os.path.join(app.static_folder, filename))
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
