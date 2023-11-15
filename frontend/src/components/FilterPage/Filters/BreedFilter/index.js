import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useFilters } from '../../FilterContext';
import './BreedFilter.css';

export const BreedFilter = () => {
    const { availableBreeds, setAvailableBreeds, selectedBreeds, setSelectedBreeds } = useFilters();

    const [showBreeds, setShowBreeds] = useState(false);

    // we will pass in a breed into this function and check if it already exists in our set of breeds
    const handleCheckboxChange = (breed) => {
        // console.log(breed);
        const newSelectedBreeds = new Set(selectedBreeds);
        // console.log(newSelectedBreeds);
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
            // If showBreeds is true and the click is outside the dropdown and the dropdownRef and buttonRefs are connected to their DOM elements, and we click outside, it will toggle the dropdown (hide it if it is showing)
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

    //first, a get request has to be done to retrieve all the dog breeds so we can show them on the dropdown
    useEffect(() => {
        axios.get('https://frontend-take-home-service.fetch.com/dogs/breeds', { withCredentials: true })
            //once we get that response, we want to update availableBreeds with that data
            .then(response => {
                setAvailableBreeds(response.data);
                // console.log('after', availableBreeds)
            })
            .catch(error => {
                console.error('Error fetching available breeds:', error);
            });
    }, []);

    return (
        <div className='breed-filter-section'>
            <button ref={buttonRef} className='dropdown-button' onClick={toggleShowBreeds}>
                {/* if showBreeds has been toggled on, show an upward pointing triangle, else, show downward pointing */}
                Breeds {showBreeds ? '▲' : '▼'}
            </button>

            {showBreeds && (
                <div ref={dropdownRef} className='options'>
                    {/* availableBreeds will be an array of every single breed so we can show them on the dropdown and if they're not in our set of newSelected breeds yet, once we click the checkbox, we will add them there */}
                    {/* if they already exist in our newSelectedBreeds set, we will remove them to *uncheck* them */}
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