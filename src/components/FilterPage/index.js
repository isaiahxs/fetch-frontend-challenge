import React, { useState, useEffect } from 'react';
import './FilterPage.css';

export default function FilterPage() {
    const [filters, setFilters] = useState({});
    const [results, setResults] = useState([]);

    // Fetching initial data, or setting up API calls to get filters
    useEffect(() => {
        // const getFilters = async () => {
        //     const response = await fetch('http://localhost:5000/api/filters');
        //     const data = await response.json();
        //     setFilters(data);
        // };

        // getFilters();

        // API calls or Redux actions
    }, []);

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
        </div>
    )
}