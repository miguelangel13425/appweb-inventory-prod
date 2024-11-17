import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Provider } from '../../models/accounts'
import { Pagination } from '../../models/pagination'

interface SimplifiedProvider {
  id: string
  first_name: string
  last_name: string
}

interface ProviderState {
  providers: Provider[]
  simplifiedProviders: SimplifiedProvider[]
  provider: Provider | null
  loading: boolean
  error: string | null
  errors: Record<string, string[]> | null
  message: string | null
  status: number | null
  detailCode: string | null
  pagination: Pagination | null
}

const initialState: ProviderState = {
  providers: [],
  simplifiedProviders: [],
  provider: null,
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

const providerSlice = createSlice({
  name: 'provider',
  initialState,
  reducers: {
    fetchProvidersStart: (state) => {
      state.loading = true
      state.error = null
      state.errors = null
      state.message = null
      state.status = null
      state.detailCode = null
    },
    fetchProvidersSuccess: (
      state,
      action: PayloadAction<{
        message: string
        data: Provider[]
        status: number
        pagination: Pagination
        detailCode: string
      }>,
    ) => {
      state.providers = action.payload.data
      state.loading = false
      state.error = null
      state.errors = null
      state.message = action.payload.message
      state.status = action.payload.status
      state.detailCode = action.payload.detailCode
      state.pagination = action.payload.pagination
    },
    fetchProvidersFailure: (
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
    fetchProviderSuccess: (
      state,
      action: PayloadAction<{
        message: string
        data: Provider
        status: number
        detailCode: string
      }>,
    ) => {
      state.provider = action.payload.data
      state.loading = false
      state.error = null
      state.errors = null
      state.message = action.payload.message
      state.status = action.payload.status
      state.detailCode = action.payload.detailCode
    },
    fetchProviderFailure: (
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
    createProviderStart: (state) => {
      state.loading = true
      state.error = null
      state.errors = null
      state.message = null
      state.status = null
      state.detailCode = null
    },
    createProviderSuccess: (
      state,
      action: PayloadAction<{
        message: string
        data: Provider
        status: number
        detailCode: string
      }>,
    ) => {
      state.provider = action.payload.data
      state.loading = false
      state.error = null
      state.errors = null
      state.message = action.payload.message
      state.status = action.payload.status
      state.detailCode = action.payload.detailCode
    },
    createProviderFailure: (
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
    updateProviderStart: (state) => {
      state.loading = true
      state.error = null
      state.errors = null
      state.message = null
      state.status = null
      state.detailCode = null
    },
    updateProviderSuccess: (
      state,
      action: PayloadAction<{
        message: string
        data: Provider
        status: number
        detailCode: string
      }>,
    ) => {
      state.provider = action.payload.data
      state.loading = false
      state.error = null
      state.errors = null
      state.message = action.payload.message
      state.status = action.payload.status
      state.detailCode = action.payload.detailCode
    },
    updateProviderFailure: (
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
    deleteProviderStart: (state) => {
      state.loading = true
      state.error = null
      state.errors = null
      state.message = null
      state.status = null
      state.detailCode = null
    },
    deleteProviderSuccess: (
      state,
      action: PayloadAction<{
        message: string
        status: number
        detailCode: string
      }>,
    ) => {
      state.provider = null
      state.loading = false
      state.error = null
      state.errors = null
      state.message = action.payload.message
      state.status = action.payload.status
      state.detailCode = action.payload.detailCode
    },
    deleteProviderFailure: (
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
    fetchSimplifiedProvidersStart: (state) => {
      state.loading = true
      state.error = null
      state.errors = null
      state.message = null
      state.status = null
      state.detailCode = null
    },
    fetchSimplifiedProvidersSuccess: (
      state,
      action: PayloadAction<{
        message: string
        data: SimplifiedProvider[]
        status: number
        detailCode: string
      }>,
    ) => {
      state.simplifiedProviders = action.payload.data
      state.loading = false
      state.error = null
      state.errors = null
      state.message = action.payload.message
      state.status = action.payload.status
      state.detailCode = action.payload.detailCode
    },
    fetchSimplifiedProvidersFailure: (
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
  fetchProvidersStart,
  fetchProvidersSuccess,
  fetchProvidersFailure,
  fetchProviderSuccess,
  fetchProviderFailure,
  createProviderStart,
  createProviderSuccess,
  createProviderFailure,
  updateProviderStart,
  updateProviderSuccess,
  updateProviderFailure,
  deleteProviderStart,
  deleteProviderSuccess,
  deleteProviderFailure,
  fetchSimplifiedProvidersStart,
  fetchSimplifiedProvidersSuccess,
  fetchSimplifiedProvidersFailure,
} = providerSlice.actions

export default providerSlice.reducer
