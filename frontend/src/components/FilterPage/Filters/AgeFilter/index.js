import React from 'react';
import './AgeFilter.css';

const AgeFilter = ({ ageMin, ageMax, setAgeMin, setAgeMax }) => {
    const handleMinChange = (e) => {
        setAgeMin(e.target.value);
    };

    const handleMaxChange = (e) => {
        setAgeMax(e.target.value);
    };

    return (
        <div>
            <div className='age-filter-section'>
                <label className='age-label' htmlFor="ageMin">Minimum Age: </label>
                <input
                    id="ageMin"
                    className='age-input'
                    type="number"
                    value={ageMin}
                    onChange={handleMinChange}
                    placeholder="Enter minimum age"
                />
            </div>

            <div className='age-filter-section'>
                <label className='age-label' htmlFor="ageMax">Maximum Age: </label>
                <input
                    id="ageMax"
                    className='age-input'
                    type="number"
                    value={ageMax}
                    onChange={handleMaxChange}
                    placeholder="Enter maximum age"
                />
            </div>
        </div>
    );
};

export default AgeFilter;