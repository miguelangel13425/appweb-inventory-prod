import axios from "axios";
import { Inventory } from "../../models/inventory";
import { AppDispatch } from "../../store";
import {
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
} from "../../slices/inventory/inventorySlice";

import { INVENTORY_URL } from "@/constants/urls";

export const fetchInventories = (page: number) => async (dispatch: AppDispatch) => {
    dispatch(fetchInventoriesStart());
    try {
        const response = await axios.get(`${INVENTORY_URL}/inventories?page=${page}`);
        dispatch(fetchInventoriesSuccess({
            message: response.data.message,
            data: response.data.inventories,
            status: response.status,
            pagination: response.data.meta
        }));
    } catch (error: any) {
        dispatch(fetchInventoriesFailure({
            error: error.response?.data.message || error.message,
            status: error.response?.status || 500
        }));
    }
};

export const fetchInventory = (id: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get(`${INVENTORY_URL}/inventories/${id}`);
        dispatch(fetchInventorySuccess({
            message: response.data.message,
            data: response.data.inventory,
            status: response.status
        }));
    } catch (error: any) {
        dispatch(fetchInventoryFailure({
            error: error.response?.data.message || error.message,
            status: error.response?.status || 500
        }));
    }
};

export const createInventory = (newInventory: Inventory) => async (dispatch: AppDispatch) => {
    dispatch(createInventoryStart());
    try {
        const response = await axios.post(`${INVENTORY_URL}/inventories`, newInventory);
        dispatch(createInventorySuccess({
            message: response.data.message,
            data: response.data.inventory,
            status: response.status
        }));
    } catch (error: any) {
        dispatch(createInventoryFailure({
            error: error.response?.data.message || error.message,
            status: error.response?.status || 500
        }));
    }
};

export const updateInventory = (id: string, updatedInventory: Inventory) => async (dispatch: AppDispatch) => {
    dispatch(updateInventoryStart());
    try {
        const response = await axios.put(`${INVENTORY_URL}/inventories/${id}`, updatedInventory);
        dispatch(updateInventorySuccess({
            message: response.data.message,
            data: response.data.inventory,
            status: response.status
        }));
    } catch (error: any) {
        dispatch(updateInventoryFailure({
            error: error.response?.data.message || error.message,
            status: error.response?.status || 500
        }));
    }
};

export const deleteInventory = (id: string) => async (dispatch: AppDispatch) => {
    dispatch(deleteInventoryStart());
    try {
        const response = await axios.delete(`${INVENTORY_URL}/inventories/${id}`);
        dispatch(deleteInventorySuccess({
            message: response.data.message,
            status: response.status
        }));
    } catch (error: any) {
        dispatch(deleteInventoryFailure({
            error: error.response?.data.message || error.message,
            status: error.response?.status || 500
        }));
    }
};
