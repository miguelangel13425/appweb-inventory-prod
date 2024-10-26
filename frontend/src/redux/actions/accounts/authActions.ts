import axios from 'axios'
import { AppDispatch } from '../../store'
import {
  loginSuccess,
  loginFail,
  authenticatedSuccess,
  authenticatedFail,
  userLoadedSuccess,
  userLoadedFail,
  refreshSuccess,
  refreshFail,
  logout,
  changePasswordSuccess,
  changePasswordFail,
  signupSuccess,
  signupFail,
  activateAccountSuccess,
  activateAccountFail,
  resetPasswordSuccess,
  resetPasswordFail,
  setPasswordSuccess,
  setPasswordFail,
} from '../../slices/accounts/authSlice'
import { AUTH_URL } from '@/constants/urls'

axios.defaults.withCredentials = true

export const getUser = () => async (dispatch: AppDispatch) => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
    }

    try {
      const res = await axios.get(`${AUTH_URL}/users/me/`, config)
      dispatch(userLoadedSuccess(res.data))
    } catch (err) {
      dispatch(userLoadedFail())
    }
  } else {
    dispatch(userLoadedFail())
  }
}

export const googleAuthenticate =
  (state: string, code: string) => async (dispatch: AppDispatch) => {
    if (state && code && !localStorage.getItem('access')) {
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }

      const details: { [key: string]: string } = {
        state: state,
        code: code,
      }

      const formBody = Object.keys(details)
        .map(
          (key) =>
            encodeURIComponent(key) + '=' + encodeURIComponent(details[key]),
        )
        .join('&')

      try {
        const res = await axios.post(
          `${AUTH_URL}/o/google-oauth2/?${formBody}`,
          config,
        )

        dispatch(loginSuccess(res.data))
        dispatch(getUser())
      } catch (err) {
        dispatch(loginFail(err))
      }
    }
  }

export const checkAuthenticated = () => async (dispatch: AppDispatch) => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const body = JSON.stringify({ token: localStorage.getItem('access') })

    try {
      const res = await axios.post(`${AUTH_URL}/jwt/verify/`, body, config)

      if (res.data.code !== 'token_not_valid') {
        dispatch(authenticatedSuccess())
      } else {
        dispatch(authenticatedFail())
        dispatch(refreshToken())
      }
    } catch (err) {
      dispatch(authenticatedFail())
    }
  } else {
    dispatch(authenticatedFail())
  }
}

export const login =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const body = JSON.stringify({ email, password })

    try {
      const res = await axios.post(`${AUTH_URL}/jwt/create/`, body, config)
      dispatch(loginSuccess(res.data))
      dispatch(getUser())
    } catch (err: any) {
      dispatch(loginFail(err.response.data))
    }
  }

export const signup =
  (
    email: string,
    first_name: string,
    last_name: string,
    password: string,
    re_password: string,
  ) =>
  async (dispatch: AppDispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const body = JSON.stringify({
      email,
      first_name,
      last_name,
      password,
      re_password,
    })

    try {
      await axios.post(`${AUTH_URL}/users/`, body, config)
      dispatch(signupSuccess())
    } catch (err) {
      dispatch(signupFail())
    }
  }

export const verify =
  (uid: string, token: string) => async (dispatch: AppDispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const body = JSON.stringify({ uid, token })

    try {
      await axios.post(`${AUTH_URL}/users/activation/`, body, config)
      dispatch(activateAccountSuccess())
    } catch (err) {
      dispatch(activateAccountFail())
    }
  }

export const resetPassword =
  (email: string) => async (dispatch: AppDispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const body = JSON.stringify({ email })

    try {
      await axios.post(`${AUTH_URL}/users/reset_password/`, body, config)
      dispatch(resetPasswordSuccess())
    } catch (err) {
      dispatch(resetPasswordFail())
    }
  }

export const resetPasswordConfirm =
  (uid: string, token: string, new_password: string, re_new_password: string) =>
  async (dispatch: AppDispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const body = JSON.stringify({ uid, token, new_password, re_new_password })

    try {
      await axios.post(
        `${AUTH_URL}/users/reset_password_confirm/`,
        body,
        config,
      )
      dispatch(setPasswordSuccess())
    } catch (err) {
      dispatch(setPasswordFail())
    }
  }

export const refreshToken = () => async (dispatch: AppDispatch) => {
  if (localStorage.getItem('refresh')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const body = JSON.stringify({ refresh: localStorage.getItem('refresh') })

    try {
      const res = await axios.post(`${AUTH_URL}/jwt/refresh/`, body, config)
      dispatch(refreshSuccess(res.data))
    } catch (err) {
      dispatch(refreshFail())
    }
  } else {
    dispatch(refreshFail())
  }
}

export const logoutUser = () => (dispatch: AppDispatch) => {
  localStorage.removeItem('access')
  localStorage.removeItem('refresh')
  dispatch(logout())
}

export const changePassword =
  (current_password: string, new_password: string) =>
  async (dispatch: AppDispatch) => {
    await dispatch(checkAuthenticated())

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.getItem('access')}`,
      },
    }
    const body = JSON.stringify({ current_password, new_password })

    try {
      await axios.post(`${AUTH_URL}/users/set_password/`, body, config)
      dispatch(changePasswordSuccess())
    } catch (err) {
      dispatch(changePasswordFail())
    }
  }
