import axios from "axios";
import { Category } from "../../models/inventory";
import { AppDispatch } from "../../store";
import {
    fetchCategoriesStart,
    fetchCategoriesSuccess,
    fetchCategoriesFailure,
    fetchCategorySuccess,
    fetchCategoryFailure,
    createCategoryStart,
    createCategorySuccess,
    createCategoryFailure,
    updateCategoryStart,
    updateCategorySuccess,
    updateCategoryFailure,
    deleteCategoryStart,
    deleteCategorySuccess,
    deleteCategoryFailure,
} from "../../slices/inventory/categorySlice";

import { INVENTORY_URL } from "@/constants/urls";

export const fetchCategories = (page: number) => async (dispatch: AppDispatch) => {
    dispatch(fetchCategoriesStart());
    try {
        const response = await axios.get(`${INVENTORY_URL}/categories?page=${page}`);
        dispatch(fetchCategoriesSuccess({
            message: response.data.message,
            data: response.data.categories,
            status: response.status,
            pagination: response.data.meta
        }));
    } catch (error: any) {
        dispatch(fetchCategoriesFailure({
            error: error.response?.data.message || error.message,
            status: error.response?.status || 500
        }));
    }
};

export const fetchCategory = (id: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get(`${INVENTORY_URL}/categories/${id}`);
        dispatch(fetchCategorySuccess({
            message: response.data.message,
            data: response.data.category,
            status: response.status
        }));
    } catch (error: any) {
        dispatch(fetchCategoryFailure({
            error: error.response?.data.message || error.message,
            status: error.response?.status || 500
        }));
    }
};

export const createCategory = (newCategory: Category) => async (dispatch: AppDispatch) => {
    dispatch(createCategoryStart());
    try {
        const response = await axios.post(`${INVENTORY_URL}/categories`, newCategory);
        dispatch(createCategorySuccess({
            message: response.data.message,
            data: response.data.category,
            status: response.status
        }));
    } catch (error: any) {
        dispatch(createCategoryFailure({
            error: error.response?.data.message || error.message,
            status: error.response?.status || 500
        }));
    }
};

export const updateCategory = (id: string, updatedCategory: Category) => async (dispatch: AppDispatch) => {
    dispatch(updateCategoryStart());
    try {
        const response = await axios.put(`${INVENTORY_URL}/categories/${id}`, updatedCategory);
        dispatch(updateCategorySuccess({
            message: response.data.message,
            data: response.data.category,
            status: response.status
        }));
    } catch (error: any) {
        dispatch(updateCategoryFailure({
            error: error.response?.data.message || error.message,
            status: error.response?.status || 500
        }));
    }
};

export const deleteCategory = (id: string) => async (dispatch: AppDispatch) => {
    dispatch(deleteCategoryStart());
    try {
        const response = await axios.delete(`${INVENTORY_URL}/categories/${id}`);
        dispatch(deleteCategorySuccess({
            message: response.data.message,
            status: response.status
        }));
    } catch (error: any) {
        dispatch(deleteCategoryFailure({
            error: error.response?.data.message || error.message,
            status: error.response?.status || 500
        }));
    }
};
