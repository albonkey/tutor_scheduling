import React, {useEffect, useState} from 'react';
import { API } from 'aws-amplify';
import style from './ProfilePage.module.scss';
import ProfileIntro from '../../components/ProfileIntro/ProfileIntro';
import ProfileCourses from '../../components/ProfileCourses/ProfileCourses';
import ProfileReviews from '../../components/ProfileReviews/ProfileReviews';

const ProfilePage = () => {
	const [reviews, setReviews] = useState([]);
	const [courses, setCourses] = useState([]);
	const [user, setUser] = useState({});
	const getReviews = async(userID) =>  {
		const response = await API.get('tutorhubAPI', `/users/${userID}/reviews`);
		setReviews([...response.data.Items]);
	}
	const getCourses = async(userID) => {
		const response = await API.get('tutorhubAPI', `/users/${userID}/courses`);
		setCourses([...response.data.Items]);
	}
	const getUser = async(userID) => {
		const response = await API.get('tutorhubAPI', `/users/${userID}`);
		const userObject = {...response.data.Items[0]};
		setUser(userObject)
	}
	useEffect(() => {
		getCourses(1);
		getReviews(1);
		getUser(1);
	}, [])



	 return(
		<div className={style.page}>
			<div className={style.header}>
				{user['GSI-1-SK']}
			</div>
			{
				user && <ProfileIntro user={user}/>
			}

			{
				courses && <ProfileCourses
					courses = {courses}
				/>
			}


			{
				reviews &&
				 <ProfileReviews reviews={reviews} />
			}

		</div>
	 )
}
export default ProfilePage;
