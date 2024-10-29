import React, { ChangeEvent, FormEvent, useState } from "react";
import { v4 } from "uuid";
import Header from "@/app/(components)/Header";
import { useGetProductTypesQuery, useGetSuppliersQuery } from "@/state/api";

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
type CreateProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (formData: ProductFormData) => void;
};

const CreateProductModal = ({ isOpen, onClose, onCreate }: CreateProductModalProps) => {
  const { data: productTypes, isLoading: productTypesLoading, isError: productTypesError } = useGetProductTypesQuery();
  const { data: suppliers, isLoading: suppliersLoading, isError: suppliersError } = useGetSuppliersQuery();
  const [formData, setFormData] = useState({
    productId: v4(),
    productTypeId: 1,
    supplierId: 1,
    name: "",
    price: 0,
    stockQuantity: 0,
    minimumStock: 0,
    maximumStock: 0,
    rating: 0,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "productTypeId" ? parseInt(value) : ["price", "stockQuantity", "rating"].includes(name) ? parseFloat(value) : value,
      // [name]: name === "price" || name === "stockQuantity" || name === "rating" ? parseFloat(value) : value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate(formData);
    onClose();
  };

  if (!isOpen) return null;

  const labelCssStyles = "block text-sm font-medium text-gray-700";
  const inputCssStyles = "block w-full mb-2 p-2 border-gray-500 border-2 rounded-md";

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <Header name="Añadir medicamento" />
        <form onSubmit={handleSubmit} className="mt-5">
          {/* PRODUCT NAME */}
          <label htmlFor="productName" className={labelCssStyles}>
            Medicamento
          </label>
          <input type="text" name="name" placeholder="Nombre" onChange={handleChange} value={formData.name} className={inputCssStyles} required />

          {/* PRODUCT TYPE */}
          <label htmlFor="productType" className={labelCssStyles}>
            Tipo de medicamento
          </label>
          {productTypesLoading ? (
            <p>Loading...</p>
          ) : productTypesError ? (
            <p>Error loading product types</p>
          ) : (
            productTypes?.map((productType) => (
              <div key={productType.productTypeId}>
                <input
                  type="radio"
                  name="productTypeId"
                  value={productType.productTypeId}
                  checked={formData.productTypeId === productType.productTypeId}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label>{productType.type}</label>
              </div>
            ))
          )}

          {/* PRICE */}
          <label htmlFor="productPrice" className={labelCssStyles}>
            Precio
          </label>
          <input type="number" name="price" placeholder="Price" onChange={handleChange} value={formData.price} className={inputCssStyles} required />

          {/* STOCK QUANTITY */}
          <label htmlFor="stockQuantity" className={labelCssStyles}>
            Stock
          </label>
          <input type="number" name="stockQuantity" placeholder="Stock Quantity" onChange={handleChange} value={formData.stockQuantity} className={inputCssStyles} required />

          {/* RATING */}
          <label htmlFor="rating" className={labelCssStyles}>
            Rating
          </label>
          <input type="number" name="rating" placeholder="Rating" onChange={handleChange} value={formData.rating} className={inputCssStyles} required />

          {/* CREATE ACTIONS */}
          <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
            Crear
          </button>
          <button onClick={onClose} type="button" className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700">
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProductModal;
