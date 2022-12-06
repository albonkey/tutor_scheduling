import React from 'react';
import { Auth } from 'aws-amplify';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { updateUserId, getUserInfo } from '../../features/user/userSlice';


const RequireAuth = ({children}) => {
	const dispatch = useDispatch();
	const {userInfo} = useSelector(state => state.user);

	if(!userInfo){
		Auth.currentAuthenticatedUser({
      bypassCache: false
    }).then(user => {
      dispatch(updateUserId(user.username));
      dispatch(getUserInfo(user.username));
    }).catch(err => console.log(err))
	}
	 const location = useLocation();
	 const { route } = useAuthenticator((context) => [context.route]);
	 if ( route !== 'authenticated') {
		 return <Navigate to='/login' state={{ from: location }} replace />;
	 }
	 return children;
}
export default RequireAuth;
