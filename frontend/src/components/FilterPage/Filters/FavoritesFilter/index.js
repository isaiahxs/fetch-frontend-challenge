import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './FavoritesFilter.css'

export const FavoritesFilter = ({ favorites, allFetchedDogs }) => {
    const navigate = useNavigate();

    const generateMatch = async () => {
        const favoritedDogIds = Array.from(favorites);
        if (favoritedDogIds.length === 0) {
            alert("Looks like you don't have any favorites yet! After you've added some, you can find your match!");
        }

        try {
            const response = await axios.post("https://frontend-take-home-service.fetch.com/dogs/match", favoritedDogIds, { withCredentials: true });

            const matchId = response.data.match;

            const detailResponse = await axios.post('https://frontend-take-home-service.fetch.com/dogs', [matchId], { withCredentials: true });
            const matchDetails = detailResponse.data[0];
            console.log('MATCH DETAILS', matchDetails);

            navigate('/match', { state: { matchDetails } });

        } catch (error) {
            console.error("Error generating match:", error);
        }
    };

    return (
        <div className='favorites-dropdown'>
            <div>
                <label>My Favorites: </label>
                <select>
                    {Array.from(favorites).map((favoriteId) => {
                        const dog = allFetchedDogs.find(d => d.id === favoriteId);
                        return <option key={favoriteId} value={favoriteId}>{dog ? dog.name : "Unknown"}</option>;
                    })}
                </select>
            </div>

            <button className='my-match-button' onClick={generateMatch}>Find My Match</button>
        </div>
    )
}