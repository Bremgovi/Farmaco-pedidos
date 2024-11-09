"use client";
import { useState } from "react";
import Header from "@/app/(components)/Header";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageWithFallback from "../../(components)/ImageWithFallback";
import Delete from "@mui/icons-material/Delete";
import { useGetProductsQuery, useUpdateProductMutation, useCreatePurchaseMutation, useCreatePurchaseDetailsMutation, useGetLoginInfoQuery } from "@/state/api";
import { notify } from "@/utils/toastConfig";
type ProductFormData = {
  productTypeId: number;
  supplierId: number;
  name: string;
  price: number;
  stockQuantity: number;
  minimumStock: number;
  maximumStock: number;
};

type ProductFormDataWithID = ProductFormData & { productId: string };

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cartSearchTerm, setCartSearchTerm] = useState("");
  const [cart, setCart] = useState<{ product: ProductFormDataWithID; quantity: number }[]>([]);

  const { data: products, isLoading, isError, refetch } = useGetProductsQuery(searchTerm);
  const { data: userData } = useGetLoginInfoQuery();
  const [updateProduct] = useUpdateProductMutation();
  const [createPurchase] = useCreatePurchaseMutation();
  const [createPurchaseDetails] = useCreatePurchaseDetailsMutation();

  const handleAddToCart = (product: ProductFormDataWithID) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.productId === product.productId);
      if (existingItem) {
        return prevCart.map((item) => (item.product.productId === product.productId ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    setCart((prevCart) => prevCart.map((item) => (item.product.productId === productId ? { ...item, quantity: Math.max(1, quantity) } : item)));
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.productId !== productId));
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2);
  };

  const handlePurchase = async () => {
    try {
      console.log(userData);
      if (!userData?.userId) {
        notify("Error: Usuario no identificado", "error");
        return;
      }
      const purchaseData = {
        userId: userData.userId,
        purchaseStateId: 1, // Replace with actual purchase state ID
      };
      const purchase = await createPurchase(purchaseData).unwrap();

      for (const item of cart) {
        const updatedStock = item.product.stockQuantity + item.quantity;
        await updateProduct({
          productId: item.product.productId,
          updatedProduct: { stockQuantity: updatedStock },
        });

        const purchaseDetailsData = {
          productId: item.product.productId,
          purchaseId: purchase.purchaseId,
          quantity: item.quantity,
          unitCost: item.product.price,
          totalCost: item.product.price * item.quantity,
        };
        await createPurchaseDetails(purchaseDetailsData);
      }
      notify("Compra realizada correctamente", "success");
      setCart([]);
    } catch (error) {
      notify("Error al realizar la compra", "error");
    }
  };

  const filteredCart = cart.filter((item) => item.product.name.toLowerCase().includes(cartSearchTerm.toLowerCase()));

  if (isLoading) return <div>Loading...</div>;
  if (isError || !products) return <div>Error al cargar los productos</div>;

  return (
    <div className="flex mx-auto w-full pb-5 flex-col lg:flex-row min-h-screen">
      {/* Catálogo de Productos */}
      <div className="w-full p-4 lg:w-2/3">
        <Header name="Realizar pedido" />
        <input type="text" placeholder="Buscar productos..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full p-2 mb-4 mt-5 border rounded" />
        <div className="max-h-64 overflow-y-auto sm:max-h-none sm:overflow-visible scrollbar-rounded">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {products?.map((product) => (
              <div
                key={product.productId}
                className="border shadow rounded-md p-4 max-w-full w-1/2 lg:w-full mx-auto cursor-pointer hover:bg-slate-100 hover:shadow-lg"
                onClick={() => handleAddToCart(product)}
              >
                <div className="flex flex-col items-center">
                  <ImageWithFallback src={`/${product.name.toLowerCase()}.png`} alt={product.name} fallback="/pill.png" width={200} height={200} className="rounded-lg" />
                  <h3 className="text-lg text-gray-900 font-semibold">{product.name}</h3>
                  <p className="text-gray-800">${Number(product.price).toFixed(2)}</p>
                  <div className="text-sm text-gray-600 mt-1">Stock: {product.stockQuantity}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Carrito de Compras */}
      <div className="w-full lg:w-1/3 p-4 bg-slate-200 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Carrito de Compras</h2>
        <input
          type="text"
          placeholder="Buscar en el carrito..."
          value={cartSearchTerm}
          onChange={(e) => setCartSearchTerm(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        {cart.length === 0 ? (
          <p>No hay productos en el carrito</p>
        ) : (
          <>
            <div className="my-5 text-xl font-semibold">Total: ${getTotal()}</div>
            <ul className="max-h-64 lg:max-h-96 overflow-y-auto scrollbar-rounded">
              {filteredCart.map((item) => (
                <div key={item.product.productId} className="flex gap-5 items-center bg-slate-300 p-2 rounded-md mb-2">
                  <div className="flex items-center text-3xl">
                    <Delete
                      className="text-gray-500 hover:text-red-400 cursor-pointer w-full h-full"
                      fontSize="inherit"
                      onClick={() => handleRemoveFromCart(item.product.productId)}
                    />
                  </div>
                  <li className="w-full">
                    <div className="flex justify-between">
                      <span className="font-semibold text-lg">{item.product.name}</span>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.product.productId, parseInt(e.target.value) || 1)}
                        className="w-16 border rounded text-base pl-5"
                      />
                    </div>
                    <p className="text-base text-gray-500">Subtotal: ${Number(item.product.price * item.quantity).toFixed(2)}</p>
                  </li>
                </div>
              ))}
            </ul>
            <button onClick={handlePurchase} className="w-full bg-blue-500 text-white py-2 rounded mt-4 hover:bg-blue-600 transition duration-200">
              Realizar Compra
            </button>
          </>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={5000} theme="light" transition={Bounce} />
    </div>
  );
};

export default Products;
