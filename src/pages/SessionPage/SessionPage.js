import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import { API } from 'aws-amplify';
import style from './SessionPage.module.scss';
import SessionDetails from '../../components/SessionDetails/SessionDetails';
import SessionDocuments from '../../components/SessionDocuments/SessionDocuments';
import SessionReview from '../../components/SessionReview/SessionReview';

const SessionPage = () => {
	let { id } = useParams();

	const Details = {
		PK: '47878298',
		GSI2PK: 'Chemistry',
		Level: 'AP',
		Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae eros egestas, sodales nunc eu, fermentum enim. Nunc a efficitur nibh. Integer cursus pulvinar erat, ut congue arcu ultrices a. Suspendisse pulvinar quam nisi, eget malesuada nulla porttitor ut. Nullam sit amet risus vitae eros lobortis tristique in quis nisi.',
		StartOn: '10/30/22-3:00',
		TutorID: 'User 1',
		StudentID: 'User 2'
	};
	const Student = {
		PK: 'User 2',
		Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae eros egestas, sodales nunc eu, fermentum enim. Nunc a efficitur nibh. Integer cursus pulvinar erat, ut congue arcu ultrices a. Suspendisse pulvinar quam nisi, eget malesuada nulla porttitor ut. Nullam sit amet risus vitae eros lobortis tristique in quis nisi.',
		Rating: 3.5
	};
	const Tutor = {
			PK: 'User 1',
			Rating: '3'
		};
	
	const documents = [
		{
			title: 'Study Guide',
			date: '10/29/2022',
			type: 'pdf'
		},{
			title: 'Worksheet',
			date: '10/27/2022',
			type: 'pdf'
		},{
			title: 'Quiz',
			date: '10/20/2022',
			type: 'jpg'
		}
	];

	 return(
		 <div className={style.page}>
			<div>
				{
				<SessionDetails 
					tutor = {Tutor}
					details = {Details}
					student = {Student} />
				}
				{
				<SessionDocuments documents = {documents}/>
				}
				{
				<SessionReview />
				}
			</div>
		 </div>
	 )
}
export default SessionPage;
