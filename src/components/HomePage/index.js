import React, { useEffect, useState, useRef } from 'react';
import Navigation from '../Navigation';
import LoginFormModal from '../LoginFormModal';
import Hero from '../Hero';
import Gallery from '../Gallery';
import Footer from '../Footer';
import './HomePage.css';

export default function HomePage() {
    const [isModalVisible, setModalVisible] = useState(localStorage.getItem('isLoggedIn') !== 'true');
    return (
        <div>
            <Navigation isModalVisible={isModalVisible} setModalVisible={setModalVisible} />

            <div className='home-container fade-in'>
                <h1 className='home-header syne'>Welcome to my Front-End Fetch Challenge</h1>
                <h2>Adopt a new member of your family today!</h2>
            </div>

            <Hero />

            <Gallery />

            <LoginFormModal isModalVisible={isModalVisible} setModalVisible={setModalVisible} />

            <Footer />
        </div>
    )
}