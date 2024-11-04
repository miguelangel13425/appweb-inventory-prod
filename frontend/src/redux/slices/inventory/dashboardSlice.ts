import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Dashboard } from '../../models/inventory'

interface DashboardState {
  dashboard: Dashboard | null
  loading: boolean
  error: string | null
  message: string | null
  status: number | null
  detailCode: string | null
}

const initialState: DashboardState = {
  dashboard: null,
  loading: false,
  error: null,
  message: null,
  status: null,
  detailCode: null,
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    fetchDashboardStart: (state) => {
      state.loading = true
      state.error = null
      state.message = null
      state.status = null
      state.detailCode = null
    },
    fetchDashboardSuccess: (
      state,
      action: PayloadAction<{
        message: string
        data: Dashboard
        status: number
        detailCode: string
      }>,
    ) => {
      state.dashboard = action.payload.data
      state.loading = false
      state.error = null
      state.message = action.payload.message
      state.status = action.payload.status
      state.detailCode = action.payload.detailCode
    },
    fetchDashboardFailure: (
      state,
      action: PayloadAction<{
        error: string
        status: number
        detailCode: string
      }>,
    ) => {
      state.loading = false
      state.error = action.payload.error
      state.status = action.payload.status
      state.detailCode = action.payload.detailCode
    },
  },
})

export const {
  fetchDashboardStart,
  fetchDashboardSuccess,
  fetchDashboardFailure,
} = dashboardSlice.actions

export default dashboardSlice.reducer
