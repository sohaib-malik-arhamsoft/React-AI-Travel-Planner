import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const AnimatedImage = ({ src, alt, className }) => {
  const imgRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-blur-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  return (
    <img 
      ref={imgRef}
      src={src} 
      alt={alt} 
      className={cn(
        "transition-all duration-1000",
        className
      )} 
    />
  );
};

export default AnimatedImage;