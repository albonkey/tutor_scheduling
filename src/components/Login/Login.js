import React, {useEffect, useState} from 'react';
import { Auth } from 'aws-amplify';
import { Link } from 'react-router-dom';
import { Authenticator, useAuthenticator, View} from '@aws-amplify/ui-react';
import { useNavigate, useLocation } from 'react-router';
import style from './Login.module.scss';


const Login = () => {
	 const { route } = useAuthenticator((context) => [context.route]);
	 const location = useLocation();
	 const navigate = useNavigate();
	 let from = location.state?.from?.pathname || '/';

	 useEffect(() => {
		 if(route === 'authenticated'){
			 navigate(from, { replace: true });
		 }
	 }, [route, navigate, from]);

	 const formFields = {
		 signUp: {
			 name: {
				 order: 1
			 },
			 email: {
				 order:2
			 },
			 password: {
				 order: 3
			 },
			 confirm_password: {
				 order: 4
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

		 	<Authenticator signUpAttributes={['name']} services={services} formFields={formFields}>

			</Authenticator>
		</View>
	);

}
export default Login;
