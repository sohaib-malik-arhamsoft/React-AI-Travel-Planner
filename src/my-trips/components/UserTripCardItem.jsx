import React, { useState, useEffect } from 'react'
import { GetPlaceDetails, PHOTO_REF_URl } from '@/service/GlobalAPI';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Wallet } from 'lucide-react';

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
        <Link 
            to={'/view-trip/' + trip?.id} 
            className="block transform transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
        >
            <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 h-[320px] flex flex-col">
                {/* Image Container with Aspect Ratio Control */}
                <div className="relative h-[200px] overflow-hidden">
                    {/* Placeholder Image */}
                    <img 
                        src='/placeholder.jpg' 
                        className={`absolute inset-0 w-full h-full object-cover ${!isLoading && photo ? 'opacity-0' : 'opacity-100'} transition-opacity`} 
                        alt="Placeholder"
                    />
                    
                    {/* Actual Trip Image */}
                    {photo && (
                        <img 
                            src={photo} 
                            className={`absolute inset-0 w-full h-full object-cover ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
                            onLoad={() => setIsLoading(false)}
                            onError={() => setIsLoading(false)}
                            alt={trip?.userSelection?.location?.label || "Trip location"}
                        />
                    )}
                </div>

                {/* Trip Details Container */}
                <div className="p-4 flex-grow flex flex-col justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 truncate mb-2">
                            {trip?.userSelection?.location?.label}
                        </h2>
                    </div>
                    
                    <div className="space-y-2">
                        <div className="flex items-center text-gray-600">
                            <MapPin size={16} className="mr-2 text-blue-500" />
                            <span className="text-sm truncate">
                                {trip?.userSelection?.location?.label}
                            </span>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <Clock size={16} className="mr-2 text-green-500" />
                            <span className="text-sm">
                                {trip?.userSelection?.noOfDays} Days Trip
                            </span>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <Wallet size={16} className="mr-2 text-purple-500" />
                            <span className="text-sm">
                                {trip?.userSelection?.budget} Budget
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default UserTripCardItem