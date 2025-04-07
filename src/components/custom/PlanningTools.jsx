import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Map, Calendar, Compass, ChevronRight } from 'lucide-react';
import { Link } from "react-router-dom";

const tools = [
    {
        id: 1,
        title: "Interactive Trip Planner",
        description: "Drag & drop waypoints on a dynamic map to create your perfect journey",
        icon: <Map className="h-8 w-8" />,
        color: "bg-blue-100 text-blue-600"
    },
    {
        id: 2,
        title: "Trip Scheduling",
        description: "Plan your daily itinerary with travel times and accommodation bookings",
        icon: <Calendar className="h-8 w-8" />,
        color: "bg-green-100 text-green-600"
    },
    {
        id: 3,
        title: "Points of Interest",
        description: "Discover hidden gems, scenic viewpoints and must-see attractions",
        icon: <Compass className="h-8 w-8" />,
        color: "bg-amber-100 text-amber-600"
    }
];

const PlanningTools = () => {
    const sectionRef = useRef(null);

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

    return (
        <section ref={sectionRef} className="py-20 px-6 md:px-10 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-semibold mb-6 animated-element">
                            Plan Your Perfect AI Trip
                        </h2>
                        <p className="text-muted-foreground mb-8 animated-element">
                            Our intuitive planning tools help you create personalized AI trips with ease.
                            Map your route, discover amazing stops, and create unforgettable memories.
                        </p>
                        <div className="space-y-6">
                            {tools.map((tool) => (
                                <div key={tool.id} className="flex gap-4 animated-element">
                                    <div className={`flex-shrink-0 ${tool.color} p-3 rounded-xl`}>
                                        {tool.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-lg mb-1">{tool.title}</h3>
                                        <p className="text-muted-foreground">{tool.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 animated-element">
                            <Link to={'/create-trip'}>
                                <Button size="lg" className="group">
                                    Start Planning Now
                                    <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="relative animated-element">
                        <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop"
                                alt="People planning a trip"
                                className="w-full h-auto object-cover"
                            />
                        </div>
                        <div className="absolute -top-6 -right-6 w-40 h-40 bg-primary/10 rounded-full backdrop-blur-2xl"></div>
                        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-accent/10 rounded-full backdrop-blur-2xl"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PlanningTools;