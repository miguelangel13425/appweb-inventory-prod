import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Warehouse } from "../../models/inventory";
import { Pagination } from "../../models/pagination";

interface WarehouseState {
    warehouses: Warehouse[];
    warehouse: Warehouse | null;
    loading: boolean;
    error: string | null;
    message: string | null;
    status: number | null;
    pagination: Pagination | null;
}

const initialState: WarehouseState = {
    warehouses: [],
    warehouse: null,
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

const warehouseSlice = createSlice({
    name: "warehouse",
    initialState,
    reducers: {
        fetchWarehousesStart: (state) => {
            state.loading = true;
        },
        fetchWarehousesSuccess: (state, action: PayloadAction<{ message: string, data: Warehouse[], status: number, pagination: Pagination }>) => {
            state.warehouses = action.payload.data;
            state.loading = false;
            state.error = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.pagination = action.payload.pagination;
        },
        fetchWarehousesFailure: (state, action: PayloadAction<{ error: string, status: number }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.status = action.payload.status;
        },
        fetchWarehouseSuccess: (state, action: PayloadAction<{ message: string, data: Warehouse, status: number }>) => {
            state.warehouse = action.payload.data;
            state.loading = false;
            state.error = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
        },
        fetchWarehouseFailure: (state, action: PayloadAction<{ error: string, status: number }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.status = action.payload.status;
        },
        createWarehouseStart: (state) => {
            state.loading = true;
        },
        createWarehouseSuccess: (state, action: PayloadAction<{ message: string, data: Warehouse, status: number }>) => {
            state.warehouse = action.payload.data;
            state.loading = false;
            state.error = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
        },
        createWarehouseFailure: (state, action: PayloadAction<{ error: string, status: number }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.status = action.payload.status;
        },
        updateWarehouseStart: (state) => {
            state.loading = true;
        },
        updateWarehouseSuccess: (state, action: PayloadAction<{ message: string, data: Warehouse, status: number }>) => {
            state.warehouse = action.payload.data;
            state.loading = false;
            state.error = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
        },
        updateWarehouseFailure: (state, action: PayloadAction<{ error: string, status: number }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.status = action.payload.status;
        },
        deleteWarehouseStart: (state) => {
            state.loading = true;
        },
        deleteWarehouseSuccess: (state, action: PayloadAction<{ message: string, status: number }>) => {
            state.warehouse = null;
            state.loading = false;
            state.error = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
        },
        deleteWarehouseFailure: (state, action: PayloadAction<{ error: string, status: number }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.status = action.payload.status;
        }
    }
});

export const {
    fetchWarehousesStart,
    fetchWarehousesSuccess,
    fetchWarehousesFailure,
    fetchWarehouseSuccess,
    fetchWarehouseFailure,
    createWarehouseStart,
    createWarehouseSuccess,
    createWarehouseFailure,
    updateWarehouseStart,
    updateWarehouseSuccess,
    updateWarehouseFailure,
    deleteWarehouseStart,
    deleteWarehouseSuccess,
    deleteWarehouseFailure,
} = warehouseSlice.actions;

export default warehouseSlice.reducer;
