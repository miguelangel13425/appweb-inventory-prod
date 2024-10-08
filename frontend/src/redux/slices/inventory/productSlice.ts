import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../models/inventory";
import { Pagination } from "../../models/pagination";

interface SimplifiedProduct {
    id: string;
    name: string;
}

interface ProductState {
    products: Product[];
    simplifiedProducts: SimplifiedProduct[];
    product: Product | null;
    loading: boolean;
    error: string | null;
    errors: Record<string, string[]> | null;
    message: string | null;
    status: number | null;
    detailCode: string | null;
    pagination: Pagination | null;
}

const initialState: ProductState = {
    products: [],
    simplifiedProducts: [],
    product: null,
    loading: false,
    error: null,
    errors: null,
    message: null,
    status: null,
    detailCode: null,
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
            state.error = null;
            state.errors = null;
            state.message = null;
            state.status = null;
            state.detailCode = null;
        },
        fetchProductsSuccess: (state, action: PayloadAction<{ message: string, data: Product[], status: number, pagination: Pagination, detailCode: string }>) => {
            state.products = action.payload.data;
            state.loading = false;
            state.error = null;
            state.errors = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.detailCode = action.payload.detailCode;
            state.pagination = action.payload.pagination;
        },
        fetchProductsFailure: (state, action: PayloadAction<{ error: string, status: number, detailCode: string }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.errors = null;
            state.status = action.payload.status;
            state.detailCode = action.payload.detailCode;
        },
        fetchSimplifiedProductsStart: (state) => {
            state.loading = true;
            state.error = null;
            state.errors = null;
            state.message = null;
            state.status = null;
            state.detailCode = null;
        },
        fetchSimplifiedProductsSuccess: (state, action: PayloadAction<{ message: string, data: SimplifiedProduct[], status: number, detailCode: string }>) => {
            state.simplifiedProducts = action.payload.data;
            state.loading = false;
            state.error = null;
            state.errors = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.detailCode = action.payload.detailCode;
        },
        fetchSimplifiedProductsFailure: (state, action: PayloadAction<{ error: string, status: number, detailCode: string }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.errors = null;
            state.status = action.payload.status;
            state.detailCode = action.payload.detailCode;
        },
        fetchProductSuccess: (state, action: PayloadAction<{ message: string, data: Product, status: number, detailCode: string }>) => {
            state.product = action.payload.data;
            state.loading = false;
            state.error = null;
            state.errors = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.detailCode = action.payload.detailCode;
        },
        fetchProductFailure: (state, action: PayloadAction<{ error: string, status: number, detailCode: string }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.errors = null;
            state.status = action.payload.status;
            state.detailCode = action.payload.detailCode;
        },
        createProductStart: (state) => {
            state.loading = true;
            state.error = null;
            state.errors = null;
            state.message = null;
            state.status = null;
            state.detailCode = null;
        },
        createProductSuccess: (state, action: PayloadAction<{ message: string, data: Product, status: number, detailCode: string }>) => {
            state.product = action.payload.data;
            state.loading = false;
            state.error = null;
            state.errors = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.detailCode = action.payload.detailCode;
        },
        createProductFailure: (state, action: PayloadAction<{ error: string, errors: Record<string, string[]>, status: number, detailCode: string }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.errors = action.payload.errors;
            state.message = action.payload.error;
            state.status = action.payload.status;
            state.detailCode = action.payload.detailCode;
        },
        updateProductStart: (state) => {
            state.loading = true;
            state.error = null;
            state.errors = null;
            state.message = null;
            state.status = null;
            state.detailCode = null;
        },
        updateProductSuccess: (state, action: PayloadAction<{ message: string, data: Product, status: number, detailCode: string }>) => {
            state.product = action.payload.data;
            state.loading = false;
            state.error = null;
            state.errors = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.detailCode = action.payload.detailCode;
        },
        updateProductFailure: (state, action: PayloadAction<{ error: string, errors: Record<string, string[]>, status: number, detailCode: string }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.errors = action.payload.errors;
            state.message = action.payload.error;
            state.status = action.payload.status;
            state.detailCode = action.payload.detailCode;
        },
        deleteProductStart: (state) => {
            state.loading = true;
            state.error = null;
            state.errors = null;
            state.message = null;
            state.status = null;
            state.detailCode = null;
        },
        deleteProductSuccess: (state, action: PayloadAction<{ message: string, status: number, detailCode: string }>) => {
            state.product = null;
            state.loading = false;
            state.error = null;
            state.errors = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.detailCode = action.payload.detailCode;
        },
        deleteProductFailure: (state, action: PayloadAction<{ error: string, status: number, detailCode: string }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.errors = null;
            state.status = action.payload.status;
            state.detailCode = action.payload.detailCode;
        }
    }
});

export const {
    fetchProductsStart,
    fetchProductsSuccess,
    fetchProductsFailure,
    fetchSimplifiedProductsStart,
    fetchSimplifiedProductsSuccess,
    fetchSimplifiedProductsFailure,
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
