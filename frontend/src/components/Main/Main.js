import { useState, useEffect, useRef, useReducer } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from '../Navigation';
import Footer from '../Footer';
import HomePage from '../HomePage';
import FilterPage from '../FilterPage';

export default function Main() {
    const [isModalVisible, setModalVisible] = useState(localStorage.getItem('isLoggedIn') !== 'true');

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
            <Navigation isModalVisible={isModalVisible} setModalVisible={setModalVisible} />

            <Routes>
                <Route path="/" element={<HomePage />} />

                <Route path="/filter" element={<FilterPage />} />
            </Routes>

            <div ref={footerRef} className='body-fade-in' id='footer'>
                <Footer />
            </div>
        </main>
    )
}