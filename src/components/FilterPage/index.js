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

    const [showBreeds, setShowBreeds] = useState(false);

    const [pageSize, setPageSize] = useState(25); // The number of results to fetch per request
    const [sortOrder, setSortOrder] = useState('asc'); // Sort order
    const [nextQuery, setNextQuery] = useState(null); // The query to fetch the next set of results
    const [prevQuery, setPrevQuery] = useState(null); // The query to fetch the previous set of results

    const toggleShowBreeds = () => {
        setShowBreeds(!showBreeds);
    }

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
        console.log('NEW SELECTED BREEDS', newSelectedBreeds);
        if (newSelectedBreeds.has(breed)) {
            newSelectedBreeds.delete(breed);
        } else {
            newSelectedBreeds.add(breed);
        }
        setSelectedBreeds(newSelectedBreeds);
    };

    const fetchData = () => {
        // console.log('SELECTED BREEDS', selectedBreeds)

        // const quickTest = Array.from(selectedBreeds)
        // console.log('QUICK TEST', quickTest);

        const breedParams = Array.from(selectedBreeds)
            .map(breed => `breeds=${encodeURIComponent(breed)}`)
            .join('&');
        const url = `https://frontend-take-home-service.fetch.com/dogs/search?${breedParams}`;
        console.log('THIS IS THE URL', url);

        axios.get(url, { withCredentials: true })
            .then(response => {
                console.log('GET RESPONSE DATA', response.data);
                setResultIds(response.data.resultIds);
                console.log('NEXT DATA', response.data.next)
                setNextQuery(response.data.next); // set the next query
                console.log('PREVIOUS DATA', response.data.prev)
                setPrevQuery(response.data.prev); // set the previous query
            })
            .catch(error => {
                console.error('Error fetching available breeds:', error);
            });
    };

    // useEffect(() => {
    //     console.log("Result IDs changed: ", resultIds);
    //     console.log("Dog Details changed: ", dogDetails);
    // }, [resultIds, dogDetails]);

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
                    console.log('POST RESPONSE DATA', response.data)
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

    const fetchNextPage = () => {
        if (nextQuery) {
            const fullNextUrl = `https://frontend-take-home-service.fetch.com${nextQuery}`;
            axios.get(fullNextUrl, { withCredentials: true })
                .then(response => {
                    setResultIds(response.data.resultIds);
                    setNextQuery(response.data.next);
                    setPrevQuery(response.data.prev);
                })
                .catch(error => {
                    console.error('Error fetching next page:', error);
                });
        }
    };

    const fetchPreviousPage = () => {
        if (prevQuery) {
            const fullPrevUrl = `https://frontend-take-home-service.fetch.com${prevQuery}`;
            axios.get(fullPrevUrl, { withCredentials: true })
                .then(response => {
                    setResultIds(response.data.resultIds);
                    setNextQuery(response.data.next);
                    setPrevQuery(response.data.prev);
                })
                .catch(error => {
                    console.error('Error fetching previous page:', error);
                });
        }
    };

    return (
        <div className="filter-page">
            <header className="filter-page-header">
                <h1>Find Your Pet</h1>
            </header>

            <button className='search-button' onClick={fetchData}>Fetch Dogs</button>

            <div className="filter-page-content">
                <aside className="filter-sidebar">
                    <h2>Filters</h2>
                    <div>
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
                                        />
                                        <p className='dropdown-text'>
                                            {breed}
                                        </p>

                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                </aside>

                <main className="filter-results">
                    <h2>Results</h2>
                    <div>
                        {dogDetails.map((dog, index) => (
                            <div key={dog.id || index} className="dog-card">
                                <img src={dog.img} className='dog-picture' alt={`${dog.name} picture`} />
                                <div className='section-under-picture'>
                                    <p>Name: {dog.name}</p>
                                    <p>Age: {dog.age}</p>
                                    <p>Breed: {dog.breed}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>

                <button onClick={fetchNextPage} disabled={!nextQuery}>Next</button>
                <button onClick={fetchPreviousPage} disabled={!prevQuery}>Previous</button>
            </div>
        </div>
    )
}