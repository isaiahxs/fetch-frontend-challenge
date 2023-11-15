import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BreedFilter } from './Filters/BreedFilter';
import { DogCard } from './DogCard';
import { FavoritesFilter } from './Filters/FavoritesFilter';
import { AlphabeticalFilter } from './Filters/AlphabeticalFilter';
import { ZipCodeFilter } from './Filters/ZipCodeFilter';
import AgeFilter from './Filters/AgeFilter';
import { Pagination } from '../FilterPage/Pagination';
import { SizeFilter } from '../FilterPage/Filters/SizeFilter';
import { StatesFilter } from '../FilterPage/Filters/StatesFilter';
import { useFilters } from './FilterContext';

import './FilterPage.css';

export default function FilterPage() {

    const {
        allDogs,
        setAllDogs,
        allFetchedDogs,
        setAllFetchedDogs,
        selectedBreeds,
        setTotalResults,
        setNextQuery,
        setCurrentPage,
        resultIds,
        setResultIds,
        selectedZipCodes,
        setSelectedZipCodes,
        ageMin,
        ageMax,
        sortOrder,
        pageSize,
        newZips,
        setNewZips
    } = useFilters();

    // ------------------ FETCH DOGS AFTER FILTERS ------------------
    // encodeURIComponent so we can encode special characters within the query part of theURL without breaking code and encode non-ASCII characters like &, =, +, and %
    const fetchData = () => {
        setTotalResults([]);
        setResultIds([]);
        setAllDogs([]);
        setNewZips([]);
        // setAllFetchedDogs([]);
        setSelectedZipCodes([]);
        // setAgeMin('');
        // setAgeMax('');

        const sortParam = `sort=breed:${sortOrder}`;

        //['Affenpinscher', 'Afghan Hound']
        const breedParams = Array.from(selectedBreeds)
            .map(breed => `breeds=${encodeURIComponent(breed)}`)
            .join('&');

        //--------------
        // ['59451', '98701']
        // const zipCodeParams = Array.from(selectedZipCodes)
        //     .map(zipCode => `zipCodes=${encodeURIComponent(zipCode)}`)
        //     .join('&');

        const selectedZipArray = Array.from(selectedZipCodes);
        console.log(selectedZipArray);

        console.log(newZips);
        //check if newZips has elements, if it does, use newZips for the zip code parameters, if not, fall back to selectedZipCodes
        const zipCodesToUse = newZips.length > 0 ? newZips : selectedZipArray;

        const zipCodeParams = zipCodesToUse
            .map(zipCode => `zipCodes=${encodeURIComponent(zipCode)}`)
            .join('&');
        //--------------

        const ageParams = [];
        if (ageMin) {
            ageParams.push(`ageMin=${encodeURIComponent(ageMin)}`);
        }

        if (ageMax) {
            ageParams.push(`ageMax=${encodeURIComponent(ageMax)}`);
        }

        const size = `size=${pageSize}`;

        const url = `https://frontend-take-home-service.fetch.com/dogs/search?${breedParams}&${zipCodeParams}&${ageParams.join('&')}&${sortParam}&${size}`;

        axios.get(url, { withCredentials: true })
            .then(response => {
                // console.log(response);
                setResultIds(response.data.resultIds);
                setNextQuery(response.data.next);
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

    //make POST to /dogs to retrieve dog objects. we will need to keep track of dog id's because we will then use it in our favorites component
    useEffect(() => {
        if (resultIds.length > 0) {
            axios.post('https://frontend-take-home-service.fetch.com/dogs', resultIds, { withCredentials: true })
                .then(response => {
                    setAllDogs(response.data);
                    console.log('ALL DOGS', allDogs);

                    //set is referring to object references instead of individual dog id's so the dog objects can appear multiple times right now

                    setAllFetchedDogs(prevDogs => [...new Set([...prevDogs, ...response.data])]);
                    console.log('ALL FETCHED DOGS', allFetchedDogs);

                    // setAllFetchedDogs(prevDogs => {
                    //     const updatedDogs = new Map(prevDogs);
                    //     response.data.forEach(dog => updatedDogs.set(dog.id, dog));
                    //     return updatedDogs;
                    // });
                    // console.log(allFetchedDogs);
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
                    <BreedFilter />
                    <div>
                        <div className='sorted-zip-section'>
                            <AlphabeticalFilter />
                            <ZipCodeFilter />
                        </div>
                        <AgeFilter />
                    </div>
                </aside>

                <SizeFilter />

                <button className='search-button' onClick={fetchData}>
                    Fetch Dogs
                </button>

                <StatesFilter />

                {allFetchedDogs.length > 0 && (
                    <>
                        <h2 className='filter-page-header'>Once you've added some favorites, click Find My Match to meet the pup you were matched with!</h2>
                        <FavoritesFilter />
                    </>
                )}

                <main className="filter-results">
                    <Pagination />
                    <div className='results-list'>
                        {allDogs.map((dog, index) => (
                            <DogCard
                                dog={dog}
                                key={index}
                            />
                        ))}
                    </div>

                    <button
                        className='scroll-to-top-button'
                        onClick={scrollToTop}
                    >
                        Back to Top
                    </button>
                </main>
            </div>
        </div>
    )
}