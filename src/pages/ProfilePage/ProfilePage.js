import React from 'react';
import style from './ProfilePage.module.scss';
import ProfileIntro from '../../components/ProfileIntro/ProfileIntro';
import ProfileCourses from '../../components/ProfileCourses/ProfileCourses';

const ProfilePage = () => {

	{/* TEST DATA */}

	const courses = {name: 'A.Person', subject: 'History', nrOfSessions: 150, rating: 3.5, info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae eros egestas, sodales nunc eu, fermentum enim.'};

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
		</div>
	 )
}
export default ProfilePage;
