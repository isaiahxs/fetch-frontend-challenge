import { createStore, combineReducers } from 'redux';
import filterPageReducer from '../components/FilterPage/Redux/reducer.js';

const rootReducer = combineReducers({
    filterPage: filterPageReducer,
});

const store = createStore(rootReducer);

export default store;