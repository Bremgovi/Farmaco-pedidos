"use client";
import { useState } from "react";
import Header from "@/app/(components)/Header";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageWithFallback from "../../(components)/ImageWithFallback";
import Delete from "@mui/icons-material/Delete";
import {
  useGetProductsQuery,
  useCreatePurchaseMutation,
  useCreatePurchaseDetailsMutation,
  useGetLoginInfoQuery,
  useGetProductTypesQuery,
  useGetSuppliersQuery,
  useGetClientsQuery,
  useCreateSaleMutation,
  useCreateSaleDetailsMutation,
} from "@/state/api";
import { notify } from "@/utils/toastConfig";
import { NotebookText } from "lucide-react";
import Select from "react-select";
import AsyncSelect from "react-select/async";

type ProductFormData = {
  productTypeId: number;
  supplierId: number;
  name: string;
  price: number;
  stockQuantity: number;
  minimumStock: number;
  maximumStock: number;
};

type Client = {
  clientId: string;
  name: string;
  paternalSurname?: string;
  maternalSurname?: string;
  email?: string;
  phone?: string;
};

type ProductFormDataWithID = ProductFormData & { productId: string };

const formatCurrency = (value: number) => {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
};

const Sales = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cartSearchTerm, setCartSearchTerm] = useState("");
  const [cart, setCart] = useState<{ product: ProductFormDataWithID; quantity: number }[]>([]);
  const [sortCriteria, setSortCriteria] = useState<"subtotal" | "alphabetical">("alphabetical");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const { data: products, isLoading, isError } = useGetProductsQuery();
  const { data: productTypes } = useGetProductTypesQuery();
  const { data: suppliers } = useGetSuppliersQuery();
  const { data: userData } = useGetLoginInfoQuery();
  const { data: clients } = useGetClientsQuery();
  const [createSale] = useCreateSaleMutation();
  const [createSaleDetails] = useCreateSaleDetailsMutation();

  const sortedProducts = products?.slice().sort((a, b) => a.name.localeCompare(b.name));
  const filteredProducts = sortedProducts?.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()));

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
    return formatCurrency(cart.reduce((total, item) => total + item.product.price * item.quantity, 0));
  };

  const getTotalItems = () => {
    return cart.length;
  };

  const normalizeString = (str: string) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  const loadOptions = async (inputValue: string) => {
    const normalizedInput = normalizeString(inputValue);
    return clients ? clients.filter((client) => normalizeString(client.name).includes(normalizedInput)).map((client) => ({ value: client.clientId, label: client.name })) : [];
  };

  const handleRequest = async () => {
    try {
      if (!userData?.userId) {
        notify("Error: Usuario no identificado", "error");
        return;
      }
      if (!selectedClient) {
        notify("Error: Cliente no seleccionado", "error");
        return;
      }
      const saleData = {
        userId: userData.userId,
        clientId: selectedClient.clientId,
        transactionStatusId: 1,
      };
      const sale = await createSale(saleData).unwrap();

      for (const item of cart) {
        const saleDetailsData = {
          productId: item.product.productId,
          saleId: sale.saleId,
          quantity: item.quantity,
          unitCost: item.product.price,
          totalCost: item.product.price * item.quantity,
        };
        await createSaleDetails(saleDetailsData);
      }
      notify("Solicitud realizada correctamente", "success");
      setCart([]);
    } catch (error) {
      notify("Error al realizar la solicitud", "error");
    }
  };

  const sortedCart = [...cart].sort((a, b) => {
    if (sortCriteria === "subtotal") {
      return b.product.price * b.quantity - a.product.price * a.quantity;
    } else {
      return a.product.name.localeCompare(b.product.name);
    }
  });

  const filteredCart = sortedCart.filter((item) => item.product.name.toLowerCase().includes(cartSearchTerm.toLowerCase()));

  if (isLoading) return <div>Loading...</div>;
  if (isError || !products) return <div>Error al cargar los productos</div>;

  return (
    <div className="flex mx-auto w-full pb-5 flex-col lg:flex-row">
      {/* Catálogo de Productos */}
      <div className="w-full p-4 lg:w-2/3">
        <Header name="Catalogo de productos" />
        <input type="text" placeholder="Buscar productos..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full p-2 mb-4 mt-5 border rounded" />
        <div className="max-h-64 overflow-y-auto sm:max-h-none sm:overflow-visible scrollbar-rounded">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredProducts?.map((product) => (
              <div
                key={product.productId}
                className="border shadow rounded-md p-4 max-w-full w-1/2 lg:w-full mx-auto cursor-pointer hover:bg-slate-100 hover:shadow-lg"
                onClick={() => handleAddToCart(product)}
              >
                <div className="flex flex-col items-center">
                  <ImageWithFallback src={`/${product.name.toLowerCase()}.png`} alt={product.name} fallback="/pill.png" width={200} height={200} className="rounded-lg" />
                  <h3 className="text-lg text-gray-900 font-semibold">{product.name}</h3>
                  <p className="text-gray-600 font-semibold">{productTypes?.find((type) => type.productTypeId === product.productTypeId)?.type || "Unknown Type"}</p>
                  <p className="text-gray-600 font-semibold">{suppliers?.find((supplier) => supplier.supplierId === product.supplierId)?.name || "Unknown Supplier"}</p>
                  <p className="text-gray-800 mt-5">{formatCurrency(Number(product.price))}</p>
                  <div className="text-sm text-gray-600 mt-1">Stock: {product.stockQuantity}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Carrito de Compras */}
      <div className="w-full lg:w-1/3 p-4 bg-slate-200 rounded-lg">
        <div className="flex gap-4 text-4xl items-center mb-4">
          <NotebookText />
          <div className="flex flex-col gap-4 lg:flex-row items-center">
            <h2 className="text-xl font-semibold">Rellenar solicitud {getTotalItems() > 0 ? " (" + getTotalItems() + " articulos)" : null}</h2>
          </div>
        </div>
        <div className="mb-4">
          <span className="text-lg font-semibold">Cliente</span>
          <AsyncSelect
            cacheOptions
            loadOptions={loadOptions}
            defaultOptions={clients?.slice(0, 5).map((client) => ({ value: client.clientId, label: client.name }))}
            onChange={(newValue) => {
              const selected = clients?.find((client) => client.clientId === newValue?.value) || null;
              setSelectedClient(selected);
            }}
            placeholder="Seleccionar cliente..."
            className="mt-2 text-base"
          />
        </div>
        <div className="flex justify-between mb-4">
          <input type="text" placeholder="Buscar..." value={cartSearchTerm} onChange={(e) => setCartSearchTerm(e.target.value)} className="w-full p-2 border rounded" />
          <select value={sortCriteria} onChange={(e) => setSortCriteria(e.target.value as "subtotal" | "alphabetical")} className="ml-2 p-2 border rounded">
            <option value="alphabetical">Alfabético</option>
            <option value="subtotal">Subtotal</option>
          </select>
        </div>
        {cart.length === 0 ? (
          <p>No hay productos en la solicitud</p>
        ) : (
          <>
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
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col justify-between w-1/3 lg:w-2/3">
                        <span className="font-semibold text-sm lg:text-lg">{item.product.name}</span>
                        <p className="text-base text-gray-500">Subtotal: {formatCurrency(item.product.price * item.quantity)}</p>
                      </div>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.product.productId, parseInt(e.target.value) || 1)}
                        className="w-1/2 lg:w-24 border rounded text-base pl-3 py-1"
                      />
                    </div>
                  </li>
                </div>
              ))}
            </ul>
            <div className="flex gap-4 justify-between">
              <button
                onClick={() => {
                  setCart([]);
                }}
                className="w-1/3 bg-red-500 text-white py-2 rounded mt-4 hover:bg-red-600 transition duration-200"
              >
                Limpiar solicitud
              </button>
              <button onClick={handleRequest} className="w-2/3 bg-blue-500 text-white py-2 rounded mt-4 hover:bg-blue-600 transition duration-200">
                Realizar solicitud
              </button>
            </div>
          </>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={5000} theme="light" transition={Bounce} />
    </div>
  );
};

export default Sales;
