import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../models/inventory";
import { Pagination } from "../../models/pagination";

interface ProductState {
    products: Product[];
    product: Product | null;
    loading: boolean;
    error: string | null;
    message: string | null;
    status: number | null;
    pagination: Pagination | null;
}

const initialState: ProductState = {
    products: [],
    product: null,
    loading: false,
    error: null,
    message: null,
    status: null,
    pagination: {
        currentPage: 1,
        totalPages: 1,
        totalItems: 1,
        pageSize: 50,
    },
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        fetchProductsStart: (state) => {
            state.loading = true;
        },
        fetchProductsSuccess: (state, action: PayloadAction<{ message: string, data: Product[], status: number, pagination: Pagination }>) => {
            state.products = action.payload.data;
            state.loading = false;
            state.error = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.pagination = action.payload.pagination;
        },
        fetchProductsFailure: (state, action: PayloadAction<{ error: string, status: number }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.status = action.payload.status;
        },
        fetchProductSuccess: (state, action: PayloadAction<{ message: string, data: Product, status: number }>) => {
            state.product = action.payload.data;
            state.loading = false;
            state.error = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
        },
        fetchProductFailure: (state, action: PayloadAction<{ error: string, status: number }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.status = action.payload.status;
        },
        createProductStart: (state) => {
            state.loading = true;
        },
        createProductSuccess: (state, action: PayloadAction<{ message: string, data: Product, status: number }>) => {
            state.product = action.payload.data;
            state.loading = false;
            state.error = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
        },
        createProductFailure: (state, action: PayloadAction<{ error: string, status: number }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.status = action.payload.status;
        },
        updateProductStart: (state) => {
            state.loading = true;
        },
        updateProductSuccess: (state, action: PayloadAction<{ message: string, data: Product, status: number }>) => {
            state.product = action.payload.data;
            state.loading = false;
            state.error = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
        },
        updateProductFailure: (state, action: PayloadAction<{ error: string, status: number }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.status = action.payload.status;
        },
        deleteProductStart: (state) => {
            state.loading = true;
        },
        deleteProductSuccess: (state, action: PayloadAction<{ message: string, status: number }>) => {
            state.product = null;
            state.loading = false;
            state.error = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
        },
        deleteProductFailure: (state, action: PayloadAction<{ error: string, status: number }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.status = action.payload.status;
        }
    }
});

export const {
    fetchProductsStart,
    fetchProductsSuccess,
    fetchProductsFailure,
    fetchProductSuccess,
    fetchProductFailure,
    createProductStart,
    createProductSuccess,
    createProductFailure,
    updateProductStart,
    updateProductSuccess,
    updateProductFailure,
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFailure,
} = productSlice.actions;

export default productSlice.reducer;
