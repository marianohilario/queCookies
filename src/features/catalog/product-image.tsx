"use client";

import Image from "next/image";
import { useState } from "react";
import { Icon } from "@/components/ui/icon";

type Props = {
  src?: string;
  images?: readonly string[];
  priority?: boolean;
  className?: string;
  sizes?: string;
};
export function ProductImage({
  src,
  images,
  priority = false,
  className = "",
  sizes = "(max-width: 767px) 90vw, 50vw",
}: Props) {
  const allImages = images && images.length > 0 ? images : src ? [src] : [];
  const [currentIndex, setCurrentIndex] = useState(0);

  if (allImages.length === 0) return null;

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className={`relative overflow-hidden bg-[#eadcc5] ${className}`}>
      {allImages.map((imageSrc, index) => (
        <Image
          key={imageSrc}
          src={imageSrc}
          alt="Fotografía ilustrativa de cookies; no representa necesariamente el producto final"
          fill
          sizes={sizes}
          preload={priority && index === 0}
          className={`object-cover transition-opacity duration-300 ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      {allImages.length > 1 && (
        <>
          <button
            type="button"
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-brand shadow-md transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-brand/50 sm:left-4"
            aria-label="Imagen anterior"
          >
            <Icon name="arrow" className="size-5 rotate-180" />
          </button>
          <button
            type="button"
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-brand shadow-md transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-brand/50 sm:right-4"
            aria-label="Siguiente imagen"
          >
            <Icon name="arrow" className="size-5" />
          </button>
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {allImages.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goToSlide(index)}
                className={`h-2.5 w-2.5 rounded-full transition ${index === currentIndex ? "bg-brand" : "bg-white/70"}`}
                aria-label={`Ir a imagen ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
