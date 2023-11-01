import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { BreedFilter } from '../BreedFilter';
import { DogCard } from '../DogCard';
import { FavoritesFilter } from '../FavoritesFilter';
import { AlphabeticalFilter } from '../AlphabeticalFilter';
import { ZipCodeFilter } from '../ZipCodeFilter';

import { useFetchBreeds } from './Hooks/useFetchBreeds';
import { usePagination } from './Hooks/usePagination';

import './FilterPage.css';

export default function FilterPage() {
    const navigate = useNavigate();
    const [allDogs, setAllDogs] = useState([]);
    const [allFetchedDogs, setAllFetchedDogs] = useState([]);

    const [pageSize, setPageSize] = useState(25); // The number of results to fetch per request
    const [sortOrder, setSortOrder] = useState('asc'); // Sort order


    const [selectedBreeds, setSelectedBreeds] = useState(new Set());
    const [favorites, setFavorites] = useState(new Set());
    const [selectedZipCodes, setSelectedZipCodes] = useState(new Set());


    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(Array.from(favorites)));
    }, [favorites]);

    useEffect(() => {
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            setFavorites(new Set(JSON.parse(storedFavorites)));
        }
    }, []);

    const [availableBreeds, setAvailableBreeds] = useFetchBreeds();

    const { currentPage, setCurrentPage, totalResults, setTotalResults, fetchNextPage, fetchPreviousPage, resultIds, setResultIds, nextQuery, setNextQuery, prevQuery, setPrevQuery } = usePagination();


    const X = (currentPage - 1) * pageSize + 1;
    const Y = Math.min(currentPage * pageSize, totalResults);
    const totalPages = Math.ceil(totalResults / pageSize);

    const fetchData = () => {
        const breedParams = Array.from(selectedBreeds)
            .map(breed => `breeds=${encodeURIComponent(breed)}`)
            .join('&');

        const zipCodeParams = Array.from(selectedZipCodes)
            .map(zipCode => `zipCodes=${encodeURIComponent(zipCode)}`)
            .join('&');

        // const sortParam = 'sort=breed:asc'; //for ascending order (a-z)
        const sortParam = `sort=breed:${sortOrder}`;

        // const url = `https://frontend-take-home-service.fetch.com/dogs/search?${breedParams}&${sortParam}`;

        const url = `https://frontend-take-home-service.fetch.com/dogs/search?${breedParams}&${zipCodeParams}&${sortParam}`;

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

    const generateMatch = async () => {
        const favoritedDogIds = Array.from(favorites);
        if (favoritedDogIds.length === 0) {
            alert("Looks like you don't have any favorites yet!");
        }

        try {
            const response = await axios.post("https://frontend-take-home-service.fetch.com/dogs/match", favoritedDogIds, { withCredentials: true });

            const matchId = response.data.match;

            // alert(`Your Match Dog ID is ${matchId}`);

            const detailResponse = await axios.post('https://frontend-take-home-service.fetch.com/dogs', [matchId], { withCredentials: true });
            const matchDetails = detailResponse.data[0];
            console.log('MATCH DETAILS', matchDetails);

            navigate('/match', { state: { matchDetails } });

        } catch (error) {
            console.error("Error generating match:", error);
        }
    };

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
                        selectedBreeds={selectedBreeds}
                        setSelectedBreeds={setSelectedBreeds}
                    />

                    <ZipCodeFilter selectedZipCodes={selectedZipCodes} setSelectedZipCodes={setSelectedZipCodes} />

                    <button className='search-button' onClick={fetchData}>Fetch Dogs</button>

                    {allFetchedDogs.length > 0 && (
                        <>
                            <h2 className='filter-page-header'>Once you've added some favorites, you can click Find My Match to meet the pup you were matched with!</h2>

                            <FavoritesFilter
                                allFetchedDogs={allFetchedDogs}
                                favorites={favorites}
                                setFavorites={setFavorites}
                            />

                            <button className='my-match-button' onClick={generateMatch}>Find My Match</button>
                        </>
                    )}
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