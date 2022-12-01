import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import userSaveReducer from '../features/user/userSaveSlice';
import courseSearchReducer from '../features/courses/courseSearchSlice';
import courseListReducer from '../features/courses/courseListSlice';
import courseInfoReducer from '../features/courses/courseInfoSlice';
import courseSaveReducer from '../features/courses/courseSaveSlice';
import reviewListReducer from '../features/reviews/reviewListSlice';
import reviewSaveReducer from '../features/reviews/reviewSaveSlice';
import reviewInfoReducer  from '../features/reviews/reviewInfoSlice';
import availabilityInfoReducer from '../features/availability/availabilityInfoSlice';
import availabilitySaveReducer from '../features/availability/availabilitySaveSlice';
import sessionsReducer from '../features/sessions/sessionsSlice';
import sessionInfoReducer from '../features/sessions/sessionInfoSlice';
import sessionTutorReducer from '../features/sessions/sessionTutorSlice';


export default configureStore({
  reducer: {
    user: userReducer,
    userSave: userSaveReducer,
    courseSearch: courseSearchReducer,
    courseList: courseListReducer,
    courseInfo: courseInfoReducer,
    courseSave: courseSaveReducer,
    availabilityInfo: availabilityInfoReducer,
    availabilitySave: availabilitySaveReducer,
    sessions: sessionsReducer,
    reviews: reviewListReducer,
    reviewSave: reviewSaveReducer,
    reviewInfo: reviewInfoReducer,
    availabilityInfo: availabilityInfoReducer,
    availabilitySave: availabilitySaveReducer,
    sessions: sessionsReducer,
    sessionInfo: sessionInfoReducer,
    sessionTutor: sessionTutorReducer
  },
})
