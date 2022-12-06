import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { Auth } from 'aws-amplify';
import { Link } from 'react-router-dom';
import { Authenticator, useAuthenticator, View} from '@aws-amplify/ui-react';
import { useNavigate, useLocation } from 'react-router';
import style from './Login.module.scss';
import { updateUserId, getUserInfo } from '../../features/user/userSlice';


const Login = () => {
	const dispatch = useDispatch();
	 const { route } = useAuthenticator((context) => [context.route]);
	 const location = useLocation();
	 const navigate = useNavigate();
	 let from = location.state?.from?.pathname || '/';
	 const getUserInfo = async() => {
 				await Auth.currentAuthenticatedUser({
 		      bypassCache: false
 		    }).then(user => {
 		      dispatch(updateUserId(user.username));
 		      dispatch(getUserInfo(user.username));
 		    }).catch(err => console.log(err))
	 }
	 useEffect(() => {
		if(route === 'authenticated'){
				navigate(from, { replace: true });
		 }
	 }, [route, navigate, from]);

	 const formFields = {
		 signUp: {
			 given_name: {
				 placeholder: 'First Name',
				 order: 1
			 },
			 family_name: {
				 placeholder: 'Last Name',
				 order: 2
			 },
			 email: {
				 order:3
			 },
			 password: {
				 order: 4
			 },
			 confirm_password: {
				 order: 5
			 }
		 }
	 }

	 const services = {
		 async handleSignIn(formData) {
			 let { username, password } = formData;

			 return Auth.signIn({
				 username,
				 password
			 })
		 }
	 }
	 return (
		<View className='auth-wrapper'>

		 	<Authenticator services={services} formFields={formFields}>

			</Authenticator>
		</View>
	);

}
export default Login;
