"use client";

import { useGetProductsQuery, useDeleteProductMutation, useCreateProductMutation, useUpdateProductMutation } from "@/state/api";
import Header from "@/app/(components)/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { Pencil, PlusCircleIcon, Trash2 } from "lucide-react";
import DeleteProductModal from "../(components)/Modals/DeleteProductModal";
import CreateProductModal from "../(components)/Modals/CreateProductModal";
import UpdateProductModal from "../(components)/Modals/UpdateProductModal"; // Import UpdateProductModal
import { Bounce, ToastContainer } from "react-toastify";
import { notify } from "@/utils/toastConfig";
import "react-toastify/dist/ReactToastify.css";

type ProductFormData = {
  productTypeId: number;
  supplierId: number;
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
  minimumStock: number;
  maximumStock: number;
};

type ProductFormDataWithID = {
  productId: string;
  productTypeId: number;
  supplierId: number;
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
  minimumStock: number;
  maximumStock: number;
};

const columns: GridColDef[] = [
  { field: "productId", headerName: "ID", width: 90 },
  { field: "name", headerName: "Product Name", width: 200 },
  {
    field: "price",
    headerName: "Price",
    width: 110,
    type: "number",
    valueGetter: (value, row) => row.price,
    renderCell: (params) => `$${params.value}`,
  },
  {
    field: "rating",
    headerName: "Rating",
    width: 110,
    type: "number",
    valueGetter: (value, row) => (row.rating ? row.rating : "N/A"),
  },
  {
    field: "stockQuantity",
    headerName: "Stock Quantity",
    width: 150,
    type: "number",
  },
  {
    field: "minimumStock",
    headerName: "Minimum Stock",
    width: 150,
    type: "number",
  },
  {
    field: "maximumStock",
    headerName: "Maximum Stock",
    width: 150,
    type: "number",
  },
  {
    field: "supplierId",
    headerName: "Supplier",
    width: 150,
    type: "number",
  },
];

const Inventory = () => {
  const { data: products, isError, isLoading, refetch } = useGetProductsQuery();

  const [deleteProduct] = useDeleteProductMutation();
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductFormDataWithID | null>(null);

  const handleCreateProduct = async (productData: ProductFormData) => {
    await createProduct(productData);
    notify("Producto creado correctamente", "success");
  };

  const handleUpdateProduct = async (productData: ProductFormDataWithID) => {
    if (selectedProduct) {
      await updateProduct({ productId: selectedProduct.productId, updatedProduct: productData });
      notify("Producto actualizado correctamente", "success");
    }
  };

  const handleDelete = async () => {
    for (const id of selectedRowIds) {
      await deleteProduct(id);
    }
    setSelectedRowIds([]);
    refetch();
    setIsDeleteModalOpen(false);
    notify("Producto eliminado correctamente", "success");
  };

  const handleRowSelection = (selectionModel: any) => {
    const selectedData = products?.filter((product) => selectionModel.includes(product.productId));
    setSelectedRowIds(selectedData?.map((product) => product.productId) || []);
  };

  const openDeleteModal = () => {
    if (selectedRowIds.length === 0) {
      notify("Por favor, seleccione al menos un producto para eliminar.", "error");
      return;
    }
    setIsDeleteModalOpen(true);
  };

  const openUpdateModal = () => {
    if (selectedRowIds.length !== 1) {
      notify("Por favor, seleccione un producto para actualizar.", "error");
      return;
    }
    const productToEdit = products?.find((product) => product.productId === selectedRowIds[0]);
    if (productToEdit) {
      setSelectedProduct(productToEdit);
      setIsUpdateModalOpen(true);
    }
  };

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }
  if (isError || !products) {
    return <div className="text-center text-red-500 py-4 text-xl">Failed to fetch products</div>;
  }
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <Header name="Inventario" />
        <div className="flex gap-4">
          <button className="inline-flex justify-center items-center hover:bg-blue-100 rounded-full p-2" onClick={openUpdateModal}>
            <Pencil className="text-gray-600" />
          </button>
          <button className="inline-flex justify-center items-center hover:bg-blue-100 rounded-full p-2" onClick={() => setIsCreateModalOpen(true)}>
            <PlusCircleIcon className="text-blue-600" />
          </button>
          <button className="inline-flex justify-center items-center mr-5 hover:bg-red-100 rounded-full p-2" onClick={openDeleteModal}>
            <Trash2 className="text-red-600" />
          </button>
        </div>
      </div>
      <DataGrid
        rows={products}
        columns={columns}
        getRowId={(row) => row.productId}
        checkboxSelection
        onRowSelectionModelChange={handleRowSelection}
        className="bg-gray-100 shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
      />

      {/* MODAL */}
      <DeleteProductModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onDelete={handleDelete} />
      <CreateProductModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} onCreate={handleCreateProduct} />
      <UpdateProductModal isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)} onUpdate={handleUpdateProduct} product={selectedProduct} />
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

export default Inventory;
