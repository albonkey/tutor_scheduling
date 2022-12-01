import { createSlice } from '@reduxjs/toolkit';
import {API} from 'aws-amplify';
export const createCoursesSlice = createSlice({
  name: 'createCourses',
  initialState: {
    courseList: []
  },
  reducers: {
    createCourseRequest: (state) => {
      state.loading = true;
    },
    createCourseSuccess: (state, action) => {
      state.loading = false;
      state.createCourseSuccess = true;
      state.course = action.payload;
    },
    createCourseFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const {
    createCourseRequest, 
    createCourseSuccess, 
    createCourseFail } = createCoursesSlice.actions;

export const createCourse = (course) => async (dispatch) => {
  try{
    const user = course.user;
    dispatch(createCourseRequest());

    const info = {
      body: {
        ...course
      }
    }
    const {data} = await API.post('tutorhubAPI', `/users/${user}/courses`, info);

    dispatch(createCourseSuccess(data.Items[0]));
  } catch(error) {
    dispatch(createCourseFail(error.message));
  }
}

export default createCoursesSlice.reducer