"use client";

import { useState } from "react";
import { useGetSalesQuery, useGetSaleDetailsBySaleIdQuery, useGetProductsQuery, useUpdateProductMutation, useUpdateSaleMutation, useGetClientsQuery } from "@/state/api";
import Header from "@/app/(components)/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Bounce, ToastContainer } from "react-toastify";
import { notify } from "@/utils/toastConfig";
import "react-toastify/dist/ReactToastify.css";
import { withAuth } from "../withAuth";

const Requests = () => {
  const [selectedSaleId, setSelectedSaleId] = useState<string | null>(null);
  const { data: products } = useGetProductsQuery();
  const { data: sales, isLoading: salesLoading, isError: salesError } = useGetSalesQuery();
  const { data: clients } = useGetClientsQuery();
  const { data: saleDetails } = useGetSaleDetailsBySaleIdQuery(selectedSaleId ?? "", {
    skip: !selectedSaleId,
  });
  const [updateProduct] = useUpdateProductMutation();
  const [updateSale] = useUpdateSaleMutation();
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
        }
      }

      await updateSale({
        saleId: selectedSaleId,
        updatedSale: { transactionStatusId: 2 },
      });
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

  if (salesLoading) {
    return <div className="py-4">Loading...</div>;
  }
  if (salesError || !sales) {
    return <div className="text-center text-red-500 py-4 text-xl">Failed to fetch sales</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <Header name="Solicitudes de Enfermeria" />
        <div className="flex gap-4">
          <select onChange={handleSaleChange} className="border rounded p-2">
            <option value="">Seleccione una solicitud</option>
            {sales.map((sale) => (
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
          <div className="mt-4 text-right text-lg font-semibold">Costo total: ${calculateTotalCost()}</div>
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
