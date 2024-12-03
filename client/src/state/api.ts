import { RootState } from "@/app/redux";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { use } from "react";

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
    supplierId: number;
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

export interface NewUserType {
    userType: string;
}

export interface Purchase {
    purchaseId: string;
    userId: string;
    transactionStatusId: number;
    created_at: string;
    updated_at: string;
}

export interface NewPurchase {
    userId: string;
    transactionStatusId: number;
    created_at?: string;
    updated_at?: string;
}

export interface PurchaseDetails {
    purchaseDetailsId: number;
    productId: string;
    purchaseId: string;
    quantity:number;
    unitCost:number;
    totalCost:number;
    created_at: string;
    updated_at: string;
}

export interface NewPurchaseDetails {
    productId: string;
    purchaseId: string;
    quantity:number;
    unitCost:number;
    totalCost:number;
    created_at?: string;
    updated_at?: string;
}

export interface Client {
    clientId: string;
    name: string;
    paternalSurname?: string;
    maternalSurname?: string;
    email?: string;
    phone?: string;
}

export interface NewClient {
    name: string;
    paternalSurname?: string;
    maternalSurname?: string;
    email?: string;
    phone?: string;
}

export interface Sale {
    saleId: string;
    userId: string;
    transactionStatusId: number;
    clientId: string;
    created_at: string;
    updated_at: string;
}

export interface NewSale {
    userId: string;
    transactionStatusId: number;
    clientId: string;
    created_at?: string;
    updated_at?: string;
}

export interface SaleDetails {
    saleDetailsId: number;
    productId: string;
    saleId: string;
    quantity: number;
    unitCost: number;
    totalCost: number;
    created_at: string;
    updated_at: string;
}

export interface NewSaleDetails {
    productId: string;
    saleId: string;
    quantity: number;
    unitCost: number;
    totalCost: number;
    created_at?: string;
    updated_at?: string;
}

export interface DatasetEntry {
    date: string;
    quantity: number;
    name: string;
}

export interface MonthlyBudget{
    monthlyBudgetId: number;
    month: number;
    budget: number;
}

const baseQueryWithAuth = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).global.userToken; 
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
});


