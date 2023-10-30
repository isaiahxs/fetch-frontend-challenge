import './FilterSidebar.css';

export const FilterSidebar = ({ availableBreeds, handleCheckboxChange, toggleShowBreeds, showBreeds, selectedBreeds }) => {
    return (
        <aside className="filter-sidebar">
            <h2 className='filter-page-header'>Filters</h2>
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