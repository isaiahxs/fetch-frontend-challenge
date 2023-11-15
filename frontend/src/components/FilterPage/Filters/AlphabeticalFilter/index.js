import './AlphabeticalFilter.css';
import { useFilters } from '../../FilterContext';

export const AlphabeticalFilter = () => {
    const { sortOrder, setSortOrder } = useFilters();

    return (
        <div className='order-dropdown'>
            <label className='alphabetical-filter-section'>Sort breed by: </label>
            <select
                className='alphabetical-select'
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
            >
                <option value="asc">Asc A-Z</option>
                <option value="desc">Desc Z-A</option>
            </select>
        </div>
    )
}