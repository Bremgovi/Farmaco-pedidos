import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export interface Product {
    productId: string;
    productTypeId: number
    supplierId: number
    name: string;
    price: number;
    rating?: number;
    stockQuantity: number;
    minimumStock: number;
    maximumStock: number;

}

export interface NewProduct {
    productTypeId: number
    supplierId: number
    name: string;
    price: number;
    rating?: number;
    stockQuantity: number;
    minimumStock: number;
    maximumStock: number;
}

export interface ProductType {
    productTypeId: number;
    type: string;
}

export interface Supplier {
    supplierId: number;
    name: string;
}

export interface SalesSummary {
    salesSummaryId: string;
    totalValue: number;
    changePercentage?: number;
    date: string;
}

export interface PurchaseSummary {
    purchaseSummaryId: string;
    totalPurchased: number;
    changePercentage?: number;
    date: string;
}

export interface ExpenseSummary {
    expenseSummaryId: string;
    totalExpenses: number;
    date: string;
}

export interface ExpenseByCategorySummary {
    expenseByCategorySummaryId: string;
    category: string;
    amount: string;
    date: string;
}

export interface DashboardMetrics {
    popularProducts: Product[];
    salesSummary: SalesSummary[];
    purchaseSummary: PurchaseSummary[];
    expenseSummary: ExpenseSummary[];
    expenseByCategorySummary: ExpenseByCategorySummary[];
}

export interface User {
    userId: string;
    userTypeId: number;
    username: string;
    email: string;
    password: string;
}

export interface NewUser {
    userTypeId: number;
    username: string;
    email: string;
    password: string;
}

export interface UserType {
    userTypeId: number;
    userType: string;
}

export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL}),
    reducerPath: "api",
    tagTypes: ["DashboardMetrics", "Products", "ProductTypes","Suppliers","Users", "UserTypes", "Expenses"],
    endpoints: (build) => ({
        getDashboardMetrics: build.query<DashboardMetrics, void>({
            query: () => "/dashboard",
            providesTags: ["DashboardMetrics"]
        }),
        getProducts: build.query<Product[], string | void>({
            query: (search) => ({
                url: "/products",
                params: search ? {search}:{}
            }),
            providesTags: ["Products"]
        }),
        getProductTypes: build.query<ProductType[], void>({
            query: () => "/product-types",
            providesTags: ["ProductTypes"] 
        }),
        getSuppliers: build.query<Supplier[], void>({
            query: () => "/suppliers",
            providesTags: ["Suppliers"] 
        }),
        createProduct: build.mutation<Product, NewProduct>({
            query: (newProduct) => ({
                url: "/products",
                method: "POST",
                body: newProduct
            }),
            invalidatesTags: ["Products"]
        }),
        deleteProduct: build.mutation<void, string>({
            query: (productId) => ({
                url: `/products/${productId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Products"],
        }),
        updateProduct: build.mutation<Product, { productId: string; updatedProduct: Partial<NewProduct> }>({
            query: ({ productId, updatedProduct }) => ({
                url: `/products/${productId}`,
                method: "PUT",
                body: updatedProduct,
            }),
            invalidatesTags: ["Products"],
        }),
        getUsers: build.query<User[], void>({
            query: () => "/users",
            providesTags: ["Users"]
        }),
        createUser: build.mutation<User, NewUser>({
            query: (newUser) => ({
                url: "/users",
                method: "POST",
                body: newUser
            }),
            invalidatesTags: ["Users"]
        }),
        deleteUser: build.mutation<void, string>({
            query: (userId) => ({
                url: `/users/${userId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Users"],
        }),
        updateUser: build.mutation<User, { userId: string; updatedUser: Partial<NewUser> }>({
            query: ({ userId, updatedUser }) => ({
                url: `/users/${userId}`,
                method: "PUT",
                body: updatedUser,
            }),
            invalidatesTags: ["Users"],
        }),
        getUserTypes: build.query<UserType[], void>({
            query: () => "/user-types",
            providesTags: ["UserTypes"] 
        }),
        getExpensesByCategory: build.query<ExpenseByCategorySummary[], void>({
            query: () => "/expenses",
            providesTags: ["Expenses"]
        }),
    })
});

export const { 
    useGetDashboardMetricsQuery, 
    useGetProductsQuery, 
    useGetProductTypesQuery, 
    useGetSuppliersQuery, 
    useCreateProductMutation, 
    useDeleteProductMutation,
    useUpdateProductMutation,
    useGetUsersQuery,
    useCreateUserMutation,
    useDeleteUserMutation,
    useUpdateUserMutation,
    useGetUserTypesQuery,
    useGetExpensesByCategoryQuery,
} = api;