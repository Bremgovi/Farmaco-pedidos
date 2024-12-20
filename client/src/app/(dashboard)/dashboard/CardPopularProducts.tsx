import { useGetDashboardMetricsQuery } from "@/state/api";
import { ShoppingBag } from "lucide-react";
import React from "react";
import Rating from "../../(components)/Rating";
import ImageWithFallback from "../../(components)/ImageWithFallback";

const CardPopularProducts = () => {
  const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();
  return (
    <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl pb-16">
      {isLoading ? (
        <div className="m-5"> Loading ...</div>
      ) : (
        <>
          <h3 className="text-lg font-semibold px-7 pt-5 pb-2">Productos populares</h3>
          <hr className="border-gray-200" />
          <div className="overflow-auto h-full scrollbar-rounded">
            {dashboardMetrics?.popularProducts.map((product) => (
              <div key={product.productId} className="flex items-center justify-between gap-3 px-5 py-7 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <ImageWithFallback src={`/${product.name.toLowerCase()}.png`} alt={product.name} fallback="/pill.png" width={48} height={48} className="rounded-lg w-14 h-14" />
                  <div className="flex flex-col justify-between gap-1">
                    <div className="font-bold text-gray-700">{product.name}</div>
                    <div className="flex text-sm items-center">
                      <span className="mx-2">|</span>
                      <span className="font-bold text-blue-500 text-xs">${product.price}</span>
                    </div>
                  </div>
                </div>
                <div className="text-xs flex items-center">
                  <button className="p-2 rounded-full bg-blue-100 text-blue-600 mr-2">
                    <ShoppingBag className="w-4 h-4"></ShoppingBag>
                  </button>
                  Unidades: {Math.round(product.stockQuantity)}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CardPopularProducts;
