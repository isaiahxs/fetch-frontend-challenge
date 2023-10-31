import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { BreedFilter } from '../BreedFilter';
import { DogCard } from '../DogCard';
import { FavoritesFilter } from '../FavoritesFilter';
import { AlphabeticalFilter } from '../AlphabeticalFilter';

import { useFetchBreeds } from './Hooks/useFetchBreeds';
import { usePagination } from './Hooks/usePagination';

import './FilterPage.css';

export default function FilterPage() {
    const [dogDetails, setDogDetails] = useState([]);
    const [pageSize, setPageSize] = useState(25); // The number of results to fetch per request
    const [sortOrder, setSortOrder] = useState('asc'); // Sort order


    const [selectedBreeds, setSelectedBreeds] = useState(new Set());
    const [favorites, setFavorites] = useState(new Set());


    const [availableBreeds, setAvailableBreeds] = useFetchBreeds();

    const { currentPage, setCurrentPage, totalResults, setTotalResults, fetchNextPage, fetchPreviousPage, resultIds, setResultIds, nextQuery, setNextQuery, prevQuery, setPrevQuery } = usePagination();


    const X = (currentPage - 1) * pageSize + 1;
    const Y = Math.min(currentPage * pageSize, totalResults);
    const totalPages = Math.ceil(totalResults / pageSize);

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

    return (
        <div className="filter-page">
            <header className="filter-page-header">
                <h1>Find your pet today!</h1>
            </header>

            <button className='search-button' onClick={fetchData}>Fetch Dogs</button>

            <div className="filter-page-content">

                <aside className="filter-sidebar">
                    <h2 className='filter-page-header'>Filters</h2>
                    <AlphabeticalFilter
                        sortOrder={sortOrder}
                        setSortOrder={setSortOrder}
                    />

                    <BreedFilter
                        availableBreeds={availableBreeds}
                        selectedBreeds={selectedBreeds}
                        setSelectedBreeds={setSelectedBreeds}
                    />

                    <FavoritesFilter
                        favorites={favorites}
                        allDogs={dogDetails}
                    />
                </aside>

                <main className="filter-results">
                    <h2 className="filter-page-header">Results</h2>
                    {totalResults > 0 &&
                        <>
                            <div className='results-header'>
                                Showing {X} - {Y} out of {totalResults} total
                            </div>
                            <div className='page-count-header'>
                                (Page {currentPage} of {totalPages})
                            </div>
                        </>
                    }

                    {totalResults === 0 &&
                        <div className='results-header'>
                            Showing {X - 1} - {Y} out of {totalResults} total
                        </div>
                    }
                    <div className='pagination-buttons second-pagination-buttons'>
                        <button className='previous-page-button' onClick={fetchPreviousPage} disabled={!prevQuery}>Previous</button>
                        <button className='next-page-button' onClick={fetchNextPage} disabled={!nextQuery || Y >= totalResults}>Next</button>
                    </div>

                    <div className='results-list'>
                        {dogDetails.map((dog, index) => (
                            <DogCard dog={dog} favorites={favorites} setFavorites={setFavorites} key={index} />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    )
}