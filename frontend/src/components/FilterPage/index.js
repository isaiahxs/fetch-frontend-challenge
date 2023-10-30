import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FilterSidebar } from '../FilterSidebar';
import { DogCard } from '../DogCard';
import { useFetchBreeds, useFetchDogs } from './dogDataHooks';
import { PaginationButtons } from '../PaginationButtons';
import './FilterPage.css';

export default function FilterPage() {
    const [filters, setFilters] = useState({});
    const [results, setResults] = useState([]);

    const [availableBreeds, setAvailableBreeds] = useFetchBreeds();

    const [selectedBreeds, setSelectedBreeds] = useState(new Set());

    const { resultIds, setResultIds, nextQuery, setNextQuery, prevQuery, setPrevQuery } = useFetchDogs(selectedBreeds);

    const [dogDetails, setDogDetails] = useState([]);

    const [showBreeds, setShowBreeds] = useState(false);

    const [pageSize, setPageSize] = useState(25); // The number of results to fetch per request
    const [sortOrder, setSortOrder] = useState('asc'); // Sort order

    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

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
        // console.log('SELECTED BREEDS', selectedBreeds)

        // const quickTest = Array.from(selectedBreeds)
        // console.log('QUICK TEST', quickTest);

        const breedParams = Array.from(selectedBreeds)
            .map(breed => `breeds=${encodeURIComponent(breed)}`)
            .join('&');
        const url = `https://frontend-take-home-service.fetch.com/dogs/search?${breedParams}`;
        // console.log('THIS IS THE URL', url);

        axios.get(url, { withCredentials: true })
            .then(response => {
                setResultIds(response.data.resultIds);
                setNextQuery(response.data.next); // set the next query
                setPrevQuery(response.data.prev); // set the previous query
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
                    // console.log('POST RESPONSE DATA', response.data)
                    // console.log('DOG DETAILS', dogDetails);
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

    useEffect(() => {
        fetchData();
    }, [selectedBreeds]);

    const fetchNextPage = () => {
        if (nextQuery) {
            const fullNextUrl = `https://frontend-take-home-service.fetch.com${nextQuery}`;
            axios.get(fullNextUrl, { withCredentials: true })
                .then(response => {
                    setResultIds(response.data.resultIds);
                    setNextQuery(response.data.next);
                    setPrevQuery(response.data.prev);
                    setCurrentPage(currentPage + 1);
                    setTotalResults(response.data.total);
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
                    setCurrentPage(currentPage - 1);
                    setTotalResults(response.data.total);
                })
                .catch(error => {
                    console.error('Error fetching previous page:', error);
                });
        }
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
                />

                <main className="filter-results">
                    <h2 className="filter-page-header">Results</h2>
                    <div>
                        Showing {X} - {Y} out of {totalResults} total
                    </div>
                    <PaginationButtons
                        nextQuery={nextQuery}
                        prevQuery={prevQuery}
                        fetchNextPage={fetchNextPage}
                        fetchPreviousPage={fetchPreviousPage}
                    />
                    <div className='results-list'>
                        {dogDetails.map((dog, index) => (
                            <DogCard dog={dog} key={index} />
                        ))}
                    </div>
                </main>

                <PaginationButtons
                    className='second-pagination-buttons'
                    nextQuery={nextQuery}
                    prevQuery={prevQuery}
                    fetchNextPage={fetchNextPage}
                    fetchPreviousPage={fetchPreviousPage}
                />
            </div>
        </div>
    )
}