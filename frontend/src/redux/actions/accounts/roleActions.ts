import axios from "axios";
import { Role } from "../../models/accounts";
import { AppDispatch } from "../../store";
import {
    fetchRolesStart,
    fetchRolesSuccess,
    fetchRolesFailure,
    fetchRoleSuccess,
    fetchRoleFailure,
    createRoleStart,
    createRoleSuccess,
    createRoleFailure,
    updateRoleStart,
    updateRoleSuccess,
    updateRoleFailure,
    deleteRoleStart,
    deleteRoleSuccess,
    deleteRoleFailure,
} from "../../slices/accounts/roleSlice";

import { ACCOUNTS_URL } from "@/constants/urls";

export const fetchRoles = (page: number) => async (dispatch: AppDispatch) => {
    dispatch(fetchRolesStart());
    try {
        const response = await axios.get(`${ACCOUNTS_URL}/roles?page=${page}`);
        dispatch(fetchRolesSuccess({
            message: response.data.message,
            data: response.data.roles,
            status: response.status,
            pagination: response.data.meta
        }));
    } catch (error: any) {
        dispatch(fetchRolesFailure({
            error: error.response?.data.message || error.message,
            status: error.response?.status || 500
        }));
    }
};

export const fetchRole = (id: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get(`${ACCOUNTS_URL}/roles/${id}`);
        dispatch(fetchRoleSuccess({
            message: response.data.message,
            data: response.data.role,
            status: response.status
        }));
    } catch (error: any) {
        dispatch(fetchRoleFailure({
            error: error.response?.data.message || error.message,
            status: error.response?.status || 500
        }));
    }
};

export const createRole = (newRole: Role) => async (dispatch: AppDispatch) => {
    dispatch(createRoleStart());
    try {
        const response = await axios.post(`${ACCOUNTS_URL}/roles`, newRole);
        dispatch(createRoleSuccess({
            message: response.data.message,
            data: response.data.role,
            status: response.status
        }));
    } catch (error: any) {
        dispatch(createRoleFailure({
            error: error.response?.data.message || error.message,
            status: error.response?.status || 500
        }));
    }
};

export const updateRole = (id: string, updatedRole: Role) => async (dispatch: AppDispatch) => {
    dispatch(updateRoleStart());
    try {
        const response = await axios.put(`${ACCOUNTS_URL}/roles/${id}`, updatedRole);
        dispatch(updateRoleSuccess({
            message: response.data.message,
            data: response.data.role,
            status: response.status
        }));
    } catch (error: any) {
        dispatch(updateRoleFailure({
            error: error.response?.data.message || error.message,
            status: error.response?.status || 500
        }));
    }
};

export const deleteRole = (id: string) => async (dispatch: AppDispatch) => {
    dispatch(deleteRoleStart());
    try {
        const response = await axios.delete(`${ACCOUNTS_URL}/roles/${id}`);
        dispatch(deleteRoleSuccess({
            message: response.data.message,
            status: response.status
        }));
    } catch (error: any) {
        dispatch(deleteRoleFailure({
            error: error.response?.data.message || error.message,
            status: error.response?.status || 500
        }));
    }
};
