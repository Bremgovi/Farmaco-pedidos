"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {
  fallback: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  className: string;
};

const ImageWithFallback = ({ fallback, alt, src, width, height, className, ...props }: Props) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [src]);

  const handleError = () => setError(true);

  return <Image alt={alt} onError={handleError} src={error ? fallback : src} width={width} height={height} className={className} {...props} />;
};

export default ImageWithFallback;
