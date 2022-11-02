import { createSlice } from '@reduxjs/toolkit'
import {API} from 'aws-amplify';
export const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    courseList: [],
  },
  reducers: {
    courseListRequest: (state) => {
      state.loading = true;
    },
    courseListSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.courses = action.payload
    },
    courseListFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { courseListRequest, courseListSuccess, courseListFail } = coursesSlice.actions;

export const listCourses = (user) => async (dispatch) => {
  try{
    dispatch(courseListRequest());

    const {data} = await API.get('tutorhubAPI', `/users/${user}/courses`);

    dispatch(courseListSuccess([...data.Items]));
  } catch(error){
    dispatch(courseListFail(error.message));
  }

}

export default coursesSlice.reducer
