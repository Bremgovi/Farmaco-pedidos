"use client";

import { useState } from "react";
import { useGetPurchasesQuery, useGetPurchaseDetailsByPurchaseIdQuery, useGetProductsQuery, useUpdateProductMutation, useUpdatePurchaseMutation } from "@/state/api";
import Header from "@/app/(components)/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Bounce, ToastContainer } from "react-toastify";
import { notify } from "@/utils/toastConfig";
import "react-toastify/dist/ReactToastify.css";
import { withAuth } from "../withAuth";

const Orders = () => {
  const [selectedPurchaseId, setSelectedPurchaseId] = useState<string | null>(null);
  const { data: products } = useGetProductsQuery();
  const { data: purchases, isLoading: purchasesLoading, isError: purchasesError } = useGetPurchasesQuery();
  const { data: purchaseDetails } = useGetPurchaseDetailsByPurchaseIdQuery(selectedPurchaseId ?? "", {
    skip: !selectedPurchaseId,
  });
  const [updateProduct] = useUpdateProductMutation();
  const [updatePurchase] = useUpdatePurchaseMutation();
  const calculateTotalCost = () => {
    return purchaseDetails?.reduce((total, item) => total + Number(item.totalCost), 0) || 0;
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
    { field: "purchaseDetailsId", headerName: "ID", width: 90 },
    {
      field: "productId",
      headerName: "Producto",
      width: 200,
      valueGetter: (value, row) => {
        const productsList = products?.find((product) => product.productId === row.productId);
        return productsList ? productsList.name : "Desconocido";
      },
    },
    { field: "quantity", headerName: "Cantidad", width: 150, type: "number" },
    { field: "unitCost", headerName: "Costo Unitario", width: 150, type: "number", renderCell: (params) => `$${params.value}` },
    { field: "totalCost", headerName: "Costo Total", width: 150, type: "number", renderCell: (params) => `$${params.value}` },
    { field: "created_at", headerName: "Fecha de Adición", width: 200 },
    { field: "updated_at", headerName: "Fecha de Actualización", width: 200 },
  ];

  const handlePurchaseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPurchaseId(event.target.value);
  };

  const handleConfirmOrder = async () => {
    try {
      if (!selectedPurchaseId || !purchaseDetails) return;

      for (const item of purchaseDetails) {
        const product = products?.find((p) => p.productId === item.productId);
        if (product) {
          const updatedStock = product.stockQuantity + item.quantity;
          await updateProduct({
            productId: item.productId,
            updatedProduct: { stockQuantity: updatedStock },
          });
        }
      }

      // Logic to update the purchase state to confirmed
      await updatePurchase({
        purchaseId: selectedPurchaseId,
        updatedPurchase: { transactionStatusId: 2 },
      });
      notify("Orden confirmada", "success");
    } catch (error) {
      notify("Error al confirmar la orden", "error");
      console.log(error);
    }
  };

  const handleCancelOrder = async () => {
    try {
      if (!selectedPurchaseId || !purchaseDetails) return;
      await updatePurchase({
        purchaseId: selectedPurchaseId,
        updatedPurchase: { transactionStatusId: 3 },
      });
      notify("Orden cancelada", "success");
    } catch {
      notify("Error al cancelar la orden", "error");
    }
  };

  if (purchasesLoading) {
    return <div className="py-4">Loading...</div>;
  }
  if (purchasesError || !purchases) {
    return <div className="text-center text-red-500 py-4 text-xl">Failed to fetch purchases</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <Header name="Órdenes de Compra" />
        <div className="flex gap-4">
          <select onChange={handlePurchaseChange} className="border rounded p-2">
            <option value="">Seleccione un pedido</option>
            {purchases.map((purchase) => (
              <option
                key={purchase.purchaseId}
                value={purchase.purchaseId}
                className={`${purchase.transactionStatusId === 1 ? "bg-blue-100" : purchase.transactionStatusId === 3 ? "bg-red-100" : "bg-green-100"}`}
              >
                {formatDateTime(purchase.created_at)}
              </option>
            ))}
          </select>
        </div>
      </div>
      {selectedPurchaseId == "" || !selectedPurchaseId ? (
        <div className="text-xl mt-5 font-semibold text-gray-400"> Selecciona un pedido </div>
      ) : (
        <>
          <div className="text-xl mt-5 font-semibold text-gray-500">
            Estado del pedido:{" "}
            {purchases.find((purchase) => purchase.purchaseId === selectedPurchaseId)?.transactionStatusId === 1 ? (
              <span className="text-blue-600">Pendiente</span>
            ) : purchases.find((purchase) => purchase.purchaseId === selectedPurchaseId)?.transactionStatusId === 3 ? (
              <span className="text-red-600">Cancelado</span>
            ) : (
              <span className="text-green-600">Completado</span>
            )}
          </div>
          <DataGrid
            rows={purchaseDetails || []}
            columns={columns}
            getRowId={(row) => row.purchaseDetailsId}
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
      {purchases.find((purchase) => purchase.purchaseId === selectedPurchaseId)?.transactionStatusId === 1 && (
        <div className="flex gap-4 mt-4">
          <button onClick={handleConfirmOrder} className="bg-green-500 hover:bg-green-600 hover:shadow-lg text-white font-bold p-2 rounded">
            Confirmar Pedido
          </button>
          <button onClick={handleCancelOrder} className="bg-red-500 hover:bg-red-600 hover:shadow-lg text-white font-bold p-2 rounded">
            Cancelar Pedido
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

export default withAuth(Orders);
