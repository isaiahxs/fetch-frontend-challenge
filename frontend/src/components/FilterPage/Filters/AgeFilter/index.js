import React from 'react';
import { useFilters } from '../../FilterContext';
import './AgeFilter.css';

const AgeFilter = () => {

    const { ageMin, ageMax, setAgeMin, setAgeMax } = useFilters();

    const handleMinChange = (e) => {
        setAgeMin(e.target.value);
    };

    const handleMaxChange = (e) => {
        setAgeMax(e.target.value);
    };

    return (
        <div className='age-filter-section'>
            <div className='age-filter-section-1'>
                <label className='age-label' htmlFor="ageMin">Minimum Age: </label>
                <input
                    id="ageMin"
                    className='age-input'
                    type="number"
                    value={ageMin}
                    onChange={handleMinChange}
                    placeholder="Enter minimum age"
                    min="0"
                />
            </div>

            <div className='age-filter-section-2'>
                <label className='age-label' htmlFor="ageMax">Maximum Age: </label>
                <input
                    id="ageMax"
                    className='age-input'
                    type="number"
                    value={ageMax}
                    onChange={handleMaxChange}
                    placeholder="Enter maximum age"
                    min="0"
                />
            </div>
        </div>
    );
};

export default AgeFilter;