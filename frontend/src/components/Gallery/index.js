import { useLanguage } from '../../LanguageContext';
import { englishContent, spanishContent } from './content';
import './Gallery.css';

import Darron from '../../assets/images/Darron_Border_Collie.jpg';
import Kayli from '../../assets/images/Kayli_Great_Dane.jpg';
import Keagan from '../../assets/images/Keagan_Chihuahua.jpg';
import Lisa from '../../assets/images/Lisa_German_Shepherd.jpg';

export default function Gallery() {
    // const { currentLanguage, setCurrentLanguage } = useLanguage();
    // const content = currentLanguage === 'english' ? englishContent : spanishContent;

    return (
        <div className='gallery-section'>
            <h2 className='gallery-header'>Our Gallery</h2>

            <section className='gallery-1'>
                <div className='slider'>
                    <div className='slide-track'>
                        <div className='img-container slide'>
                            <img className='slide-img' src={Darron} alt='Slide Image' />
                        </div>

                        <div className='img-container slide'>
                            <img className='slide-img' src={Kayli} alt='Slide Image' />
                        </div>

                        <div className='img-container slide'>
                            <img className='slide-img' src={Keagan} alt='Slide Image' />
                        </div>

                        <div className='img-container slide'>
                            <img className='slide-img' src={Lisa} alt='Slide Image' />
                        </div>

                        <div className='img-container slide'>
                            <img className='slide-img' src={Darron} alt='Slide Image' />
                        </div>

                        <div className='img-container slide'>
                            <img className='slide-img' src={Kayli} alt='Slide Image' />
                        </div>

                        <div className='img-container slide'>
                            <img className='slide-img' src={Keagan} alt='Slide Image' />
                        </div>

                        <div className='img-container slide'>
                            <img className='slide-img' src={Lisa} alt='Slide Image' />
                        </div>

                        <div className='img-container slide'>
                            <img className='slide-img' src={Darron} alt='Slide Image' />
                        </div>

                        <div className='img-container slide'>
                            <img className='slide-img' src={Kayli} alt='Slide Image' />
                        </div>

                        <div className='img-container slide'>
                            <img className='slide-img' src={Keagan} alt='Slide Image' />
                        </div>

                        <div className='img-container slide'>
                            <img className='slide-img' src={Lisa} alt='Slide Image' />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}