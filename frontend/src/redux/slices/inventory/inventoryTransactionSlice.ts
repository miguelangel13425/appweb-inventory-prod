import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { InventoryTransaction } from '../../models/inventory'
import { Pagination } from '../../models/pagination'

interface InventoryTransactionState {
  transactions: InventoryTransaction[]
  transaction: InventoryTransaction | null
  loading: boolean
  error: string | null
  message: string | null
  status: number | null
  pagination: Pagination | null
}

const initialState: InventoryTransactionState = {
  transactions: [],
  transaction: null,
  loading: false,
  error: null,
  message: null,
  status: null,
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
    },
    fetchTransactionsSuccess: (
      state,
      action: PayloadAction<{
        message: string
        data: InventoryTransaction[]
        status: number
        pagination: Pagination
      }>,
    ) => {
      state.transactions = action.payload.data
      state.loading = false
      state.error = null
      state.message = action.payload.message
      state.status = action.payload.status
      state.pagination = action.payload.pagination
    },
    fetchTransactionsFailure: (
      state,
      action: PayloadAction<{ error: string; status: number }>,
    ) => {
      state.loading = false
      state.error = action.payload.error
      state.status = action.payload.status
    },
    fetchTransactionSuccess: (
      state,
      action: PayloadAction<{
        message: string
        data: InventoryTransaction
        status: number
      }>,
    ) => {
      state.transaction = action.payload.data
      state.loading = false
      state.error = null
      state.message = action.payload.message
      state.status = action.payload.status
    },
    fetchTransactionFailure: (
      state,
      action: PayloadAction<{ error: string; status: number }>,
    ) => {
      state.loading = false
      state.error = action.payload.error
      state.status = action.payload.status
    },
    createTransactionStart: (state) => {
      state.loading = true
    },
    createTransactionSuccess: (
      state,
      action: PayloadAction<{
        message: string
        data: InventoryTransaction
        status: number
      }>,
    ) => {
      state.transaction = action.payload.data
      state.loading = false
      state.error = null
      state.message = action.payload.message
      state.status = action.payload.status
    },
    createTransactionFailure: (
      state,
      action: PayloadAction<{ error: string; status: number }>,
    ) => {
      state.loading = false
      state.error = action.payload.error
      state.status = action.payload.status
    },
    updateTransactionStart: (state) => {
      state.loading = true
    },
    updateTransactionSuccess: (
      state,
      action: PayloadAction<{
        message: string
        data: InventoryTransaction
        status: number
      }>,
    ) => {
      state.transaction = action.payload.data
      state.loading = false
      state.error = null
      state.message = action.payload.message
      state.status = action.payload.status
    },
    updateTransactionFailure: (
      state,
      action: PayloadAction<{ error: string; status: number }>,
    ) => {
      state.loading = false
      state.error = action.payload.error
      state.status = action.payload.status
    },
    deleteTransactionStart: (state) => {
      state.loading = true
    },
    deleteTransactionSuccess: (
      state,
      action: PayloadAction<{ message: string; status: number }>,
    ) => {
      state.transaction = null
      state.loading = false
      state.error = null
      state.message = action.payload.message
      state.status = action.payload.status
    },
    deleteTransactionFailure: (
      state,
      action: PayloadAction<{ error: string; status: number }>,
    ) => {
      state.loading = false
      state.error = action.payload.error
      state.status = action.payload.status
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
