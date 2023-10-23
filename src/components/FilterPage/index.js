import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FilterPage.css';

export default function FilterPage() {
    const [filters, setFilters] = useState({});
    const [results, setResults] = useState([]);

    const [resultIds, setResultIds] = useState([]);
    const [dogDetails, setDogDetails] = useState([]);

    const [availableBreeds, setAvailableBreeds] = useState([]);
    const [selectedBreeds, setSelectedBreeds] = useState(new Set());

    useEffect(() => {
        axios.get('https://frontend-take-home-service.fetch.com/dogs/breeds', { withCredentials: true })
            .then(response => {
                setAvailableBreeds(response.data);
            })
            .catch(error => {
                console.error('Error fetching available breeds:', error);
            });
    }, []);

    const handleCheckboxChange = (breed) => {
        const newSelectedBreeds = new Set(selectedBreeds);
        if (newSelectedBreeds.has(breed)) {
            newSelectedBreeds.delete(breed);
        } else {
            newSelectedBreeds.add(breed);
        }
        setSelectedBreeds(newSelectedBreeds);
    };

    const fetchData = () => {
        console.log('SELECTED BREEDS', selectedBreeds)

        const quickTest = Array.from(selectedBreeds)
        console.log('QUICK TEST', quickTest);

        const breedParams = Array.from(selectedBreeds)
            .map(breed => `breeds=${encodeURIComponent(breed)}`)
            .join('&');
        const url = `https://frontend-take-home-service.fetch.com/dogs/search?${breedParams}`;
        console.log('THIS IS THE URL', url);

        axios.get(url, { withCredentials: true })
            .then(response => {
                console.log('RESPONSE DATAAAAAAAA', response.data)
                setResultIds(response.data.resultIds);
            })
            .catch(error => {
                console.error('Error fetching available breeds:', error);
            });
    };

    // const fetchData = () => {
    //     // Fetch resultIds
    //     axios.get('https://frontend-take-home-service.fetch.com/dogs/search?breeds=Beagle', { withCredentials: true })
    //         .then(response => {
    //             console.log('to see what happens in the .then');
    //             console.log('DATA RESULT IDS', response.data.resultIds);
    //             setResultIds(response.data.resultIds);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching resultIds:', error);
    //             console.error('Error Details:', error.response);
    //         });
    // }

    useEffect(() => {
        if (resultIds.length > 0) {
            axios.post('https://frontend-take-home-service.fetch.com/dogs', resultIds, { withCredentials: true })
                .then(response => {
                    setDogDetails(response.data);
                    console.log('RESPONSE DATA', response.data)
                    console.log('DOG DETAILS', dogDetails);
                })
                .catch(error => {
                    console.error('Error fetching dog details:', error);
                });
        }
    }, [resultIds]);

    // Update whenever a filter is applied
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        // Update your results based on the filters
    };

    return (
        <div className="filter-page">
            <header className="filter-page-header">
                <h1>Find Your Pet</h1>
            </header>

            <button onClick={fetchData}>Fetch Dogs</button>

            <div className="filter-page-content">
                <aside className="filter-sidebar">
                    <h2>Filters</h2>
                    {availableBreeds.map((breed, index) => (
                        <label key={index}>
                            <input
                                type="checkbox"
                                value={breed}
                                onChange={() => handleCheckboxChange(breed)}
                            />
                            {breed}
                        </label>
                    ))}
                </aside>

                <main className="filter-results">
                    <h2>Results</h2>
                    <div>
                        {dogDetails.map((dog, index) => (
                            <div key={dog.id || index} className="dog-card">
                                <img src={dog.img} alt={`${dog.name} picture`} />
                                <p>Name: {dog.name}</p>
                                <p>Age: {dog.age}</p>
                                <p>Breed: {dog.breed}</p>
                            </div>
                        ))}
                    </div>
                </main>
            </div>


        </div>
    )
}