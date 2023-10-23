import React, { useState, useEffect } from 'react';
import { useModal } from '../../context/Modal';
import axios from 'axios';
import './LoginFormModal.css';

function LoginFormModal({ isModalVisible, setModalVisible }) {
    // localStorage.removeItem('isLoggedIn');
    const { closeModal } = useModal();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);
    const [isVisible, setIsVisible] = useState(true);
    // const [isModalVisible, setModalVisible] = useState(localStorage.getItem('isLoggedIn') !== 'true');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        // Prepare the POST data
        const postData = {
            name: name,
            email: email
        };

        try {
            // Make the POST request to /auth/login
            const response = await axios.post('https://frontend-take-home-service.fetch.com/auth/login', postData, { withCredentials: true });

            // If successful, log the response and close the modal
            console.log('Login success:', response.data);
            localStorage.setItem('isLoggedIn', 'true');
            setModalVisible(false);
            // closeModal();
            // console.log('after closemodal');
            // setIsVisible(false);
        } catch (error) {
            // If an error occurs, log it and set it into the errors state
            console.log('Login error:', error);
            setErrors(['An error occurred during login']);
        }
    };

    // This effect runs whenever the component mounts and anytime isModalVisible changes
    useEffect(() => {
        // Function to update isModalVisible based on localStorage
        const updateModalVisibility = () => {
            setModalVisible(localStorage.getItem('isLoggedIn') !== 'true');
        };

        // Listen for changes to localStorage
        window.addEventListener('storage', updateModalVisibility);

        if (isModalVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        // Cleanup: remove event listener when component unmounts
        return () => {
            document.body.style.overflow = 'auto';
            window.removeEventListener('storage', updateModalVisibility);
        };
    }, [isModalVisible]);

    return (
        <>
            {isModalVisible && (
                <div className='modal-overlay fade-in'>
                    <div className='modal'>
                        <h1 className='log-in-label'>Log In</h1>
                        <h2>Before you can adopt a new furry friend, you must sign in.</h2>
                        <form onSubmit={handleSubmit} className='log-in-form'>
                            <ul className='error-message'>
                                {errors.map((error, idx) => (
                                    <li key={idx}>{error}</li>
                                ))}
                            </ul>
                            <label className='form-label'>
                                Name
                            </label>
                            <input
                                name='name'
                                className='credential-input'
                                type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <label className='form-label'>
                                Email
                            </label>
                            <input
                                name='email'
                                className='credential-input'
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button className='log-in-button' type='submit'>Log In</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default LoginFormModal;