import { createSlice } from '@reduxjs/toolkit';
import {API} from 'aws-amplify';
export const courseInfoSlice = createSlice({
  name: 'courseInfo',
  initialState: {
    course: {}
  },
  reducers: {
    courseInfoRequest: (state) => {
      state.loading = true;
    },
    courseInfoSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.course = action.payload
    },
    courseInfoFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const {
    courseInfoRequest,
    courseInfoSuccess,
    courseInfoFail } = courseInfoSlice.actions;

export const getCourse = (courseId) => async (dispatch) => {
  try{
    dispatch(courseInfoRequest());

    const {data} = await API.get('tutorhubAPI', `/courses/${courseId}`);

    dispatch(courseInfoSuccess(data));
  } catch(error){
    dispatch(courseInfoFail(error.message));
  }

}

export default courseInfoSlice.reducer
