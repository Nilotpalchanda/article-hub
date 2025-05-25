'use client';

import Image from 'next/image';
import { useState } from 'react';

interface LargeVerticalImageFallbackProps {
  src: string;
  alt: string;
}

const LargeVerticalImageFallback = ({
  src,
  alt,
}: LargeVerticalImageFallbackProps) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-full" style={{ aspectRatio: '355 / 192' }}>
      {loading && <div className="h-48 w-full animate-pulse bg-gray-300" />}
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="(max-width: 768px) 100vw, 355px"
        className={`object-cover transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
};

export default LargeVerticalImageFallback;
