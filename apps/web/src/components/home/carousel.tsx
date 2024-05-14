'use client'

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function CarouselHome() {
  const imgCarousel = [
    'https://images.unsplash.com/photo-1569793667639-dae11573b34f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === imgCarousel.length - 1 ? 0 : prevSlide + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [currentSlide, imgCarousel.length]);

  return (
    <div className="w-full">
      <div className="w-full max-h-40 md:max-h-80 carousel rounded-box">
        {imgCarousel.map((item, idx) => (
          <div key={idx} id={`item${idx + 1}`} className={`carousel-item w-full ${idx === currentSlide ? '' : 'hidden'}`}>
            <Image src={item} className="w-full object-cover" width={2000} height={700} alt={`Slide ${idx + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

