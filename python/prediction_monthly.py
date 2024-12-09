import os
import json
import numpy as np
import pandas as pd
import requests
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
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
    #########################################
    dataset_url = "http://localhost:8000/dataset/MedicamentsDataset.csv"
    local_file_path = "./MedicamentsDataset2.xlsx"
    response = requests.get(dataset_url)
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

    # Implementar criterio de paro manual
    best_model = None
    min_error = float('inf')
    tolerance = 0.01  # Cambios mínimos aceptables en el error
    no_improvement_count = 0
    max_no_improvement = 5  # Número máximo de iteraciones sin mejora
    n_estimators_list = range(10, 201, 10)  # Probar diferentes números de árboles

    for n in n_estimators_list:
        model = RandomForestRegressor(n_estimators=n, random_state=42)
        model.fit(X_train, y_train)
        predictions = model.predict(X_test)
        mse = mean_squared_error(y_test, predictions)

        if min_error - mse > tolerance:
            min_error = mse
            best_model = model
            no_improvement_count = 0
        else:
            no_improvement_count += 1

        if no_improvement_count >= max_no_improvement:
            print(f"Criterio de paro alcanzado en {n} estimadores.")
            break

    #print(f"Mejor modelo entrenado con error mínimo: {min_error}")

    # Crear carpetas para guardar las predicciones
    json_folder = './static/json_prediction'
    os.makedirs(json_folder, exist_ok=True)

    try:
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

            predicciones = best_model.predict(X_pred)


            resultado = pd.DataFrame({
                'NOMBRE': X_pred['NOMBRE'].map(NOMBRE_map),
                'CANTIDAD': predicciones.astype(int),
                'FECHA': pd.to_datetime(dict(year=X_pred['AÑO'], month=X_pred['MES'], day=[1] * len(X_pred)))
            })


            output_file_json = f'{json_folder}/predicciones_{anio_pred}_{mes_pred:02d}.json'
            with open(output_file_json, 'w') as json_file:
                json.dump(json.loads(resultado.to_json(orient='records', date_format='iso')), json_file, indent=4)

            all_predictions.append({
                'month': mes_pred,
                'json_file': output_file_json
            })


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
