import React, { useEffect, useState, useRef } from 'react';
import Navigation from '../Navigation';
import LoginFormModal from '../LoginFormModal';
import Hero from '../Hero';
import Gallery from '../Gallery';
import Footer from '../Footer';
import './HomePage.css';

export default function HomePage() {

    const [isModalVisible, setModalVisible] = useState(localStorage.getItem('isLoggedIn') !== 'true');

    const galleryRef = useRef(null);
    // const servicesRef = useRef(null);
    const footerRef = useRef(null);

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

        if (footerRef.current) {
            observer.observe(footerRef.current);
        }

        return () => {
            if (galleryRef.current) {
                observer.unobserve(galleryRef.current);
            }
        };
    }, []);
    return (
        <div>
            <Hero />

            <div ref={galleryRef} className='body-fade-in' id='gallery'>
                <Gallery />
            </div>

            <LoginFormModal isModalVisible={isModalVisible} setModalVisible={setModalVisible} />
        </div>
    )
}