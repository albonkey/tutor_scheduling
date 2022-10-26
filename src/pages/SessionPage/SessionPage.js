import React from 'react';
import { useParams } from 'react-router-dom';
import style from './SessionPage.module.scss';

const SessionPage = () => {

	let { id } = useParams();

	 return(
		 <div className={style.page}>
		 	{id}
		 </div>
	 )
}
export default SessionPage;
