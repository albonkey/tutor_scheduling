import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import coursesReducer from '../features/courses/coursesSlice';
import reviewsReducer from '../features/reviews/reviewsSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    courses: coursesReducer,
    reviews: reviewsReducer
  },
})
