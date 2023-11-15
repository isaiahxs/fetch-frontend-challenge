import React, { createContext, useState, useContext } from 'react';

const FilterContext = createContext();

export const useFilters = () => useContext(FilterContext);

export const FilterProvider = ({ children }) => {
    // all dogs state variables
    const [allDogs, setAllDogs] = useState([]);
    const [allFetchedDogs, setAllFetchedDogs] = useState([]);

    // favorites state variables
    const [favorites, setFavorites] = useState(new Set());

    // breeds state variables
    const [availableBreeds, setAvailableBreeds] = useState([]);
    const [selectedBreeds, setSelectedBreeds] = useState(new Set());

    // pagination state variables
    const [pageSize, setPageSize] = useState(25); // The number of results to fetch per request

    const [nextQuery, setNextQuery] = useState(null);
    const [prevQuery, setPrevQuery] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [resultIds, setResultIds] = useState([]);

    // zip code state variables
    const [selectedZipCodes, setSelectedZipCodes] = useState(new Set());

    // age state variables
    const [ageMin, setAgeMin] = useState(0);
    const [ageMax, setAgeMax] = useState(15);

    // alphabetical filter state variables
    const [sortOrder, setSortOrder] = useState('asc'); // Sort order

    // state (like NY or CA) variables
    const [states, setStates] = useState([]);
    const [newZips, setNewZips] = useState([]);


    return (
        <FilterContext.Provider
            value={{
                // all dogs
                allDogs,
                setAllDogs,
                allFetchedDogs,
                setAllFetchedDogs,

                // favorites filters
                favorites,
                setFavorites,

                // breeds filters
                availableBreeds,
                setAvailableBreeds,
                selectedBreeds,
                setSelectedBreeds,

                // pagination filters
                pageSize,
                setPageSize,
                nextQuery,
                setNextQuery,
                prevQuery,
                setPrevQuery,
                currentPage,
                setCurrentPage,
                totalResults,
                setTotalResults,
                resultIds,
                setResultIds,

                // zip code filters
                selectedZipCodes,
                setSelectedZipCodes,

                // age filters
                ageMin,
                setAgeMin,
                ageMax,
                setAgeMax,

                // alphabetical filters
                sortOrder,
                setSortOrder,

                // state filters
                states,
                setStates,
                newZips,
                setNewZips
            }}>
            {children}
        </FilterContext.Provider>
    )
};

// A utility function to compose multiple providers
// const combineProviders = (...components) => components.reduce(
//     (AccumulatedComponents, CurrentComponent) =>
//       ({ children }) =>
//         <AccumulatedComponents>
//           <CurrentComponent>
//             {children}
//           </CurrentComponent>
//         </AccumulatedComponents>
//   , ({ children }) => <>{children}</>);

//   const CombinedProvider = combineProviders(ContextProviderOne, ContextProviderTwo, ContextProviderThree);

//   // In your index.js or App.js
//   <CombinedProvider>
//     <App />
//   </CombinedProvider>