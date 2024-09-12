import React from 'react';
import { Skeleton } from '@mui/material';

// variant: Determines the type of skeleton (e.g., text, rectangular, or circular).
// width and height: Define the dimensions of the skeleton elements. You can pass values like 100%, 50%, 300px, etc.
// count: Allows you to specify how many skeletons should be rendered (default is 1).
// spaceBetween: Adds vertical spacing between skeletons.

interface SkeletonLoaderProps {
  variant?: 'text' | 'rectangular' | 'circular';
  width?: string | number;
  height?: string | number;
  count?: number;
  marginBottom?: number;
  borderRadius?: number;
  marginRight?: number;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  variant = 'rectangular',
  width = '100%',
  height = 60,
  count = 1,
  marginBottom = 0,
  borderRadius = 0,
  marginRight = 0,
}) => {
  // Create an array to render multiple skeletons
  const skeletonArray = Array.from({ length: count });

  return (
    <>
      {skeletonArray.map((_, index) => (
        <Skeleton
          key={index}
          variant={variant}
          width={width}
          height={height}
          sx={{
            marginBottom: `${marginBottom}rem`,
            borderRadius: borderRadius,
            marginRight: `${marginRight}rem`,
          }}
        />
      ))}
    </>
  );
};

export default SkeletonLoader;
