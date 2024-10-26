import axios, { getConfig } from '../axiosConfig'
import { InventoryTransaction } from '../../models/inventory'
import { AppDispatch } from '../../store'
import {
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
} from '../../slices/inventory/inventoryTransactionSlice'

import { INVENTORY_URL } from '@/constants/urls'

export const fetchTransactions =
  (page: number, searchTerm: string = '') =>
  async (dispatch: AppDispatch) => {
    dispatch(fetchTransactionsStart())
    try {
      const response = await axios.get(`${INVENTORY_URL}/transactions/`, {
        params: {
          page,
          search: searchTerm,
        },
        ...getConfig(),
      })
      dispatch(
        fetchTransactionsSuccess({
          message: response.data.message,
          data: response.data.inventory_transactions,
          status: response.status,
          pagination: {
            currentPage: response.data.meta.current_page,
            totalPages: response.data.meta.total_pages,
            totalItems: response.data.meta.total_items,
            pageSize: response.data.meta.page_size,
          },
        }),
      )
    } catch (error: any) {
      dispatch(
        fetchTransactionsFailure({
          error: error.response?.data.message || error.message,
          status: error.response?.status || 500,
        }),
      )
    }
  }

export const fetchTransaction =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(`${INVENTORY_URL}/transactions/${id}`)
      dispatch(
        fetchTransactionSuccess({
          message: response.data.message,
          data: response.data.inventory_transaction,
          status: response.status,
        }),
      )
    } catch (error: any) {
      dispatch(
        fetchTransactionFailure({
          error: error.response?.data.message || error.message,
          status: error.response?.status || 500,
        }),
      )
    }
  }

export const createTransaction =
  (newTransaction: InventoryTransaction) => async (dispatch: AppDispatch) => {
    dispatch(createTransactionStart())
    try {
      const response = await axios.post(
        `${INVENTORY_URL}/transactions`,
        newTransaction,
      )
      dispatch(
        createTransactionSuccess({
          message: response.data.message,
          data: response.data.inventory_transaction,
          status: response.status,
        }),
      )
    } catch (error: any) {
      dispatch(
        createTransactionFailure({
          error: error.response?.data.message || error.message,
          status: error.response?.status || 500,
        }),
      )
    }
  }

export const updateTransaction =
  (id: string, updatedTransaction: InventoryTransaction) =>
  async (dispatch: AppDispatch) => {
    dispatch(updateTransactionStart())
    try {
      const response = await axios.put(
        `${INVENTORY_URL}/transactions/${id}`,
        updatedTransaction,
      )
      dispatch(
        updateTransactionSuccess({
          message: response.data.message,
          data: response.data.inventory_transaction,
          status: response.status,
        }),
      )
      dispatch(fetchTransaction(id))
    } catch (error: any) {
      dispatch(
        updateTransactionFailure({
          error: error.response?.data.message || error.message,
          status: error.response?.status || 500,
        }),
      )
    }
  }

export const deleteTransaction =
  (id: string) => async (dispatch: AppDispatch) => {
    dispatch(deleteTransactionStart())
    try {
      const response = await axios.delete(`${INVENTORY_URL}/transactions/${id}`)
      dispatch(
        deleteTransactionSuccess({
          message: response.data.message,
          status: response.status,
        }),
      )
    } catch (error: any) {
      dispatch(
        deleteTransactionFailure({
          error: error.response?.data.message || error.message,
          status: error.response?.status || 500,
        }),
      )
    }
  }
