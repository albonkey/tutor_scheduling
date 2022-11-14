import { createSlice } from '@reduxjs/toolkit'
import {API} from 'aws-amplify';

export const availabilityInfoSlice = createSlice({
  name: 'availabilityInfo',
  initialState: {
    availability: {},
  },
  reducers: {
    availabilityInfoRequest: (state) => {
      state.loading = true;
    },
    availabilityInfoSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.availability = action.payload
    },
    availabilityInfoFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { availabilityInfoRequest, availabilityInfoSuccess, availabilityInfoFail } = availabilityInfoSlice.actions;

export const getAvailabilityInfo = (user) => async (dispatch) => {
  try{
    dispatch(availabilityInfoRequest());
    const {data} = await API.get('tutorhubAPI', `/users/${user}/availability`);
    dispatch(availabilityInfoSuccess(data));
    return data;
  } catch(error){
    dispatch(availabilityInfoFail(error.message));
  }
}

export default availabilityInfoSlice.reducer
