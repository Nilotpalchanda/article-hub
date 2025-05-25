'use client'

import Image from "next/image";
import { useState } from "react";

interface LargeVerticalImageFallbackProps {
  src: string;
  alt: string;
}

const LargeVerticalImageFallback = ({ src, alt }: LargeVerticalImageFallbackProps) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-full h-48">
      {loading && <div className="h-48 w-full animate-pulse  bg-gray-300" />}
      <Image
        src={`${src}?height=400&width=600`}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className={`object-cover transition-opacity duration-300 ${loading ? "opacity-0" : "opacity-100"}`}
        onLoad={() => setLoading(false)}
      />
      
    </div>
  );
};


export default LargeVerticalImageFallback;