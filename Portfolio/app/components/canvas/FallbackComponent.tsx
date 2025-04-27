'use client';
import React from 'react';

const FallbackComponent = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#050816] p-10 text-white">
      <div className="mb-4 text-[#915eff] text-xl font-bold">3D View Unavailable</div>
      <div className="text-center text-sm">
        The interactive 3D model could not be loaded.
        <br />
        Please try again with a modern browser.
      </div>
    </div>
  );
};

export default FallbackComponent; 