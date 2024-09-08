import React from 'react';
import { Skeleton } from '@mui/material';

interface SkeletonLoaderProps {
  variant?: 'text' | 'rectangular' | 'circular';
  width?: string | number;
  height?: string | number;
  count?: number;
  spaceBetween?: number; // Optional: space between skeleton elements
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  variant = 'rectangular',
  width = '100%',
  height = 60,
  count = 1,
  spaceBetween = 4,
}) => {
  // Create an array to render multiple skeletons
  const skeletonArray = Array.from({ length: count });

  return (
    <div className={`space-y-${spaceBetween}`}>
      {skeletonArray.map((_, index) => (
        <Skeleton
          key={index}
          variant={variant}
          width={width}
          height={height}
        />
      ))}
    </div>
  );
};

export default SkeletonLoader;
