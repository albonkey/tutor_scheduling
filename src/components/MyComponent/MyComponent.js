import React, { useState } from 'react';
import style from './MyComponent.module.scss';

const MyComponent = ({isTeaching, subject, name, time}) => {
	const [isSelected, setIsSelected] = useState(false);

	 return(
		 <div
		 	className={
				[
					style.wrapper,
					isTeaching && style.teaching,
					isSelected && style.selected
				 ].join(' ')
			 }
			onClick={() => setIsSelected(!isSelected)}
			>
		 	<div className={style.info}>
				<span className={style.status}>
					{
						isTeaching ? 'Teaching' : 'Learning'
					}
				</span>
				<span>{`${subject} with ${name}`}</span>
			</div>
			<div className={style.info}>
				<a className={style.link}>View Session</a>
				<span>{time}</span>
			</div>
		 </div>
	 )
}
export default MyComponent;
