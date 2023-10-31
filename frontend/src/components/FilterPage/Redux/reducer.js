import { SET_RESULT_IDS, SET_NEXT_QUERY, SET_PREV_QUERY, SET_CURRENT_PAGE, SET_TOTAL_RESULTS } from './actions';

const initialState = {
    resultIds: [],
    nextQuery: null,
    prevQuery: null,
    currentPage: 1,
    totalResults: 0
};

const filterPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_RESULT_IDS:
            return { ...state, resultIds: action.payload };
        case SET_NEXT_QUERY:
            return { ...state, nextQuery: action.payload };
        case SET_PREV_QUERY:
            return { ...state, prevQuery: action.payload };
        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.payload };
        case SET_TOTAL_RESULTS:
            return { ...state, totalResults: action.payload };
        default:
            return state;
    }
};

export default filterPageReducer;
