import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BreedFilter } from './Filters/BreedFilter';
import { DogCard } from './DogCard';
import { FavoritesFilter } from './Filters/FavoritesFilter';
import { AlphabeticalFilter } from './Filters/AlphabeticalFilter';
import { ZipCodeFilter } from './Filters/ZipCodeFilter';
import AgeFilter from './Filters/AgeFilter';
import { Pagination } from '../FilterPage/Pagination';

import './FilterPage.css';

export default function FilterPage() {
    const [allDogs, setAllDogs] = useState([]);
    const [allFetchedDogs, setAllFetchedDogs] = useState([]);

    const [pageSize, setPageSize] = useState(25); // The number of results to fetch per request

    // ------------------ FILTER STATE VARIABLES ------------------
    const [sortOrder, setSortOrder] = useState('asc'); // Sort order

    const [availableBreeds, setAvailableBreeds] = useState([]);


    const [selectedBreeds, setSelectedBreeds] = useState(new Set());
    const [favorites, setFavorites] = useState(new Set());
    const [selectedZipCodes, setSelectedZipCodes] = useState(new Set());
    const [ageMin, setAgeMin] = useState('');
    const [ageMax, setAgeMax] = useState('');

    // ------------------ PAGINATION STATE VARIABLES ------------------
    const [resultIds, setResultIds] = useState([]);
    const [nextQuery, setNextQuery] = useState(null);
    const [prevQuery, setPrevQuery] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    // ------------------ FETCH DOGS AFTER FILTERS ------------------
    const fetchData = () => {
        const sortParam = `sort=breed:${sortOrder}`;

        const breedParams = Array.from(selectedBreeds)
            .map(breed => `breeds=${encodeURIComponent(breed)}`)
            .join('&');

        const zipCodeParams = Array.from(selectedZipCodes)
            .map(zipCode => `zipCodes=${encodeURIComponent(zipCode)}`)
            .join('&');

        const ageParams = [];
        if (ageMin) {
            ageParams.push(`ageMin=${encodeURIComponent(ageMin)}`);
        }

        if (ageMax) {
            ageParams.push(`ageMax=${encodeURIComponent(ageMax)}`);
        }

        const url = `https://frontend-take-home-service.fetch.com/dogs/search?${breedParams}&${zipCodeParams}&${ageParams.join('&')}&${sortParam}`;

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
                    setAllDogs(response.data);
                    setAllFetchedDogs(prevDogs => [...new Set([...prevDogs, ...response.data])]);
                    console.log('ALL FETCHED DOGS', allFetchedDogs);
                })
                .catch(error => {
                    console.error('Error fetching dog details:', error);
                });
        }
    }, [resultIds]);

    return (
        <div className="filter-page">
            <header>
                <h1 className="filter-page-header">Find your pet today!</h1>
                <h2 className='filter-page-header'>After you've selected your desired filters, click the Fetch Dogs button!</h2>
            </header>

            <div className="filter-page-content">
                <aside className="filter-sidebar">
                    <h2 className='filter-page-header'>Filters</h2>
                    <AlphabeticalFilter
                        sortOrder={sortOrder}
                        setSortOrder={setSortOrder}
                    />

                    <BreedFilter
                        availableBreeds={availableBreeds}
                        setAvailableBreeds={setAvailableBreeds}
                        selectedBreeds={selectedBreeds}
                        setSelectedBreeds={setSelectedBreeds}
                    />

                    <ZipCodeFilter
                        selectedZipCodes={selectedZipCodes}
                        setSelectedZipCodes={setSelectedZipCodes}
                    />

                    <AgeFilter
                        ageMin={ageMin}
                        ageMax={ageMax}
                        setAgeMin={setAgeMin}
                        setAgeMax={setAgeMax}
                    />

                    <button className='search-button' onClick={fetchData}>Fetch Dogs</button>

                    {allFetchedDogs.length > 0 && (
                        <>
                            <h2 className='filter-page-header'>Once you've added some favorites, you can click Find My Match to meet the pup you were matched with!</h2>

                            <FavoritesFilter
                                allFetchedDogs={allFetchedDogs}
                                favorites={favorites}
                                setFavorites={setFavorites}
                            />
                        </>
                    )}
                </aside>

                <main className="filter-results">

                    <Pagination
                        pageSize={pageSize}
                        setPageSize={setPageSize}

                        resultIds={resultIds}
                        setResultIds={setResultIds}

                        nextQuery={nextQuery}
                        setNextQuery={setNextQuery}

                        prevQuery={prevQuery}
                        setPrevQuery={setPrevQuery}

                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}

                        totalResults={totalResults}
                        setTotalResults={setTotalResults}
                    />

                    <div className='results-list'>
                        {allDogs.map((dog, index) => (
                            <DogCard
                                dog={dog}
                                key={index}
                                favorites={favorites}
                                setFavorites={setFavorites}
                            />
                        ))}
                    </div>

                </main>
            </div>
        </div>
    )
}