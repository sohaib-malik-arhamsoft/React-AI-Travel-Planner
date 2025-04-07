import React, { useState } from 'react'
import { Input } from '@/components/ui/input';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MapPin, Calendar, Wallet, Users, Plane, Compass, Route, Sun, Mountain } from 'lucide-react';

const SelectBudgeOptions = [
    {
        icon: '💰',
        title: 'Budget',
        desc: 'Affordable Trips',
        value: 'low'
    },
    {
        icon: '💸',
        title: 'Mid-Range',
        desc: 'Comfortable Travel',
        value: 'medium'
    },
    {
        icon: '🚀',
        title: 'Luxury',
        desc: 'Premium Experiences',
        value: 'high'
    }
];

const SelectTravelsList = [
    {
        icon: '👫',
        title: 'Couple',
        desc: 'Romantic Getaway',
        people: 'couple'
    },
    {
        icon: '👨‍👩‍👧‍👦',
        title: 'Family',
        desc: 'Family Fun',
        people: 'family'
    },
    {
        icon: '👥',
        title: 'Friends',
        desc: 'Group Adventure',
        people: 'friends'
    }
];

// New component for step backgrounds
const StepBackground = ({ currentStep }) => {
    const backgrounds = [
        { icon: <Compass className="w-20 h-20 text-blue-500" />, text: "Start Your Journey" },
        { icon: <Route className="w-20 h-20 text-green-500" />, text: "Plot Your Path" },
        { icon: <Wallet className="w-20 h-20 text-purple-500" />, text: "Plan Your Budget" },
        { icon: <Users className="w-20 h-20 text-red-500" />, text: "Choose Your Companions" }
    ];

    return (
        <div className="absolute inset-0 flex items-center justify-center opacity-10 z-0">
            <div className="text-center">
                {backgrounds[currentStep - 1].icon}
                <p className="mt-4 text-xl font-bold text-gray-300">
                    {backgrounds[currentStep - 1].text}
                </p>
            </div>
        </div>
    );
};

