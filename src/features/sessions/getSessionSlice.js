import { createSlice } from '@reduxjs/toolkit';
import {API} from 'aws-amplify';

export const getSessionSlice = createSlice({
    name: 'getSession',
    initialState: {
        session: []
    },
    reducers: {
        getSessionRequest: (state) => {
            state.loading = true;
        },
        getSessionSuccess:(state, action) => {
            state.loading = false;
            state.success = true;
            state.session = action.payload;
        },
        getSessionFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    },
})

//Action creators are generated for each case reducer function
export const {
    getSessionRequest,
    getSessionSuccess,
    getSessionFail } = getSessionSlice.actions;

export const getSession = (sessionID) => async (dispatch) => {
    try {
        dispatch(getSessionRequest());

        const {data} = await API.get('tutorhubAPI', `/sessions/${sessionID}`);

        dispatch(getSessionSuccess([...data.Items]));

        return data.Items;
    } catch(error) {
        dispatch (getSessionFail(error.message));
    }
}

export default getSessionSlice.reducer