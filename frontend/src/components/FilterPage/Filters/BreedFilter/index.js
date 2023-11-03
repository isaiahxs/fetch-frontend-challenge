import React, { useState, useEffect, useRef } from 'react';
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

    const buttonRef = useRef(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        // Function to call when clicking outside of dropdown
        const onClickOutside = (event) => {
            // If showBreeds is true and the click is outside the dropdown and the button, toggle the dropdown off
            if (showBreeds && dropdownRef.current && !dropdownRef.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
                toggleShowBreeds();
            }
        };

        // Attach the listener to the document
        document.addEventListener('mousedown', onClickOutside);

        // Clean up the listener to prevent memory leaks
        return () => {
            document.removeEventListener('mousedown', onClickOutside);
        };
    }, [showBreeds]); // Only re-run the effect if showBreeds changes

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
            <button ref={buttonRef} className='dropdown-button' onClick={toggleShowBreeds}>
                Breeds {showBreeds ? '▲' : '▼'}
            </button>

            {showBreeds && (
                <div ref={dropdownRef} className='options'>
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