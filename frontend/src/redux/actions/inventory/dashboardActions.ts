import axios, { getConfig } from '../axiosConfig'
import { AppDispatch } from '../../store'
import {
  fetchDashboardStart,
  fetchDashboardSuccess,
  fetchDashboardFailure,
} from '../../slices/inventory/dashboardSlice'
import { INVENTORY_URL } from '@/constants/urls'

export const fetchDashboard = () => async (dispatch: AppDispatch) => {
  dispatch(fetchDashboardStart())
  try {
    const response = await axios.get(`${INVENTORY_URL}/dashboard/`, {
      ...getConfig(),
    })
    dispatch(
      fetchDashboardSuccess({
        message: response.data.message,
        data: response.data.dashboard,
        status: response.status,
        detailCode: response.data.detail_code,
      }),
    )
  } catch (error: any) {
    dispatch(
      fetchDashboardFailure({
        error: error.response?.data.message || error.message,
        status: error.response?.status || 500,
        detailCode:
          error.response?.data.detail_code || 'FETCH_CATEGORIES_ERROR',
      }),
    )
  }
}
