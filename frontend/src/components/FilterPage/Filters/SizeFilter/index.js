import React, { useState, useEffect, useRef } from "react"
import { useFilters } from "../../FilterContext";
import './SizeFilter.css';

export const SizeFilter = () => {

    const { pageSize, setPageSize } = useFilters();

    return (
        <div className='order-dropdown'>
            <label className='alphabetical-filter-section'>Results per page: </label>
            <select
                className='alphabetical-select'
                value={pageSize}
                onChange={(e) => setPageSize(e.target.value)}
            >
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="75">75</option>
                <option value="100">100</option>
            </select>
        </div>
    )
}