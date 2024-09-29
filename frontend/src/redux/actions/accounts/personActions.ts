import axios from "axios";
import { Person } from "../../models/accounts";
import { AppDispatch } from "../../store";
import {
    fetchPersonsStart,
    fetchPersonsSuccess,
    fetchPersonsFailure,
    fetchPersonSuccess,
    fetchPersonFailure,
    createPersonStart,
    createPersonSuccess,
    createPersonFailure,
    updatePersonStart,
    updatePersonSuccess,
    updatePersonFailure,
    deletePersonStart,
    deletePersonSuccess,
    deletePersonFailure,
} from "../../slices/accounts/personSlice";

import { ACCOUNTS_URL } from "@/constants/urls";

export const fetchPersons = (page: number) => async (dispatch: AppDispatch) => {
    dispatch(fetchPersonsStart());
    try {
        const response = await axios.get(`${ACCOUNTS_URL}/persons?page=${page}`);
        dispatch(fetchPersonsSuccess({
            message: response.data.message,
            data: response.data.persons,
            status: response.status,
            pagination: response.data.meta
        }));
    } catch (error: any) {
        dispatch(fetchPersonsFailure({
            error: error.response?.data.message || error.message,
            status: error.response?.status || 500
        }));
    }
};

export const fetchPerson = (id: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get(`${ACCOUNTS_URL}/persons/${id}`);
        dispatch(fetchPersonSuccess({
            message: response.data.message,
            data: response.data.person,
            status: response.status
        }));
    } catch (error: any) {
        dispatch(fetchPersonFailure({
            error: error.response?.data.message || error.message,
            status: error.response?.status || 500
        }));
    }
};

export const createPerson = (newPerson: Person) => async (dispatch: AppDispatch) => {
    dispatch(createPersonStart());
    try {
        const response = await axios.post(`${ACCOUNTS_URL}/persons`, newPerson);
        dispatch(createPersonSuccess({
            message: response.data.message,
            data: response.data.person,
            status: response.status
        }));
    } catch (error: any) {
        dispatch(createPersonFailure({
            error: error.response?.data.message || error.message,
            status: error.response?.status || 500
        }));
    }
};

export const updatePerson = (id: string, updatedPerson: Person) => async (dispatch: AppDispatch) => {
    dispatch(updatePersonStart());
    try {
        const response = await axios.put(`${ACCOUNTS_URL}/persons/${id}`, updatedPerson);
        dispatch(updatePersonSuccess({
            message: response.data.message,
            data: response.data.person,
            status: response.status
        }));
    } catch (error: any) {
        dispatch(updatePersonFailure({
            error: error.response?.data.message || error.message,
            status: error.response?.status || 500
        }));
    }
};

export const deletePerson = (id: string) => async (dispatch: AppDispatch) => {
    dispatch(deletePersonStart());
    try {
        const response = await axios.delete(`${ACCOUNTS_URL}/persons/${id}`);
        dispatch(deletePersonSuccess({
            message: response.data.message,
            status: response.status
        }));
    } catch (error: any) {
        dispatch(deletePersonFailure({
            error: error.response?.data.message || error.message,
            status: error.response?.status || 500
        }));
    }
};
