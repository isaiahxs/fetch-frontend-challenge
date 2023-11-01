import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BreedFilter.css';

export const BreedFilter = ({ availableBreeds, setAvailableBreeds, selectedBreeds, setSelectedBreeds }) => {

    const [showBreeds, setShowBreeds] = useState(false);

    const handleCheckboxChange = (breed) => {
        const newSelectedBreeds = new Set(selectedBreeds);
        if (newSelectedBreeds.has(breed)) {
            newSelectedBreeds.delete(breed);
        } else {
            newSelectedBreeds.add(breed);
        }
        setSelectedBreeds(newSelectedBreeds);
    };

    const toggleShowBreeds = () => {
        setShowBreeds(!showBreeds);
    }

    useEffect(() => {
        axios.get('https://frontend-take-home-service.fetch.com/dogs/breeds', { withCredentials: true })
            .then(response => {
                setAvailableBreeds(response.data);
            })
            .catch(error => {
                console.error('Error fetching available breeds:', error);
            });
    }, []);

    return (
        <div className='breed-filter-section'>
            <button className='dropdown-button' onClick={toggleShowBreeds}>
                Breeds {showBreeds ? '▲' : '▼'}
            </button>

            {showBreeds && (
                <div className='options'>
                    {availableBreeds.map((breed, index) => (
                        <label className='dropdown-options' key={index}>
                            <input
                                className='dropdown-checkbox'
                                type="checkbox"
                                value={breed}
                                onChange={() => handleCheckboxChange(breed)}
                                checked={selectedBreeds.has(breed)}
                            />
                            <p className='dropdown-text'>
                                {breed}
                            </p>
                        </label>
                    ))}
                </div>
            )}
        </div>
    )
}