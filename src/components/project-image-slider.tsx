"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Icons } from "./icons";
import { cn, optimizeCloudinaryUrl } from "@/lib/utils";

interface ProjectImageSliderProps {
    images: string[];
    companyName: string;
}

export default function ProjectImageSlider({ images, companyName }: ProjectImageSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    useEffect(() => {
        if (images.length <= 1) return;

        const timer = setTimeout(() => {
            setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }, 2000);

        return () => clearTimeout(timer);
    }, [currentIndex, images.length]);

    if (!images || images.length === 0) return null;

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const handleLightboxPrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        setLightboxIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleLightboxNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setLightboxIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const openLightbox = (index: number) => {
        setLightboxIndex(index);
        setIsLightboxOpen(true);
    };

    const closeLightbox = () => {
        setIsLightboxOpen(false);
    };

    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    useEffect(() => {
        setScale(1);
        setPosition({ x: 0, y: 0 });
        setIsDragging(false);
    }, [lightboxIndex, isLightboxOpen]);

    const handleWheel = (e: React.WheelEvent) => {
        const zoomFactor = 0.15;
        let newScale = scale;
        if (e.deltaY < 0) {
            newScale = Math.min(scale + zoomFactor, 4);
        } else {
            newScale = Math.max(scale - zoomFactor, 1);
        }
        setScale(newScale);
        if (newScale === 1) {
            setPosition({ x: 0, y: 0 });
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (scale === 1) return;
        e.preventDefault();
        setIsDragging(true);
        setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || scale === 1) return;
        e.preventDefault();
        setPosition({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y,
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleDoubleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (scale > 1) {
            setScale(1);
            setPosition({ x: 0, y: 0 });
        } else {
            setScale(2.5);
        }
    };

    return (
        <div className="relative my-8 group">
            {/* Main Slider Display */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-muted bg-muted shadow-md cursor-pointer transition-all duration-300 hover:shadow-lg" onClick={() => openLightbox(currentIndex)}>
                <Image src={optimizeCloudinaryUrl(images[currentIndex], 1000)} alt={`${companyName} Screenshot ${currentIndex + 1}`} fill className="object-cover select-none" priority />

                {/* Gradient Overlay for Controls */}
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Index Indicator Badge */}
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded-full font-medium select-none pointer-events-none z-10">
                    {currentIndex + 1} / {images.length}
                </div>

                {/* Fullscreen Expand Hint Icon */}
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-xs text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                    <Icons.media className="w-4 h-4" />
                </div>
            </div>

            {/* Slider Navigation Buttons */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={handlePrev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full border border-muted bg-background/80 backdrop-blur-xs text-foreground/80 hover:text-foreground hover:bg-background shadow-xs hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer z-10 opacity-0 group-hover:opacity-100"
                        aria-label="Previous image"
                    >
                        <Icons.chevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={handleNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full border border-muted bg-background/80 backdrop-blur-xs text-foreground/80 hover:text-foreground hover:bg-background shadow-xs hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer z-10 opacity-0 group-hover:opacity-100"
                        aria-label="Next image"
                    >
                        <Icons.chevronRight className="w-5 h-5" />
                    </button>
                </>
            )}

            {/* Dots/Indicators */}
            {images.length > 1 && (
                <div className="flex justify-center gap-1.5 mt-3 select-none">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={cn("h-1.5 rounded-full transition-all duration-300 cursor-pointer", index === currentIndex ? "w-6 bg-foreground" : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60")}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}

            {/* Lightbox / Modal Overlay */}
            {isLightboxOpen && (
                <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-between p-6 backdrop-blur-xs select-none animate-in fade-in duration-200" onClick={closeLightbox}>
                    {/* Close Button */}
                    <button onClick={closeLightbox} className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50" aria-label="Close image viewer">
                        <Icons.close className="w-6 h-6" />
                    </button>

                    {/* Top Spacer */}
                    <div className="h-10 w-full select-none" />

                    {/* Lightbox Slider Display */}
                    <div
                        className="relative w-[95vw] h-[65vh] md:h-[75vh] rounded-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 select-none"
                        onClick={(e) => e.stopPropagation()}
                        onWheel={handleWheel}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        onDoubleClick={handleDoubleClick}
                        style={{
                            cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in",
                        }}
                    >
                        <Image
                            src={optimizeCloudinaryUrl(images[lightboxIndex], 1920)}
                            alt={`${companyName} Fullscreen ${lightboxIndex + 1}`}
                            fill
                            className="object-contain select-none pointer-events-none"
                            sizes="95vw"
                            style={{
                                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                                transition: isDragging ? "none" : "transform 0.15s ease-out",
                                transformOrigin: "center center",
                            }}
                        />
                    </div>

                    {/* Lightbox Navigation Buttons */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={handleLightboxPrev}
                                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer z-50 animate-in slide-in-from-left-4"
                                aria-label="Previous image"
                            >
                                <Icons.chevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={handleLightboxNext}
                                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer z-50 animate-in slide-in-from-right-4"
                                aria-label="Next image"
                            >
                                <Icons.chevronRight className="w-6 h-6" />
                            </button>
                        </>
                    )}

                    {/* Bottom Container: Counter & Thumbnail Slider */}
                    <div className="w-full max-w-5xl flex flex-col items-center gap-3 select-none z-10" onClick={(e) => e.stopPropagation()}>
                        {/* Lightbox Index Counter */}
                        <div className="bg-white/10 text-white text-xs px-3 py-1 rounded-full font-medium">
                            {lightboxIndex + 1} / {images.length}
                        </div>

                        {/* Thumbnail Strip (Scrollable) */}
                        {images.length > 1 && (
                            <div className="w-full flex gap-2 overflow-x-auto py-2 justify-start sm:justify-center items-center scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setLightboxIndex(idx)}
                                        className={cn(
                                            "relative w-20 aspect-video rounded-md overflow-hidden border-2 transition-all duration-200 cursor-pointer shrink-0",
                                            idx === lightboxIndex ? "border-emerald-500 scale-105 opacity-100 shadow-md shadow-emerald-500/20" : "border-white/10 opacity-40 hover:opacity-80",
                                        )}
                                        aria-label={`View image ${idx + 1}`}
                                    >
                                        <Image src={optimizeCloudinaryUrl(img, 200)} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
