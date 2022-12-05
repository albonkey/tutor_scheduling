import { createSlice } from '@reduxjs/toolkit';
import {API} from 'aws-amplify';

export const sessionInfoSlice = createSlice({
    name: 'session',
    initialState: {
        session: {}
    },
    reducers: {
        sessionInfoRequest: (state) => {
            state.loading = true;
        },
        sessionInfoSuccess:(state, action) => {
            state.loading = false;
            state.success = true;
            state.session = action.payload;
        },
        sessionInfoFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    },
})

//Action creators are generated for each case reducer function
export const {
    sessionInfoRequest,
    sessionInfoSuccess,
    sessionInfoFail } = sessionInfoSlice.actions;

export const getSession = (sessionID) => async (dispatch) => {
    try {
        dispatch(sessionInfoRequest());
        console.log('Hello');
        const {data} = await API.get('tutorhubAPI', `/sessions/${sessionID}`);

        dispatch(sessionInfoSuccess(data.Items[0]));

    } catch(error) {
        dispatch (sessionInfoFail(error.message));
    }
}

export default sessionInfoSlice.reducer;
