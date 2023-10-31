import { useState } from 'react';
import axios from 'axios';

export const usePagination = () => {
    const [resultIds, setResultIds] = useState([]);
    const [nextQuery, setNextQuery] = useState(null);
    const [prevQuery, setPrevQuery] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

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

    return {
        resultIds,
        setResultIds,
        nextQuery,
        setNextQuery,
        prevQuery,
        setPrevQuery,

        currentPage,
        setCurrentPage,
        totalResults,
        setTotalResults,
        fetchNextPage,
        fetchPreviousPage
    }
}