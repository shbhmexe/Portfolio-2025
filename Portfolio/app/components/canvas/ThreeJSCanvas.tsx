'use client';
import React from 'react';
import { Canvas } from '@react-three/fiber';

// Import Scene component from a separate file to reduce complexity
import SceneContent from './SceneContent';

const ThreeJSCanvas = () => {
  return (
    <div className="w-full h-full">
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
        <SceneContent />
      </Canvas>
    </div>
  );
};

export default ThreeJSCanvas; 