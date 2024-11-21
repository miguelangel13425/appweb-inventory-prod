import axios, { getConfig } from '../axiosConfig'
import { Inventory } from '../../models/inventory'
import { AppDispatch } from '../../store'
import {
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
} from '../../slices/inventory/inventorySlice'

import { INVENTORY_URL } from '@/constants/urls'

type InventoryForm = Omit<
  Inventory,
  | 'id'
  | 'is_active'
  | 'created_at'
  | 'updated_at'
  | 'deleted_at'
  | 'quantity'
  | 'availability_display'
  | 'location'
  | 'product'
> & {
  location: string
  product: string
}

export const fetchInventories =
  (page: number, searchTerm: string = '') =>
  async (dispatch: AppDispatch) => {
    dispatch(fetchInventoriesStart())
    try {
      const response = await axios.get(`${INVENTORY_URL}/inventories/`, {
        params: {
          page,
          search: searchTerm,
        },
        ...getConfig(),
      })
      dispatch(
        fetchInventoriesSuccess({
          message: response.data.message,
          data: response.data.inventories,
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
        fetchInventoriesFailure({
          error: error.response?.data.message || error.message,
          status: error.response?.status || 500,
          detailCode:
            error.response?.data.detail_code || 'FETCH_INVENTORIES_ERROR',
        }),
      )
    }
  }

export const fetchSimplifiedInventories =
  (searchTerm: string = '', initialInventoryId: string | null = null) =>
  async (dispatch: AppDispatch) => {
    dispatch(fetchSimplifiedInventoriesStart())
    try {
      const response = await axios.get(
        `${INVENTORY_URL}/inventories/options/`,
        {
          params: { search: searchTerm, id: initialInventoryId },
          ...getConfig(),
        },
      )
      dispatch(
        fetchSimplifiedInventoriesSuccess({
          message: response.data.message,
          data: response.data.inventories,
          status: response.status,
          detailCode: response.data.detail_code,
        }),
      )
    } catch (error: any) {
      dispatch(
        fetchSimplifiedInventoriesFailure({
          error: error.response?.data.message || error.message,
          status: error.response?.status || 500,
          detailCode:
            error.response?.data.detail_code ||
            'FETCH_SIMPLIFIED_INVENTORIES_ERROR',
        }),
      )
    }
  }

export const fetchInventory = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(
      `${INVENTORY_URL}/inventories/${id}/`,
      getConfig(),
    )
    dispatch(
      fetchInventorySuccess({
        message: response.data.message,
        data: response.data.inventory,
        status: response.status,
        detailCode: response.data.detail_code,
      }),
    )
  } catch (error: any) {
    dispatch(
      fetchInventoryFailure({
        error: error.response?.data.message || error.message,
        status: error.response?.status || 500,
        detailCode: error.response?.data.detail_code || 'FETCH_INVENTORY_ERROR',
      }),
    )
  }
}

export const createInventory =
  (newInventory: InventoryForm) => async (dispatch: AppDispatch) => {
    dispatch(createInventoryStart())
    try {
      const response = await axios.post(
        `${INVENTORY_URL}/inventories/`,
        newInventory,
        getConfig(),
      )
      dispatch(
        createInventorySuccess({
          message: response.data.message,
          data: response.data.inventory,
          status: response.status,
          detailCode: response.data.detail_code,
        }),
      )
    } catch (error: any) {
      dispatch(
        createInventoryFailure({
          error: error.response?.data.message || error.message,
          errors: error.response?.data.errors || {},
          status: error.response?.status || 500,
          detailCode:
            error.response?.data.detail_code || 'CREATE_INVENTORY_ERROR',
        }),
      )
    }
  }

export const updateInventory =
  (id: string, updatedInventory: InventoryForm) =>
  async (dispatch: AppDispatch) => {
    dispatch(updateInventoryStart())
    try {
      const response = await axios.put(
        `${INVENTORY_URL}/inventories/${id}/`,
        updatedInventory,
        getConfig(),
      )
      dispatch(
        updateInventorySuccess({
          message: response.data.message,
          data: response.data.inventory,
          status: response.status,
          detailCode: response.data.detail_code,
        }),
      )
      dispatch(fetchInventory(id))
    } catch (error: any) {
      dispatch(
        updateInventoryFailure({
          error: error.response?.data.message || error.message,
          errors: error.response?.data.errors || {},
          status: error.response?.status || 500,
          detailCode:
            error.response?.data.detail_code || 'UPDATE_INVENTORY_ERROR',
        }),
      )
    }
  }

export const deleteInventory =
  (id: string) => async (dispatch: AppDispatch) => {
    dispatch(deleteInventoryStart())
    try {
      const response = await axios.delete(
        `${INVENTORY_URL}/inventories/${id}/`,
        getConfig(),
      )
      dispatch(
        deleteInventorySuccess({
          message: response.data.message,
          status: response.status,
          detailCode: response.data.detail_code,
        }),
      )
    } catch (error: any) {
      dispatch(
        deleteInventoryFailure({
          error: error.response?.data.message || error.message,
          status: error.response?.status || 500,
          detailCode:
            error.response?.data.detail_code || 'DELETE_INVENTORY_ERROR',
        }),
      )
    }
  }
