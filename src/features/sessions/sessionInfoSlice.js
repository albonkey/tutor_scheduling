import { createSlice } from '@reduxjs/toolkit';
import {API} from 'aws-amplify';

export const sessionInfoSlice = createSlice({
    name: 'session',
    initialState: {
        session: {},
        tutor: {},
        student: {}
    },
    reducers: {
        sessionInfoRequest: (state) => {
            state.loading = true;
        },
        sessionInfoSuccess:(state, action) => {
            state.loading = false;
            state.success = true;
            state.session = action.payload[0];
            state.student = action.payload[1];
            state.tutor = action.payload[2];
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
        const {data} = await API.get('tutorhubAPI', `/sessions/${sessionID}`);

        dispatch(sessionInfoSuccess([...data.Items]));

        return data.Items;
    } catch(error) {
        dispatch (sessionInfoFail(error.message));
    }
}

export default sessionInfoSlice.reducer;
