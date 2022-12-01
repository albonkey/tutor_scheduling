import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import updateUserReducer from '../features/user/updateUserSlice';
import courseSearchReducer from '../features/courses/courseSearchSlice';
import courseListReducer from '../features/courses/courseListSlice';
import createCoursesReducer from '../features/courses/createCourseSlice';
import reviewsReducer from '../features/reviews/reviewsSlice';
import reviewSaveReducer from '../features/reviews/reviewSaveSlice';
import  getReview  from '../features/reviews/getReviewSlice';
import availabilityInfoReducer from '../features/availability/availabilityInfoSlice';
import availabilitySaveReducer from '../features/availability/availabilitySaveSlice';
import sessionsReducer from '../features/sessions/sessionsSlice';
import getSessionReducer from '../features/sessions/getSessionSlice';
import sessionTutorReducer from '../features/sessions/sessionTutorSlice';


export default configureStore({
  reducer: {
    user: userReducer,
    updateUser: updateUserReducer,
    courseSearch: courseSearchReducer,
    courseList: courseListReducer,
    createCourses: createCoursesReducer,
    reviews: reviewsReducer,
    reviewSave: reviewSaveReducer,
    getReview: getReview,
    availabilityInfo: availabilityInfoReducer,
    availabilitySave: availabilitySaveReducer,
    sessions: sessionsReducer,
    getSession: getSessionReducer,
    sessionTutor: sessionTutorReducer
  },
})
