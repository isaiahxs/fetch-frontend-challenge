import './DogCard.css';

export const DogCard = ({ dog }) => {
    return (
        <div key={dog.id} className="dog-card">
            <img src={dog.img} className='dog-picture' alt={`${dog.name} picture`} />
            <div className='section-under-picture'>
                <p>Name: {dog.name}</p>
                <p>Age: {dog.age}</p>
                <p>Breed: {dog.breed}</p>
            </div>
        </div>
    );
}