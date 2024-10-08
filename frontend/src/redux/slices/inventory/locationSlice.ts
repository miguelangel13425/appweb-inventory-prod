import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Location } from "../../models/inventory";
import { Pagination } from "../../models/pagination";

interface SimplifiedLocation {
    id: string;
    name: string;
}

interface LocationState {
    locations: Location[];
    simplifiedLocations: SimplifiedLocation[];
    location: Location | null;
    loading: boolean;
    error: string | null;
    errors: Record<string, string[]> | null;
    message: string | null;
    status: number | null;
    detailCode: string | null;
    pagination: Pagination | null;
}

const initialState: LocationState = {
    locations: [],
    simplifiedLocations: [],
    location: null,
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

const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {
        fetchLocationsStart: (state) => {
            state.loading = true;
            state.error = null;
            state.errors = null;
            state.message = null;
            state.status = null;
            state.detailCode = null;
        },
        fetchLocationsSuccess: (state, action: PayloadAction<{ message: string, data: Location[], status: number, pagination: Pagination, detailCode: string }>) => {
            state.locations = action.payload.data;
            state.loading = false;
            state.error = null;
            state.errors = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.detailCode = action.payload.detailCode;
            state.pagination = action.payload.pagination;
        },
        fetchLocationsFailure: (state, action: PayloadAction<{ error: string, status: number, detailCode: string }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.errors = null;
            state.status = action.payload.status;
            state.detailCode = action.payload.detailCode;
        },
        fetchSimplifiedLocationsStart: (state) => {
            state.loading = true;
            state.error = null;
            state.errors = null;
            state.message = null;
            state.status = null;
            state.detailCode = null;
        },
        fetchSimplifiedLocationsSuccess: (state, action: PayloadAction<{ message: string, data: SimplifiedLocation[], status: number, detailCode: string }>) => {
            state.simplifiedLocations = action.payload.data;
            state.loading = false;
            state.error = null;
            state.errors = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.detailCode = action.payload.detailCode;
        },
        fetchSimplifiedLocationsFailure: (state, action: PayloadAction<{ error: string, status: number, detailCode: string }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.errors = null;
            state.status = action.payload.status;
            state.detailCode = action.payload.detailCode;
        },
        fetchLocationSuccess: (state, action: PayloadAction<{ message: string, data: Location, status: number, detailCode: string }>) => {
            state.location = action.payload.data;
            state.loading = false;
            state.error = null;
            state.errors = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.detailCode = action.payload.detailCode;
        },
        fetchLocationFailure: (state, action: PayloadAction<{ error: string, status: number, detailCode: string }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.errors = null;
            state.status = action.payload.status;
            state.detailCode = action.payload.detailCode;
        },
        createLocationStart: (state) => {
            state.loading = true;
            state.error = null;
            state.errors = null;
            state.message = null;
            state.status = null;
            state.detailCode = null;
        },
        createLocationSuccess: (state, action: PayloadAction<{ message: string, data: Location, status: number, detailCode: string }>) => {
            state.location = action.payload.data;
            state.loading = false;
            state.error = null;
            state.errors = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.detailCode = action.payload.detailCode;
        },
        createLocationFailure: (state, action: PayloadAction<{ error: string, errors: Record<string, string[]>, status: number, detailCode: string }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.errors = action.payload.errors;
            state.message = action.payload.error;
            state.status = action.payload.status;
            state.detailCode = action.payload.detailCode;
        },
        updateLocationStart: (state) => {
            state.loading = true;
            state.error = null;
            state.errors = null;
            state.message = null;
            state.status = null;
            state.detailCode = null;
        },
        updateLocationSuccess: (state, action: PayloadAction<{ message: string, data: Location, status: number, detailCode: string }>) => {
            state.location = action.payload.data;
            state.loading = false;
            state.error = null;
            state.errors = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.detailCode = action.payload.detailCode;
        },
        updateLocationFailure: (state, action: PayloadAction<{ error: string, errors: Record<string, string[]>, status: number, detailCode: string }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.errors = action.payload.errors;
            state.message = action.payload.error;
            state.status = action.payload.status;
            state.detailCode = action.payload.detailCode;
        },
        deleteLocationStart: (state) => {
            state.loading = true;
            state.error = null;
            state.errors = null;
            state.message = null;
            state.status = null;
            state.detailCode = null;
        },
        deleteLocationSuccess: (state, action: PayloadAction<{ message: string, status: number, detailCode: string }>) => {
            state.location = null;
            state.loading = false;
            state.error = null;
            state.errors = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.detailCode = action.payload.detailCode;
        },
        deleteLocationFailure: (state, action: PayloadAction<{ error: string, status: number, detailCode: string }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.errors = null;
            state.status = action.payload.status;
            state.detailCode = action.payload.detailCode;
        }
    }
});

export const {
    fetchLocationsStart,
    fetchLocationsSuccess,
    fetchLocationsFailure,
    fetchSimplifiedLocationsStart,
    fetchSimplifiedLocationsSuccess,
    fetchSimplifiedLocationsFailure,
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
