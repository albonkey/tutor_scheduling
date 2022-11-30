import React from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import style from './ProfilePage.module.scss';
import ProfileIntro from '../../components/ProfileIntro/ProfileIntro';
import ProfileCourses from '../../components/ProfileCourses/ProfileCourses';
import ProfileReviews from '../../components/ProfileReviews/ProfileReviews';

const ProfilePage = () => {
	const { id } = useParams();
	const user = useSelector((state) => state.user);
	const { route } = useAuthenticator((context) => [context.route]);

	 return(
		 
		<div className={style.page}>
			<div className={style.header}>
				{user.userInfo['GSI-1-SK']}
			</div>

			{
				user && <ProfileIntro userID = {id}/>
			}

			{
				<ProfileCourses userID = {id}/>
			}

			{
				 <ProfileReviews userID = {id} />
			}

		</div>
	 )
}
export default ProfilePage;
