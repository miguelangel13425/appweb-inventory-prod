import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Inventory } from "../../models/inventory";
import { Pagination } from "../../models/pagination";

interface InventoryState {
    inventories: Inventory[];
    inventory: Inventory | null;
    loading: boolean;
    error: string | null;
    message: string | null;
    status: number | null;
    pagination: Pagination | null;
}

const initialState: InventoryState = {
    inventories: [],
    inventory: null,
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

const inventorySlice = createSlice({
    name: "inventory",
    initialState,
    reducers: {
        fetchInventoriesStart: (state) => {
            state.loading = true;
        },
        fetchInventoriesSuccess: (state, action: PayloadAction<{ message: string, data: Inventory[], status: number, pagination: Pagination }>) => {
            state.inventories = action.payload.data;
            state.loading = false;
            state.error = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.pagination = action.payload.pagination;
        },
        fetchInventoriesFailure: (state, action: PayloadAction<{ error: string, status: number }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.status = action.payload.status;
        },
        fetchInventorySuccess: (state, action: PayloadAction<{ message: string, data: Inventory, status: number }>) => {
            state.inventory = action.payload.data;
            state.loading = false;
            state.error = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
        },
        fetchInventoryFailure: (state, action: PayloadAction<{ error: string, status: number }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.status = action.payload.status;
        },
        createInventoryStart: (state) => {
            state.loading = true;
        },
        createInventorySuccess: (state, action: PayloadAction<{ message: string, data: Inventory, status: number }>) => {
            state.inventory = action.payload.data;
            state.loading = false;
            state.error = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
        },
        createInventoryFailure: (state, action: PayloadAction<{ error: string, status: number }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.status = action.payload.status;
        },
        updateInventoryStart: (state) => {
            state.loading = true;
        },
        updateInventorySuccess: (state, action: PayloadAction<{ message: string, data: Inventory, status: number }>) => {
            state.inventory = action.payload.data;
            state.loading = false;
            state.error = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
        },
        updateInventoryFailure: (state, action: PayloadAction<{ error: string, status: number }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.status = action.payload.status;
        },
        deleteInventoryStart: (state) => {
            state.loading = true;
        },
        deleteInventorySuccess: (state, action: PayloadAction<{ message: string, status: number }>) => {
            state.inventory = null;
            state.loading = false;
            state.error = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
        },
        deleteInventoryFailure: (state, action: PayloadAction<{ error: string, status: number }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.status = action.payload.status;
        }
    }
});

export const {
    fetchInventoriesStart,
    fetchInventoriesSuccess,
    fetchInventoriesFailure,
    fetchInventorySuccess,
    fetchInventoryFailure,
    createInventoryStart,
    createInventorySuccess,
    createInventoryFailure,
    updateInventoryStart,
    updateInventorySuccess,
    updateInventoryFailure,
    deleteInventoryStart,
    deleteInventorySuccess,
    deleteInventoryFailure,
} = inventorySlice.actions;

export default inventorySlice.reducer;
