import axios, { getConfig } from '../axiosConfig'
import { User } from '../../models/accounts'
import { AppDispatch } from '../../store'
import {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
  fetchUserSuccess,
  fetchUserFailure,
  createUserStart,
  createUserSuccess,
  createUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from '../../slices/accounts/userSlice'

import { ACCOUNTS_URL } from '@/constants/urls'

type UserForm = Omit<
  User,
  | 'id'
  | 'is_active'
  | 'created_at'
  | 'updated_at'
  | 'deleted_at'
  | 'date_joined'
  | 'is_staff'
  | 'profile'
  | 'email'
>

export const fetchUsers =
  (page: number, searchTerm: string = '') =>
  async (dispatch: AppDispatch) => {
    dispatch(fetchUsersStart())
    try {
      const response = await axios.get(`${ACCOUNTS_URL}/users/`, {
        params: {
          page,
          search: searchTerm,
        },
        ...getConfig(),
      })
      dispatch(
        fetchUsersSuccess({
          message: response.data.message,
          data: response.data.users,
          status: response.status,
          pagination: {
            currentPage: response.data.meta.current_page,
            totalPages: response.data.meta.total_pages,
            totalItems: response.data.meta.total_items,
            pageSize: response.data.meta.page_size,
          },
          detailCode: response.data.detail_code,
        }),
      )
    } catch (error: any) {
      dispatch(
        fetchUsersFailure({
          error: error.response?.data.message || error.message,
          status: error.response?.status || 500,
          detailCode: error.response?.data.detail_code || 'FETCH_USERS_ERROR',
        }),
      )
    }
  }

export const fetchUser = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(
      `${ACCOUNTS_URL}/users/${id}/`,
      getConfig(),
    )
    dispatch(
      fetchUserSuccess({
        message: response.data.message,
        data: response.data.user,
        status: response.status,
        detailCode: response.data.detail_code,
      }),
    )
  } catch (error: any) {
    dispatch(
      fetchUserFailure({
        error: error.response?.data.message || error.message,
        status: error.response?.status || 500,
        detailCode: error.response?.data.detail_code || 'FETCH_USER_ERROR',
      }),
    )
  }
}

export const createUser =
  (newUser: UserForm) => async (dispatch: AppDispatch) => {
    dispatch(createUserStart())
    try {
      const response = await axios.post(
        `${ACCOUNTS_URL}/users/`,
        newUser,
        getConfig(),
      )
      dispatch(
        createUserSuccess({
          message: response.data.message,
          data: response.data.user,
          status: response.status,
          detailCode: response.data.detail_code,
        }),
      )
    } catch (error: any) {
      dispatch(
        createUserFailure({
          error: error.response?.data.message || error.message,
          errors: error.response?.data.errors || {},
          status: error.response?.status || 500,
          detailCode: error.response?.data.detail_code || 'CREATE_USER_ERROR',
        }),
      )
    }
  }

export const updateUser =
  (id: string, updatedUser: UserForm) => async (dispatch: AppDispatch) => {
    dispatch(updateUserStart())
    try {
      const response = await axios.put(
        `${ACCOUNTS_URL}/users/${id}/`,
        updatedUser,
        getConfig(),
      )
      dispatch(
        updateUserSuccess({
          message: response.data.message,
          data: response.data.user,
          status: response.status,
          detailCode: response.data.detail_code,
        }),
      )
      dispatch(fetchUser(id))
    } catch (error: any) {
      dispatch(
        updateUserFailure({
          error: error.response?.data.message || error.message,
          errors: error.response?.data.errors || {},
          status: error.response?.status || 500,
          detailCode: error.response?.data.detail_code || 'UPDATE_USER_ERROR',
        }),
      )
    }
  }

export const deleteUser = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(deleteUserStart())
  try {
    const response = await axios.delete(
      `${ACCOUNTS_URL}/users/${id}/`,
      getConfig(),
    )
    dispatch(
      deleteUserSuccess({
        message: response.data.message,
        status: response.status,
        detailCode: response.data.detail_code,
      }),
    )
  } catch (error: any) {
    dispatch(
      deleteUserFailure({
        error: error.response?.data.message || error.message,
        status: error.response?.status || 500,
        detailCode: error.response?.data.detail_code || 'DELETE_USER_ERROR',
      }),
    )
  }
}
