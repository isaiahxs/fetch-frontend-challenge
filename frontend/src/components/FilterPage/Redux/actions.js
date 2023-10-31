// Action Types
export const SET_RESULT_IDS = 'SET_RESULT_IDS';
export const SET_NEXT_QUERY = 'SET_NEXT_QUERY';
export const SET_PREV_QUERY = 'SET_PREV_QUERY';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const SET_TOTAL_RESULTS = 'SET_TOTAL_RESULTS';

// Action Creators
export const setResultIds = (ids) => ({ type: SET_RESULT_IDS, payload: ids });
export const setNextQuery = (query) => ({ type: SET_NEXT_QUERY, payload: query });
export const setPrevQuery = (query) => ({ type: SET_PREV_QUERY, payload: query });
export const setCurrentPage = (page) => ({ type: SET_CURRENT_PAGE, payload: page });
export const setTotalResults = (total) => ({ type: SET_TOTAL_RESULTS, payload: total });
