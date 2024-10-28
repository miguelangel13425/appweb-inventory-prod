import axios, { getConfig } from '../axiosConfig'
import { Product } from '../../models/inventory'
import { AppDispatch } from '../../store'
import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchSimplifiedProductsStart,
  fetchSimplifiedProductsSuccess,
  fetchSimplifiedProductsFailure,
  fetchProductSuccess,
  fetchProductFailure,
  createProductStart,
  createProductSuccess,
  createProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
} from '../../slices/inventory/productSlice'

import { INVENTORY_URL } from '@/constants/urls'

type ProductForm = Omit<
  Product,
  'id' | 'is_active' | 'created_at' | 'updated_at' | 'deleted_at'
>


export const fetchProducts =
  (page: number, searchTerm: string = '') =>
  async (dispatch: AppDispatch) => {
    dispatch(fetchProductsStart())
    try {
      const response = await axios.get(`${INVENTORY_URL}/products/`, {
        params: {
          page,
          search: searchTerm,
        },
        ...getConfig(),
      })
      dispatch(
        fetchProductsSuccess({
          message: response.data.message,
          data: response.data.products,
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
        fetchProductsFailure({
          error: error.response?.data.message || error.message,
          status: error.response?.status || 500,
          detailCode:
            error.response?.data.detail_code || 'FETCH_PRODUCTS_ERROR',
        }),
      )
    }
  }

export const fetchSimplifiedProducts =
  (searchTerm: string = '') =>
  async (dispatch: AppDispatch) => {
    dispatch(fetchSimplifiedProductsStart())
    try {
      const response = await axios.get(`${INVENTORY_URL}/products/options/`, {
        params: { search: searchTerm },
        ...getConfig(),
      })
      dispatch(
        fetchSimplifiedProductsSuccess({
          message: response.data.message,
          data: response.data.products,
          status: response.status,
          detailCode: response.data.detail_code,
        }),
      )
    } catch (error: any) {
      dispatch(
        fetchSimplifiedProductsFailure({
          error: error.response?.data.message || error.message,
          status: error.response?.status || 500,
          detailCode:
            error.response?.data.detail_code ||
            'FETCH_SIMPLIFIED_PRODUCTS_ERROR',
        }),
      )
    }
  }

export const fetchProduct = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(
      `${INVENTORY_URL}/products/${id}/`,
      getConfig(),
    )
    dispatch(
      fetchProductSuccess({
        message: response.data.message,
        data: response.data.product,
        status: response.status,
        detailCode: response.data.detail_code,
      }),
    )
  } catch (error: any) {
    dispatch(
      fetchProductFailure({
        error: error.response?.data.message || error.message,
        status: error.response?.status || 500,
        detailCode: error.response?.data.detail_code || 'FETCH_PRODUCT_ERROR',
      }),
    )
  }
}

export const createProduct =
  (newProduct: ProductForm) => async (dispatch: AppDispatch) => {
    dispatch(createProductStart())
    try {
      const response = await axios.post(
        `${INVENTORY_URL}/products/`,
        newProduct,
        getConfig(),
      )
      dispatch(
        createProductSuccess({
          message: response.data.message,
          data: response.data.product,
          status: response.status,
          detailCode: response.data.detail_code,
        }),
      )
    } catch (error: any) {
      dispatch(
        createProductFailure({
          error: error.response?.data.message || error.message,
          errors: error.response?.data.errors || {},
          status: error.response?.status || 500,
          detailCode:
            error.response?.data.detail_code || 'CREATE_PRODUCT_ERROR',
        }),
      )
    }
  }

export const updateProduct =
  (id: string, updatedProduct: ProductForm) => async (dispatch: AppDispatch) => {
    dispatch(updateProductStart())
    try {
      const response = await axios.put(
        `${INVENTORY_URL}/products/${id}/`,
        updatedProduct,
        getConfig(),
      )
      dispatch(
        updateProductSuccess({
          message: response.data.message,
          data: response.data.product,
          status: response.status,
          detailCode: response.data.detail_code,
        }),
      )
      dispatch(fetchProduct(id))
    } catch (error: any) {
      dispatch(
        updateProductFailure({
          error: error.response?.data.message || error.message,
          errors: error.response?.data.errors || {},
          status: error.response?.status || 500,
          detailCode:
            error.response?.data.detail_code || 'UPDATE_PRODUCT_ERROR',
        }),
      )
    }
  }

export const deleteProduct = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(deleteProductStart())
  try {
    const response = await axios.delete(
      `${INVENTORY_URL}/products/${id}/`,
      getConfig(),
    )
    dispatch(
      deleteProductSuccess({
        message: response.data.message,
        status: response.status,
        detailCode: response.data.detail_code,
      }),
    )
  } catch (error: any) {
    dispatch(
      deleteProductFailure({
        error: error.response?.data.message || error.message,
        status: error.response?.status || 500,
        detailCode: error.response?.data.detail_code || 'DELETE_PRODUCT_ERROR',
      }),
    )
  }
}
