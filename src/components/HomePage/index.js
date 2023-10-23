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

        // if (servicesRef.current) {
        //     observer.observe(servicesRef.current);
        // }

        if (footerRef.current) {
            observer.observe(footerRef.current);
        }

        return () => {
            if (galleryRef.current) {
                observer.unobserve(galleryRef.current);
            }

            // if (servicesRef.current) {
            //     observer.unobserve(servicesRef.current);
            // }

            if (footerRef.current) {
                observer.unobserve(footerRef.current);
            }
        };
    }, []);
    return (
        <div>
            <Navigation isModalVisible={isModalVisible} setModalVisible={setModalVisible} />

            {/* <div className='home-container fade-in'>
                <h1 className='home-header syne'>Welcome to my Front-End Fetch Challenge</h1>
                <h2>Adopt a new member of your family today!</h2>
            </div> */}

            <Hero />

            <div ref={galleryRef} className='body-fade-in' id='gallery'>
                <Gallery />
            </div>


            <LoginFormModal isModalVisible={isModalVisible} setModalVisible={setModalVisible} />

            <div ref={footerRef} className='body-fade-in' id='footer'>
                <Footer />
            </div>
        </div>
    )
}