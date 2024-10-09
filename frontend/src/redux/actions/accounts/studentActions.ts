import axios, { getConfig } from "../axiosConfig";
import { Student } from "../../models/accounts";
import { AppDispatch } from "../../store";
import {
  fetchStudentsStart,
  fetchStudentsSuccess,
  fetchStudentsFailure,
  fetchStudentSuccess,
  fetchStudentFailure,
  createStudentStart,
  createStudentSuccess,
  createStudentFailure,
  updateStudentStart,
  updateStudentSuccess,
  updateStudentFailure,
  deleteStudentStart,
  deleteStudentSuccess,
  deleteStudentFailure,
} from "../../slices/accounts/studentSlice";

import { ACCOUNTS_URL } from "@/constants/urls";

export const fetchStudents = (page: number, searchTerm: string = "") => async (dispatch: AppDispatch) => {
  dispatch(fetchStudentsStart());
  try {
    const response = await axios.get(`${ACCOUNTS_URL}/students/`, { 
      params: { 
        page,
        search: searchTerm 
      }, 
      ...getConfig()
    });
    dispatch(fetchStudentsSuccess({
      message: response.data.message,
      data: response.data.students,
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
    dispatch(fetchStudentsFailure({
      error: error.response?.data.message || error.message,
      status: error.response?.status || 500,
      detailCode: error.response?.data.detail_code || 'FETCH_STUDENTS_ERROR'
    }));
  }
};

export const fetchStudent = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${ACCOUNTS_URL}/students/${id}/`, getConfig());
    dispatch(fetchStudentSuccess({
      message: response.data.message,
      data: response.data.student,
      status: response.status,
      detailCode: response.data.detail_code
    }));
  } catch (error: any) {
    dispatch(fetchStudentFailure({
      error: error.response?.data.message || error.message,
      status: error.response?.status || 500,
      detailCode: error.response?.data.detail_code || 'FETCH_STUDENT_ERROR'
    }));
  }
};

export const createStudent = (newStudent: Student) => async (dispatch: AppDispatch) => {
  dispatch(createStudentStart());
  try {
    const response = await axios.post(`${ACCOUNTS_URL}/students/`, newStudent, getConfig());
    dispatch(createStudentSuccess({
      message: response.data.message,
      data: response.data.student,
      status: response.status,
      detailCode: response.data.detail_code
    }));
  } catch (error: any) {
    dispatch(createStudentFailure({
      error: error.response?.data.message || error.message,
      errors: error.response?.data.errors || {},
      status: error.response?.status || 500,
      detailCode: error.response?.data.detail_code || 'CREATE_STUDENT_ERROR'
    }));
  }
};

export const updateStudent = (id: string, updatedStudent: Student) => async (dispatch: AppDispatch) => {
  dispatch(updateStudentStart());
  try {
    const response = await axios.put(`${ACCOUNTS_URL}/students/${id}/`, updatedStudent, getConfig());
    dispatch(updateStudentSuccess({
      message: response.data.message,
      data: response.data.student,
      status: response.status,
      detailCode: response.data.detail_code
    }));
    dispatch(fetchStudent(id));
  } catch (error: any) {
    dispatch(updateStudentFailure({
      error: error.response?.data.message || error.message,
      errors: error.response?.data.errors || {},
      status: error.response?.status || 500,
      detailCode: error.response?.data.detail_code || 'UPDATE_STUDENT_ERROR'
    }));
  }
};

export const deleteStudent = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(deleteStudentStart());
  try {
    const response = await axios.delete(`${ACCOUNTS_URL}/students/${id}/`, getConfig());
    dispatch(deleteStudentSuccess({
      message: response.data.message,
      status: response.status,
      detailCode: response.data.detail_code
    }));
  } catch (error: any) {
    dispatch(deleteStudentFailure({
      error: error.response?.data.message || error.message,
      status: error.response?.status || 500,
      detailCode: error.response?.data.detail_code || 'DELETE_STUDENT_ERROR'
    }));
  }
};
