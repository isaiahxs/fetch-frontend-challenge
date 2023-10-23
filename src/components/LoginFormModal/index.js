import React, { useState } from 'react';
import { useModal } from '../../context/Modal';
import axios from 'axios';
import './LoginFormModal.css';

function LoginFormModal() {
    const { closeModal } = useModal();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);

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
            const response = await axios.post('https://frontend-take-home-service.fetch.com/auth/login', postData);

            // If successful, log the response and close the modal
            console.log('Login success:', response.data);
            closeModal();
        } catch (error) {
            // If an error occurs, log it and set it into the errors state
            console.log('Login error:', error);
            setErrors(['An error occurred during login']);
        }
    };

    return (
        <div className='modal-overlay'>
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
    );
}

export default LoginFormModal;