import React, { useState, useEffect } from 'react';
import './BreedFilter.css';

export const BreedFilter = ({ availableBreeds, selectedBreeds, setSelectedBreeds }) => {

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