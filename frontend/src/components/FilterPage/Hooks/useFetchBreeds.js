import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchBreeds = () => {
    const [availableBreeds, setAvailableBreeds] = useState([]);

    useEffect(() => {
        axios.get('https://frontend-take-home-service.fetch.com/dogs/breeds', { withCredentials: true })
            .then(response => {
                setAvailableBreeds(response.data);
            })
            .catch(error => {
                console.error('Error fetching available breeds:', error);
            });
    }, []);

    return [availableBreeds, setAvailableBreeds];
};