import { createSlice } from '@reduxjs/toolkit'
import {API} from 'aws-amplify';
export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: {
    reviewList: [],
  },
  reducers: {
    updateReviews: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.reviewList = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateReviews } = reviewsSlice.actions;

export const getReviews = (user) => async (dispatch) => {
 const {data} = await API.get('tutorhubAPI', `/users/${user}/reviews`);

 dispatch(updateReviews([...data.Items]));
}

export default reviewsSlice.reducer
