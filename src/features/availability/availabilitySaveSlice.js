import { createSlice } from '@reduxjs/toolkit'
import {API} from 'aws-amplify';

export const availabilitySaveSlice = createSlice({
  name: 'availabilitySave',
  initialState: {
    availability: {},
  },
  reducers: {
    availabilitySaveRequest: (state) => {
      state.loading = true;
    },
    availabilitySaveSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.availability = action.payload
    },
    availabilitySaveFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { availabilitySaveRequest, availabilitySaveSuccess, availabilitySaveFail } = availabilitySaveSlice.actions;

export const saveAvailability = (user, availability) => async (dispatch) => {
  try{
    dispatch(availabilitySaveRequest());

    const myInit = {
      body: {
        availability
      },
      header: {}
    }
    const {data} = await API.put('tutorhubAPI', `/users/${user}/availability`, myInit);
    dispatch(availabilitySaveSuccess([...data.Items]));
  } catch(error){
    dispatch(availabilitySaveFail(error.message));
  }
}

export default availabilitySaveSlice.reducer
