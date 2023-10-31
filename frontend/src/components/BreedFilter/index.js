import './BreedFilter.css';

export const BreedFilter = ({ availableBreeds, handleCheckboxChange, toggleShowBreeds, showBreeds, selectedBreeds }) => {

    return (
        <div className='breed-filter-section'>
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
        </div>
    )
}