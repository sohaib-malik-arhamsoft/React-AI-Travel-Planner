import React, { useState, useEffect } from 'react'
import { GetPlaceDetails, PHOTO_REF_URl } from '@/service/GlobalAPI';
import { Link } from 'react-router-dom';

function UserTripCardItem({ trip }) {
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        trip && GetPlacePhoto();
    }, [trip])

    const GetPlacePhoto = async () => {
        const data = { textQuery: trip?.userSelection?.location?.label }
        const result = await GetPlaceDetails(data).then(resp => {
            const PhotoUrl = PHOTO_REF_URl.replace('{NAME}', resp?.data?.places[0]?.photos[1]?.name);
            setPhoto(PhotoUrl);
        })
    }

    return (
        <Link to={'/view-trip/' + trip?.id}>
            <div className='hover:scale-105 transition-all'>
                <img src={photo ? photo : '/placeholder.jpg'} className='object-cover rounded-xl h-[250px]' />
                <div>
                    <h2 className='font-bold text-lg'>{trip?.userSelection?.location?.label}</h2>
                    <h2 className='text-sm text-gray-500'>{trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} Budget</h2>
                </div>
            </div>
        </Link>
    )
}

export default UserTripCardItem