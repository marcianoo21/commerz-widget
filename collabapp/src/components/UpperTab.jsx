import React from 'react';
import '../styles/UpperTab.css';
import CalendarModal from './MainCalendar';

const UpperTab = () => {
    return (
        <>
            <header className="header-container">
                <div className="logo">
                    <img src={require('../assets/images/logo.png')} alt="Logo" /> {/* Zaktualizowana ścieżka */}
                </div>
                <nav className="nav-menu">
                    <a href="#about">O nas</a>
                    <a href="#careers">Kariera</a>
                    <a href="#events">Wydarzenia</a>
                    <a href="#internships">Staże TalentBank</a>
                    <a href="#bigdata">Big Data Community</a>
                    <a href="#contact">Kontakt</a>
                </nav>
                <div className="social-media-icons">
                    <a href="https://facebook.com"><i className="fab fa-facebook-f"></i></a>
                    <a href="https://linkedin.com"><i className="fab fa-linkedin-in"></i></a>
                    <a href="#language" className="language-toggle">EN</a>
                </div>
            </header>
            <div className="calendar-container">
            <CalendarModal />
            </div>
        </>
    );
  };

export default UpperTab; 