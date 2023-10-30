import React, { useEffect, useState, useRef } from 'react';
import Navigation from '../Navigation';
import LoginFormModal from '../LoginFormModal';
import Hero from '../Hero';
import Gallery from '../Gallery';
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom'
import './HomePage.css';
import { useLanguage } from '../../LanguageContext';
import { englishContent, spanishContent } from './content';

export default function HomePage() {

    const [isModalVisible, setModalVisible] = useState(localStorage.getItem('isLoggedIn') !== 'true');
    const navigate = useNavigate()

    const galleryRef = useRef(null);
    const loginRef = useRef(null);
    // const servicesRef = useRef(null);
    const footerRef = useRef(null);

    const { currentLanguage, setCurrentLanguage } = useLanguage();
    const content = currentLanguage === 'english' ? englishContent : spanishContent;

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('show');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
            }
        );

        if (galleryRef.current) {
            observer.observe(galleryRef.current);
        }

        if (loginRef.current) {
            observer.observe(loginRef.current);
        }

        if (footerRef.current) {
            observer.observe(footerRef.current);
        }

        return () => {
            if (galleryRef.current) {
                observer.unobserve(galleryRef.current);
            }

            if (loginRef.current) {
                observer.unobserve(loginRef.current);
            }
        };
    }, []);

    const handleClick = async (e) => {
        navigate('/filter');
    }

    return (
        <div>
            <Hero />

            {localStorage.getItem('isLoggedIn') !== 'true' && (
                <div ref={loginRef} className='body-fade-in' id='log-in-section'>
                    <LoginFormModal isModalVisible={isModalVisible} setModalVisible={setModalVisible} />
                </div>
            )}

            {localStorage.getItem('isLoggedIn') === 'true' && (
                <div className='signed-in-home-message'>
                    {content.signedIn}
                    <button className='start-looking-button' onClick={handleClick}>
                        {content.lookForPets}
                    </button>
                </div>
            )}

            <div ref={galleryRef} className='body-fade-in' id='gallery'>
                <Gallery />
            </div>

        </div>
    )
}