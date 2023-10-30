import React from 'react';
import './PaginationButtons.css';

export const PaginationButtons = ({ nextQuery, prevQuery, fetchNextPage, fetchPreviousPage }) => {
    return (
        <div className='pagination-buttons second-pagination-buttons'>
            <button className='previous-page-button' onClick={fetchPreviousPage} disabled={!prevQuery}>Previous</button>
            <button className='next-page-button' onClick={fetchNextPage} disabled={!nextQuery}>Next</button>
        </div>
    );
};