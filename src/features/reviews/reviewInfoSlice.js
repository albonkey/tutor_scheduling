import { createSlice } from '@reduxjs/toolkit'
import {API} from 'aws-amplify';

export const reviewInfoSlice = createSlice({
    name: 'review',
    initialState: {
        review: {},
    },
    reducers: {
        getReviewRequest: (state) => {
            state.loading = true;
            state.review = {};
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
    getReviewFail } = reviewInfoSlice.actions;

    export const getReview = (id) => async (dispatch) => {
        try {
            dispatch(getReviewRequest());

            const {data} = await API.get('tutorhubAPI', `/reviews/${id}`);

            dispatch(getReviewSuccess(data.Items[0]));
        }catch(error) {
            dispatch(getReviewFail(error.message));
        }
    }
export default reviewInfoSlice.reducer
