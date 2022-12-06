import React, { useState } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import {useSelector, useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import style from './ProfilePage.module.scss';
import ProfileIntro from '../../components/ProfileIntro/ProfileIntro';
import ProfileCourses from '../../components/ProfileCourses/ProfileCourses';
import ProfileReviews from '../../components/ProfileReviews/ProfileReviews';
import { updateUser } from '../../features/user/userSaveSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen as pen } from '@fortawesome/free-solid-svg-icons';
import StarRating from '../../components/StarRating/StarRating';

const ProfilePage = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const {userInfo} = useSelector((state) => state.user);
	const { route } = useAuthenticator((context) => [context.route]);

	 return(

		<div className={style.page}>
		{
			userInfo ? <>

				<div className={style.header}>
					<span className={style.name}>{`${userInfo.FirstName} ${userInfo.LastName}`}</span>
					<StarRating rating={userInfo.Rating}/>
				</div>
				<ProfileIntro userID={id}/>
				<ProfileCourses userID={id}/>
				<ProfileReviews userID={id}/>
			</>
			:
				<div>No User with that username</div>
			}


		</div>
	 )
}
export default ProfilePage;
