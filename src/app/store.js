import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import coursesReducer from '../features/courses/coursesSlice';
import reviewsReducer from '../features/reviews/reviewsSlice';
import availabilityInfoReducer from '../features/availability/availabilityInfoSlice';
import availabilitySaveReducer from '../features/availability/availabilitySaveSlice';
import sessionsReducer from '../features/sessions/sessionsSlice';


export default configureStore({
  reducer: {
    user: userReducer,
    courses: coursesReducer,
    reviews: reviewsReducer,
    availabilityInfo: availabilityInfoReducer,
    availabilitySave: availabilitySaveReducer,
    sessions: sessionsReducer

  },
})
