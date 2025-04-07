import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Map, Calendar, Compass, ChevronRight } from 'lucide-react';
import { Link } from "react-router-dom";


const destinations = [
  {
    id: 1,
    title: "Pacific Coast Highway",
    location: "California",
    description: "Iconic coastal drive with breathtaking ocean views",
    image: "https://images.unsplash.com/photo-1449452198679-05c7fd30f416?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Blue Ridge Parkway",
    location: "North Carolina & Virginia",
    description: "Scenic mountain corridor through the Appalachian Highlands",
    image: "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg"
  },
  {
    id: 3,
    title: "Route 66",
    location: "Illinois to California",
    description: "Historic highway showcasing classic Americana landmarks",
    image: "https://images.pexels.com/photos/416974/pexels-photo-416974.jpeg"
  },
  {
    id: 4,
    title: "Going-to-the-Sun AI",
    location: "Montana",
    description: "Spectacular alpine crossing in Glacier National Park",
    image: "https://images.unsplash.com/photo-1527489377706-5bf97e608852?q=80&w=2059&auto=format&fit=crop"
  }
];

const Hero = () => {
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
    <section ref={sectionRef} className="py-20 px-6 md:px-10 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 animated-element">Featured Destinations</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto animated-element">
            Explore our handpicked selection of America's most scenic drives and iconic AI trips
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {destinations.map((destination) => (
            <div
              key={destination.id}
              className="group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 animated-element hover-scale"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="font-medium text-lg">{destination.title}</h3>
                  <p className="text-sm text-white/80">{destination.location}</p>
                </div>
              </div>
              <div className="p-4 bg-white">
                <p className="text-sm text-muted-foreground mb-4">{destination.description}</p>
              </div>
            </div>
          ))}
        </div>

        {
          user ? <div className="mt-12 text-center animated-element">
          <Link to='/my-trips'>
          <Button variant="outline" size="lg" className="group">
            <span>View All Trips</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
          </Link>
        </div> : ''
        }

      </div>
    </section>
  );
};

export default Hero;
