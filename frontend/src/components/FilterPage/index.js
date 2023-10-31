import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FilterSidebar } from '../FilterSidebar';
import { DogCard } from '../DogCard';
import { useFetchBreeds } from './Hooks/useFetchBreeds';
import { usePagination } from './Hooks/usePagination';
import './FilterPage.css';

export default function FilterPage() {
    const [filters, setFilters] = useState({});

    const [availableBreeds, setAvailableBreeds] = useFetchBreeds();
    const [selectedBreeds, setSelectedBreeds] = useState(new Set());

    const [dogDetails, setDogDetails] = useState([]);
    const [showBreeds, setShowBreeds] = useState(false);
    const [pageSize, setPageSize] = useState(25); // The number of results to fetch per request
    const [sortOrder, setSortOrder] = useState('asc'); // Sort order

    const { currentPage, setCurrentPage, totalResults, setTotalResults, fetchNextPage, fetchPreviousPage, resultIds, setResultIds, nextQuery, setNextQuery, prevQuery, setPrevQuery } = usePagination();

    const X = (currentPage - 1) * pageSize + 1;
    const Y = Math.min(currentPage * pageSize, totalResults);

    const toggleShowBreeds = () => {
        setShowBreeds(!showBreeds);
    }

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
        const breedParams = Array.from(selectedBreeds)
            .map(breed => `breeds=${encodeURIComponent(breed)}`)
            .join('&');

        // const sortParam = 'sort=breed:asc'; //for ascending order (a-z)
        const sortParam = `sort=breed:${sortOrder}`;

        const url = `https://frontend-take-home-service.fetch.com/dogs/search?${breedParams}&${sortParam}`;

        axios.get(url, { withCredentials: true })
            .then(response => {
                setResultIds(response.data.resultIds);
                setNextQuery(response.data.next);
                setPrevQuery(response.data.prev);
                setCurrentPage(1);
                setTotalResults(response.data.total);
            })
            .catch(error => {
                console.error('Error fetching available breeds:', error);
            });
    };

    useEffect(() => {
        if (resultIds.length > 0) {
            axios.post('https://frontend-take-home-service.fetch.com/dogs', resultIds, { withCredentials: true })
                .then(response => {
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
    };

    return (
        <div className="filter-page">
            <header className="filter-page-header">
                <h1>Find your pet today!</h1>
            </header>

            <button className='search-button' onClick={fetchData}>Fetch Dogs</button>

            <div className="filter-page-content">

                <FilterSidebar
                    availableBreeds={availableBreeds}
                    handleCheckboxChange={handleCheckboxChange}
                    toggleShowBreeds={toggleShowBreeds}
                    showBreeds={showBreeds}
                    selectedBreeds={selectedBreeds}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                />

                <main className="filter-results">
                    <h2 className="filter-page-header">Results</h2>
                    <div>
                        Showing {X} - {Y} out of {totalResults} total
                    </div>
                    <div className='pagination-buttons second-pagination-buttons'>
                        <button className='previous-page-button' onClick={fetchPreviousPage} disabled={!prevQuery}>Previous</button>
                        <button className='next-page-button' onClick={fetchNextPage} disabled={!nextQuery || Y >= totalResults}>Next</button>
                    </div>

                    <div className='results-list'>
                        {dogDetails.map((dog, index) => (
                            <DogCard dog={dog} key={index} />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    )
}