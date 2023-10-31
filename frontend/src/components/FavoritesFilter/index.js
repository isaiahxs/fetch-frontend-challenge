import { useEffect, useState } from 'react';
import './FavoritesFilter.css'

export const FavoritesFilter = ({ favorites, allFetchedDogs }) => {
    return (
        <div className='favorites-dropdown'>
            <label>My Favorites: </label>
            <select>
                {Array.from(favorites).map((favoriteId) => {
                    const dog = allFetchedDogs.find(d => d.id === favoriteId);
                    return <option key={favoriteId} value={favoriteId}>{dog ? dog.name : "Unknown"}</option>;
                })}
            </select>
        </div>
    )
}