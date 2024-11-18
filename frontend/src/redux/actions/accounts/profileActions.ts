import axios from 'axios'
import { Profile } from '../../models/accounts'
import { AppDispatch } from '../../store'
import {
  fetchProfilesStart,
  fetchProfilesSuccess,
  fetchProfilesFailure,
  fetchProfileSuccess,
  fetchProfileFailure,
  createProfileStart,
  createProfileSuccess,
  createProfileFailure,
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,
  deleteProfileStart,
  deleteProfileSuccess,
  deleteProfileFailure,
} from '../../slices/accounts/profileSlice'

import { ACCOUNTS_URL } from '@/constants/urls'

export const fetchProfiles =
  (page: number) => async (dispatch: AppDispatch) => {
    dispatch(fetchProfilesStart())
    try {
      const response = await axios.get(`${ACCOUNTS_URL}/profiles?page=${page}`)
      dispatch(
        fetchProfilesSuccess({
          message: response.data.message,
          data: response.data.profiles,
          status: response.status,
          pagination: response.data.meta,
        }),
      )
    } catch (error: any) {
      dispatch(
        fetchProfilesFailure({
          error: error.response?.data.message || error.message,
          status: error.response?.status || 500,
        }),
      )
    }
  }

export const fetchProfile = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${ACCOUNTS_URL}/profiles/${id}/`)
    dispatch(
      fetchProfileSuccess({
        message: response.data.message,
        data: response.data.profile,
        status: response.status,
      }),
    )
  } catch (error: any) {
    dispatch(
      fetchProfileFailure({
        error: error.response?.data.message || error.message,
        status: error.response?.status || 500,
      }),
    )
  }
}

export const createProfile =
  (newProfile: Profile) => async (dispatch: AppDispatch) => {
    dispatch(createProfileStart())
    try {
      const response = await axios.post(`${ACCOUNTS_URL}/profiles`, newProfile)
      dispatch(
        createProfileSuccess({
          message: response.data.message,
          data: response.data.profile,
          status: response.status,
        }),
      )
    } catch (error: any) {
      dispatch(
        createProfileFailure({
          error: error.response?.data.message || error.message,
          status: error.response?.status || 500,
        }),
      )
    }
  }

export const updateProfile =
  (id: string, updatedProfile: Profile) => async (dispatch: AppDispatch) => {
    dispatch(updateProfileStart())
    try {
      const response = await axios.put(
        `${ACCOUNTS_URL}/profiles/${id}/`,
        updatedProfile,
      )
      dispatch(
        updateProfileSuccess({
          message: response.data.message,
          data: response.data.profile,
          status: response.status,
        }),
      )
    } catch (error: any) {
      dispatch(
        updateProfileFailure({
          error: error.response?.data.message || error.message,
          status: error.response?.status || 500,
        }),
      )
    }
  }

export const deleteProfile = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(deleteProfileStart())
  try {
    const response = await axios.delete(`${ACCOUNTS_URL}/profiles/${id}/`)
    dispatch(
      deleteProfileSuccess({
        message: response.data.message,
        status: response.status,
      }),
    )
  } catch (error: any) {
    dispatch(
      deleteProfileFailure({
        error: error.response?.data.message || error.message,
        status: error.response?.status || 500,
      }),
    )
  }
}
