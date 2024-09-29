import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Location } from "../../models/inventory";
import { Pagination } from "../../models/pagination";

interface LocationState {
    locations: Location[];
    location: Location | null;
    loading: boolean;
    error: string | null;
    message: string | null;
    status: number | null;
    pagination: Pagination | null;
}

const initialState: LocationState = {
    locations: [],
    location: null,
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

const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {
        fetchLocationsStart: (state) => {
            state.loading = true;
        },
        fetchLocationsSuccess: (state, action: PayloadAction<{ message: string, data: Location[], status: number, pagination: Pagination }>) => {
            state.locations = action.payload.data;
            state.loading = false;
            state.error = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.pagination = action.payload.pagination;
        },
        fetchLocationsFailure: (state, action: PayloadAction<{ error: string, status: number }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.status = action.payload.status;
        },
        fetchLocationSuccess: (state, action: PayloadAction<{ message: string, data: Location, status: number }>) => {
            state.location = action.payload.data;
            state.loading = false;
            state.error = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
        },
        fetchLocationFailure: (state, action: PayloadAction<{ error: string, status: number }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.status = action.payload.status;
        },
        createLocationStart: (state) => {
            state.loading = true;
        },
        createLocationSuccess: (state, action: PayloadAction<{ message: string, data: Location, status: number }>) => {
            state.location = action.payload.data;
            state.loading = false;
            state.error = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
        },
        createLocationFailure: (state, action: PayloadAction<{ error: string, status: number }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.status = action.payload.status;
        },
        updateLocationStart: (state) => {
            state.loading = true;
        },
        updateLocationSuccess: (state, action: PayloadAction<{ message: string, data: Location, status: number }>) => {
            state.location = action.payload.data;
            state.loading = false;
            state.error = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
        },
        updateLocationFailure: (state, action: PayloadAction<{ error: string, status: number }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.status = action.payload.status;
        },
        deleteLocationStart: (state) => {
            state.loading = true;
        },
        deleteLocationSuccess: (state, action: PayloadAction<{ message: string, status: number }>) => {
            state.location = null;
            state.loading = false;
            state.error = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
        },
        deleteLocationFailure: (state, action: PayloadAction<{ error: string, status: number }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.status = action.payload.status;
        }
    }
});

export const {
    fetchLocationsStart,
    fetchLocationsSuccess,
    fetchLocationsFailure,
    fetchLocationSuccess,
    fetchLocationFailure,
    createLocationStart,
    createLocationSuccess,
    createLocationFailure,
    updateLocationStart,
    updateLocationSuccess,
    updateLocationFailure,
    deleteLocationStart,
    deleteLocationSuccess,
    deleteLocationFailure,
} = locationSlice.actions;

export default locationSlice.reducer;
