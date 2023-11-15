import React from 'react';
import { useFilters } from '../../FilterContext';
import './ZipCodeFilter.css';

export const ZipCodeFilter = () => {

    const { selectedZipCodes, setSelectedZipCodes } = useFilters();

    //we will create a set of unique zip codes and split them by comma and also remove white space
    const handleChange = (e) => {
        // console.log(selectedZipCodes);
        const value = e.target.value;
        setSelectedZipCodes(new Set(value.split(',').map(item => item.trim())));
        // console.log(selectedZipCodes);
    };

    // console.log(Array.from(selectedZipCodes));

    const joinedZipCodes = Array.from(selectedZipCodes).join(', ');
    // console.log(joinedZipCodes);

    return (
        <div className='zip-filter-section'>
            <label className='zip-label' htmlFor="zipCodes">Filter by Zip Code: </label>
            <input
                id="zipCodes"
                className='zip-input'
                type="text"
                value={joinedZipCodes}
                onChange={handleChange}
                placeholder="59451, 62037, 74155..."
            />
        </div>
    );
};

export default ZipCodeFilter;