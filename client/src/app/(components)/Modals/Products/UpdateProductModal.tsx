import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import Header from "@/app/(components)/Header";
import { useGetProductTypesQuery, useGetSuppliersQuery } from "@/state/api";
import Select from "react-select";

type ProductFormData = {
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

type UpdateProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (formData: ProductFormData) => void;
  product: ProductFormData | null;
};

const UpdateProductModal = ({ isOpen, onClose, onUpdate, product }: UpdateProductModalProps) => {
  const { data: productTypes, isLoading: productTypesLoading, isError: productTypesError } = useGetProductTypesQuery();
  const { data: suppliers, isLoading: suppliersLoading, isError: suppliersError } = useGetSuppliersQuery();
  const [formData, setFormData] = useState<ProductFormData>({
    productId: "",
    productTypeId: 1,
    supplierId: 1,
    name: "",
    price: 0,
    stockQuantity: 0,
    minimumStock: 0,
    maximumStock: 0,
    rating: 0,
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "productTypeId"
          ? parseInt(value)
          : name === "minimumStock" || name === "maximumStock" || name === "stockQuantity" || name === "rating"
          ? parseInt(value)
          : ["price"].includes(name)
          ? parseFloat(value)
          : value,
    });
  };

  const handleSupplierChange = (selectedOption: { value: number; label: string } | null) => {
    setFormData({
      ...formData,
      supplierId: selectedOption ? selectedOption.value : 0,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onUpdate(formData);
    onClose();
  };

  if (!isOpen) return null;

  const labelCssStyles = "block text-sm font-medium text-gray-700";
  const inputCssStyles = "block w-full mb-2 p-2 border-gray-500 border-2 rounded-md";

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <Header name="Actualizar producto" />
        <form onSubmit={handleSubmit} className="mt-5">
          {/* PRODUCT NAME */}
          <label htmlFor="productName" className={labelCssStyles}>
            Producto
          </label>
          <input type="text" name="name" placeholder="Nombre" onChange={handleChange} value={formData.name} className={inputCssStyles} required />

          {/* PRODUCT TYPE */}
          <label htmlFor="productType" className={labelCssStyles}>
            Tipo de producto
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
          {/* SUPPLIER SELECT */}
          <label htmlFor="supplier" className={labelCssStyles}>
            Proveedor
          </label>
          {suppliersLoading ? (
            <p>Loading...</p>
          ) : suppliersError ? (
            <p>Error loading suppliers</p>
          ) : (
            <Select
              options={
                suppliers?.map((supplier) => ({
                  value: supplier.supplierId,
                  label: supplier.name,
                })) || []
              }
              onChange={handleSupplierChange}
              value={
                suppliers?.find((s) => s.supplierId === formData.supplierId)
                  ? { value: formData.supplierId, label: suppliers.find((s) => s.supplierId === formData.supplierId)?.name ?? "" }
                  : null
              }
              isSearchable
            />
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

          {/* MINIMUM STOCK*/}
          <label htmlFor="minimumStock" className={labelCssStyles}>
            Stock Minimo
          </label>
          <input type="number" name="minimumStock" placeholder="Stock Minimo" onChange={handleChange} value={formData.minimumStock} className={inputCssStyles} required />

          {/* MAXIMUM STOCK*/}
          <label htmlFor="maximumStock" className={labelCssStyles}>
            Stock Maximo
          </label>
          <input type="number" name="maximumStock" placeholder="Stock Maximo" onChange={handleChange} value={formData.maximumStock} className={inputCssStyles} required />

          {/* RATING 
          <label htmlFor="rating" className={labelCssStyles}>
            Rating
          </label>
          <input type="number" name="rating" placeholder="Rating" onChange={handleChange} value={formData.rating} className={inputCssStyles} required />
          */}

          {/* UPDATE ACTIONS */}
          <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
            Actualizar
          </button>
          <button onClick={onClose} type="button" className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700">
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductModal;
