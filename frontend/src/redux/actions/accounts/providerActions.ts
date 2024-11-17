import axios, { getConfig } from '../axiosConfig'
import { Provider } from '../../models/accounts'
import { AppDispatch } from '../../store'
import {
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
} from '../../slices/accounts/providerSlice'

import { ACCOUNTS_URL } from '@/constants/urls'

type ProviderForm = Omit<
  Provider,
  'id' | 'is_active' | 'created_at' | 'updated_at' | 'deleted_at'
>  

export const fetchProviders =
  (page: number, searchTerm: string = '') =>
  async (dispatch: AppDispatch) => {
    dispatch(fetchProvidersStart())
    try {
      const response = await axios.get(`${ACCOUNTS_URL}/providers/`, {
        params: {
          page,
          search: searchTerm,
        },
        ...getConfig(),
      })
      dispatch(
        fetchProvidersSuccess({
          message: response.data.message,
          data: response.data.providers,
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
        fetchProvidersFailure({
          error: error.response?.data.message || error.message,
          status: error.response?.status || 500,
          detailCode:
            error.response?.data.detail_code || 'FETCH_PROVIDERS_ERROR',
        }),
      )
    }
  }

export const fetchProvider = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(
      `${ACCOUNTS_URL}/providers/${id}/`,
      getConfig(),
    )
    dispatch(
      fetchProviderSuccess({
        message: response.data.message,
        data: response.data.provider,
        status: response.status,
        detailCode: response.data.detail_code,
      }),
    )
  } catch (error: any) {
    dispatch(
      fetchProviderFailure({
        error: error.response?.data.message || error.message,
        status: error.response?.status || 500,
        detailCode: error.response?.data.detail_code || 'FETCH_PROVIDER_ERROR',
      }),
    )
  }
}

export const createProvider =
  (newProvider: ProviderForm) => async (dispatch: AppDispatch) => {
    dispatch(createProviderStart())
    try {
      const response = await axios.post(
        `${ACCOUNTS_URL}/providers/`,
        newProvider,
        getConfig(),
      )
      dispatch(
        createProviderSuccess({
          message: response.data.message,
          data: response.data.provider,
          status: response.status,
          detailCode: response.data.detail_code,
        }),
      )
    } catch (error: any) {
      dispatch(
        createProviderFailure({
          error: error.response?.data.message || error.message,
          errors: error.response?.data.errors || {},
          status: error.response?.status || 500,
          detailCode:
            error.response?.data.detail_code || 'CREATE_PROVIDER_ERROR',
        }),
      )
    }
  }

export const updateProvider =
  (id: string, updatedProvider: ProviderForm) => async (dispatch: AppDispatch) => {
    dispatch(updateProviderStart())
    try {
      const response = await axios.put(
        `${ACCOUNTS_URL}/providers/${id}/`,
        updatedProvider,
        getConfig(),
      )
      dispatch(
        updateProviderSuccess({
          message: response.data.message,
          data: response.data.provider,
          status: response.status,
          detailCode: response.data.detail_code,
        }),
      )
      dispatch(fetchProvider(id))
    } catch (error: any) {
      dispatch(
        updateProviderFailure({
          error: error.response?.data.message || error.message,
          errors: error.response?.data.errors || {},
          status: error.response?.status || 500,
          detailCode:
            error.response?.data.detail_code || 'UPDATE_PROVIDER_ERROR',
        }),
      )
    }
  }

export const deleteProvider = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(deleteProviderStart())
  try {
    const response = await axios.delete(
      `${ACCOUNTS_URL}/providers/${id}/`,
      getConfig(),
    )
    dispatch(
      deleteProviderSuccess({
        message: response.data.message,
        status: response.status,
        detailCode: response.data.detail_code,
      }),
    )
  } catch (error: any) {
    dispatch(
      deleteProviderFailure({
        error: error.response?.data.message || error.message,
        status: error.response?.status || 500,
        detailCode: error.response?.data.detail_code || 'DELETE_PROVIDER_ERROR',
      }),
    )
  }
}

export const fetchSimplifiedProviders = (
  searchTerm: string = '',
  initialProviderId: string | null = null
) => async (dispatch: AppDispatch) => {
  dispatch(fetchSimplifiedProvidersStart())
  try {
    const response = await axios.get(`${ACCOUNTS_URL}/providers/options/`, {
      params: { search: searchTerm, id: initialProviderId },
      ...getConfig(),
    })
    dispatch(
      fetchSimplifiedProvidersSuccess({
        message: response.data.message,
        data: response.data.providers,
        status: response.status,
        detailCode: response.data.detail_code,
      }),
    )
  } catch (error: any) {
    dispatch(
      fetchSimplifiedProvidersFailure({
        error: error.response?.data.message || error.message,
        status: error.response?.status || 500,
        detailCode:
          error.response?.data.detail_code || 'FETCH_SIMPLIFIED_PROVIDERS_ERROR',
      }),
    )
  }
}