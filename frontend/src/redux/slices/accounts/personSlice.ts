import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Person } from "../../models/accounts";
import { Pagination } from "../../models/pagination";

interface PersonState {
    persons: Person[];
    person: Person | null;
    loading: boolean;
    error: string | null;
    message: string | null;
    status: number | null;
    pagination: Pagination | null;
}

const initialState: PersonState = {
    persons: [],
    person: null,
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

const personSlice = createSlice({
    name: "person",
    initialState,
    reducers: {
        fetchPersonsStart: (state) => {
            state.loading = true;
        },
        fetchPersonsSuccess: (state, action: PayloadAction<{ message: string, data: Person[], status: number, pagination: Pagination }>) => {
            state.persons = action.payload.data;
            state.loading = false;
            state.error = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.pagination = action.payload.pagination;
        },
        fetchPersonsFailure: (state, action: PayloadAction<{ error: string, status: number }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.status = action.payload.status;
        },
        fetchPersonSuccess: (state, action: PayloadAction<{ message: string, data: Person, status: number }>) => {
            state.person = action.payload.data;
            state.loading = false;
            state.error = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
        },
        fetchPersonFailure: (state, action: PayloadAction<{ error: string, status: number }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.status = action.payload.status;
        },
        createPersonStart: (state) => {
            state.loading = true;
        },
        createPersonSuccess: (state, action: PayloadAction<{ message: string, data: Person, status: number }>) => {
            state.person = action.payload.data;
            state.loading = false;
            state.error = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
        },
        createPersonFailure: (state, action: PayloadAction<{ error: string, status: number }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.status = action.payload.status;
        },
        updatePersonStart: (state) => {
            state.loading = true;
        },
        updatePersonSuccess: (state, action: PayloadAction<{ message: string, data: Person, status: number }>) => {
            state.person = action.payload.data;
            state.loading = false;
            state.error = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
        },
        updatePersonFailure: (state, action: PayloadAction<{ error: string, status: number }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.status = action.payload.status;
        },
        deletePersonStart: (state) => {
            state.loading = true;
        },
        deletePersonSuccess: (state, action: PayloadAction<{ message: string, status: number }>) => {
            state.person = null;
            state.loading = false;
            state.error = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
        },
        deletePersonFailure: (state, action: PayloadAction<{ error: string, status: number }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.status = action.payload.status;
        }
    }
});

export const {
    fetchPersonsStart,
    fetchPersonsSuccess,
    fetchPersonsFailure,
    fetchPersonSuccess,
    fetchPersonFailure,
    createPersonStart,
    createPersonSuccess,
    createPersonFailure,
    updatePersonStart,
    updatePersonSuccess,
    updatePersonFailure,
    deletePersonStart,
    deletePersonSuccess,
    deletePersonFailure,
} = personSlice.actions;

export default personSlice.reducer;
