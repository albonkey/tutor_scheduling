import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {listCourses} from '../../features/courses/coursesSlice';
import {listReviews} from '../../features/reviews/reviewsSlice';
import {useParams} from 'react-router-dom';
import { API } from 'aws-amplify';
import style from './ProfilePage.module.scss';
import ProfileIntro from '../../components/ProfileIntro/ProfileIntro';
import ProfileCourses from '../../components/ProfileCourses/ProfileCourses';
import ProfileReviews from '../../components/ProfileReviews/ProfileReviews';

const ProfilePage = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const courses = useSelector((state) => state.courses.courses);
	const reviews = useSelector((state) => state.reviews.reviews);

	useEffect(() => {
		dispatch(listCourses(id));
		dispatch(listReviews(id));
	}, [])



	 return(
		<div className={style.page}>
			<div className={style.header}>
				{user.userInfo['GSI-1-SK']}
			</div>
			{
				user && <ProfileIntro user={user.userInfo}/>
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
