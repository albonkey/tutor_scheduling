import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getCourses} from '../../features/courses/coursesSlice';
import {getReviews} from '../../features/reviews/reviewsSlice';
import {useParams} from 'react-router-dom';
import { API } from 'aws-amplify';
import style from './ProfilePage.module.scss';
import ProfileIntro from '../../components/ProfileIntro/ProfileIntro';
import ProfileCourses from '../../components/ProfileCourses/ProfileCourses';
import ProfileReviews from '../../components/ProfileReviews/ProfileReviews';

const ProfilePage = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const courses = useSelector((state) => state.courses.courseList);
	const reviews = useSelector((state) => state.reviews.reviewList);

	useEffect(() => {
		dispatch(getCourses(user.id));
		dispatch(getReviews(user.id));
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