export const api = createApi({
    baseQuery: baseQueryWithAuth,
    reducerPath: "api",
    tagTypes: ["DashboardMetrics", "Products", "ProductTypes","Suppliers","Users", "UserTypes", "Expenses", "Login", "Purchases", "Clients", "Sales", "Dataset", "DatasetPredictions", "FetchJson", "MonthlyBudget"],
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
        createUserType: build.mutation<UserType, NewUserType>({
            query: (newUserType) => ({
                url: "/user-types",
                method: "POST",
                body: newUserType,
            }),
            invalidatesTags: ["UserTypes"],
        }),
        updateUserType: build.mutation<UserType, { userTypeId: number; updatedUserType: Partial<NewUserType> }>({
            query: ({ userTypeId, updatedUserType }) => ({
                url: `/user-types/${userTypeId}`,
                method: "PUT",
                body: updatedUserType,
            }),
            invalidatesTags: ["UserTypes"],
        }),
        deleteUserType: build.mutation<void, number>({
            query: (userTypeId) => ({
                url: `/user-types/${userTypeId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["UserTypes"],
        }),
        getExpensesByCategory: build.query<ExpenseByCategorySummary[], void>({
            query: () => "/expenses",
            providesTags: ["Expenses"]
        }),
        login: build.mutation<{ token: string }, { username: string; password: string }>({
            query: (credentials) => ({
            url: "/login",
            method: "POST",
            body: credentials,
            }),
            invalidatesTags: ["Login"]
        }),
        getLoginInfo: build.query<User, void>({
            query: () => "/login",
            providesTags: ["Login"]
        }),
        getPurchases: build.query<Purchase[], void>({
            query: () => "/purchases",
            providesTags: ["Purchases"]
        }),
        createPurchase: build.mutation<Purchase, NewPurchase>({
            query: (newPurchase) => ({
                url: "/purchases",
                method: "POST",
                body: newPurchase,
            }),
            invalidatesTags: ["Purchases"],
        }),
        deletePurchase: build.mutation<void, string>({
            query: (purchaseId) => ({
            url: `/purchases/${purchaseId}`,
            method: "DELETE",
            }),
            invalidatesTags: ["Purchases"],
        }),
        getPurchaseDetails: build.query<PurchaseDetails[], void>({
            query: () => "/purchase-details",
            providesTags: ["Purchases"]
        }),
        getPurchaseDetailsByPurchaseId: build.query<PurchaseDetails[], string>({
            query: (purchaseId) => ({
                url: `/purchase-details/purchase/${purchaseId}`,
                params: { purchaseId },
            }),
            providesTags: ["Purchases"],
        }),
        createPurchaseDetails: build.mutation<PurchaseDetails, NewPurchaseDetails>({
            query: (newPurchaseDetails) => ({
            url: "/purchase-details",
            method: "POST",
            body: newPurchaseDetails,
            }),
            invalidatesTags: ["Purchases"],
        }),
        deletePurchaseDetails: build.mutation<void, number>({
            query: (purchaseDetailsId) => ({
            url: `/purchase-details/${purchaseDetailsId}`,
            method: "DELETE",
            }),
            invalidatesTags: ["Purchases"],
        }),
        updatePurchase: build.mutation<Purchase, { purchaseId: string; updatedPurchase: Partial<NewPurchase> }>({
            query: ({ purchaseId, updatedPurchase }) => ({
                url: `/purchases/${purchaseId}`,
                method: "PUT",
                body: updatedPurchase,
            }),
            invalidatesTags: ["Purchases"],
        }),
        getClients: build.query<Client[], void>({
            query: () => "/clients",
            providesTags: ["Clients"]
        }),
        createClient: build.mutation<Client, NewClient>({
            query: (newClient) => ({
            url: "/clients",
            method: "POST",
            body: newClient
            }),
            invalidatesTags: ["Clients"]
        }),
        updateClient: build.mutation<Client, { clientId: string; updatedClient: Partial<NewClient> }>({
            query: ({ clientId, updatedClient }) => ({
            url: `/clients/${clientId}`,
            method: "PUT",
            body: updatedClient,
            }),
            invalidatesTags: ["Clients"],
        }),
        deleteClient: build.mutation<void, string>({
            query: (clientId) => ({
            url: `/clients/${clientId}`,
            method: "DELETE",
            }),
            invalidatesTags: ["Clients"],
        }),
        getSales: build.query<Sale[], void>({
            query: () => "/sales",
            providesTags: ["Sales"]
        }),
        createSale: build.mutation<Sale, NewSale>({
            query: (newSale) => ({
                url: "/sales",
                method: "POST",
                body: newSale,
            }),
            invalidatesTags: ["Sales"],
        }),
        updateSale: build.mutation<Sale, { saleId: string; updatedSale: Partial<NewSale> }>({
            query: ({ saleId, updatedSale }) => ({
                url: `/sales/${saleId}`,
                method: "PUT",
                body: updatedSale,
            }),
            invalidatesTags: ["Sales"],
        }),
        deleteSale: build.mutation<void, string>({
            query: (saleId) => ({
                url: `/sales/${saleId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Sales"],
        }),
        getSaleDetails: build.query<SaleDetails[], void>({
            query: () => "/sale-details",
            providesTags: ["Sales"]
        }),
        getSaleDetailsBySaleId: build.query<SaleDetails[], string>({
            query: (saleId) => ({
                url: `/sale-details/sale/${saleId}`,
                params: { saleId },
            }),
            providesTags: ["Sales"],
        }),
        createSaleDetails: build.mutation<SaleDetails, NewSaleDetails>({
            query: (newSaleDetails) => ({
                url: "/sale-details",
                method: "POST",
                body: newSaleDetails,
            }),
            invalidatesTags: ["Sales"],
        }),
        updateSaleDetails: build.mutation<SaleDetails, { saleDetailsId: number; updatedSaleDetails: Partial<NewSaleDetails> }>({
            query: ({ saleDetailsId, updatedSaleDetails }) => ({
                url: `/sale-details/${saleDetailsId}`,
                method: "PUT",
                body: updatedSaleDetails,
            }),
            invalidatesTags: ["Sales"],
        }),
        deleteSaleDetails: build.mutation<void, number>({
            query: (saleDetailsId) => ({
                url: `/sale-details/${saleDetailsId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Sales"],
        }),
        writeDataset: build.mutation<void, DatasetEntry>({
            query: (entry) => ({
                url: "/dataset",
                method: "POST",
                body: entry,
            }),
            invalidatesTags: ["Dataset"],
        }),
        makePrediction: build.mutation<void, void>({
            query: () => ({
                url: "/dataset-prediction",
                method: "POST",
            }),
            invalidatesTags: ["DatasetPredictions"],
        }),
        fetchJson: build.query<any, { year: number; month: number }>({
            query: ({ year, month }) => ({
            url: `/fetch-json/fetch/${year}/${month}`,
            params: { year, month },
            }),
            providesTags: ["FetchJson"],
        }),
        getMonthlyBudget: build.query<MonthlyBudget[], void>({
            query: () => "/monthly-budget",
            providesTags: ["MonthlyBudget"]
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
    useGetExpensesByCategoryQuery,
    useLoginMutation,
    useGetLoginInfoQuery,
    useGetPurchasesQuery,
    useCreatePurchaseMutation,
    useDeletePurchaseMutation,
    useGetPurchaseDetailsQuery,
    useCreatePurchaseDetailsMutation,
    useDeletePurchaseDetailsMutation,
    useGetPurchaseDetailsByPurchaseIdQuery,
    useUpdatePurchaseMutation,
    useGetClientsQuery,
    useCreateClientMutation,
    useUpdateClientMutation,
    useDeleteClientMutation,
    useGetSalesQuery,
    useCreateSaleMutation,
    useUpdateSaleMutation,
    useDeleteSaleMutation,
    useGetSaleDetailsQuery,
    useGetSaleDetailsBySaleIdQuery,
    useCreateSaleDetailsMutation,
    useUpdateSaleDetailsMutation,
    useDeleteSaleDetailsMutation,
    useWriteDatasetMutation,
    useMakePredictionMutation,
    useFetchJsonQuery,
    useGetUserTypesQuery,
    useCreateUserTypeMutation,
    useUpdateUserTypeMutation,
    useDeleteUserTypeMutation,
    useGetMonthlyBudgetQuery
} = api;