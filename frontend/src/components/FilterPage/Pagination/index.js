import { useState } from 'react';
import { useFilters } from '../FilterContext';
import './Pagination.css';
import axios from 'axios';

export const Pagination = () => {

    const { pageSize,
        nextQuery,
        setNextQuery,
        prevQuery,
        setPrevQuery,
        currentPage,
        setCurrentPage,
        totalResults,
        setTotalResults,
        setResultIds
    } = useFilters();

    //page size is number of results to show per page
    const X = (currentPage - 1) * pageSize + 1;

    //if totalResults is zero, we will show out of 0
    const Y = Math.min(currentPage * pageSize, totalResults);

    //rounded up value of total results divided by quantity of pets per page
    const totalPages = Math.ceil(totalResults / pageSize);

    const fetchNextPage = () => {
        if (nextQuery) {
            const fullNextUrl = `https://frontend-take-home-service.fetch.com${nextQuery}`;
            axios.get(fullNextUrl, { withCredentials: true })
                .then(response => {
                    // console.log('fetch NEXT', response);
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
    }

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
                    console.error('Error fetching next page:', error);
                })
        }
    }

    return (
        <>
            <h2 className="filter-page-header">Results</h2>
            {
                totalResults > 0 &&
                <>
                    <div className='results-header'>
                        Showing {X} - {Y} out of {totalResults} total
                    </div>
                    <div className='page-count-header'>
                        (Page {currentPage} of {totalPages})
                    </div>
                </>
            }

            {
                totalResults === 0 &&
                <div className='results-header'>
                    Showing {X - 1} - {Y} out of {totalResults} total
                </div>
            }

            <div className='pagination-buttons'>
                <button
                    className='previous-page-button'
                    onClick={fetchPreviousPage}
                    disabled={!prevQuery}>
                    Previous
                </button>

                <button
                    className='next-page-button'
                    onClick={fetchNextPage}
                    disabled={!nextQuery || Y >= totalResults}>
                    Next
                </button>
            </div>
        </>
    )
}