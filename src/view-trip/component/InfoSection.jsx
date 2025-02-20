import { Button } from '@/components/ui/button'
import { GetPlaceDetails, PHOTO_REF_URl } from '@/service/GlobalAPI';
import React, {useEffect, useState} from 'react'
import { IoIosSend } from "react-icons/io";

function InfoSection({ trip }) {
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        trip&&GetPlacePhoto();
    }, [trip])

    const GetPlacePhoto = async() => {
        const data={textQuery:trip?.userSelection?.location?.label}
        const result = await GetPlaceDetails(data).then(resp=>{
        const PhotoUrl=PHOTO_REF_URl.replace('{NAME}', resp?.data?.places[0]?.photos[1]?.name);
        setPhoto(PhotoUrl);
        })

    }
    return (
        <div>
            <img src={photo?photo:'/placeholder.jpg'} className='h-[340px] w-full object-cover rounded-xl' />
            <div className='flex justify-between items-center'>
                <div className='my-5 flex flex-col gap-2'>
                    <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
                    <div className='flex gap-5'>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 sm:text-xs md:text-md'>📅 {trip?.userSelection?.noOfDays} Day</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 sm:text-xs md:text-md'>💰 {trip?.userSelection?.budget} Budget</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 sm:text-xs md:text-md'>🥂 No. Of Traaveler: {trip?.userSelection?.traveler}</h2>
                    </div>
                </div>
                <Button><IoIosSend />
                </Button>
            </div>
        </div>
    )
}

export default InfoSection