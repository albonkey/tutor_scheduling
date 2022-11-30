import { createSlice } from '@reduxjs/toolkit'
import {API, Auth} from 'aws-amplify';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loggedIn: false
  },
  reducers: {
    signInRequest: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.loggedIn = true;
    },
    signInFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signOutRequest: (state) => {
      state.loading = true;
    },
    signOutSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.loggedIn = false;
    },
    signOutFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createAccountRequest: (state) => {
      state.loading = true;
    },
    createAccountSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
    },
    createAccountFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const {
  signInRequest,
  signInSuccess,
  signInFail,
  signOutRequest,
  signOutSuccess,
  signOutFail,
  createAccountRequest,
  createAccountSuccess,
  createAccountFail } = authSlice.actions;

export const login = (user) => async (dispatch) => {
  try{
    dispatch(availabilityInfoRequest());
    const {data} = await API.get('tutorhubAPI', `/users/${user}/availability`);
    dispatch(availabilityInfoSuccess(data));
    return data;
  } catch(error){
    dispatch(availabilityInfoFail(error.message));
  }
}

export default availabilityInfoSlice.reducer
