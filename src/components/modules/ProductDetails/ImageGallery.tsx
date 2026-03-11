"use client";
import React, { useEffect, useState, useRef } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
interface ImageGalleryProps {
    images: string[]
}
export function ImageGallery({ images }: ImageGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const [mousePos, setMousePos] = useState({
        x: 0,
        y: 0,
    });
    const [containerSize, setContainerSize] = useState({
        width: 0,
        height: 0,
    })
    const imageContainerRef = useRef<HTMLDivElement>(null)
    const ZOOM_LEVEL = 2.5
    const LENS_SIZE = 150
    const LENS_RADIUS = LENS_SIZE / 2
    useEffect(() => {
        const updateSize = () => {
            if (imageContainerRef.current) {
                const { width, height } =
                    imageContainerRef.current.getBoundingClientRect()
                setContainerSize({
                    width,
                    height,
                })
            }
        }
        updateSize()
        window.addEventListener('resize', updateSize)
        return () => window.removeEventListener('resize', updateSize)
    }, [])
    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }
    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    }
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!imageContainerRef.current) return
        const { left, top } = imageContainerRef.current.getBoundingClientRect()
        const x = e.clientX - left
        const y = e.clientY - top
        setMousePos({
            x,
            y,
        })
    }
    return (
        <div className="flex flex-col gap-4 w-full select-none relative">

            {/* Previous Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation()
                    prevSlide()
                }}
                className="absolute -left-5 md:-left-12 top-[45%] md:-translate-y-1/2 w-10 h-1  items-center justify-center  z-20"
                aria-label="Previous image"
            >
                <ChevronLeftIcon className="w-10 h-10 text-gray-800 cursor-pointer" />
            </button>

            {/* Next Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation()
                    nextSlide()
                }}
                className="absolute -right-5 md:-right-12 top-[45%] md:-translate-y-1/2 w-10 h-10  flex items-center justify-center  z-20"
                aria-label="Next image"
            >
                <ChevronRightIcon className="w-10 h-10 text-gray-800 cursor-pointer" />
            </button>


            {/* Main Image Container */}
            <div
                ref={imageContainerRef}
                className="relative w-full aspect-[4/5] bg-gray-50 overflow-hidden cursor-crosshair group"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onMouseMove={handleMouseMove}
            >

                <img
                    src={images[currentIndex]}
                    alt={`Product view ${currentIndex + 1}`}
                    className="w-full h-full object-cover object-center"
                />

                {/* Zoom Lens */}
                {isHovering && containerSize.width > 0 && (
                    <div
                        className="absolute pointer-events-none rounded-full border border-gray-200 shadow-xl bg-no-repeat z-10 hidden md:block"
                        style={{
                            width: `${LENS_SIZE}px`,
                            height: `${LENS_SIZE}px`,
                            left: `${mousePos.x - LENS_RADIUS}px`,
                            top: `${mousePos.y - LENS_RADIUS}px`,
                            backgroundImage: `url(${images[currentIndex]})`,
                            backgroundSize: `${containerSize.width * ZOOM_LEVEL}px ${containerSize.height * ZOOM_LEVEL}px`,
                            backgroundPosition: `${-(mousePos.x * ZOOM_LEVEL) + LENS_RADIUS}px ${-(mousePos.y * ZOOM_LEVEL) + LENS_RADIUS}px`,
                        }}
                    />
                )}

                {/* Dot Indicators */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {images.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={(e) => {
                                e.stopPropagation()
                                setCurrentIndex(idx)
                            }}
                            className={`w-2 h-2 rounded-full transition-colors ${idx === currentIndex ? 'bg-orange-500' : 'bg-gray-300'}`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* Thumbnails */}
            <div className="hidden flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`relative w-20  h-24 flex-shrink-0 overflow-hidden border-2 transition-colors ${idx === currentIndex ? 'border-black' : 'border-transparent hover:border-gray-300'}`}
                    >
                        <img
                            src={img}
                            alt={`Thumbnail ${idx + 1}`}
                            className="w-full h-full object-cover object-center"
                        />
                    </button>
                ))}
            </div>

        </div>
    )
}
