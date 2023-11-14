import React, { useState } from 'react';
import { useLanguage } from '../../LanguageContext';
import { englishContent, spanishContent } from './content';
import Darron from '../../assets/images/Darron_Border_Collie.jpg';
import doge from '../../assets/images/german_shep.png';
import { Link } from 'react-router-dom';
import map_pin from '../../assets/icons/map-pin.svg';
import phone from '../../assets/icons/phone-icon.svg';
import facebook from '../../assets/icons/facebook-logo.svg';
import instagram from '../../assets/icons/instagram.png';
import { useNavigate } from 'react-router-dom'
import './Hero.css';

export default function Hero() {
    // const { currentLanguage, setCurrentLanguage } = useLanguage();
    const navigate = useNavigate()
    // const toggleLanguage = () => {
    //     setCurrentLanguage(currentLanguage === 'english' ? 'spanish' : 'english');
    // };

    // const content = currentLanguage === 'english' ? englishContent : spanishContent;

    const scrollToSection = (sectionId) => {
        const sectionElement = document.getElementById(sectionId);
        const yOffset = -115;
        const topOffset = sectionElement.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: topOffset, behavior: 'smooth' });
    };

    const handleClick = async (e) => {
        navigate('/filter')
        window.scrollTo(0, 0);
    }

    return (
        <header className='header-container'>
            <div className='hero-section'>
                <div className='hero-information'>
                    <h1 className='title fade1'>Fetch Friend Finder</h1>
                    <h2 className='location fade1'>Connecting You to Shelters Nationwide</h2>
                    {/* <button className='hero-language-toggle-button fade1' onClick={toggleLanguage}>
                        {currentLanguage === 'english' ? 'Español' : 'English'}
                    </button> */}

                    <div className='hero-descriptions-container fade2'>
                        <h3 className='description'>
                            {/* {content.description} */}
                            Browse through our extensive database to find the perfect companion.
                        </h3>

                        <h3 className='description description-2'>
                            {/* {content.description2} */}
                            We make it easy for you to connect with shelters and bring home a loving pet.
                        </h3>

                        <h3 className='description description-hours'>
                            {/* {content.hours} */}
                            Always Open: Search Anytime, Anywhere
                        </h3>

                        <h3 className='description description-hours description-hours-bottom'>
                            {/* {content.hoursSat} */}
                        </h3>
                    </div>

                    <div className='hero-buttons-container fade2'>
                        {localStorage.getItem('isLoggedIn') !== 'true' && (
                            <button className='view-services-hero' onClick={() => scrollToSection('log-in-section')}>
                                {/* {content.login} */}
                                Log In
                            </button>
                        )}

                        {localStorage.getItem('isLoggedIn') === 'true' && (
                            <button className='view-services-hero' onClick={handleClick}>
                                {/* {content.viewPets} */}
                                View Pets
                            </button>
                        )}

                        {/* <button className='view-gallery-hero' onClick={() => scrollToSection('gallery')}>
                            {content.viewGallery}
                        </button> */}
                    </div>
                </div>

                <div className='hero-image-and-contact fade3'>
                    <div className='hero-image-container'>
                        <img src={doge} className='hero-image' alt="Darron dog" />
                        <div className="gradient-overlay">
                            <div className='contact-container'>
                                <div className='contact-heading-container'>
                                    <h3 className='contact-heading-text'>
                                        {/* {content.contactHeading} */}
                                        Contact Us
                                    </h3>
                                </div>

                                <a href="https://fetch.com/"
                                    target='_blank' rel='noopener noreferrer'>
                                    <div className='footer-icon-container'>
                                        <p className='footer-icon-description'>
                                            <span>
                                                <img src={map_pin} className='footer-icon map-icon' alt='Map Pin Icon' />
                                                1050 E Washington Ave Suite 200 Madison, WI 53703
                                            </span>
                                        </p>
                                    </div>
                                </a>

                                <a href='tel:+7866307547'>
                                    <div className='footer-icon-container'>
                                        <img src={phone} className='footer-icon' alt='Phone Icon' />
                                        <p className='footer-icon-description'>
                                            (608) 345-1296
                                        </p>
                                    </div>
                                </a>

                                <a href="https://www.facebook.com/FetchRewards/" target='_blank' rel='noopener noreferrer'>
                                    <div className='footer-icon-container'>
                                        <img src={facebook} className='footer-icon' alt='Facebook Logo' />
                                        <p className='footer-icon-description'>Facebook</p>
                                    </div>
                                </a>

                                <a href='https://www.instagram.com/fetchrewards/?hl=en' target='_blank' rel='noopener noreferrer'>
                                    <div className='footer-icon-container'>
                                        <img src={instagram} className='footer-icon' alt='Instagram Logo' />
                                        <p className='footer-icon-description'>Instagram</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
