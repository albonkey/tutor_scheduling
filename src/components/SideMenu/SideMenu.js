import React, { useState } from 'react';
import style from './SideMenu.module.scss';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPerson, faEarth, faPersonChalkboard, faCreditCard, faGear, faFileLines, faAngleRight, faAngleLeft} from '@fortawesome/free-solid-svg-icons';

const SideMenu = () => {
	const [show, setShow] = useState(true);

	 return(
	 	<nav className={style.sideMenu}>
			<ul className={`${style.list} ${!show && style.hide}`}>
				<li>
					 <NavLink to="/" className={style.listItem}>
						 <FontAwesomeIcon icon={faHome} fixedWidth/>
						 <span className={style.listItemText}>Home</span>
					 </NavLink>
				</li>
				<li>
					<NavLink to="/profile" className={style.listItem}>
						<FontAwesomeIcon icon={faPerson} fixedWidth />
						<span className={style.listItemText}>Shannon Leigh</span>
					</NavLink>
				</li>
				<li>
					<NavLink to="/discover" className={style.listItem}>
						<FontAwesomeIcon icon={faEarth} fixedWidth />
						<span className={style.listItemText}>Discover </span>
					</NavLink>
				</li>
				<li>
					<NavLink to="/sessions" className={style.listItem}>
						<FontAwesomeIcon icon={faPersonChalkboard} fixedWidth />
						<span className={style.listItemText}>Sessions</span>
					</NavLink>
				</li>
				<li>
					<NavLink to="/payments" className={style.listItem}>
						<FontAwesomeIcon icon={faCreditCard} fixedWidth />
						<span className={style.listItemText}>Payments</span>
					</NavLink>
				</li>
				<li>
					<NavLink to="/documents" className={style.listItem}>
						<FontAwesomeIcon icon={faFileLines} fixedWidth />
						<span className={style.listItemText}>Documents</span>
					</NavLink>
				</li>
				<li>
					<NavLink to="/settings" className={style.listItem}>
						<FontAwesomeIcon icon={faGear} fixedWidth />
						<span className={style.listItemText}>Settings</span>
					</NavLink>
				</li>
			</ul>
			<div className={style.toggleContainer}>
				{
						<FontAwesomeIcon icon={show ? faAngleLeft : faAngleRight} fixedWidth onClick={() => setShow(!show)}/>
				}
			</div>
		</nav>
	 )
}
export default SideMenu;
