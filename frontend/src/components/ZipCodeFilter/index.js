import React from 'react';
import './ZipCodeFilter.css';

export const ZipCodeFilter = ({ selectedZipCodes, setSelectedZipCodes }) => {
    const handleChange = (e) => {
        const value = e.target.value;
        setSelectedZipCodes(new Set(value.split(',').map(item => item.trim())));
    };

    return (
        <div>
            <label htmlFor="zipCodes">Filter by Zip Code: </label>
            <input
                id="zipCodes"
                type="text"
                value={Array.from(selectedZipCodes).join(', ')}
                onChange={handleChange}
                placeholder="Enter zip codes separated by commas"
            />
        </div>
    );
};

export default ZipCodeFilter;