function CreateTrip() {
    const [formData, setFormData] = useState({});
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const nextStep = () => {
        setCurrentStep(prev => Math.min(prev + 1, 4));
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-4 relative z-10">
                        <StepBackground currentStep={currentStep} />
                        <div className="flex items-center space-x-2 relative z-20">
                            <MapPin className="text-blue-500" />
                            <h2 className="text-lg font-semibold">Choose Your Destination</h2>
                        </div>
                        <div className="relative z-20">
                            <GooglePlacesAutocomplete
                                apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                                selectProps={{
                                    placeholder: 'Enter destination',
                                    onChange: (v) => handleInputChange('location', v)
                                }}
                            />
                            <div className="mt-2 text-sm text-gray-500 flex items-center space-x-2">
                                <Sun className="w-4 h-4" />
                                <span>Explore your dream destination</span>
                            </div>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-4 relative z-10">
                        <StepBackground currentStep={currentStep} />
                        <div className="flex items-center space-x-2 relative z-20">
                            <Calendar className="text-green-500" />
                            <h2 className="text-lg font-semibold">Trip Duration</h2>
                        </div>
                        <div className="relative z-20">
                            <Input
                                type="number"
                                placeholder="Number of days"
                                min={1}
                                max={15}
                                onChange={(e) => handleInputChange('noOfDays', e.target.value)}
                                className="w-full"
                            />
                            <div className="mt-2 text-sm text-gray-500 flex items-center space-x-2">
                                <Mountain className="w-4 h-4" />
                                <span>1-15 days of pure adventure</span>
                            </div>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-4 relative z-10">
                        <StepBackground currentStep={currentStep} />
                        <div className="flex items-center space-x-2 relative z-20">
                            <Wallet className="text-purple-500" />
                            <h2 className="text-lg font-semibold">Select Budget</h2>
                        </div>
                        <div className="grid grid-cols-3 gap-3 relative z-20">
                            {SelectBudgeOptions.map((option) => (
                                <div
                                    key={option.title}
                                    onClick={() => handleInputChange('budget', option.value)}
                                    className={`
                                        p-3 border rounded-lg cursor-pointer transition-all text-center
                                        ${formData.budget === option.value
                                            ? 'border-blue-500 bg-blue-50 shadow-md'
                                            : 'hover:border-gray-300'
                                        }
                                    `}
                                >
                                    <div className="text-2xl mb-1">{option.icon}</div>
                                    <h3 className="font-bold text-sm">{option.title}</h3>
                                    <p className="text-xs text-gray-500">{option.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="space-y-4 relative z-10">
                        <StepBackground currentStep={currentStep} />
                        <div className="flex items-center space-x-2 relative z-20">
                            <Users className="text-red-500" />
                            <h2 className="text-lg font-semibold">Travel Companions</h2>
                        </div>
                        <div className="grid grid-cols-3 gap-3 relative z-20">
                            {SelectTravelsList.map((option) => (
                                <div
                                    key={option.title}
                                    onClick={() => handleInputChange('traveler', option.people)}
                                    className={`
                                        p-3 border rounded-lg cursor-pointer transition-all text-center
                                        ${formData.traveler === option.people
                                            ? 'border-red-500 bg-red-50 shadow-md'
                                            : 'hover:border-gray-300'
                                        }
                                    `}
                                >
                                    <div className="text-2xl mb-1">{option.icon}</div>
                                    <h3 className="font-bold text-sm">{option.title}</h3>
                                    <p className="text-xs text-gray-500">{option.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    const handleSubmit = () => {
        // Add your trip generation logic here
        console.log('Trip Details:', formData);
    };

    return (
        <div className="flex h-screen overflow-hidden">
            <div className="w-1/2 relative hidden md:block">
                <img src="/logo.svg" alt="Logo" className="h-10 m-4" />
                <div
                    className="absolute inset-0 bg-cover bg-center flex items-start p-8"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop')",
                        backgroundPosition: "center 30%",
                    }}
                >
                    <div className="bg-black/40 p-6 rounded-lg">
                        <div className="text-white">
                            <h2 className="text-3xl font-bold mb-4 flex items-center">
                                <Plane className="mr-3" /> Discover Your Next Adventure
                            </h2>
                            <p className="text-lg">
                                Let AI craft the perfect personalized journey just for you
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form Section with Enhanced Design */}
            <div className="w-full md:w-1/2 bg-white flex flex-col p-8 relative">
                <div className="text-center mb-6 relative z-20">
                    <h1 className="text-2xl font-bold text-gray-800">Plan Your Perfect Trip</h1>
                    <p className="text-gray-500 mt-2 text-sm">
                        Create a personalized travel experience in just a few steps
                    </p>
                </div>

                {/* Step Indicators */}
                <div className="flex justify-center space-x-2 mb-6 relative z-20">
                    {[1, 2, 3, 4].map((step) => (
                        <div
                            key={step}
                            className={`
                                w-8 h-1.5 rounded-full transition-all
                                ${currentStep >= step ? 'bg-blue-500' : 'bg-gray-300'}
                            `}
                        />
                    ))}
                </div>

                {/* Step Content with Background */}
                <div className="flex-grow flex items-center justify-center relative">
                    {renderStepContent()}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6 relative z-20">
                    {currentStep > 1 && (
                        <Button
                            variant="outline"
                            onClick={prevStep}
                            className="w-1/3"
                        >
                            Previous
                        </Button>
                    )}
                    {currentStep < 4 ? (
                        <Button
                            onClick={nextStep}
                            className="w-1/3 ml-auto"
                            disabled={!formData[currentStep === 1 ? 'location' :
                                currentStep === 2 ? 'noOfDays' :
                                    currentStep === 3 ? 'budget' : '']}
                        >
                            Next
                        </Button>
                    ) : (
                        <Button
                            onClick={handleSubmit}
                            className="w-1/3 ml-auto"
                            disabled={loading}
                        >
                            {loading ? (
                                <AiOutlineLoading3Quarters className="animate-spin" />
                            ) : (
                                "Generate Trip"
                            )}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CreateTrip;