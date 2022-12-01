import { createSlice } from '@reduxjs/toolkit';
import {API} from 'aws-amplify';

export const sessionTutorSlice = createSlice({
    name: 'sessionTutor',
    initialState: {
        tutor: {}
    },
    reducers: {
        sessionTutorRequest: (state) =>{
            state.loading = true;
        },
        sessionTutorSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
            state.session = action.payload;
        },
        sessionTutorFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    },
})

//Action creators are generated for each case reducer function
export const {
    sessionTutorRequest,
    sessionTutorSuccess,
    sessionTutorFail } = sessionTutorSlice.actions;

export const sessionTutor = (sessionID) => async (dispatch) => {
    try {
        dispatch(sessionTutorRequest());

        const {data} = await API.get('tutorhubAPI', `/sessions/${sessionID}`);

        dispatch(sessionTutorSuccess(data.Items[2]));
        
    } catch(error) {
        dispatch(sessionTutorFail(error.message));
    }
}

export default sessionTutorSlice.reducer