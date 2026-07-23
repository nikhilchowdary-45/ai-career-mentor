"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// Seedable pseudo-random generator to ensure render purity (LCG)
function createSeededRandom(seed: number) {
  let s = seed;
  return function() {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function FloatingParticleField() {
  const ref = useRef<THREE.Points>(null!);
  
  // Generate 1200 3D particle positions inside a spherical volume using seeded random
  const particlePositions = useMemo(() => {
    const random = createSeededRandom(42);
    const count = 1200;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const u = random();
      const v = random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(random()) * 12; // radius

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta * 0.04;
      ref.current.rotation.y -= delta * 0.06;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={particlePositions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#8b5cf6"
          size={0.06}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  );
}

function FloatingIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={[3.5, 0, -2]}>
      <icosahedronGeometry args={[1.8, 1]} />
      <meshStandardMaterial
        color="#7c3aed"
        wireframe
        emissive="#4f46e5"
        emissiveIntensity={0.5}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
}

export const Background3DCanvas: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(document.visibilityState === "visible");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-70 transition-opacity duration-1000">
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 60 }} 
        dpr={[1, 2]}
        frameloop={isVisible ? "always" : "never"}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#06b6d4" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#8b5cf6" />
        
        <FloatingParticleField />
        <FloatingIcosahedron />
      </Canvas>
    </div>
  );
};
