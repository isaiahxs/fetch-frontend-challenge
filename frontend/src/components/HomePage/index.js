import React, { useEffect, useState, useRef } from 'react';
import LoginFormModal from '../LoginFormModal';
import Hero from '../Hero';
import Gallery from '../Gallery';
import { useNavigate } from 'react-router-dom'
import './HomePage.css';
import { useLanguage } from '../../LanguageContext';
import { englishContent, spanishContent } from './content';

export default function HomePage() {

    const navigate = useNavigate()

    const galleryRef = useRef(null);
    const loginRef = useRef(null);
    // const servicesRef = useRef(null);
    const footerRef = useRef(null);

    // const { currentLanguage, setCurrentLanguage } = useLanguage();
    // const content = currentLanguage === 'english' ? englishContent : spanishContent;

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

            if (footerRef.current) {
                observer.unobserve(footerRef.current);
            }
        };
    }, []);

    const handleClick = async (e) => {
        navigate('/filter');
        window.scrollTo(0, 0);
    }

    return (
        <div>
            <Hero />

            {localStorage.getItem('isLoggedIn') !== 'true' && (
                <div ref={loginRef} id='log-in-section' data-testid='log-in-section'>
                    <LoginFormModal />
                </div>
            )}

            {localStorage.getItem('isLoggedIn') === 'true' && (
                <div className='signed-in-home-message'>
                    Looks like you're already signed in!
                    <button className='start-looking-button' onClick={handleClick}>
                        Look for pets
                    </button>
                </div>
            )}

            <div ref={galleryRef} className='body-fade-in' id='gallery'>
                <Gallery />
            </div>

        </div>
    )
}