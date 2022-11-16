import React from 'react';
import style from './ScheduleAppointment.module.scss';

const ScheduleAppointment = ({user}) => {

	 return(
		 <div className={style.wrapper}>
		 	<div className={style.box}>Day</div>
			<div className={style.box}>Hour</div>
		 </div>
	 )
}
export default ScheduleAppointment;
