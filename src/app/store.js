import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import coursesReducer from '../features/courses/coursesSlice';
import reviewsReducer from '../features/reviews/reviewsSlice';
import sessionsReducer from '../features/sessions/sessionsSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    courses: coursesReducer,
    reviews: reviewsReducer,
    sessions: sessionsReducer
  },
})
