import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import courseSearchReducer from '../features/courses/courseSearchSlice';
import courseListReducer from '../features/courses/courseListSlice';
import reviewsReducer from '../features/reviews/reviewsSlice';
import availabilityInfoReducer from '../features/availability/availabilityInfoSlice';
import availabilitySaveReducer from '../features/availability/availabilitySaveSlice';
import sessionsReducer from '../features/sessions/sessionsSlice';


export default configureStore({
  reducer: {
    user: userReducer,
    courseSearch: courseSearchReducer,
    courseList: courseListReducer,
    reviews: reviewsReducer,
    availabilityInfo: availabilityInfoReducer,
    availabilitySave: availabilitySaveReducer,
    sessions: sessionsReducer

  },
})
