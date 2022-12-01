import { createSlice } from '@reduxjs/toolkit'
import {API} from 'aws-amplify';

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: {
    reviews: [],
  },
  reducers: {
    reviewListRequest: (state) => {
      state.loading = true;
    },
    reviewListSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.reviews = action.payload
    },
    reviewListFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { reviewListRequest, reviewListSuccess, reviewListFail } = reviewsSlice.actions;

export const listReviews = (user) => async (dispatch) => {
  try{
    dispatch(reviewListRequest());
    const {data} = await API.get('tutorhubAPI', `/users/${user}/reviews`);
    dispatch(reviewListSuccess([...data.Items]));
  } catch(error){
    dispatch(reviewListFail(error.message));
  }
}

export default reviewsSlice.reducer
