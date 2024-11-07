import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Inventory } from '../../models/inventory'
import { Pagination } from '../../models/pagination'
import { Product, Location } from '../../models/inventory'

interface SimplifiedInventory {
  id: string
  location: Location
  product: Product
}

interface InventoryState {
  inventories: Inventory[]
  simplifiedInventories: SimplifiedInventory[]
  inventory: Inventory | null
  loading: boolean
  error: string | null
  errors: Record<string, string[]> | null
  message: string | null
  status: number | null
  detailCode: string | null
  pagination: Pagination | null
}

const initialState: InventoryState = {
  inventories: [],
  simplifiedInventories: [],
  inventory: null,
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

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    fetchInventoriesStart: (state) => {
      state.loading = true
      state.error = null
      state.errors = null
      state.message = null
      state.status = null
      state.detailCode = null
    },
    fetchInventoriesSuccess: (
      state,
      action: PayloadAction<{
        message: string
        data: Inventory[]
        status: number
        pagination: Pagination
        detailCode: string
      }>,
    ) => {
      state.inventories = action.payload.data
      state.loading = false
      state.error = null
      state.errors = null
      state.message = action.payload.message
      state.status = action.payload.status
      state.detailCode = action.payload.detailCode
      state.pagination = action.payload.pagination
    },
    fetchInventoriesFailure: (
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
    fetchSimplifiedInventoriesStart: (state) => {
      state.loading = true
      state.error = null
      state.errors = null
      state.message = null
      state.status = null
      state.detailCode = null
    },
    fetchSimplifiedInventoriesSuccess: (
      state,
      action: PayloadAction<{
        message: string
        data: SimplifiedInventory[]
        status: number
        detailCode: string
      }>,
    ) => {
      state.simplifiedInventories = action.payload.data
      state.loading = false
      state.error = null
      state.errors = null
      state.message = action.payload.message
      state.status = action.payload.status
      state.detailCode = action.payload.detailCode
    },
    fetchSimplifiedInventoriesFailure: (
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
    fetchInventorySuccess: (
      state,
      action: PayloadAction<{
        message: string
        data: Inventory
        status: number
        detailCode: string
      }>,
    ) => {
      state.inventory = action.payload.data
      state.loading = false
      state.error = null
      state.errors = null
      state.message = action.payload.message
      state.status = action.payload.status
      state.detailCode = action.payload.detailCode
    },
    fetchInventoryFailure: (
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
    createInventoryStart: (state) => {
      state.loading = true
      state.error = null
      state.errors = null
      state.message = null
      state.status = null
      state.detailCode = null
    },
    createInventorySuccess: (
      state,
      action: PayloadAction<{
        message: string
        data: Inventory
        status: number
        detailCode: string
      }>,
    ) => {
      state.inventory = action.payload.data
      state.loading = false
      state.error = null
      state.errors = null
      state.message = action.payload.message
      state.status = action.payload.status
      state.detailCode = action.payload.detailCode
    },
    createInventoryFailure: (
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
    updateInventoryStart: (state) => {
      state.loading = true
      state.error = null
      state.errors = null
      state.message = null
      state.status = null
      state.detailCode = null
    },
    updateInventorySuccess: (
      state,
      action: PayloadAction<{
        message: string
        data: Inventory
        status: number
        detailCode: string
      }>,
    ) => {
      state.inventory = action.payload.data
      state.loading = false
      state.error = null
      state.errors = null
      state.message = action.payload.message
      state.status = action.payload.status
      state.detailCode = action.payload.detailCode
    },
    updateInventoryFailure: (
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
    deleteInventoryStart: (state) => {
      state.loading = true
      state.error = null
      state.errors = null
      state.message = null
      state.status = null
      state.detailCode = null
    },
    deleteInventorySuccess: (
      state,
      action: PayloadAction<{
        message: string
        status: number
        detailCode: string
    }>,
    ) => {
      state.inventory = null
      state.loading = false
      state.error = null
      state.errors = null
      state.message = action.payload.message
      state.status = action.payload.status
      state.detailCode = action.payload.detailCode
    },
    deleteInventoryFailure: (
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
  fetchInventoriesStart,
  fetchInventoriesSuccess,
  fetchInventoriesFailure,
  fetchSimplifiedInventoriesStart,
  fetchSimplifiedInventoriesSuccess,
  fetchSimplifiedInventoriesFailure,
  fetchInventorySuccess,
  fetchInventoryFailure,
  createInventoryStart,
  createInventorySuccess,
  createInventoryFailure,
  updateInventoryStart,
  updateInventorySuccess,
  updateInventoryFailure,
  deleteInventoryStart,
  deleteInventorySuccess,
  deleteInventoryFailure,
} = inventorySlice.actions

export default inventorySlice.reducer
