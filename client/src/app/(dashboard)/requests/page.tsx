"use client";

import { useState } from "react";
import {
  useGetSalesQuery,
  useGetSaleDetailsBySaleIdQuery,
  useGetProductsQuery,
  useUpdateProductMutation,
  useUpdateSaleMutation,
  useGetClientsQuery,
  useDeleteSaleMutation,
  useMakePredictionMutation,
  useWriteDatasetMutation,
} from "@/state/api";
import Header from "@/app/(components)/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Bounce, ToastContainer } from "react-toastify";
import { notify } from "@/utils/toastConfig";
import "react-toastify/dist/ReactToastify.css";
import { withAuth } from "../withAuth";
import { Trash2 } from "lucide-react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

const Requests = () => {
  const [selectedSaleId, setSelectedSaleId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { data: products } = useGetProductsQuery();
  const { data: sales, isLoading: salesLoading, isError: salesError } = useGetSalesQuery();
  const { data: clients } = useGetClientsQuery();
  const { data: saleDetails } = useGetSaleDetailsBySaleIdQuery(selectedSaleId ?? "", {
    skip: !selectedSaleId,
  });
  const [updateProduct] = useUpdateProductMutation();
  const [updateSale] = useUpdateSaleMutation();
  const [deleteSale] = useDeleteSaleMutation();
  const [writeDataset] = useWriteDatasetMutation();
  const [makePrediction] = useMakePredictionMutation();

  const calculateTotalCost = () => {
    return saleDetails?.reduce((total, item) => total + Number(item.totalCost), 0) || 0;
  };

  const formatDateTime = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const columns: GridColDef[] = [
    { field: "saleDetailsId", headerName: "ID", width: 90 },
    {
      field: "productId",
      headerName: "Producto",
      width: 200,
      valueGetter: (value, row) => {
        const productsList = products?.find((product) => product.productId === row.productId);
        return productsList ? productsList.name : "Desconocido";
      },
    },
    { field: "quantity", headerName: "Cantidad", width: 150, type: "number", headerClassName: "text-red-900" },
    { field: "unitCost", headerName: "Costo Unitario", width: 150, type: "number", renderCell: (params) => `$${params.value}` },
    { field: "totalCost", headerName: "Costo Total", width: 150, type: "number", renderCell: (params) => `$${params.value}` },
    { field: "created_at", headerName: "Fecha de Adición", width: 200 },
    { field: "updated_at", headerName: "Fecha de Actualización", width: 200 },
  ];

  const handleSaleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSaleId(event.target.value);
  };

  const handleConfirmOrder = async () => {
    try {
      if (!selectedSaleId || !saleDetails) return;

      for (const item of saleDetails) {
        const product = products?.find((p) => p.productId === item.productId);
        if (product) {
          const updatedStock = product.stockQuantity - item.quantity;
          await updateProduct({
            productId: item.productId,
            updatedProduct: { stockQuantity: updatedStock },
          });
          await writeDataset({
            name: product.name,
            quantity: item.quantity,
            date: new Date().toLocaleDateString("en-GB"),
          });
        }
      }

      await updateSale({
        saleId: selectedSaleId,
        updatedSale: { transactionStatusId: 2 },
      });

      // Fetch predictions after confirming the order
      const prediction = await makePrediction().unwrap();
      console.log("Prediction:", prediction);

      notify("Solicitud confirmada", "success");
    } catch (error) {
      notify("Error al confirmar la solicitud", "error");
      console.log(error);
    }
  };

  const handleCancelOrder = async () => {
    try {
      if (!selectedSaleId || !saleDetails) return;
      await updateSale({
        saleId: selectedSaleId,
        updatedSale: { transactionStatusId: 3 },
      });
      notify("Orden cancelada", "success");
    } catch {
      notify("Error al cancelar la orden", "error");
    }
  };

  const handleDeleteRequest = async () => {
    try {
      if (!selectedSaleId) return;
      await deleteSale(selectedSaleId);
      notify("Solicitud eliminada", "success");
      setSelectedSaleId(null);
    } catch {
      notify("Error al eliminar la solicitud", "error");
    }
  };

  const filteredSales = selectedDate ? sales?.filter((sale) => new Date(sale.created_at).toDateString() === selectedDate.toDateString()) : sales;

  const sortedAndLimitedSales = [...(filteredSales || [])].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 10);

  if (salesLoading) {
    return <div className="py-4">Loading...</div>;
  }
  if (salesError || !sales) {
    return <div className="text-center text-red-500 py-4 text-xl">Failed to fetch sales</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <div className="flex gap-4 w-full items-center justify-between flex-col lg:flex-row">
          <Header name="Solicitudes de Enfermeria" />
          <div className="flex gap-2 flex-col lg:flex-row">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Seleccionar fecha"
                value={selectedDate ? dayjs(selectedDate) : null}
                onChange={(newValue) => setSelectedDate(newValue ? newValue.toDate() : null)}
              />
            </LocalizationProvider>
            <select onChange={handleSaleChange} className="border rounded p-2">
              <option value="">Seleccione una solicitud</option>
              {sortedAndLimitedSales?.map((sale) => (
                <option
                  key={sale.saleId}
                  value={sale.saleId}
                  className={`${sale.transactionStatusId === 1 ? "bg-blue-100" : sale.transactionStatusId === 3 ? "bg-red-100" : "bg-green-100"}`}
                >
                  {formatDateTime(sale.created_at)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="flex text-3xl mt-10 w-full items-center justify-center font-bold">
        {selectedSaleId && <>Cliente: {clients?.find((client) => client.clientId === sales.find((sale) => sale.saleId === selectedSaleId)?.clientId)?.name || "Desconocido"}</>}
      </div>
      {selectedSaleId == "" || !selectedSaleId ? (
        <div className="text-xl mt-5 font-semibold text-gray-400"> Selecciona un solicitud </div>
      ) : (
        <>
          <div className="text-xl mt-5 font-semibold text-gray-500">
            Estado de la solicitud:{" "}
            {sales.find((sale) => sale.saleId === selectedSaleId)?.transactionStatusId === 1 ? (
              <span className="text-blue-600">Pendiente</span>
            ) : sales.find((sale) => sale.saleId === selectedSaleId)?.transactionStatusId === 3 ? (
              <span className="text-red-600">Cancelado</span>
            ) : (
              <span className="text-green-600">Completado</span>
            )}
          </div>
          <div
            className={`text-xl mt-2 font-semibold ${
              sales.find((sale) => sale.saleId === selectedSaleId)?.transactionStatusId === 1
                ? "hidden"
                : sales.find((sale) => sale.saleId === selectedSaleId)?.transactionStatusId === 3
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            Fecha de actualización: {formatDateTime(sales.find((sale) => sale.saleId === selectedSaleId)?.updated_at || "")}
          </div>
          <div className="flex items-center text-red-400 hover:bg-red-200 cursor-pointer max-w-fit rounded-full p-3 mt-5" onClick={handleDeleteRequest}>
            <Trash2 />
            <span className="font-bold ml-2 text-xl">Eliminar solicitud</span>
          </div>
          <DataGrid
            rows={saleDetails || []}
            columns={columns}
            getRowId={(row) => row.saleDetailsId}
            className="bg-gray-100 shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
            sx={{
              "& .MuiDataGrid-columnHeader": {
                color: "rgb(17 24 39);",
              },
            }}
          />
          <div className="mt-4 text-right text-lg font-semibold">Costo total: ${Number(calculateTotalCost()).toFixed(2)}</div>
        </>
      )}
      {sales.find((sale) => sale.saleId === selectedSaleId)?.transactionStatusId === 1 && (
        <div className="flex gap-4 mt-4">
          <button onClick={handleConfirmOrder} className="bg-green-500 hover:bg-green-600 hover:shadow-lg text-white font-bold p-2 rounded">
            Confirmar Solicitud
          </button>
          <button onClick={handleCancelOrder} className="bg-red-500 hover:bg-red-600 hover:shadow-lg text-white font-bold p-2 rounded">
            Cancelar Solicitud
          </button>
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
};

export default withAuth(Requests);
