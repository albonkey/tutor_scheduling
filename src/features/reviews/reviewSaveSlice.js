import { createSlice } from '@reduxjs/toolkit'
import {API} from 'aws-amplify';

export const reviewSaveSlice = createSlice({
    name: 'reviewSave',
    initialState: {
        review: {}
    },
    reducers: {
        reviewSaveRequest: (state) => {
            state.loading = true;
        },
        reviewSaveSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
            state.review = action.payload;
        },
        reviewSaveFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    },
})

//Action creators are generated for each case reducer function
export const {
    reviewSaveRequest,
    reviewSaveSuccess,
    reviewSaveFail } = reviewSaveSlice.actions;

export const reviewSave = (review) => async(dispatch) => {
    try{
        dispatch(reviewSaveRequest());

        const info = {
            body: {
                ...review
            }
        }
        const {data} = await API.post('tutorhubAPI', `/reviews`, info);

        dispatch(reviewSaveSuccess(data.Items[0]));
    } catch(error) {
        dispatch(reviewSaveFail(error.message));
    }
}

export default reviewSaveSlice.reducer;
