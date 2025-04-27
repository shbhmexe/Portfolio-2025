'use client';
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

// Create a simple computer model instead of loading external models
const ComputerModel = () => {
  const computerRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (computerRef.current) {
      computerRef.current.rotation.y += delta * 0.2;
    }
  });
  
  return (
    <group ref={computerRef} position={[0, -1, 0]}>
      {/* Laptop base */}
      <mesh position={[0, -0.1, 0]} castShadow>
        <boxGeometry args={[3, 0.2, 2]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      
      {/* Laptop screen */}
      <group position={[0, 0.7, -0.8]} rotation={[Math.PI / 6, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[3, 2, 0.1]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
        
        {/* Screen display */}
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[2.8, 1.8]} />
          <meshStandardMaterial color="#151030" emissive="#4da6ff" emissiveIntensity={0.5} />
        </mesh>
      </group>
      
      {/* Keyboard */}
      <mesh position={[0, 0, 0.2]} rotation={[0, 0, 0]}>
        <planeGeometry args={[2.8, 1.6]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
    </group>
  );
};

// Main scene content
const SceneContent = () => {
  return (
    <>
      <color attach="background" args={['#050816']} />
      <fogExp2 attach="fog" args={['#050816', 0.15]} />
      
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[1, 10, 5]}
        intensity={2}
        castShadow
      />
      <pointLight position={[0, 2, 0]} intensity={1} color="#915eff" />
      
      {/* 3D Elements */}
      <group position={[0, 0, 0]}>
        <ComputerModel />
        
        {/* Add a floating text */}
        <Text
          position={[0, 1, 0]}
          color="#ffffff"
          fontSize={0.4}
          maxWidth={4}
          lineHeight={1}
          letterSpacing={0.02}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
        >
          Web Developer
        </Text>
      </group>
      
      {/* Controls */}
      <OrbitControls 
        enableZoom={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
};

export default SceneContent; 