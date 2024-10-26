import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../models/accounts'
import { Pagination } from '../../models/pagination'

interface UserState {
  users: User[]
  user: User | null
  loading: boolean
  error: string | null
  errors: Record<string, string[]> | null
  message: string | null
  status: number | null
  detailCode: string | null
  pagination: Pagination | null
}

const initialState: UserState = {
  users: [],
  user: null,
  loading: false,
  error: null,
  errors: null,
  message: null,
  status: null,
  detailCode: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 1,
    pageSize: 50,
  },
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUsersStart: (state) => {
      state.loading = true
      state.error = null
      state.errors = null
      state.message = null
      state.status = null
      state.detailCode = null
    },
    fetchUsersSuccess: (
      state,
      action: PayloadAction<{
        message: string
        data: User[]
        status: number
        pagination: Pagination
        detailCode: string
      }>,
    ) => {
      state.users = action.payload.data
      state.loading = false
      state.error = null
      state.errors = null
      state.message = action.payload.message
      state.status = action.payload.status
      state.detailCode = action.payload.detailCode
      state.pagination = action.payload.pagination
    },
    fetchUsersFailure: (
      state,
      action: PayloadAction<{
        error: string
        status: number
        detailCode: string
      }>,
    ) => {
      state.loading = false
      state.error = action.payload.error
      state.errors = null
      state.status = action.payload.status
      state.detailCode = action.payload.detailCode
    },
    fetchUserSuccess: (
      state,
      action: PayloadAction<{
        message: string
        data: User
        status: number
        detailCode: string
      }>,
    ) => {
      state.user = action.payload.data
      state.loading = false
      state.error = null
      state.errors = null
      state.message = action.payload.message
      state.status = action.payload.status
      state.detailCode = action.payload.detailCode
    },
    fetchUserFailure: (
      state,
      action: PayloadAction<{
        error: string
        status: number
        detailCode: string
      }>,
    ) => {
      state.loading = false
      state.error = action.payload.error
      state.errors = null
      state.status = action.payload.status
      state.detailCode = action.payload.detailCode
    },
    createUserStart: (state) => {
      state.loading = true
      state.error = null
      state.errors = null
      state.message = null
      state.status = null
      state.detailCode = null
    },
    createUserSuccess: (
      state,
      action: PayloadAction<{
        message: string
        data: User
        status: number
        detailCode: string
      }>,
    ) => {
      state.user = action.payload.data
      state.loading = false
      state.error = null
      state.errors = null
      state.message = action.payload.message
      state.status = action.payload.status
      state.detailCode = action.payload.detailCode
    },
    createUserFailure: (
      state,
      action: PayloadAction<{
        error: string
        errors: Record<string, string[]>
        status: number
        detailCode: string
      }>,
    ) => {
      state.loading = false
      state.error = action.payload.error
      state.errors = action.payload.errors
      state.message = action.payload.error
      state.status = action.payload.status
      state.detailCode = action.payload.detailCode
    },
    updateUserStart: (state) => {
      state.loading = true
      state.error = null
      state.errors = null
      state.message = null
      state.status = null
      state.detailCode = null
    },
    updateUserSuccess: (
      state,
      action: PayloadAction<{
        message: string
        data: User
        status: number
        detailCode: string
      }>,
    ) => {
      state.user = action.payload.data
      state.loading = false
      state.error = null
      state.errors = null
      state.message = action.payload.message
      state.status = action.payload.status
      state.detailCode = action.payload.detailCode
    },
    updateUserFailure: (
      state,
      action: PayloadAction<{
        error: string
        errors: Record<string, string[]>
        status: number
        detailCode: string
      }>,
    ) => {
      state.loading = false
      state.error = action.payload.error
      state.errors = action.payload.errors
      state.message = action.payload.error
      state.status = action.payload.status
      state.detailCode = action.payload.detailCode
    },
    deleteUserStart: (state) => {
      state.loading = true
      state.error = null
      state.errors = null
      state.message = null
      state.status = null
      state.detailCode = null
    },
    deleteUserSuccess: (
      state,
      action: PayloadAction<{
        message: string
        status: number
        detailCode: string
      }>,
    ) => {
      state.user = null
      state.loading = false
      state.error = null
      state.errors = null
      state.message = action.payload.message
      state.status = action.payload.status
      state.detailCode = action.payload.detailCode
    },
    deleteUserFailure: (
      state,
      action: PayloadAction<{
        error: string
        status: number
        detailCode: string
      }>,
    ) => {
      state.loading = false
      state.error = action.payload.error
      state.errors = null
      state.status = action.payload.status
      state.detailCode = action.payload.detailCode
    },
  },
})

export const {
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
} = userSlice.actions

export default userSlice.reducer
