import { createSlice } from '@reduxjs/toolkit';
import {API} from 'aws-amplify';

export const courseSearchSlice = createSlice({
  name: 'courseSearch',
  initialState: {
    courses: [],
    searchTerm: ''
  },
  reducers: {
    courseSearchRequest: (state) => {
      state.loading = true;
    },
    courseSearchSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.courses = action.payload
    },
    courseSearchFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    courseSearchTerm: (state, action) => {
      state.searchTerm = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {
    courseSearchRequest,
    courseSearchSuccess,
    courseSearchFail,
    courseSearchTerm } = courseSearchSlice.actions;

export const searchCourses = (search) => async (dispatch) => {
  try{
    dispatch(courseSearchRequest());
    dispatch(courseSearchTerm(search));
    const {data} = await API.get('tutorhubAPI', `/courses?search=${search}`);

    dispatch(courseSearchSuccess([...data]));
  } catch(error){
    dispatch(courseSearchFail(error.message));
  }

}

export default courseSearchSlice.reducer
