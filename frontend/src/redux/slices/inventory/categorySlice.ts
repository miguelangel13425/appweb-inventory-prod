import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../../models/inventory";
import { Pagination } from "../../models/pagination";

interface SimplifiedCategory {
    id: string;
    name: string;
}

interface CategoryState {
    categories: Category[];
    simplifiedCategories: SimplifiedCategory[];
    category: Category | null;
    loading: boolean;
    error: string | null;
    errors: Record<string, string[]> | null;
    message: string | null;
    status: number | null;
    detailCode: string | null;
    pagination: Pagination | null;
}

const initialState: CategoryState = {
    categories: [],
    simplifiedCategories: [],
    category: null,
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

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        fetchCategoriesStart: (state) => {
            state.loading = true;
            state.error = null;
            state.errors = null;
            state.message = null;
            state.status = null;
            state.detailCode = null;
        },
        fetchCategoriesSuccess: (state, action: PayloadAction<{ message: string, data: Category[], status: number, pagination: Pagination, detailCode: string }>) => {
            state.categories = action.payload.data;
            state.loading = false;
            state.error = null;
            state.errors = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.detailCode = action.payload.detailCode;
            state.pagination = action.payload.pagination;
        },
        fetchCategoriesFailure: (state, action: PayloadAction<{ error: string, status: number, detailCode: string }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.errors = null;
            state.status = action.payload.status;
            state.detailCode = action.payload.detailCode;
        },
        fetchCategorySuccess: (state, action: PayloadAction<{ message: string, data: Category, status: number, detailCode: string }>) => {
            state.category = action.payload.data;
            state.loading = false;
            state.error = null;
            state.errors = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.detailCode = action.payload.detailCode;
        },
        fetchCategoryFailure: (state, action: PayloadAction<{ error: string, status: number, detailCode: string }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.errors = null;
            state.status = action.payload.status;
            state.detailCode = action.payload.detailCode;
        },
        createCategoryStart: (state) => {
            state.loading = true;
            state.error = null;
            state.errors = null;
            state.message = null;
            state.status = null;
            state.detailCode = null;
        },
        createCategorySuccess: (state, action: PayloadAction<{ message: string, data: Category, status: number, detailCode: string }>) => {
            state.category = action.payload.data;
            state.loading = false;
            state.error = null;
            state.errors = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.detailCode = action.payload.detailCode;
        },
        createCategoryFailure: (state, action: PayloadAction<{ error: string, errors: Record<string, string[]>, status: number, detailCode: string }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.errors = action.payload.errors;
            state.message = action.payload.error;
            state.status = action.payload.status;
            state.detailCode = action.payload.detailCode;
        },
        updateCategoryStart: (state) => {
            state.loading = true;
            state.error = null;
            state.errors = null;
            state.message = null;
            state.status = null;
            state.detailCode = null;
        },
        updateCategorySuccess: (state, action: PayloadAction<{ message: string, data: Category, status: number, detailCode: string }>) => {
            state.category = action.payload.data;
            state.loading = false;
            state.error = null;
            state.errors = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.detailCode = action.payload.detailCode;
        },
        updateCategoryFailure: (state, action: PayloadAction<{ error: string, errors: Record<string, string[]>, status: number, detailCode: string }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.errors = action.payload.errors;
            state.message = action.payload.error;
            state.status = action.payload.status;
            state.detailCode = action.payload.detailCode;
        },
        deleteCategoryStart: (state) => {
            state.loading = true;
            state.error = null;
            state.errors = null;
            state.message = null;
            state.status = null;
            state.detailCode = null;
        },
        deleteCategorySuccess: (state, action: PayloadAction<{ message: string, status: number, detailCode: string }>) => {
            state.category = null;
            state.loading = false;
            state.error = null;
            state.errors = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.detailCode = action.payload.detailCode;
        },
        deleteCategoryFailure: (state, action: PayloadAction<{ error: string, status: number, detailCode: string }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.errors = null;
            state.status = action.payload.status;
            state.detailCode = action.payload.detailCode;
        },
        fetchSimplifiedCategoriesStart: (state) => {
            state.loading = true;
            state.error = null;
            state.errors = null;
            state.message = null;
            state.status = null;
            state.detailCode = null;
        },
        fetchSimplifiedCategoriesSuccess: (state, action: PayloadAction<{ message: string, data: SimplifiedCategory[], status: number, detailCode: string }>) => {
            state.simplifiedCategories = action.payload.data;
            state.loading = false;
            state.error = null;
            state.errors = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.detailCode = action.payload.detailCode;
        },
        fetchSimplifiedCategoriesFailure: (state, action: PayloadAction<{ error: string, status: number, detailCode: string }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.errors = null;
            state.status = action.payload.status;
            state.detailCode = action.payload.detailCode;
        }
    }
});

export const {
    fetchCategoriesStart,
    fetchCategoriesSuccess,
    fetchCategoriesFailure,
    fetchCategorySuccess,
    fetchCategoryFailure,
    createCategoryStart,
    createCategorySuccess,
    createCategoryFailure,
    updateCategoryStart,
    updateCategorySuccess,
    updateCategoryFailure,
    deleteCategoryStart,
    deleteCategorySuccess,
    deleteCategoryFailure,
    fetchSimplifiedCategoriesStart,
    fetchSimplifiedCategoriesSuccess,
    fetchSimplifiedCategoriesFailure,
} = categorySlice.actions;

export default categorySlice.reducer;
