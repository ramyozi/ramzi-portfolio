'use client';

import { useState, useEffect } from 'react';
import { getTechLogo } from '@/utils/get-logo';

interface TechIconProps {
  techKey: string;
  label?: string;
  className?: string;
  onError?: () => void;
}

export default function TechIcon({
  techKey,
  label,
  className,
  onError,
}: TechIconProps) {
  const [url, setUrl] = useState<string>('/fallback-icon.svg');

  useEffect(() => {
    let mounted = true;

    getTechLogo(techKey).then((res) => {
      if (mounted && res) setUrl(res);
    });
    return () => {
      mounted = false;
    };
  }, [techKey]);

  return (
    <img
      src={url}
      alt={label ?? techKey}
      className={className ?? 'mx-auto h-10 w-10 object-contain'}
      onError={onError}
    />
  );
}
