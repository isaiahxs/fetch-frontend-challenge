import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setResultIds, setNextQuery, setPrevQuery, setCurrentPage, setTotalResults } from '../Redux/actions';
import axios from 'axios';

export const usePagination = () => {
    const dispatch = useDispatch();
    // const [resultIds, setResultIds] = useState([]);
    // const [nextQuery, setNextQuery] = useState(null);
    // const [prevQuery, setPrevQuery] = useState(null);

    // const [currentPage, setCurrentPage] = useState(1);
    // const [totalResults, setTotalResults] = useState(0);

    const resultIds = useSelector(state => state.filterPage.resultIds);
    const nextQuery = useSelector(state => state.filterPage.nextQuery);
    const prevQuery = useSelector(state => state.filterPage.prevQuery);
    const currentPage = useSelector(state => state.filterPage.currentPage);
    const totalResults = useSelector(state => state.filterPage.totalResults);


    const fetchNextPage = () => {
        if (nextQuery) {
            const fullNextUrl = `https://frontend-take-home-service.fetch.com${nextQuery}`;
            axios.get(fullNextUrl, { withCredentials: true })
                .then(response => {
                    // setResultIds(response.data.resultIds);
                    // setNextQuery(response.data.next);
                    // setPrevQuery(response.data.prev);
                    // setCurrentPage(currentPage + 1);
                    // setTotalResults(response.data.total);
                    dispatch(setResultIds(response.data.resultIds));
                    dispatch(setNextQuery(response.data.next));
                    dispatch(setPrevQuery(response.data.prev));
                    dispatch(setCurrentPage(currentPage + 1));
                    dispatch(setTotalResults(response.data.total));
                })
                .catch(error => {
                    console.error('Error fetching next page:', error);
                });
        }
    }

    const fetchPreviousPage = () => {
        if (prevQuery) {
            const fullPrevUrl = `https://frontend-take-home-service.fetch.com${nextQuery}`;
            axios.get(fullPrevUrl, { withCredentials: true })
                .then(response => {
                    // setResultIds(response.data.resultIds);
                    // setNextQuery(response.data.next);
                    // setPrevQuery(response.data.prev);
                    // setCurrentPage(currentPage - 1);
                    // setTotalResults(response.data.total);
                    dispatch(setResultIds(response.data.resultIds));
                    dispatch(setNextQuery(response.data.next));
                    dispatch(setPrevQuery(response.data.prev));
                    dispatch(setCurrentPage(currentPage - 1));
                    dispatch(setTotalResults(response.data.total));
                })
                .catch(error => {
                    console.error('Error fetching next page:', error);
                })
        }
    }

    return {
        resultIds,
        nextQuery,
        prevQuery,

        currentPage,
        totalResults,
        fetchNextPage,
        fetchPreviousPage
    }
}