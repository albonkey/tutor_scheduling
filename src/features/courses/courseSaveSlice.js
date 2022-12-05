import { createSlice } from '@reduxjs/toolkit';
import {API} from 'aws-amplify';

export const courseSaveSlice = createSlice({
  name: 'course',
  initialState: {
    course: {}
  },
  reducers: {
    courseSaveRequest: (state) => {
      state.loading = true;
    },
    courseSaveSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.course = action.payload;
    },
    courseSaveFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const {
    courseSaveRequest,
    courseSaveSuccess,
    courseSaveFail } = courseSaveSlice.actions;

export const createCourse = (course) => async (dispatch) => {
  try{
    const user = course.user;
    dispatch(courseSaveRequest());

    const info = {
      body: {
        ...course
      }
    }
    const {data} = await API.post('tutorhubAPI', `/courses`, info);

    dispatch(courseSaveSuccess(data.Items[0]));
  } catch(error) {
    dispatch(courseSaveFail(error.message));
  }
}

export default courseSaveSlice.reducer
