import React, { useEffect, useState, useContext } from 'react';
import './StatesFilter.css';
import { useFilters } from '../../FilterContext';
import axios from 'axios';

export const StatesFilter = () => {
    const { states, setStates, newZips, setNewZips } = useFilters();
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e) => {
        setInputValue(e.target.value);

        const stateCodes = e.target.value.split(',')
            .map(code => code.trim().toUpperCase()) //trim whitespace and convert to uppercase
            .filter(code => code.length === 2); //only allow 2-character codes

        setStates(stateCodes);
    };

    const handleSubmit = () => {
        axios.post('https://frontend-take-home-service.fetch.com/locations/search', { states }, { withCredentials: true })
            .then(response => {
                // console.log(response.data.results);
                const zipCodes = response.data.results.map(location => location.zip_code);

                setNewZips(zipCodes);
                // console.log(newZips);
                // console.log(zipCodes);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const extractZipCodes = (data) => {
        //extract and return zip codes from data
    };

    return (
        <div className='states-filter-section'>
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                placeholder="CA, NY, TX..."
            />
            <button className='states-button' onClick={handleSubmit}>Set State</button>
        </div>
    )
}