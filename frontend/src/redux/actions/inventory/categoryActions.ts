import axios, { getConfig } from '../axiosConfig'
import { Category } from '../../models/inventory'
import { AppDispatch } from '../../store'
import {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
  fetchCategorySuccess,
  fetchCategoryFailure,
  createCategoryStart,
  createCategorySuccess,
  createCategoryFailure,
  updateCategoryStart,
  updateCategorySuccess,
  updateCategoryFailure,
  deleteCategoryStart,
  deleteCategorySuccess,
  deleteCategoryFailure,
  fetchSimplifiedCategoriesStart,
  fetchSimplifiedCategoriesSuccess,
  fetchSimplifiedCategoriesFailure,
} from '../../slices/inventory/categorySlice'

import { INVENTORY_URL } from '@/constants/urls'

export const fetchCategories =
  (page: number, searchTerm: string = '') =>
  async (dispatch: AppDispatch) => {
    dispatch(fetchCategoriesStart())
    try {
      const response = await axios.get(`${INVENTORY_URL}/categories/`, {
        params: {
          page,
          search: searchTerm,
        },
        ...getConfig(),
      })
      dispatch(
        fetchCategoriesSuccess({
          message: response.data.message,
          data: response.data.categories,
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
        fetchCategoriesFailure({
          error: error.response?.data.message || error.message,
          status: error.response?.status || 500,
          detailCode:
            error.response?.data.detail_code || 'FETCH_CATEGORIES_ERROR',
        }),
      )
    }
  }

export const fetchCategory = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(
      `${INVENTORY_URL}/categories/${id}/`,
      getConfig(),
    )
    dispatch(
      fetchCategorySuccess({
        message: response.data.message,
        data: response.data.category,
        status: response.status,
        detailCode: response.data.detail_code,
      }),
    )
  } catch (error: any) {
    dispatch(
      fetchCategoryFailure({
        error: error.response?.data.message || error.message,
        status: error.response?.status || 500,
        detailCode: error.response?.data.detail_code || 'FETCH_CATEGORY_ERROR',
      }),
    )
  }
}

export const createCategory =
  (newCategory: Category) => async (dispatch: AppDispatch) => {
    dispatch(createCategoryStart())
    try {
      const response = await axios.post(
        `${INVENTORY_URL}/categories/`,
        newCategory,
        getConfig(),
      )
      dispatch(
        createCategorySuccess({
          message: response.data.message,
          data: response.data.category,
          status: response.status,
          detailCode: response.data.detail_code,
        }),
      )
    } catch (error: any) {
      dispatch(
        createCategoryFailure({
          error: error.response?.data.message || error.message,
          errors: error.response?.data.errors || {},
          status: error.response?.status || 500,
          detailCode:
            error.response?.data.detail_code || 'CREATE_CATEGORY_ERROR',
        }),
      )
    }
  }

export const updateCategory =
  (id: string, updatedCategory: Category) => async (dispatch: AppDispatch) => {
    dispatch(updateCategoryStart())
    try {
      const response = await axios.put(
        `${INVENTORY_URL}/categories/${id}/`,
        updatedCategory,
        getConfig(),
      )
      dispatch(
        updateCategorySuccess({
          message: response.data.message,
          data: response.data.category,
          status: response.status,
          detailCode: response.data.detail_code,
        }),
      )
      dispatch(fetchCategory(id))
    } catch (error: any) {
      dispatch(
        updateCategoryFailure({
          error: error.response?.data.message || error.message,
          errors: error.response?.data.errors || {},
          status: error.response?.status || 500,
          detailCode:
            error.response?.data.detail_code || 'UPDATE_CATEGORY_ERROR',
        }),
      )
    }
  }

export const deleteCategory = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(deleteCategoryStart())
  try {
    const response = await axios.delete(
      `${INVENTORY_URL}/categories/${id}/`,
      getConfig(),
    )
    dispatch(
      deleteCategorySuccess({
        message: response.data.message,
        status: response.status,
        detailCode: response.data.detail_code,
      }),
    )
  } catch (error: any) {
    dispatch(
      deleteCategoryFailure({
        error: error.response?.data.message || error.message,
        status: error.response?.status || 500,
        detailCode: error.response?.data.detail_code || 'DELETE_CATEGORY_ERROR',
      }),
    )
  }
}

export const fetchSimplifiedCategories =
  (searchTerm: string = '') =>
  async (dispatch: AppDispatch) => {
    dispatch(fetchSimplifiedCategoriesStart())
    try {
      const response = await axios.get(`${INVENTORY_URL}/categories/options/`, {
        params: { search: searchTerm },
        ...getConfig(),
      })
      dispatch(
        fetchSimplifiedCategoriesSuccess({
          message: response.data.message,
          data: response.data.categories,
          status: response.status,
          detailCode: response.data.detail_code,
        }),
      )
    } catch (error: any) {
      dispatch(
        fetchSimplifiedCategoriesFailure({
          error: error.response?.data.message || error.message,
          status: error.response?.status || 500,
          detailCode:
            error.response?.data.detail_code ||
            'FETCH_SIMPLIFIED_CATEGORIES_ERROR',
        }),
      )
    }
  }
