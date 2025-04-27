'use client';
import React, { Suspense, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Import the fallback component
import FallbackComponent from './FallbackComponent';

// Dynamically import with no SSR
const ThreeJSCanvas = dynamic(
  () => import('./ThreeJSCanvas').catch(err => {
    console.error("Failed to load ThreeJSCanvas:", err);
    return () => <FallbackComponent />;
  }),
  { ssr: false, loading: () => <div className="w-full h-full flex items-center justify-center">Loading 3D Model...</div> }
);

const ThreeDComputer = () => {
  // Only render on client side
  const [mounted, setMounted] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Add error boundary through window error event
    const handleError = (event: ErrorEvent) => {
      // Only catch Three.js related errors
      if (event.message && (
        event.message.includes('three') || 
        event.message.includes('webgl') || 
        event.message.includes('canvas') ||
        event.message.includes('react-three-fiber')
      )) {
        console.error("Three.js related error:", event);
        setHasError(true);
        event.preventDefault();
      }
    };
    
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (!mounted) {
    return <div className="w-full h-full flex items-center justify-center">Loading...</div>;
  }

  if (hasError) {
    return <FallbackComponent />;
  }

  return (
    <div className="w-full h-full">
      <Suspense fallback={<div className="w-full h-full flex items-center justify-center">Loading 3D Model...</div>}>
        <ThreeJSCanvas />
      </Suspense>
    </div>
  );
};

export default ThreeDComputer; 