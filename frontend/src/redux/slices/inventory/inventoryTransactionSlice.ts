import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { InventoryTransaction } from '../../models/inventory'
import { Pagination } from '../../models/pagination'
import { error } from 'console'

interface InventoryTransactionState {
  transactions: InventoryTransaction[]
  transaction: InventoryTransaction | null
  loading: boolean
  error: string | null
  errors: Record<string, string[]> | null
  message: string | null
  status: number | null
  detailCode: string | null
  pagination: Pagination | null
}

const initialState: InventoryTransactionState = {
  transactions: [],
  transaction: null,
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

const inventoryTransactionSlice = createSlice({
  name: 'inventoryTransaction',
  initialState,
  reducers: {
    fetchTransactionsStart: (state) => {
      state.loading = true
      state.error = null
      state.errors = null
      state.message = null
      state.status = null
      state.detailCode = null
    },
    fetchTransactionsSuccess: (
      state,
      action: PayloadAction<{
        message: string
        data: InventoryTransaction[]
        status: number
        pagination: Pagination
        detailCode: string
      }>,
    ) => {
      state.transactions = action.payload.data
      state.loading = false
      state.error = null
      state.message = action.payload.message
      state.status = action.payload.status
      state.detailCode = action.payload.detailCode
      state.pagination = action.payload.pagination
    },
    fetchTransactionsFailure: (
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
      state.detailCode = action.payload.detailCode
      state.message = action.payload.error
      state.status = action.payload.status
    },
    fetchTransactionSuccess: (
      state,
      action: PayloadAction<{
        message: string
        data: InventoryTransaction
        status: number
        detailCode: string
      }>,
    ) => {
      state.transaction = action.payload.data
      state.loading = false
      state.error = null
      state.errors = null
      state.message = action.payload.message
      state.status = action.payload.status
      state.detailCode = action.payload.detailCode
    },
    fetchTransactionFailure: (
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
    createTransactionStart: (state) => {
      state.loading = true
      state.error = null
      state.errors = null
      state.message = null
      state.status = null
      state.detailCode = null
    },
    createTransactionSuccess: (
      state,
      action: PayloadAction<{
        message: string
        data: InventoryTransaction
        status: number
        detailCode: string
      }>,
    ) => {
      state.transaction = action.payload.data
      state.loading = false
      state.error = null
      state.errors = null
      state.message = action.payload.message
      state.status = action.payload.status
      state.detailCode = action.payload.detailCode
    },
    createTransactionFailure: (
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
    updateTransactionStart: (state) => {
      state.loading = true
      state.error = null
      state.errors = null
      state.message = null
      state.status = null
      state.detailCode = null
    },
    updateTransactionSuccess: (
      state,
      action: PayloadAction<{
        message: string
        data: InventoryTransaction
        status: number
        detailCode: string
      }>,
    ) => {
      state.transaction = action.payload.data
      state.loading = false
      state.error = null
      state.errors = null
      state.message = action.payload.message
      state.status = action.payload.status
      state.detailCode = action.payload.detailCode
    },
    updateTransactionFailure: (
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
    deleteTransactionStart: (state) => {
      state.loading = true
      state.error = null
      state.errors = null
      state.message = null
      state.status = null
      state.detailCode = null
    },
    deleteTransactionSuccess: (
      state,
      action: PayloadAction<{
        message: string
        status: number
        detailCode: string
      }>,
    ) => {
      state.transaction = null
      state.loading = false
      state.error = null
      state.errors = null
      state.message = action.payload.message
      state.status = action.payload.status
      state.detailCode = action.payload.detailCode
    },
    deleteTransactionFailure: (
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
  fetchTransactionsStart,
  fetchTransactionsSuccess,
  fetchTransactionsFailure,
  fetchTransactionSuccess,
  fetchTransactionFailure,
  createTransactionStart,
  createTransactionSuccess,
  createTransactionFailure,
  updateTransactionStart,
  updateTransactionSuccess,
  updateTransactionFailure,
  deleteTransactionStart,
  deleteTransactionSuccess,
  deleteTransactionFailure,
} = inventoryTransactionSlice.actions

export default inventoryTransactionSlice.reducer
