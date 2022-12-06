import { createSlice } from '@reduxjs/toolkit';
import {API} from 'aws-amplify';
export const userSaveSlice = createSlice({
  name: 'userSave',
  initialState: {
    user: null
  },
  reducers: {
    saveUserRequest: (state) => {
      state.loading = true;
      state.success = false;
    },
    saveUserSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.user = action.payload;
    },
    saveUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const {
  saveUserRequest,
  saveUserSuccess,
  saveUserFail,
} = userSaveSlice.actions

export const updateUser = (user) => async (dispatch) => {
  try{
    dispatch(saveUserRequest());

    const info = {
      body: {
        ...user
      }
    }
    const {data} = await API.put('tutorhubAPI', `/users/${user.id}`, info);

    dispatch(saveUserSuccess(data.Items[0]));
  } catch(error) {
    dispatch(saveUserFail(error.message));
  }
}

export default userSaveSlice.reducer
