import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../models/accounts';

interface AuthState {
  access: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
  message: string;
  error: any;
}

//const accessToken = typeof window !== 'undefined' ? localStorage.getItem('access') : null;
const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI3MzI3MTc1LCJpYXQiOjE3MjcyNDA3NzUsImp0aSI6IjQ1NGZhNWE0MGM4YzRkMDZiMWNlY2QxNzM0OTEyOTg1IiwidXNlcl9pZCI6IjdhMjE0ZjI4LTAxMTQtNGM1Yy05YzkyLTAxY2YwZWI5OGExZiJ9.atzJvf-j_FO9-79buvFi6DGOD308SpM1DZqnNaf7K5Q"

const initialState: AuthState = {
  access: accessToken,
  isAuthenticated: false,
  loading: true,
  user: null,
  message: "",
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<any>) => {
      localStorage.setItem('access', action.payload.access);
      state.access = action.payload.access;
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload.user;
      state.message = "Login has succeeded";
      state.error = null;
    },
    loginFail: (state, action: PayloadAction<any>) => {
      localStorage.removeItem('access');
      state.access = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
      state.message = "Login has failed";
      state.error = action.payload;
    },
    authenticatedSuccess: (state) => {
      state.isAuthenticated = true;
      state.loading = false;
    },
    authenticatedFail: (state) => {
      state.isAuthenticated = false;
      state.loading = false;
    },
    userLoadedSuccess: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.loading = false;
    },
    userLoadedFail: (state) => {
      state.user = null;
      state.loading = false;
    },
    refreshSuccess: (state, action: PayloadAction<any>) => {
      localStorage.setItem('access', action.payload.access);
      state.access = action.payload.access;
      state.isAuthenticated = true;
      state.loading = false;
      state.message = "Refresh token success";
    },
    refreshFail: (state) => {
      localStorage.removeItem('access');
      state.access = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
      state.message = "Refresh token failed";
    },
    logout: (state) => {
      localStorage.removeItem('access');
      state.access = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
      state.message = "User has logged out";
    },
    guestView: (state) => {
      state.user = null;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    changePasswordSuccess: (state) => {
      state.message = "Change password success";
    },
    changePasswordFail: (state) => {
      state.message = "Change password failed";
    },
    signupSuccess: (state) => {
      state.message = "Verification link has been sent to your email";
    },
    signupFail: (state) => {
      state.message = "Signup failed";
    },
    activateAccountSuccess: (state) => {
      state.message = "Your account has been verified";
    },
    activateAccountFail: (state) => {
      state.message = "Account verification failed";
    },
    resetPasswordSuccess: (state) => {
      state.message = "Password reset success";
    },
    resetPasswordFail: (state) => {
      state.message = "Password reset failed";
    },
    setPasswordSuccess: (state) => {
      state.message = "Your new password has been set";
    },
    setPasswordFail: (state) => {
      state.message = "Setting new password failed";
    },
  },
});

export const {
  loginSuccess,
  loginFail,
  authenticatedSuccess,
  authenticatedFail,
  userLoadedSuccess,
  userLoadedFail,
  refreshSuccess,
  refreshFail,
  logout,
  guestView,
  setLoading,
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
} = authSlice.actions;

export default authSlice.reducer;