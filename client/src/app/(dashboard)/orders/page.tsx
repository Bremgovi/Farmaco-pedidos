"use client";

import { useState } from "react";
import { useGetPurchasesQuery, useGetPurchaseDetailsQuery, useGetPurchaseDetailsByPurchaseIdQuery, useGetProductsQuery } from "@/state/api";
import Header from "@/app/(components)/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Bounce, ToastContainer } from "react-toastify";
import { notify } from "@/utils/toastConfig";
import "react-toastify/dist/ReactToastify.css";
import { withAuth } from "../withAuth";

const Orders = () => {
  const { data: products, isError, isLoading, refetch } = useGetProductsQuery();
  const { data: purchases, isLoading: purchasesLoading, isError: purchasesError } = useGetPurchasesQuery();
  const [selectedPurchaseId, setSelectedPurchaseId] = useState<string | null>(null);
  const { data: purchaseDetails } = useGetPurchaseDetailsByPurchaseIdQuery(selectedPurchaseId ?? "", {
    skip: !selectedPurchaseId,
  });

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
    { field: "added_at", headerName: "Fecha de Adición", width: 200 },
    { field: "updated_at", headerName: "Fecha de Actualización", width: 200 },
  ];

  const handlePurchaseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPurchaseId(event.target.value);
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
              <option key={purchase.purchaseId} value={purchase.purchaseId}>
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
          <DataGrid
            rows={purchaseDetails || []}
            columns={columns}
            getRowId={(row) => row.purchaseDetailsId}
            className="bg-gray-100 shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
          />
          <div className="mt-4 text-right text-lg font-semibold">Costo total: ${calculateTotalCost()}</div>
        </>
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
