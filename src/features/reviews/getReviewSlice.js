import { createSlice } from '@reduxjs/toolkit'
import {API} from 'aws-amplify';

export const getReviewSlice = createSlice({
    name: 'getReview',
    initialState: {
        review: {},
    },
    reducers: {
        getReviewRequest: (state) => {
            state.loading = true;
        },
        getReviewSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
            state.review = action.payload;
        },
        getReviewFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    },
})

//Action creators are generated for each case reducer function
export const {
    getReviewRequest,
    getReviewSuccess,
    getReviewFail } = getReviewSlice.actions;

    export const getReview = (id) => async (dispatch) => {
        try {
            dispatch(getReviewRequest());

            const {data} = await API.get('tutorhubAPI', `/users/${id}/reviews`);

            dispatch(getReviewSuccess(data.Items[0]));
        }catch(error) {
            dispatch(getReviewFail(error.message));
        }
    }
export default getReviewSlice.reducer
