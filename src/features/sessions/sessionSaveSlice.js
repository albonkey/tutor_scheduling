import { createSlice } from '@reduxjs/toolkit';
import {API} from 'aws-amplify';

export const sessionSave = createSlice({
    name: 'sessionSave',
    initialState: {
        session: {},
    },
    reducers: {
        sessionSaveRequest: (state) => {
            state.loading = true
        },
        sessionSaveSuccess:(state, action) => {
            state.loading = false;
            state.success = true;
            state.session = action.payload
        },
        sessionSaveFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    },
})

//Action creators are generated for each case reducer function
export const {
    sessionSaveRequest,
    sessionSaveSuccess,
    sessionSaveFail } = sessionSave.actions;

export const saveSession = (session) => async (dispatch) => {
  console.log('Running')
    try {
        dispatch(sessionSaveRequest());

        const info = {
          body: {
            ...session
          }
        }
        const {data} = await API.post('tutorhubAPI', `/sessions`, info);
        console.log(data);
        dispatch(sessionSaveSuccess(data.Items[0]));
    } catch(error) {
        dispatch(sessionSaveFail(error.message));
    }
}

export default sessionSave.reducer
