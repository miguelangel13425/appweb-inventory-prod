import axios, { getConfig } from "../axiosConfig";
import { Location } from "../../models/inventory";
import { AppDispatch } from "../../store";
import {
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
} from "../../slices/inventory/locationSlice";

import { INVENTORY_URL } from "@/constants/urls";

export const fetchLocations = (page: number, searchTerm: string = "") => async (dispatch: AppDispatch) => {
    dispatch(fetchLocationsStart());
    try {
        const response = await axios.get(`${INVENTORY_URL}/locations/`, { 
            params: { 
            page,
            search: searchTerm 
            }, 
        ...getConfig()
        });
        dispatch(fetchLocationsSuccess({
            message: response.data.message,
            data: response.data.locations,
            status: response.status,
            pagination: {
                currentPage: response.data.meta.current_page,
                totalPages: response.data.meta.total_pages,
                totalItems: response.data.meta.total_items,
                pageSize: response.data.meta.page_size
            }
        }));
    } catch (error: any) {
        dispatch(fetchLocationsFailure({
            error: error.response?.data.message || error.message,
            status: error.response?.status || 500
        }));
    }
};

export const fetchLocation = (id: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get(`${INVENTORY_URL}/locations/${id}`);
        dispatch(fetchLocationSuccess({
            message: response.data.message,
            data: response.data.location,
            status: response.status
        }));
    } catch (error: any) {
        dispatch(fetchLocationFailure({
            error: error.response?.data.message || error.message,
            status: error.response?.status || 500
        }));
    }
};

export const createLocation = (newLocation: Location) => async (dispatch: AppDispatch) => {
    dispatch(createLocationStart());
    try {
        const response = await axios.post(`${INVENTORY_URL}/locations`, newLocation);
        dispatch(createLocationSuccess({
            message: response.data.message,
            data: response.data.location,
            status: response.status
        }));
    } catch (error: any) {
        dispatch(createLocationFailure({
            error: error.response?.data.message || error.message,
            status: error.response?.status || 500
        }));
    }
};

export const updateLocation = (id: string, updatedLocation: Location) => async (dispatch: AppDispatch) => {
    dispatch(updateLocationStart());
    try {
        const response = await axios.put(`${INVENTORY_URL}/locations/${id}`, updatedLocation);
        dispatch(updateLocationSuccess({
            message: response.data.message,
            data: response.data.location,
            status: response.status
        }));
    } catch (error: any) {
        dispatch(updateLocationFailure({
            error: error.response?.data.message || error.message,
            status: error.response?.status || 500
        }));
    }
};

export const deleteLocation = (id: string) => async (dispatch: AppDispatch) => {
    dispatch(deleteLocationStart());
    try {
        const response = await axios.delete(`${INVENTORY_URL}/locations/${id}`);
        dispatch(deleteLocationSuccess({
            message: response.data.message,
            status: response.status
        }));
    } catch (error: any) {
        dispatch(deleteLocationFailure({
            error: error.response?.data.message || error.message,
            status: error.response?.status || 500
        }));
    }
};
