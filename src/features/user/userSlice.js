import { createSlice } from '@reduxjs/toolkit';
import {API} from 'aws-amplify';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    userInfo: null
  },
  reducers: {
    updateUserId: (state, action) => {
      state.id = action.payload
    },
    userInfoRequest: (state) => {
      state.loading = true;
    },
    userInfoSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.userInfo = action.payload;
    },
    userInfoFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    userSignOut: (state) => {
      state.id = null;
      state.userInfo = null;
    }
  },
})

// Action creators are generated for each case reducer function
export const {
  updateUserId,
  userInfoRequest,
  userInfoSuccess,
  userInfoFail,
  userSignOut } = userSlice.actions

export const getUserInfo = (id) => async(dispatch) => {
  try{
    dispatch(userInfoRequest());
    const {data} = await API.get('tutorhubAPI', `/users/${id}`);
    dispatch(userInfoSuccess(data.Items[0]));

    return data.Items[0];
  } catch(error){
    dispatch(userInfoFail(error.message));
  }
}

export default userSlice.reducer
