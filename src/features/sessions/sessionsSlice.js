import { createSlice } from '@reduxjs/toolkit';
import {API} from 'aws-amplify';

export const sessionsSlice = createSlice({
    name: 'sessions',
    initialState: {
        sessions: [],
    },
    reducers: {
        sessionListRequest: (state) => {
            state.loading = true
        },
        sessionListSuccess:(state, action) => {
            state.loading = false;
            state.success = true;
            state.sessions = action.payload
        },
        sessionListFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    },
})

//Action creators are generated for each case reducer function
export const {
    sessionListRequest,
    sessionListSuccess,
    sessionListFail } = sessionsSlice.actions;

export const listSessions = (user) => async (dispatch) => {
    try {
        dispatch(sessionListRequest());

        const {data} = await API.get('tutorhubAPI', `/users/${user}/sessions`);

        dispatch (sessionListSuccess([...data.Items]));
    } catch(error) {
        dispatch (sessionListFail(error.message));
    }
}

export default sessionsSlice.reducer
