import axios, { getConfig } from "../axiosConfig";
import { Warehouse } from "../../models/inventory";
import { AppDispatch } from "../../store";
import {
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
} from "../../slices/inventory/warehouseSlice";

import { INVENTORY_URL } from "@/constants/urls";

export const fetchWarehouses = (page: number, searchTerm: string = "") => async (dispatch: AppDispatch) => {
    dispatch(fetchWarehousesStart());
    try {
        const response = await axios.get(`${INVENTORY_URL}/warehouses/`, { 
            params: { 
            page,
            search: searchTerm 
            }, 
        ...getConfig()
        });
        dispatch(fetchWarehousesSuccess({
            message: response.data.message,
            data: response.data.warehouses,
            status: response.status,
            pagination: {
                currentPage: response.data.meta.current_page,
                totalPages: response.data.meta.total_pages,
                totalItems: response.data.meta.total_items,
                pageSize: response.data.meta.page_size
            }
        }));
    } catch (error: any) {
        dispatch(fetchWarehousesFailure({
            error: error.response?.data.message || error.message,
            status: error.response?.status || 500
        }));
    }
};

export const fetchWarehouse = (id: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get(`${INVENTORY_URL}/warehouses/${id}/`, getConfig());
        dispatch(fetchWarehouseSuccess({
            message: response.data.message,
            data: response.data.warehouse,
            status: response.status
        }));
    } catch (error: any) {
        dispatch(fetchWarehouseFailure({
            error: error.response?.data.message || error.message,
            status: error.response?.status || 500
        }));
    }
};

export const createWarehouse = (newWarehouse: Warehouse) => async (dispatch: AppDispatch) => {
    dispatch(createWarehouseStart());
    try {
        const response = await axios.post(`${INVENTORY_URL}/warehouses/`, newWarehouse, getConfig());
        dispatch(createWarehouseSuccess({
            message: response.data.message,
            data: response.data.warehouse,
            status: response.status
        }));
    } catch (error: any) {
        dispatch(createWarehouseFailure({
            error: error.response?.data.message || error.message,
            errors: error.response?.data.errors || {},
            status: error.response?.status || 500
        }));
    }
};

export const updateWarehouse = (id: string, updatedWarehouse: Warehouse) => async (dispatch: AppDispatch) => {
    dispatch(updateWarehouseStart());
    try {
        const response = await axios.put(`${INVENTORY_URL}/warehouses/${id}/`, updatedWarehouse, getConfig());
        dispatch(updateWarehouseSuccess({
            message: response.data.message,
            data: response.data.warehouse,
            status: response.status
        }));
    } catch (error: any) {
        dispatch(updateWarehouseFailure({
            error: error.response?.data.message || error.message,
            status: error.response?.status || 500
        }));
    }
};

export const deleteWarehouse = (id: string) => async (dispatch: AppDispatch) => {
    dispatch(deleteWarehouseStart());
    try {
        const response = await axios.delete(`${INVENTORY_URL}/warehouses/${id}/`, getConfig());
        dispatch(deleteWarehouseSuccess({
            message: response.data.message,
            status: response.status
        }));
    } catch (error: any) {
        dispatch(deleteWarehouseFailure({
            error: error.response?.data.message || error.message,
            status: error.response?.status || 500
        }));
    }
};
