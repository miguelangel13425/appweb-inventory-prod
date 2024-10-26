import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Warehouse } from '../../models/inventory'
import { Pagination } from '../../models/pagination'

interface SimplifiedWarehouse {
  id: string
  name: string
}

interface WarehouseState {
  warehouses: Warehouse[]
  simplifiedWarehouses: SimplifiedWarehouse[]
  warehouse: Warehouse | null
  loading: boolean
  error: string | null
  errors: Record<string, string[]> | null
  message: string | null
  status: number | null
  detailCode: string | null
  pagination: Pagination | null
}

const initialState: WarehouseState = {
  warehouses: [],
  simplifiedWarehouses: [],
  warehouse: null,
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

const warehouseSlice = createSlice({
  name: 'warehouse',
  initialState,
  reducers: {
    fetchWarehousesStart: (state) => {
      state.loading = true
      state.error = null
      state.errors = null
      state.message = null
      state.status = null
      state.detailCode = null
    },
    fetchWarehousesSuccess: (
      state,
      action: PayloadAction<{
        message: string
        data: Warehouse[]
        status: number
        pagination: Pagination
        detailCode: string
      }>,
    ) => {
      state.warehouses = action.payload.data
      state.loading = false
      state.error = null
      state.errors = null
      state.message = action.payload.message
      state.status = action.payload.status
      state.detailCode = action.payload.detailCode
      state.pagination = action.payload.pagination
    },
    fetchWarehousesFailure: (
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
    fetchSimplifiedWarehousesStart: (state) => {
      state.loading = true
      state.error = null
      state.errors = null
      state.message = null
      state.status = null
      state.detailCode = null
    },
    fetchSimplifiedWarehousesSuccess: (
      state,
      action: PayloadAction<{
        message: string
        data: SimplifiedWarehouse[]
        status: number
        detailCode: string
      }>,
    ) => {
      state.simplifiedWarehouses = action.payload.data
      state.loading = false
      state.error = null
      state.errors = null
      state.message = action.payload.message
      state.status = action.payload.status
      state.detailCode = action.payload.detailCode
    },
    fetchSimplifiedWarehousesFailure: (
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
    fetchWarehouseSuccess: (
      state,
      action: PayloadAction<{
        message: string
        data: Warehouse
        status: number
        detailCode: string
      }>,
    ) => {
      state.warehouse = action.payload.data
      state.loading = false
      state.error = null
      state.errors = null
      state.message = action.payload.message
      state.status = action.payload.status
      state.detailCode = action.payload.detailCode
    },
    fetchWarehouseFailure: (
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
    createWarehouseStart: (state) => {
      state.loading = true
      state.error = null
      state.errors = null
      state.message = null
      state.status = null
      state.detailCode = null
    },
    createWarehouseSuccess: (
      state,
      action: PayloadAction<{
        message: string
        data: Warehouse
        status: number
        detailCode: string
      }>,
    ) => {
      state.warehouse = action.payload.data
      state.loading = false
      state.error = null
      state.errors = null
      state.message = action.payload.message
      state.status = action.payload.status
      state.detailCode = action.payload.detailCode
    },
    createWarehouseFailure: (
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
    updateWarehouseStart: (state) => {
      state.loading = true
      state.error = null
      state.errors = null
      state.message = null
      state.status = null
      state.detailCode = null
    },
    updateWarehouseSuccess: (
      state,
      action: PayloadAction<{
        message: string
        data: Warehouse
        status: number
        detailCode: string
      }>,
    ) => {
      state.warehouse = action.payload.data
      state.loading = false
      state.error = null
      state.errors = null
      state.message = action.payload.message
      state.status = action.payload.status
      state.detailCode = action.payload.detailCode
    },
    updateWarehouseFailure: (
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
    deleteWarehouseStart: (state) => {
      state.loading = true
      state.error = null
      state.errors = null
      state.message = null
      state.status = null
      state.detailCode = null
    },
    deleteWarehouseSuccess: (
      state,
      action: PayloadAction<{
        message: string
        status: number
        detailCode: string
      }>,
    ) => {
      state.warehouse = null
      state.loading = false
      state.error = null
      state.errors = null
      state.message = action.payload.message
      state.status = action.payload.status
      state.detailCode = action.payload.detailCode
    },
    deleteWarehouseFailure: (
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
  fetchWarehousesStart,
  fetchWarehousesSuccess,
  fetchWarehousesFailure,
  fetchSimplifiedWarehousesStart,
  fetchSimplifiedWarehousesSuccess,
  fetchSimplifiedWarehousesFailure,
  fetchWarehouseSuccess,
  fetchWarehouseFailure,
  createWarehouseStart,
  createWarehouseSuccess,
  createWarehouseFailure,
  updateWarehouseStart,
  updateWarehouseSuccess,
  updateWarehouseFailure,
  deleteWarehouseStart,
  deleteWarehouseSuccess,
  deleteWarehouseFailure,
} = warehouseSlice.actions

export default warehouseSlice.reducer
