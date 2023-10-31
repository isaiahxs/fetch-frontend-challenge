import { useState } from 'react';
import './DogCard.css';

export const DogCard = ({ dog, favorites, setFavorites }) => {
    // const [favorites, setFavorites] = useState(new Set());

    const toggleFavorite = (dogId) => {
        const newFavorites = new Set(favorites);
        if (newFavorites.has(dogId)) {
            newFavorites.delete(dogId);
        } else {
            newFavorites.add(dogId);
            console.log('NEW FAVORITES HAS ADDED THIS DOG', dogId)
        }
        setFavorites(newFavorites);
    };

    return (
        <div key={dog.id} className="dog-card">
            <div className='inner-dog-card'>
                <img src={dog.img} className='dog-picture' alt={`${dog.name} picture`} />
                <div className='section-under-picture'>
                    <p>Name: {dog.name}</p>
                    <p>Age: {dog.age}</p>
                    <p>Breed: {dog.breed}</p>
                    <p>Zip Code: {dog.zip_code}</p>

                    <button className='favorite-button' onClick={() => toggleFavorite(dog.id)}>
                        {favorites.has(dog.id) ? "Favorited" : "Favorite"}
                    </button>

                </div>
            </div>
        </div>
    );
}