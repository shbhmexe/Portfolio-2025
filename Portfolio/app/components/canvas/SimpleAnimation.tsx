'use client';
import React, { useRef } from 'react';

// Create a simplified animation that doesn't rely on Three.js
const SimpleAnimation = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-[300px] h-[300px]">
        {/* Floating cube */}
        <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[#5285e8] rounded-md animate-float shadow-lg" />
        
        {/* Floating sphere */}
        <div className="absolute top-[30%] left-[70%] transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#e8525e] rounded-full animate-float2 shadow-lg" />
        
        {/* Floating ring */}
        <div className="absolute top-[70%] left-[30%] transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-16 h-16 bg-transparent border-4 border-[#52e89a] rounded-full animate-spin-slow shadow-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default SimpleAnimation; 