import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../service/FirebaseConfig';
import { toast } from 'sonner';
import InfoSection from '../component/InfoSection';
import Hotels from '../component/Hotels';
import PlacesToVisit from '../component/PlacesToVisit';
import Footer from '../component/Footer';

function ViewTrip() {
    const {tripId} = useParams();
    const [trip, setTrip]=useState([]);

    useEffect(() => {
        tripId&&GetTripData();
    }, [tripId])

    const GetTripData = async() => {
        const docRef = doc(db, 'AITrip', tripId)
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()) {
            setTrip(docSnap.data());
        } else {
            console.log("No such document!");
            toast("No trip found");
        }
    }
  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
        <InfoSection trip={trip}/>
        <Hotels trip={trip}/>
        <PlacesToVisit trip={trip}/>
        <Footer />
    </div>
  )
}

export default ViewTrip