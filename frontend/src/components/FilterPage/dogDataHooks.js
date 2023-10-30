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

export const useFetchDogs = (selectedBreeds) => {
    const [resultIds, setResultIds] = useState([]);
    const [nextQuery, setNextQuery] = useState(null);
    const [prevQuery, setPrevQuery] = useState(null);

    useEffect(() => {
        const sortParam = 'sort=breed:asc'; //for ascending order (a-z)

        if (selectedBreeds.size > 0) {
            // Fetching logic goes here
            const breedParams = Array.from(selectedBreeds)
                .map(breed => `breeds=${encodeURIComponent(breed)}`)
                .join('&');
            const url = `https://frontend-take-home-service.fetch.com/dogs/search?${breedParams}&${sortParam}`;

            axios.get(url, { withCredentials: true })
                .then(response => {
                    setResultIds(response.data.resultIds);
                    setNextQuery(response.data.next);
                    setPrevQuery(response.data.prev);
                })
                .catch(error => {
                    console.error('Error fetching available breeds:', error);
                });
        }
    }, [selectedBreeds]);

    return { resultIds, setResultIds, nextQuery, setNextQuery, prevQuery, setPrevQuery };
};