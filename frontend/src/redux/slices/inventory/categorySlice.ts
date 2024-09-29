import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../../models/inventory";
import { Pagination } from "../../models/pagination";

interface CategoryState {
    categories: Category[];
    category: Category | null;
    loading: boolean;
    error: string | null;
    message: string | null;
    status: number | null;
    pagination: Pagination | null;
}

const initialState: CategoryState = {
    categories: [],
    category: null,
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

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        fetchCategoriesStart: (state) => {
            state.loading = true;
        },
        fetchCategoriesSuccess: (state, action: PayloadAction<{ message: string, data: Category[], status: number, pagination: Pagination }>) => {
            state.categories = action.payload.data;
            state.loading = false;
            state.error = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.pagination = action.payload.pagination;
        },
        fetchCategoriesFailure: (state, action: PayloadAction<{ error: string, status: number }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.status = action.payload.status;
        },
        fetchCategorySuccess: (state, action: PayloadAction<{ message: string, data: Category, status: number }>) => {
            state.category = action.payload.data;
            state.loading = false;
            state.error = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
        },
        fetchCategoryFailure: (state, action: PayloadAction<{ error: string, status: number }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.status = action.payload.status;
        },
        createCategoryStart: (state) => {
            state.loading = true;
        },
        createCategorySuccess: (state, action: PayloadAction<{ message: string, data: Category, status: number }>) => {
            state.category = action.payload.data;
            state.loading = false;
            state.error = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
        },
        createCategoryFailure: (state, action: PayloadAction<{ error: string, status: number }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.status = action.payload.status;
        },
        updateCategoryStart: (state) => {
            state.loading = true;
        },
        updateCategorySuccess: (state, action: PayloadAction<{ message: string, data: Category, status: number }>) => {
            state.category = action.payload.data;
            state.loading = false;
            state.error = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
        },
        updateCategoryFailure: (state, action: PayloadAction<{ error: string, status: number }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.status = action.payload.status;
        },
        deleteCategoryStart: (state) => {
            state.loading = true;
        },
        deleteCategorySuccess: (state, action: PayloadAction<{ message: string, status: number }>) => {
            state.category = null;
            state.loading = false;
            state.error = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
        },
        deleteCategoryFailure: (state, action: PayloadAction<{ error: string, status: number }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.status = action.payload.status;
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
} = categorySlice.actions;

export default categorySlice.reducer;
