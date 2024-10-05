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
            },
            detailCode: response.data.detail_code
        }));
    } catch (error: any) {
        dispatch(fetchLocationsFailure({
            error: error.response?.data.message || error.message,
            status: error.response?.status || 500,
            detailCode: error.response?.data.detail_code || 'FETCH_LOCATIONS_ERROR'
        }));
    }
};

export const fetchLocation = (id: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get(`${INVENTORY_URL}/locations/${id}/`, getConfig());
        dispatch(fetchLocationSuccess({
            message: response.data.message,
            data: response.data.location,
            status: response.status,
            detailCode: response.data.detail_code
        }));
    } catch (error: any) {
        dispatch(fetchLocationFailure({
            error: error.response?.data.message || error.message,
            status: error.response?.status || 500,
            detailCode: error.response?.data.detail_code || 'FETCH_LOCATION_ERROR'
        }));
    }
};

export const createLocation = (newLocation: Location) => async (dispatch: AppDispatch) => {
    dispatch(createLocationStart());
    try {
        const response = await axios.post(`${INVENTORY_URL}/locations/`, newLocation, getConfig());
        dispatch(createLocationSuccess({
            message: response.data.message,
            data: response.data.location,
            status: response.status,
            detailCode: response.data.detail_code
        }));
    } catch (error: any) {
        dispatch(createLocationFailure({
            error: error.response?.data.message || error.message,
            errors: error.response?.data.errors || {},
            status: error.response?.status || 500,
            detailCode: error.response?.data.detail_code || 'CREATE_LOCATION_ERROR'
        }));
    }
};

export const updateLocation = (id: string, updatedLocation: Location) => async (dispatch: AppDispatch) => {
    dispatch(updateLocationStart());
    try {
        const response = await axios.put(`${INVENTORY_URL}/locations/${id}/`, updatedLocation, getConfig());
        dispatch(updateLocationSuccess({
            message: response.data.message,
            data: response.data.location,
            status: response.status,
            detailCode: response.data.detail_code
        }));
    } catch (error: any) {
        dispatch(updateLocationFailure({
            error: error.response?.data.message || error.message,
            errors: error.response?.data.errors || {},
            status: error.response?.status || 500,
            detailCode: error.response?.data.detail_code || 'UPDATE_LOCATION_ERROR'
        }));
    }
};

export const deleteLocation = (id: string) => async (dispatch: AppDispatch) => {
    dispatch(deleteLocationStart());
    try {
        const response = await axios.delete(`${INVENTORY_URL}/locations/${id}/`, getConfig());
        dispatch(deleteLocationSuccess({
            message: response.data.message,
            status: response.status,
            detailCode: response.data.detail_code
        }));
    } catch (error: any) {
        dispatch(deleteLocationFailure({
            error: error.response?.data.message || error.message,
            status: error.response?.status || 500,
            detailCode: error.response?.data.detail_code || 'DELETE_LOCATION_ERROR'
        }));
    }
};
