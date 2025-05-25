'use client'

import Image from "next/image";
import { useState } from "react";

interface VerticalImageFallbackProps {
  src: string;
  alt: string;
}

const VerticalImageFallback = ({ src, alt }: VerticalImageFallbackProps) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-full h-32" style={{ aspectRatio: '268 / 128' }}>
      {loading && <div className="h-32 w-full animate-pulse  bg-gray-300" />}
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="(max-width: 768px) 100vw, 268px"
        className={`object-cover transition-opacity duration-300 ${loading ? "opacity-0" : "opacity-100"}`}
        onLoad={() => setLoading(false)}
      />
      
    </div>
  );
};

export default VerticalImageFallback;