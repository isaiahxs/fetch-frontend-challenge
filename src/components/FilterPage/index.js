import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FilterPage.css';

export default function FilterPage() {
    const [filters, setFilters] = useState({});
    const [results, setResults] = useState([]);

    const [resultIds, setResultIds] = useState([]);
    const [dogDetails, setDogDetails] = useState([]);

    const fetchData = () => {
        // Fetch resultIds
        axios.get('https://frontend-take-home-service.fetch.com/dogs/search?breeds=Beagle', { withCredentials: true })
            .then(response => {
                console.log('to see what happens in the .then');
                console.log('DATA RESULT IDS', response.data.resultIds);
                setResultIds(response.data.resultIds);
            })
            .catch(error => {
                console.error('Error fetching resultIds:', error);
                console.error('Error Details:', error.response);
            });
    }

    useEffect(() => {
        if (resultIds.length > 0) {
            axios.post('https://frontend-take-home-service.fetch.com/dogs', { ids: resultIds.slice(0, 3) }, { withCredentials: true })  // Object
                .then(response => {
                    console.log('RESPONSE DATA', response.data)
                    setDogDetails(response.data);
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
                    {/* Will include your filter components here */}
                    {/* Will pass handleFilterChange to update filters */}
                </aside>

                <main className="filter-results">
                    <h2>Results</h2>
                    {/* Map over results and render pet cards or components */}
                    {results.map((result, index) => (
                        <div key={index}>
                            {/* Individual result component */}
                        </div>
                    ))}
                </main>
            </div>

            <div>
                {dogDetails.map(dog => (
                    <div key={dog.id}>
                        <img src={dog.img} alt={dog.name} />
                        <p>{dog.name}</p>
                        <p>{dog.age}</p>
                        <p>{dog.breed}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}