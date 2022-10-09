import React from 'react';
import style from './HomePage.module.scss';
import MyComponent from '../../components/MyComponent/MyComponent';

const HomePage = () => {
	 return(
		 <div className={style.page}>
			 <MyComponent
				 isTeaching={true}
				 subject={'Math'}
				 name={'Sara'}
				 time={'12:00 - 1:00pm'}
			 />
			 <MyComponent
				 isTeaching={false}
				 subject={'History'}
				 name={'Alex'}
				 time={'2:00 - 3:00pm'}
			 />
		 </div>
	 )
}
export default HomePage;
