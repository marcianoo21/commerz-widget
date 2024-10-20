import React from 'react'
import '../styles/UpperTab.css'
import CalendarModal from './MainCalendar'
import MultipleCards from './MultipleCards'

const UpperTab = () => {
	return (
		<>
			<header className='header-container'>
				<div className='logo'>
					<img src={require('../assets/images/logo.png')} alt='Logo' /> {/* Zaktualizowana ścieżka */}
				</div>
				<nav className='nav-menu'>
					<a href='#about'>About us</a>
					<a href='#careers'>Career</a>
					<a href='#events'>Events</a>
					<a href='#internships'>Internships TalentBank</a>
					<a href='#bigdata'>Big Data Community</a>
					<a href='#contact'>Contact</a>
				</nav>
				<div className='social-media-icons'>
					<a href='https://facebook.com'>
						<i className='fab fa-facebook-f'></i>
					</a>
					<a href='https://linkedin.com'>
						<i className='fab fa-linkedin-in'></i>
					</a>
					<a href='#language' className='language-toggle'>
						EN
					</a>
				</div>
			</header>
			<div className='calendar-container'>{/* <CalendarModal /> */}</div>
			<div className='multiple-cards'>
				<MultipleCards />
			</div>
		</>
	)
}

export default UpperTab
