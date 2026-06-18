import { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, Sparkles, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Global Cursor Tracker Light
function CursorLight() {
  const lightRef = useRef();
  const { viewport, mouse } = useThree();

  useFrame(() => {
    if (lightRef.current) {
      // Map mouse coordinates (-1 to +1) to viewport space
      const x = (mouse.x * viewport.width) / 2;
      const y = (mouse.y * viewport.height) / 2;
      lightRef.current.position.lerp(new THREE.Vector3(x, y, 5), 0.1);
    }
  });

  return (
    <pointLight 
      ref={lightRef} 
      color="#D4AF37" 
      intensity={1.5} 
      distance={15} 
      decay={2} 
    />
  );
}

// Subtle animated background planes (glassy / depth layers)
function DepthLayers() {
  const groupRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(time * 0.1) * 0.05;
      groupRef.current.rotation.x = Math.cos(time * 0.1) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -10]}>
      {/* Deep Background Plane */}
      <mesh position={[0, 0, -5]} scale={[50, 50, 1]}>
        <planeGeometry />
        <meshBasicMaterial color="#050505" />
      </mesh>
      
      {/* Floating Glass Sheets */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh position={[-5, 2, 2]} rotation={[0.2, 0.5, 0]}>
          <planeGeometry args={[10, 10]} />
          <meshPhysicalMaterial 
            color="#0A0A0A"
            transmission={0.9}
            opacity={1}
            metalness={0.8}
            roughness={0.2}
            ior={1.5}
            thickness={0.5}
          />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.8}>
        <mesh position={[6, -3, 0]} rotation={[-0.2, -0.4, 0.1]}>
          <planeGeometry args={[15, 8]} />
          <meshPhysicalMaterial 
            color="#111111"
            transmission={0.8}
            opacity={1}
            metalness={0.9}
            roughness={0.1}
            ior={1.4}
            thickness={1}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function GlobalScene() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: -10, pointerEvents: 'none', background: '#000000' }}>
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#000000']} />
        
        {/* Environment & Lighting */}
        <ambientLight intensity={0.2} color="#ffffff" />
        <directionalLight position={[10, 10, 5]} intensity={0.5} color="#D4AF37" />
        <CursorLight />

        {/* Depth Fog */}
        <fog attach="fog" args={['#000000', 5, 25]} />

        {/* Particles */}
        <Stars radius={50} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        <Sparkles count={100} scale={15} size={2} speed={0.4} opacity={0.2} color="#D4AF37" />

        {/* Volumetric Depth Layers */}
        <DepthLayers />

        {/* Reflections */}
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
