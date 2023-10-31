import './FilterSidebar.css';

export const FilterSidebar = ({ availableBreeds, handleCheckboxChange, toggleShowBreeds, showBreeds, selectedBreeds, sortOrder, setSortOrder }) => {
    return (
        <aside className="filter-sidebar">
            <h2 className='filter-page-header'>Filters</h2>

            <div>
                <label>Sort by: </label>
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="asc">Asc A-Z</option>
                    <option value="desc">Desc Z-A</option>
                </select>
            </div>

            <button className='dropdown-button' onClick={toggleShowBreeds}>
                Breeds {showBreeds ? '▲' : '▼'}
            </button>

            {showBreeds && (
                <div className='options'>
                    {availableBreeds.map((breed, index) => (
                        <label className='dropdown-options' key={index}>
                            <input
                                className='dropdown-checkbox'
                                type="checkbox"
                                value={breed}
                                onChange={() => handleCheckboxChange(breed)}
                                checked={selectedBreeds.has(breed)}
                            />
                            <p className='dropdown-text'>
                                {breed}
                            </p>
                        </label>
                    ))}
                </div>
            )}

        </aside>
    )
}