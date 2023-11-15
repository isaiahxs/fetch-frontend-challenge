import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../LanguageContext';
import { englishContent, spanishContent } from './content';
import black_dog from '../../assets/icons/black-dog.png';
import logo_footer from '../../assets/icons/logo-footer.png';
import hamburger from '../../assets/icons/hamburger.png';
import axios from 'axios';
import { useTheme } from '../../ThemeContext';
import { useNavigate } from 'react-router-dom'
import './Navigation.css'

export default function Navigation() {
    // const { currentLanguage, setCurrentLanguage } = useLanguage();
    // const content = currentLanguage === 'english' ? englishContent : spanishContent;
    const navigate = useNavigate()

    const navRef = useRef();
    const [isNavOpen, setIsNavOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    // const toggleLanguage = () => {
    //     setCurrentLanguage(currentLanguage === 'english' ? 'spanish' : 'english');
    // };

    const toggleNavOpen = () => {
        setIsNavOpen(!isNavOpen);
    }

    useEffect(() => {
        if (isNavOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isNavOpen]);

    useEffect(() => {
        const checkIfClickedOutside = e => {
            // If nav menu is open, navRef is attached to an element (is not null), and click e.target occurred outside of the navigation element
            //!navRef.current.contains(e.target), the contains method is to check if the target is not a descendant of the navigation element
            if (isNavOpen && navRef.current && !navRef.current.contains(e.target)) {
                setIsNavOpen(false);
            }
        };

        document.addEventListener("mousedown", checkIfClickedOutside);

        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", checkIfClickedOutside);
        };
    }, [isNavOpen]);

    const handleLogout = async () => {
        try {
            await axios.post('https://frontend-take-home-service.fetch.com/auth/logout', {}, { withCredentials: true });
            localStorage.removeItem('isLoggedIn');
            navigate('/');
            setIsNavOpen(!isNavOpen);
        } catch (error) {
            console.log('Logout error:', error);
        }
    };

    return (
        <nav className={`nav-bar ${theme}`}>
            <div className='nav-options'>
                <div className='nav-logo-container'>
                    <img src={black_dog} className='small-logo fade-in' alt="Black Dog Logo" onClick={() => navigate('/')} />
                </div>

                <div className='nav-name fade-in'>
                    Fetch Challenge
                </div>

                <div className='nav-logo-container'>
                    <img src={hamburger} className='small-logo hamburger-menu fade-in' alt='Hamburger Menu' onClick={toggleNavOpen} />
                </div>

                {isNavOpen && <div className='backdrop'></div>}

                <div ref={navRef} className={`nav-panel ${isNavOpen ? 'nav-open' : ''}`}>
                    <button className='x-button' onClick={toggleNavOpen}>X</button>

                    <div className='panel-buttons'>
                        <div>
                            <button className='nav-button panel-button' onClick={toggleTheme}>
                                <div>
                                    <p className='footer-icon-description'>
                                        {theme === "day" ? 'Night' : 'Day'}
                                    </p>
                                </div>
                            </button>
                        </div>

                        <div>
                            <a href="https://www.isaiahxs.com/" target='_blank' rel='noopener noreferrer'>
                                <button className='nav-button panel-button'>
                                    <div>
                                        <p className='footer-icon-description'>
                                            Portfolio
                                        </p>
                                    </div>
                                </button>
                            </a>
                        </div>

                        <div>
                            <a href='https://www.linkedin.com/in/isaiahxs/' target='_blank' rel='noopener noreferrer'>
                                <button className='nav-button panel-button'>
                                    <div>
                                        <p className='footer-icon-description'>
                                            LinkedIn
                                        </p>
                                    </div>
                                </button>
                            </a>
                        </div>

                        <div>
                            <a href='https://github.com/isaiahxs' target='_blank' rel='noopener noreferrer'>
                                <button className='nav-button panel-button'>
                                    <div >
                                        <p className='footer-icon-description'>
                                            GitHub
                                        </p>
                                    </div>
                                </button>
                            </a>
                        </div>

                        <div>
                            <a href='https://wellfound.com/u/isaiahxs' target='_blank' rel='noopener noreferrer'>
                                <button className='nav-button panel-button'>
                                    <div >
                                        <p className='footer-icon-description'>
                                            Wellfound
                                        </p>
                                    </div>
                                </button>
                            </a>
                        </div>

                        {localStorage.getItem('isLoggedIn') === 'true' && (
                            <div>
                                <button className='nav-button panel-button' onClick={handleLogout}>
                                    <div>
                                        <p className='footer-icon-description'>
                                            Log Out
                                        </p>
                                    </div>
                                </button>
                            </div>
                        )}

                        {/* <div>
                            <button className='language-toggle-button panel-language-button' onClick={toggleLanguage}>
                                {currentLanguage === 'english' ? 'Español' : 'English'}
                            </button>
                        </div> */}

                        <div className='nav-logo-container'>
                            <img src={logo_footer} className='big-logo panel-logo' alt="Fetch Rewards Logo" />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
