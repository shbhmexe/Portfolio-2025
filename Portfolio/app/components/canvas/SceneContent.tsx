'use client';
import React, { useRef, useState } from 'react';
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

// Floating coding elements
const FloatingElements = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [time, setTime] = useState(0);
  
  useFrame((state, delta) => {
    setTime((prev) => prev + delta);
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.1 + 1.5;
      groupRef.current.rotation.y = time * 0.2;
    }
  });
  
  return (
    <group ref={groupRef}>
      {/* Create code-like particles floating */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} position={[
          Math.sin(i / 8 * Math.PI * 2) * 1.2,
          Math.cos(i / 8 * Math.PI * 2) * 0.2,
          Math.cos(i / 8 * Math.PI * 2) * 1.2
        ]}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshStandardMaterial 
            color={i % 2 === 0 ? "#4da6ff" : "#915eff"} 
            emissive={i % 2 === 0 ? "#4da6ff" : "#915eff"}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
      
      {/* Create a few floating rings */}
      <mesh position={[0, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.8, 0.1, 16, 32]} />
        <meshStandardMaterial color="#915eff" emissive="#915eff" emissiveIntensity={0.2} />
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
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[0, 2, 0]} intensity={1} color="#915eff" />
      
      {/* 3D Elements */}
      <group position={[0, 0, 0]}>
        <ComputerModel />
        <FloatingElements />
        
        {/* Add a floating text */}
        <Text
          position={[0, 1, 0]}
          color="#ffffff"
          fontSize={0.4}
          maxWidth={4}
          lineHeight={1}
          letterSpacing={0.02}
          textAlign="center"
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
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