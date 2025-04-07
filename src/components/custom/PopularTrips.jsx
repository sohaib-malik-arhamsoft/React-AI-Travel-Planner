import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Timer, MapPin, Clock } from 'lucide-react';
import AnimatedImage from './AnimatedImage';
import { Link } from 'react-router-dom'

const trips = [
    {
        id: 1,
        title: "Ultimate California Coast",
        description: "Experience the iconic Highway 1 from San Francisco to San Diego",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1998&auto=format&fit=crop",
        duration: "7-10 days",
        distance: "600 miles",
        highlights: ["Big Sur", "Santa Barbara", "La Jolla"]
    },
    {
        id: 2,
        title: "The Great Southwest Loop",
        description: "Discover the magic of America's desert landscapes and national parks",
        image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=1998&auto=format&fit=crop",
        duration: "10-14 days",
        distance: "1,400 miles",
        highlights: ["Grand Canyon", "Zion", "Monument Valley"]
    },
    {
        id: 3,
        title: "New England Fall Foliage",
        description: "Scenic autumn drive through charming villages and stunning landscapes",
        image: "https://tse2.mm.bing.net/th?id=OIP.gaUf7IAhPO-JVfNUTrSXJgHaE8&pid=Api",
        duration: "5-7 days",
        distance: "500 miles",
        highlights: ["Vermont", "New Hampshire", "Maine Coast"]
    }
];

const PopularTrips = () => {
    const sectionRef = useRef(null);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const elements = entry.target.querySelectorAll('.animated-element');
                        elements.forEach((el, i) => {
                            setTimeout(() => {
                                el.classList.add('visible');
                            }, i * 150);
                        });
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    useEffect(() => {
        console.log("---user>>>", user);
    }, [user]);

    return (
        <section ref={sectionRef} className="py-20 px-6 md:px-10 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-semibold mb-4 animated-element">Popular AI Trips</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto animated-element">
                        Ready-to-go itineraries crafted by travel experts and AI trip enthusiasts
                    </p>
                </div>

                <div className="space-y-12">
                    {trips.map((trip, index) => (
                        <div
                            key={trip.id}
                            className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 animated-element`}
                        >
                            <div className="lg:w-1/2 overflow-hidden rounded-xl">
                                <AnimatedImage
                                    src={trip.image}
                                    alt={trip.title}
                                    className="w-full h-64 md:h-80 object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            <div className="lg:w-1/2 flex flex-col justify-center">
                                <h3 className="text-2xl md:text-3xl font-semibold mb-4">{trip.title}</h3>
                                <p className="text-muted-foreground mb-6">{trip.description}</p>

                                <div className="flex flex-wrap gap-6 mb-6">
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-5 w-5 text-primary" />
                                        <span>{trip.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-5 w-5 text-primary" />
                                        <span>{trip.distance}</span>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <p className="font-medium mb-2">Highlights:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {trip.highlights.map((highlight, i) => (
                                            <span
                                                key={i}
                                                className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                                            >
                                                {highlight}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {
                                    user ? <Link to='/my-trips'>
                                    <Button className="w-fit group">
                                        <span>View Full Itinerary</span>
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                    </Button>
                                </Link> : ""
                                }

                                
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PopularTrips;
