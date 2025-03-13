import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { GetPlaceDetails, PHOTO_REF_URl } from '@/service/GlobalAPI';

function PlaceCardItem({ place }) {
    const [photo, setPhoto] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (place) {
            setIsLoading(true);
            GetPlacePhoto();
        }
    }, [place])

    const GetPlacePhoto = async() => {
        try {
            const data = {textQuery: place?.placeName}
            const result = await GetPlaceDetails(data).then(resp => {
                const PhotoUrl = PHOTO_REF_URl.replace('{NAME}', resp?.data?.places[0]?.photos[0]?.name);
                setPhoto(PhotoUrl);
            });
        } catch (error) {
            console.error("Error fetching image:", error);
        } finally {
            setIsLoading(false);
        }
    }
    
    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + place?.placeName} target='_blank'>
            <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all 
            hover:shadow-md cursor-pointer'>
                <div className='relative w-[130px] h-[130px] rounded-xl overflow-hidden'>
                    {/* Always show placeholder initially */}
                    <img 
                        src='/placeholder.jpg' 
                        className={`w-full h-full object-cover ${!isLoading && photo ? 'hidden' : 'block'}`} 
                        alt="Placeholder"
                    />
                    
                    {/* Show actual image when loaded */}
                    {photo && (
                        <img 
                            src={photo} 
                            className={`w-full h-full object-cover absolute top-0 left-0 ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
                            onLoad={() => setIsLoading(false)}
                            onError={() => setIsLoading(false)}
                            alt={place?.placeName || "Place photo"}
                        />
                    )}
                </div>
                <div>
                    <h2 className='font-bold text-lg'>{place?.placeName}</h2>
                    <p className='text-sm text-gray-400'>{place?.placeDetail}</p>
                </div>
            </div>
        </Link>
    )
}

export default PlaceCardItem