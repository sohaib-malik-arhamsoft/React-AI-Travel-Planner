import React, { useState, useEffect } from 'react'
import { GetPlaceDetails, PHOTO_REF_URl } from '@/service/GlobalAPI';
import { Link } from 'react-router-dom';

function UserTripCardItem({ trip }) {
    const [photo, setPhoto] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (trip) {
            setIsLoading(true);
            GetPlacePhoto();
        }
    }, [trip])

    const GetPlacePhoto = async () => {
        try {
            const data = { textQuery: trip?.userSelection?.location?.label }
            const result = await GetPlaceDetails(data).then(resp => {
                const PhotoUrl = PHOTO_REF_URl.replace('{NAME}', resp?.data?.places[0]?.photos[5]?.name);
                setPhoto(PhotoUrl);
            })
        } catch (error) {
            console.error("Error fetching image:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Link to={'/view-trip/' + trip?.id}>
            <div className='hover:scale-105 transition-all'>
                <div className='relative h-[250px] rounded-xl overflow-hidden'>
                    {/* Always show placeholder initially */}
                    <img 
                        src='/placeholder.jpg' 
                        className={`object-cover w-full h-full ${!isLoading && photo ? 'hidden' : 'block'}`} 
                        alt="Placeholder"
                    />
                    
                    {/* Show actual image when loaded */}
                    {photo && (
                        <img 
                            src={photo} 
                            className={`object-cover w-full h-full absolute top-0 left-0 ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
                            onLoad={() => setIsLoading(false)}
                            onError={() => setIsLoading(false)}
                            alt={trip?.userSelection?.location?.label || "Trip location"}
                        />
                    )}
                </div>
                <div>
                    <h2 className='font-bold text-lg'>{trip?.userSelection?.location?.label}</h2>
                    <h2 className='text-sm text-gray-500'>{trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} Budget</h2>
                </div>
            </div>
        </Link>
    )
}

export default UserTripCardItem