import './AlphabeticalFilter.css';

export const AlphabeticalFilter = ({ sortOrder, setSortOrder }) => {
    return (
        <div className='order-dropdown'>
            <label>Sort breed by: </label>
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                <option value="asc">Asc A-Z</option>
                <option value="desc">Desc Z-A</option>
            </select>
        </div>
    )
}