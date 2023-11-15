import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './FavoritesFilter.css'

export const FavoritesFilter = ({ favorites, allFetchedDogs }) => {
    const navigate = useNavigate();

    const generateMatch = async () => {
        // console.log('favorites before converting to array', favorites); //it's a set containing unique string dog ID's
        const favoritedDogIds = Array.from(favorites);
        // console.log('favorites after array', favoritedDogIds); //array of string id's
        if (favoritedDogIds.length === 0) {
            alert("Looks like you don't have any favorites yet! After you've added some, you can find your match!");
        }

        try {
            //making POST request to /match endpoint with array of strings
            const response = await axios.post("https://frontend-take-home-service.fetch.com/dogs/match", favoritedDogIds, { withCredentials: true });
            //response if object with string key of "match" and long string value of id

            const matchId = response.data.match;
            //making post request to /dogs with specific id in array to get dog object and all of that dog's details like img, name, age, etc.
            const detailResponse = await axios.post('https://frontend-take-home-service.fetch.com/dogs', [matchId], { withCredentials: true });
            //response is array with one object inside that contains key value pairs of dog's details
            const matchDetails = detailResponse.data[0];

            //redirect user to /match with the matchDetails state so we can access the properties in Match component
            navigate('/match', { state: { matchDetails } });
            window.scrollTo(0, 0);
        } catch (error) {
            console.error("Error generating match:", error);
        }
    };

    return (
        <div className='favorites-dropdown'>
            <div>
                <label>My Favorites: </label>
                <select>
                    {/* after converting favorites set to array, we can iterate through each id */}
                    {Array.from(favorites).map((favoriteId) => {
                        // look for this specific dog in allFetchedDogs
                        const dog = allFetchedDogs.find(d => d.id === favoriteId);
                        return <option key={favoriteId} value={favoriteId}>{dog ? dog.name : "Unknown"}</option>;
                    })}
                </select>
            </div>

            <button className='my-match-button' onClick={generateMatch}>Find My Match</button>
        </div>
    )
}