import { Button } from '@/components/ui/button'
import { GetPlaceDetails, PHOTO_REF_URl } from '@/service/GlobalAPI';
import React, {useEffect, useState} from 'react'
import { IoIosSend } from "react-icons/io";

function InfoSection({ trip }) {
    const [photo, setPhoto] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (trip) {
            setIsLoading(true);
            GetPlacePhoto();
        }
    }, [trip])

    const GetPlacePhoto = async() => {
        try {
            const data = {textQuery: trip?.userSelection?.location?.label}
            const result = await GetPlaceDetails(data).then(resp => {
                const PhotoUrl = PHOTO_REF_URl.replace('{NAME}', resp?.data?.places[0]?.photos[1]?.name);
                setPhoto(PhotoUrl);
            });
        } catch (error) {
            console.error("Error fetching image:", error);
        } finally {
            setIsLoading(false);
        }
    }
    
    return (
        <div>
            <div className='relative h-[340px] w-full rounded-xl overflow-hidden'>
                {/* Always show placeholder initially */}
                <img 
                    src='/placeholder.jpg' 
                    className={`h-full w-full object-cover ${!isLoading && photo ? 'hidden' : 'block'}`} 
                    alt="Placeholder"
                />
                
                {/* Show actual image when loaded */}
                {photo && (
                    <img 
                        src={photo} 
                        className={`h-full w-full object-cover absolute top-0 left-0 ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
                        onLoad={() => setIsLoading(false)}
                        onError={() => setIsLoading(false)}
                        alt={trip?.userSelection?.location?.label || "Trip location"}
                    />
                )}
            </div>
            <div className='flex justify-between items-center'>
                <div className='my-5 flex flex-col gap-2'>
                    <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
                    <div className='flex gap-5'>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 sm:text-xs md:text-md'>📅 {trip?.userSelection?.noOfDays} Day</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 sm:text-xs md:text-md'>💰 {trip?.userSelection?.budget} Budget</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 sm:text-xs md:text-md'>🥂 No. Of Traaveler: {trip?.userSelection?.traveler}</h2>
                    </div>
                </div>
                <Button><IoIosSend /></Button>
            </div>
        </div>
    )
}

export default InfoSection