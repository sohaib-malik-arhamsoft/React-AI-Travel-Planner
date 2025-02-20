import { Input } from '@/components/ui/input';
import React, { useState, useEffect } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { AI_PROMPT, SelectBudgeOptions, SelectTravelsList } from '../constants/options'
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { chatSession } from '@/service/AIModal';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore";
import { db } from '../service/FirebaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

function CreateTrip() {
    const navigate = useNavigate();
    const [place, setPlace] = useState();
    const [formData, setFormData] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }

    useEffect(() => {
    }, [formData])

    const login = useGoogleLogin({
        onSuccess: (codeResp) => GetUserProfile(codeResp),
        onError: (error) => console.log(error)
    })

    const GetUserProfile = async (tokenInfo) => {
        await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
            {
                headers: {
                    Authorization: `Bearer ${tokenInfo?.access_token}`,
                    Accept: 'application/json'
                }
            }).then((resp) => {
                localStorage.setItem('user', JSON.stringify(resp.data));
                setOpenDialog(false);
                onGenerateTrip();
            })
    };

    const onGenerateTrip = async () => {

        const user = await localStorage.getItem('user');
        if (!user) {
            setOpenDialog(true);
        }

        if (!formData?.location || !formData?.budget || !formData?.traveler || !formData?.noOfDays) {
            toast("Please fill all details");
            return;
        }

        if (Number(formData?.noOfDays) > 15) {
            toast("Days Limit Exceeded 15 days.");
            return;
        }

        setLoading(true);
        const Final_Prompt = AI_PROMPT
            .replace('{location}', formData?.location?.label)
            .replace('{totalDays}', formData?.noOfDays)
            .replace('{traveler}', formData?.traveler)
            .replace('{budget}', formData?.budget)
            .replace('{totalDays}', formData?.noOfDays)
        const result = await chatSession.sendMessage(Final_Prompt);
        setLoading(false);
        await SaveAITrips(result?.response?.text());
        setFormData([]);
    }

    const SaveAITrips = async (TripData) => {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem('user'))
        const docId = Date.now().toString()
        await setDoc(doc(db, "AITrip", docId), {
            userSelection: formData,
            tripData: JSON.parse(TripData),
            userEmail: user?.email,
            id: docId
        });
        setLoading(false);
        navigate(`/view-trip/${docId}`);
    }

    return (
        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
            <h2 className='font-bold text-3xl'>Tell us your travel preferences 🏕️🌴</h2>
            <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized Itinerary based on your preferences.
            </p>
            <div className='mt-20 flex flex-col gap-10'>
                <div>
                    <h2 className='text-xl my-3 font-medium'>what is destination of choice?</h2>
                    <GooglePlacesAutocomplete
                        apikey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                        selectProps={{
                            place,
                            onChange: (v) => { setPlace(v); handleInputChange('location', v) },
                        }}
                    />
                </div>
                <div>
                    <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip</h2>
                    <Input placeholder={'Ex.3'} type='number'
                        onChange={(e) => handleInputChange('noOfDays', e.target.value)}
                    />
                </div>
            </div>
            <div>
                <h2 className='text-xl my-3 font-medium'>What is your budget?</h2>
                <div className='grid grid-cols-3 gap-5 mt-5'>
                    {SelectBudgeOptions?.map((item, index) => (
                        <div key={index}
                            onClick={() => handleInputChange('budget', item.title)}
                            className={`p-4 border rounded-lg hover:shadow-lg
                        ${formData?.budget == item.title && 'shadow-lg border-black'}`}>
                            <h2 className='text-4xl'>{item.icon}</h2>
                            <h2 className='font-bold text-lg'>{item.title}</h2>
                            <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h2 className='text-xl my-3 font-medium'>Who do you plan on traveling with on your next adventure??</h2>
                <div className='grid grid-cols-3 gap-5 mt-5'>
                    {SelectTravelsList?.map((item, index) => (
                        <div key={index}
                            onClick={() => handleInputChange('traveler', item.people)}
                            className={`p-4 border rounded-lg hover:shadow-lg
                            ${formData?.budget == item.title && 'shadow-lg border-black'}`}>
                            <h2 className='text-4xl'>{item.icon}</h2>
                            <h2 className='font-bold text-lg'>{item.title}</h2>
                            <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                        </div>
                    ))}
                </div>
            </div>
            <div className='my-10 justify-end flex'>
                <Button disabled={loading} onClick={onGenerateTrip}>
                    {loading ?
                        <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : "Generate Trip"}
                </Button>
            </div>

            <Dialog open={openDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogDescription>
                            <img src="/logo.svg" />
                            <h2 className='font-bold text-lg mt-7'>Sign In with Google</h2>
                            <p>Sign in to the App with Google authentication securely</p>
                            <Button
                                onClick={login}
                                className='w-full mt-5'>
                                <FcGoogle className='w-7 h-7' />
                                Sign In with Google</Button>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default CreateTrip