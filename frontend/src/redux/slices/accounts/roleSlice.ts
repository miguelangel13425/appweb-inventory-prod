import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Role } from "../../models/accounts";
import { Pagination } from "../../models/pagination";

interface RoleState {
    roles: Role[];
    role: Role | null;
    loading: boolean;
    error: string | null;
    message: string | null;
    status: number | null;
    pagination: Pagination | null;
}

const initialState: RoleState = {
    roles: [],
    role: null,
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

const roleSlice = createSlice({
    name: "role",
    initialState,
    reducers: {
        fetchRolesStart: (state) => {
            state.loading = true;
        },
        fetchRolesSuccess: (state, action: PayloadAction<{ message: string, data: Role[], status: number, pagination: Pagination }>) => {
            state.roles = action.payload.data;
            state.loading = false;
            state.error = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.pagination = action.payload.pagination;
        },
        fetchRolesFailure: (state, action: PayloadAction<{ error: string, status: number }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.status = action.payload.status;
        },
        fetchRoleSuccess: (state, action: PayloadAction<{ message: string, data: Role, status: number }>) => {
            state.role = action.payload.data;
            state.loading = false;
            state.error = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
        },
        fetchRoleFailure: (state, action: PayloadAction<{ error: string, status: number }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.status = action.payload.status;
        },
        createRoleStart: (state) => {
            state.loading = true;
        },
        createRoleSuccess: (state, action: PayloadAction<{ message: string, data: Role, status: number }>) => {
            state.role = action.payload.data;
            state.loading = false;
            state.error = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
        },
        createRoleFailure: (state, action: PayloadAction<{ error: string, status: number }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.status = action.payload.status;
        },
        updateRoleStart: (state) => {
            state.loading = true;
        },
        updateRoleSuccess: (state, action: PayloadAction<{ message: string, data: Role, status: number }>) => {
            state.role = action.payload.data;
            state.loading = false;
            state.error = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
        },
        updateRoleFailure: (state, action: PayloadAction<{ error: string, status: number }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.status = action.payload.status;
        },
        deleteRoleStart: (state) => {
            state.loading = true;
        },
        deleteRoleSuccess: (state, action: PayloadAction<{ message: string, status: number }>) => {
            state.role = null;
            state.loading = false;
            state.error = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
        },
        deleteRoleFailure: (state, action: PayloadAction<{ error: string, status: number }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.status = action.payload.status;
        }
    }
});

export const {
    fetchRolesStart,
    fetchRolesSuccess,
    fetchRolesFailure,
    fetchRoleSuccess,
    fetchRoleFailure,
    createRoleStart,
    createRoleSuccess,
    createRoleFailure,
    updateRoleStart,
    updateRoleSuccess,
    updateRoleFailure,
    deleteRoleStart,
    deleteRoleSuccess,
    deleteRoleFailure,
} = roleSlice.actions;

export default roleSlice.reducer;
