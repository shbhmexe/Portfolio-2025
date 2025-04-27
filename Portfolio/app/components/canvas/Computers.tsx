'use client';
import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

const Computers = ({ isMobile }: { isMobile: boolean }) => {
  // In a real application, we would use a desktop computer model from a .glb or .gltf file
  // For this example, we'll create a simple 3D object to represent a computer
  
  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <pointLight intensity={1} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      
      {/* Base of computer */}
      <mesh position={[0, -1.5, 0]} receiveShadow castShadow>
        <boxGeometry args={[4, 0.5, 2]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      
      {/* Monitor stand */}
      <mesh position={[0, -0.75, 0]} receiveShadow castShadow>
        <boxGeometry args={[0.5, 1, 0.5]} />
        <meshStandardMaterial color="#222222" />
      </mesh>
      
      {/* Monitor */}
      <mesh position={[0, 0.25, 0]} receiveShadow castShadow>
        <boxGeometry args={[isMobile ? 2.5 : 3.5, 2, 0.2]} />
        <meshStandardMaterial color="#111111" />
      </mesh>
      
      {/* Screen */}
      <mesh position={[0, 0.25, 0.11]} receiveShadow>
        <boxGeometry args={[isMobile ? 2.2 : 3.2, 1.7, 0.01]} />
        <meshStandardMaterial color="#0066cc" emissive="#0055aa" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Keyboard */}
      <mesh position={[0, -1.2, 1]} receiveShadow castShadow>
        <boxGeometry args={[3, 0.2, 1]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<div className="canvas-loader" />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas; 