import { createSlice } from '@reduxjs/toolkit';
import {API} from 'aws-amplify';
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: '',
    userInfo: {}
  },
  reducers: {
    updateUserId: (state, action) => {
      state.id = action.payload
    },
    updateUserInfo: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.userInfo = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateUserId, updateUserInfo } = userSlice.actions

export const getUserInfo = (id) => async(dispatch) => {
  const {data} = await API.get('tutorhubAPI', `/users/${id}`);

  dispatch(updateUserInfo(data.Items[0]))
}
export default userSlice.reducer
