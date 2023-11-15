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
    const [ageMin, setAgeMin] = useState(0);
    const [ageMax, setAgeMax] = useState(15);

    // ------------------ PAGINATION STATE VARIABLES ------------------
    const [resultIds, setResultIds] = useState([]);
    const [nextQuery, setNextQuery] = useState(null);
    const [prevQuery, setPrevQuery] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    // useEffect(() => {
    //     // fetchData should be called when the relevant filter states change
    //     fetchData();
    // }, [selectedBreeds, selectedZipCodes, ageMin, ageMax, sortOrder]);
    // ------------------ FETCH DOGS AFTER FILTERS ------------------
    const fetchData = () => {
        setTotalResults([]);
        setResultIds([]);
        setAllDogs([]);
        // setAllFetchedDogs([]);
        setSelectedZipCodes([]);
        // setAgeMin('');
        // setAgeMax('');

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

                if (response.data.total === 0) {
                    alert("Sorry, no dogs were found with those filters! Check that the minimum age is less than maximum age and that your zip code has 5 digits!")
                }
            })
            .catch(error => {
                console.error('Error fetching available breeds:', error);
            });
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        if (resultIds.length > 0) {
            axios.post('https://frontend-take-home-service.fetch.com/dogs', resultIds, { withCredentials: true })
                .then(response => {
                    setAllDogs(response.data);
                    console.log('ALL DOGS', allDogs);
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
            <header className='filter-header'>
                <h1 className="filter-page-header">Find your pet today!</h1>
                <h2 className='filter-page-header'>After you've selected your desired filters, click the Fetch Dogs button!</h2>
            </header>

            <div className="filter-page-content">
                <h2 className='filter-page-header'>Filters</h2>
                <aside className="filters-container">
                    <BreedFilter
                        availableBreeds={availableBreeds}
                        setAvailableBreeds={setAvailableBreeds}
                        selectedBreeds={selectedBreeds}
                        setSelectedBreeds={setSelectedBreeds}
                    />

                    <div>
                        <div className='sorted-zip-section'>
                            <AlphabeticalFilter
                                sortOrder={sortOrder}
                                setSortOrder={setSortOrder}
                            />


                            <ZipCodeFilter
                                selectedZipCodes={selectedZipCodes}
                                setSelectedZipCodes={setSelectedZipCodes}
                            />
                        </div>

                        <AgeFilter
                            ageMin={ageMin}
                            ageMax={ageMax}
                            setAgeMin={setAgeMin}
                            setAgeMax={setAgeMax}
                        />
                    </div>

                </aside>

                <button className='search-button' onClick={fetchData}>Fetch Dogs</button>

                {allFetchedDogs.length > 0 && (
                    <>
                        <h2 className='filter-page-header'>Once you've added some favorites, click Find My Match to meet the pup you were matched with!</h2>

                        <FavoritesFilter
                            allFetchedDogs={allFetchedDogs}
                            favorites={favorites}
                            setFavorites={setFavorites}
                        />
                    </>
                )}

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

                    <button className='scroll-to-top-button' onClick={scrollToTop}>Back to Top</button>

                </main>
            </div>
        </div>
    )
}