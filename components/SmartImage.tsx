'use client';

import React, { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';

interface SmartImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  fallbackSrc?: string;
}

export default function SmartImage({
  src,
  alt,
  fallbackSrc = '/images/card-1-brain.jpg',
  className,
  ...props
}: SmartImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() => {
        // If jpg fails, attempt loading webp
        if (imgSrc.endsWith('.jpg') && !imgSrc.includes('card-1-brain')) {
          setImgSrc(imgSrc.replace(/\.jpg$/i, '.webp'));
        } else if (imgSrc !== fallbackSrc) {
          // If webp or other format fails, fallback to default banner
          setImgSrc(fallbackSrc);
        }
      }}
    />
  );
}

