import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Profile } from "../../models/accounts";
import { Pagination } from "../../models/pagination";

interface ProfileState {
    profiles: Profile[];
    profile: Profile | null;
    loading: boolean;
    error: string | null;
    message: string | null;
    status: number | null;
    pagination: Pagination | null;
}

const initialState: ProfileState = {
    profiles: [],
    profile: null,
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

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        fetchProfilesStart: (state) => {
            state.loading = true;
        },
        fetchProfilesSuccess: (state, action: PayloadAction<{ message: string, data: Profile[], status: number, pagination: Pagination }>) => {
            state.profiles = action.payload.data;
            state.loading = false;
            state.error = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.pagination = action.payload.pagination;
        },
        fetchProfilesFailure: (state, action: PayloadAction<{ error: string, status: number }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.status = action.payload.status;
        },
        fetchProfileSuccess: (state, action: PayloadAction<{ message: string, data: Profile, status: number }>) => {
            state.profile = action.payload.data;
            state.loading = false;
            state.error = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
        },
        fetchProfileFailure: (state, action: PayloadAction<{ error: string, status: number }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.status = action.payload.status;
        },
        createProfileStart: (state) => {
            state.loading = true;
        },
        createProfileSuccess: (state, action: PayloadAction<{ message: string, data: Profile, status: number }>) => {
            state.profile = action.payload.data;
            state.loading = false;
            state.error = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
        },
        createProfileFailure: (state, action: PayloadAction<{ error: string, status: number }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.status = action.payload.status;
        },
        updateProfileStart: (state) => {
            state.loading = true;
        },
        updateProfileSuccess: (state, action: PayloadAction<{ message: string, data: Profile, status: number }>) => {
            state.profile = action.payload.data;
            state.loading = false;
            state.error = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
        },
        updateProfileFailure: (state, action: PayloadAction<{ error: string, status: number }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.status = action.payload.status;
        },
        deleteProfileStart: (state) => {
            state.loading = true;
        },
        deleteProfileSuccess: (state, action: PayloadAction<{ message: string, status: number }>) => {
            state.profile = null;
            state.loading = false;
            state.error = null;
            state.message = action.payload.message;
            state.status = action.payload.status;
        },
        deleteProfileFailure: (state, action: PayloadAction<{ error: string, status: number }>) => {
            state.loading = false;
            state.error = action.payload.error;
            state.status = action.payload.status;
        }
    }
});

export const {
    fetchProfilesStart,
    fetchProfilesSuccess,
    fetchProfilesFailure,
    fetchProfileSuccess,
    fetchProfileFailure,
    createProfileStart,
    createProfileSuccess,
    createProfileFailure,
    updateProfileStart,
    updateProfileSuccess,
    updateProfileFailure,
    deleteProfileStart,
    deleteProfileSuccess,
    deleteProfileFailure,
} = profileSlice.actions;

export default profileSlice.reducer;
