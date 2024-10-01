import axios, { getConfig } from "../axiosConfig";
import { Product } from "../../models/inventory";
import { AppDispatch } from "../../store";
import {
    fetchProductsStart,
    fetchProductsSuccess,
    fetchProductsFailure,
    fetchProductSuccess,
    fetchProductFailure,
    createProductStart,
    createProductSuccess,
    createProductFailure,
    updateProductStart,
    updateProductSuccess,
    updateProductFailure,
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFailure,
} from "../../slices/inventory/productSlice";

import { INVENTORY_URL } from "@/constants/urls";

export const fetchProducts = (page: number, searchTerm: string = "") => async (dispatch: AppDispatch) => {
    dispatch(fetchProductsStart());
    try {
        const response = await axios.get(`${INVENTORY_URL}/products/`, { 
            params: { 
            page,
            search: searchTerm 
            }, 
        ...getConfig()
        });
        dispatch(fetchProductsSuccess({
            message: response.data.message,
            data: response.data.products,
            status: response.status,
            pagination: {
                currentPage: response.data.meta.current_page,
                totalPages: response.data.meta.total_pages,
                totalItems: response.data.meta.total_items,
                pageSize: response.data.meta.page_size
            }
        }));
    } catch (error: any) {
        dispatch(fetchProductsFailure({
            error: error.response?.data.message || error.message,
            status: error.response?.status || 500
        }));
    }
};

export const fetchProduct = (id: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get(`${INVENTORY_URL}/products/${id}`);
        dispatch(fetchProductSuccess({
            message: response.data.message,
            data: response.data.product,
            status: response.status
        }));
    } catch (error: any) {
        dispatch(fetchProductFailure({
            error: error.response?.data.message || error.message,
            status: error.response?.status || 500
        }));
    }
};

export const createProduct = (newProduct: Product) => async (dispatch: AppDispatch) => {
    dispatch(createProductStart());
    try {
        const response = await axios.post(`${INVENTORY_URL}/products`, newProduct);
        dispatch(createProductSuccess({
            message: response.data.message,
            data: response.data.product,
            status: response.status
        }));
    } catch (error: any) {
        dispatch(createProductFailure({
            error: error.response?.data.message || error.message,
            status: error.response?.status || 500
        }));
    }
};

export const updateProduct = (id: string, updatedProduct: Product) => async (dispatch: AppDispatch) => {
    dispatch(updateProductStart());
    try {
        const response = await axios.put(`${INVENTORY_URL}/products/${id}`, updatedProduct);
        dispatch(updateProductSuccess({
            message: response.data.message,
            data: response.data.product,
            status: response.status
        }));
    } catch (error: any) {
        dispatch(updateProductFailure({
            error: error.response?.data.message || error.message,
            status: error.response?.status || 500
        }));
    }
};

export const deleteProduct = (id: string) => async (dispatch: AppDispatch) => {
    dispatch(deleteProductStart());
    try {
        const response = await axios.delete(`${INVENTORY_URL}/products/${id}`);
        dispatch(deleteProductSuccess({
            message: response.data.message,
            status: response.status
        }));
    } catch (error: any) {
        dispatch(deleteProductFailure({
            error: error.response?.data.message || error.message,
            status: error.response?.status || 500
        }));
    }
};
