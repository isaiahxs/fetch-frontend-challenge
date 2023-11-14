import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import './LoginFormModal.css';

function LoginFormModal() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const [errors, setErrors] = useState([]);
    const navigate = useNavigate()

    //create handleSubmit function that will prevent default from occurring until all checks are valid
    //create strings that will be the errors we show in case of name or email error
    //if user tries to put in an empty space as their name, tell them to enter a name
    //if user tries to put in an invalid email address, tell them to enter a valid email address using regex to check

    const handleSubmit = async (e) => {
        e.preventDefault();
        let nameError = '';
        let emailError = '';

        if (!name.trim()) {
            nameError = 'Please enter a name.';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!emailRegex.test(email)) {
            emailError = 'Please enter a valid email address.';
        }

        if (!nameError && !emailError) {
            // Prepare the POST data
            const postData = {
                name: name,
                email: email,
            };

            // Make the POST request to /auth/login
            const response = await axios.post('https://frontend-take-home-service.fetch.com/auth/login', postData, { withCredentials: true });

            localStorage.setItem('isLoggedIn', 'true');
            navigate('/filter');
            window.scrollTo(0, 0);
        } else {
            setErrors({ name: nameError, email: emailError });
        }
    };

    return (
        <>
            <div className='fade-in login-form-container'>
                <div className='login-form'>
                    <h1 className='log-in-label'>Log In</h1>
                    <h2>Before you can adopt a new furry friend, you must sign in.</h2>
                    <form className='log-in-form'>
                        <div className='form-sections'>
                            {errors.name && <div className="error-message">{errors.name}</div>}
                            <label htmlFor='name' className='form-label'>
                                Name
                            </label>
                            <input
                                id='name'
                                className='credential-input'
                                name='name'
                                type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />

                            {errors.email && <div className="error-message">{errors.email}</div>}
                            <label htmlFor='email' className='form-label'>
                                Email
                            </label>
                            <input
                                id='email'
                                name='email'
                                type='email'
                                className='credential-input'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button type='submit' onClick={handleSubmit} className='log-in-button'>
                                Log In
                            </button>
                        </div>


                    </form>
                </div>
            </div>
        </>
    );
}

export default LoginFormModal;