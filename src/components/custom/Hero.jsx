import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'

function Hero() {
    return (
        <div className='flex flex-col items-center mx-8 gap-6'> {/* Changed to 'flex-col' and adjusted gap and margin */}
            <h1 className='font-extrabold text-[60px] text-center'>
                <span className='text-[#f56551]'>
                    Discover Your Next Adventure with AI:</span><br/>
                Personalized Itineraries at your Fingertips
            </h1>
            <p className='text-xl text-gray-500 text-center'>
                Your personal trip planner curator, creating custom Itineraries tailored to your interests and budget
            </p>
            <Link to={'/create-trip'}>
                <Button>Get Started, It's Free</Button>
            </Link>
        </div>
    )
}

export default Hero
