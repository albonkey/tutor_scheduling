import { createSlice } from '@reduxjs/toolkit';
import {API} from 'aws-amplify';
export const updateUserSlice = createSlice({
  name: 'updateUser',
  initialState: {
    updateInfo: {}
  },
  reducers: {
    
    updateUserRequest: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.loading = false;
      state.updateUserSuccess = true;
      state.bio = action.payload;
    },
    updateUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { 
  updateUserRequest,
  updateUserSuccess,
  updateUserFail,
 } = updateUserSlice.actions

export const updateUser = (update) => async (dispatch) => {
  try{
    const user = update.user;
    dispatch(updateUserRequest());

    const info = {
      body: {
        ...update
      }
    }
    const {data} = await API.put('tutorhubAPI', `/users/${user}`, info);

    dispatch(updateUserSuccess(data.Items[0]));
  } catch(error) {
    dispatch(updateUserFail(error.message));
  }
}

export default updateUserSlice.reducer