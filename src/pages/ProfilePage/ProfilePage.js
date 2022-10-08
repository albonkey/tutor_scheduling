import React from 'react';
import style from './ProfilePage.module.scss';
import ProfileIntro from '../../components/ProfileIntro/ProfileIntro';
import ProfileCourses from '../../components/ProfileCourses/ProfileCourses';
import ProfileReviews from '../../components/ProfileReviews/ProfileReviews';

const ProfilePage = () => {

	{/* TEST DATA */}

	const courses = {name: 'A.Person', subject: 'History', nrOfSessions: 150, rating: 3.5, info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae eros egestas, sodales nunc eu, fermentum enim.'};

	const reviews = [
		{
			id: 1,
			name: 'Jane',
			subject: 'History',  rating: 3.5,
			info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae eros egestas, sodales nunc eu, fermentum enim.',
			image: ''
		},{
			id: 2,
			name: 'Sal',
			subject: 'Math',  rating: 4,
			info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae eros egestas, sodales nunc eu, fermentum enim.',
			image: ''
		},{
			id: 3,
			name: 'Mel',
			subject: 'Math',  rating: 4.5,
			info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae eros egestas, sodales nunc eu, fermentum enim.',
			image: ''
		}, {
			id: 4,
			name: 'Test extra',
			subject: 'Math',  rating: 5,
			info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae eros egestas, sodales nunc eu, fermentum enim.',
			image: ''
		}
	]

	 return(
		<div className={style.page}>
			<ProfileIntro
				name={'A. Person'}
				rating={2}
				nrOfSessions={200}
				bio={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae eros egestas, sodales nunc eu, fermentum enim. Nunc a efficitur nibh. Integer cursus pulvinar erat, ut congue arcu ultrices a. Suspendisse pulvinar quam nisi, eget malesuada nulla porttitor ut. Nullam sit amet risus vitae eros lobortis tristique in quis nisi. '}
				image={''}
				/>

			<ProfileCourses
				name = {'A. Person'}
				courses = {courses}
			/>

			<ProfileReviews
				reviews ={reviews} />
		</div>
	 )
}
export default ProfilePage;
