import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Student } from '../../models/accounts'
import { Pagination } from '../../models/pagination'

interface StudentState {
  students: Student[]
  student: Student | null
  loading: boolean
  error: string | null
  errors: Record<string, string[]> | null
  message: string | null
  status: number | null
  detailCode: string | null
  pagination: Pagination | null
}

const initialState: StudentState = {
  students: [],
  student: null,
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

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    fetchStudentsStart: (state) => {
      state.loading = true
      state.error = null
      state.errors = null
      state.message = null
      state.status = null
      state.detailCode = null
    },
    fetchStudentsSuccess: (
      state,
      action: PayloadAction<{
        message: string
        data: Student[]
        status: number
        pagination: Pagination
        detailCode: string
      }>,
    ) => {
      state.students = action.payload.data
      state.loading = false
      state.error = null
      state.errors = null
      state.message = action.payload.message
      state.status = action.payload.status
      state.detailCode = action.payload.detailCode
      state.pagination = action.payload.pagination
    },
    fetchStudentsFailure: (
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
    fetchStudentSuccess: (
      state,
      action: PayloadAction<{
        message: string
        data: Student
        status: number
        detailCode: string
      }>,
    ) => {
      state.student = action.payload.data
      state.loading = false
      state.error = null
      state.errors = null
      state.message = action.payload.message
      state.status = action.payload.status
      state.detailCode = action.payload.detailCode
    },
    fetchStudentFailure: (
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
    createStudentStart: (state) => {
      state.loading = true
      state.error = null
      state.errors = null
      state.message = null
      state.status = null
      state.detailCode = null
    },
    createStudentSuccess: (
      state,
      action: PayloadAction<{
        message: string
        data: Student
        status: number
        detailCode: string
      }>,
    ) => {
      state.student = action.payload.data
      state.loading = false
      state.error = null
      state.errors = null
      state.message = action.payload.message
      state.status = action.payload.status
      state.detailCode = action.payload.detailCode
    },
    createStudentFailure: (
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
    updateStudentStart: (state) => {
      state.loading = true
      state.error = null
      state.errors = null
      state.message = null
      state.status = null
      state.detailCode = null
    },
    updateStudentSuccess: (
      state,
      action: PayloadAction<{
        message: string
        data: Student
        status: number
        detailCode: string
      }>,
    ) => {
      state.student = action.payload.data
      state.loading = false
      state.error = null
      state.errors = null
      state.message = action.payload.message
      state.status = action.payload.status
      state.detailCode = action.payload.detailCode
    },
    updateStudentFailure: (
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
    deleteStudentStart: (state) => {
      state.loading = true
      state.error = null
      state.errors = null
      state.message = null
      state.status = null
      state.detailCode = null
    },
    deleteStudentSuccess: (
      state,
      action: PayloadAction<{
        message: string
        status: number
        detailCode: string
      }>,
    ) => {
      state.student = null
      state.loading = false
      state.error = null
      state.errors = null
      state.message = action.payload.message
      state.status = action.payload.status
      state.detailCode = action.payload.detailCode
    },
    deleteStudentFailure: (
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
} = studentSlice.actions

export default studentSlice.reducer
