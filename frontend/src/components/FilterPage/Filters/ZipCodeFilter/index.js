import React from 'react';
import './ZipCodeFilter.css';

export const ZipCodeFilter = ({ selectedZipCodes, setSelectedZipCodes }) => {
    const handleChange = (e) => {
        const value = e.target.value;
        setSelectedZipCodes(new Set(value.split(',').map(item => item.trim())));
    };

    return (
        <div className='zip-filter-section'>
            <label className='zip-label' htmlFor="zipCodes">Filter by Zip Code: </label>
            <input
                id="zipCodes"
                className='zip-input'
                type="text"
                value={Array.from(selectedZipCodes).join(', ')}
                onChange={handleChange}
                placeholder="59451, 62037, 74155..."
            />
        </div>
    );
};

export default ZipCodeFilter;