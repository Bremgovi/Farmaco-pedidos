"use client";

import { useCreateProductMutation, useGetProductsQuery, useDeleteProductMutation, useUpdateProductMutation } from "@/state/api";
import { PlusCircleIcon, SearchIcon, Pencil, Trash2, CheckSquare, Square } from "lucide-react";
import { useEffect, useState } from "react";
import Header from "@/app/(components)/Header";
import Rating from "@/app/(components)/Rating";
import CreateProductModal from "../(components)/Modals/CreateProductModal";
import DeleteProductModal from "../(components)/Modals/DeleteProductModal";
import UpdateProductModal from "../(components)/Modals/UpdateProductModal";
import { Bounce, ToastContainer } from "react-toastify";
import { notify } from "@/utils/toastConfig";
import "react-toastify/dist/ReactToastify.css";
import ImageWithFallback from "../(components)/ImageWithFallback";

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

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductFormDataWithID | null>(null);

  const { data: products, isLoading, isError, refetch } = useGetProductsQuery(searchTerm);
  const [createProduct] = useCreateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // You can adjust this value (e.g., 100) based on when you want it to stick
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleCreateProduct = async (productData: ProductFormData) => {
    try {
      await createProduct(productData);
      notify("Producto creado correctamente", "success");
      await refetch();
    } catch (error) {
      notify("Error al crear producto", "error");
    }
  };

  const handleUpdateProduct = async (productData: ProductFormDataWithID) => {
    if (selectedProduct) {
      await updateProduct({ productId: selectedProduct.productId, updatedProduct: productData });
      notify("Producto actualizado correctamente", "success");
    }
  };

  const handleDelete = async () => {
    try {
      for (const id of selectedRowIds) {
        await deleteProduct(id);
      }
      notify("Producto(s) eliminado(s) correctamente", "success");
      setSelectedRowIds([]);
      refetch();
      setIsDeleteModalOpen(false);
    } catch (error) {
      notify("Error al eliminar productos", "error");
    }
  };

  const handleProductClick = (productId: string) => {
    setSelectedRowIds((prevSelected) => (prevSelected.includes(productId) ? prevSelected.filter((id) => id !== productId) : [...prevSelected, productId]));
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
    return <div className="text-center text-red-500 py-4">Failed to fetch products</div>;
  }

  return (
    <div className="mx-auto pb-5 w-full">
      {/* SEARCH BAR */}
      <div className="mb-6">
        <div className="flex items-center border-2 border-gray-200 rounded">
          <SearchIcon className="w-5 h-5 text-gray-500 m-2" />
          <input className="w-full py-2 px-4 rounded bg-white" placeholder="Buscar medicamentos..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      </div>

      {/* HEADER BAR */}
      <div className="flex justify-between items-center mb-6">
        <Header name="Medicamentos" />
        <div className={`flex gap-4 ${isScrolled ? "fixed top-4 right-4 bg-white shadow-lg rounded-md p-3 z-50 pr-0 pl-5" : ""}`}>
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

      {/* BODY PRODUCTS LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg-grid-cols-3 gap-10 justify-between">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          products?.map((product) => (
            <div
              key={product.productId}
              className={`border shadow rounded-md p-4 max-w-full w-full mx-auto cursor-pointer ${selectedRowIds.includes(product.productId) ? "bg-blue-100" : ""}`}
              onClick={() => handleProductClick(product.productId)}
            >
              <div className="flex flex-col items-center">
                <div className="self-end">{selectedRowIds.includes(product.productId) ? <CheckSquare className="text-blue-600" /> : <Square className="text-gray-600" />}</div>
                <ImageWithFallback src={`/${product.name.toLowerCase()}.png`} alt={product.name} fallback="/pill.png" width={200} height={200} className="rounded-lg" />
                <h3 className="text-lg text-gray-900 font-semibold">{product.name}</h3>
                <p className="text-gray-800">${Number(product.price).toFixed(2)}</p>
                <div className="text-sm text-gray-600 mt-1">Stock: {product.stockQuantity}</div>
                {product.rating && (
                  <div className="flex items-center mt-2">
                    <Rating rating={product.rating} />
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODALS */}
      <CreateProductModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} onCreate={handleCreateProduct} />
      <DeleteProductModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onDelete={handleDelete} />
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

export default Products;
