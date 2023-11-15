import { useState, useEffect, useRef } from 'react';
import { useFilters } from '../FilterContext';
import './DogCard.css';

export const DogCard = ({ dog }) => {
    const { favorites, setFavorites } = useFilters();

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(Array.from(favorites)));

    }, [favorites]);

    useEffect(() => {
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            setFavorites(new Set(JSON.parse(storedFavorites)));
        }
    }, []);

    const toggleFavorite = (dogId) => {
        const newFavorites = new Set(favorites);
        if (newFavorites.has(dogId)) {
            newFavorites.delete(dogId);
        } else {
            newFavorites.add(dogId);
            // console.log('NEW FAVORITES HAS ADDED THIS DOG', dogId)
        }
        setFavorites(newFavorites);
    };

    const cardRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('show');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.05,
            }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        }
    }, [dog]);

    return (
        <div ref={cardRef} key={dog.id} className="dog-card body-fade-in">
            <div className='inner-dog-card'>

                <div>
                    <img
                        src={dog.img}
                        className='dog-picture'
                        alt={`${dog.name} picture`}
                    />
                </div>

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