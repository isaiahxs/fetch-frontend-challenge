import { useState, useEffect, useRef, useReducer } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from '../Navigation';
import Footer from '../Footer';
import HomePage from '../HomePage';
import FilterPage from '../FilterPage';
import Match from '../Match';

export default function Main() {
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

        if (footerRef.current) {
            observer.observe(footerRef.current);
        }

        return () => {
            if (footerRef.current) {
                observer.unobserve(footerRef.current);
            }
        };
    }, []);

    return (
        <main>
            <Navigation />

            <Routes>
                <Route path="/" element={<HomePage />} />

                <Route path="/filter" element={<FilterPage />} />

                <Route path="/match" element={<Match />} />
            </Routes>

            <div ref={footerRef} className='body-fade-in' id='footer'>
                <Footer />
            </div>
        </main>
    )
}