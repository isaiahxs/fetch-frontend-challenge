import { useNavigate, useLocation } from 'react-router-dom';
import './Match.css';

export default function Match() {
    const navigate = useNavigate();
    const location = useLocation();
    const matchDetails = location.state?.matchDetails;

    const returnHome = () => {
        navigate('/');
    }

    const returnFilter = () => {
        navigate('/filter');
    }

    const comingSoon = () => {
        alert('Feature coming soon!');
    }

    return (
        <div>
            {matchDetails ? (
                <div className='match-container'>
                    <h1 className='match-header fade-in'>Congratulations, your match is {matchDetails.name}!</h1>
                    <div className='dog-card fade2'>
                        <img className='dog-picture' src={matchDetails.img} alt={matchDetails.name} />
                        <div className='section-under-picture'>
                            <p>Age: {matchDetails.age}</p>
                            <p>Breed: {matchDetails.breed}</p>
                            <p>Zip Code: {matchDetails.zip_code}</p>
                        </div>
                    </div>

                    <div className='match-buttons fade3'>
                        <button className='more-pups-button'
                            onClick={returnFilter}
                        >
                            Look for more pups
                        </button>

                        <button className='take-pup-home-button'
                            onClick={comingSoon}
                        >
                            Take home today!
                        </button>
                    </div>
                </div>
            ) : (
                <div className='match-container'>
                    <h1 className='match-header'>To find your companion, please sign in, then search for pets first.</h1>

                    <h2 className='match-subheader'>Once you've found some pets you're interested in, Favorite them, and then click Find My Match to see which pet is right for you!</h2>

                    <button onClick={returnHome}>
                        Return Home
                    </button>
                </div>
            )}
        </div>
    );
}