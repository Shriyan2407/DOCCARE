import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const STEP_POSITIONS = [
  { pos: [0, 0, 5], lookAt: [0, 0, 0] },     // 0: Details
  { pos: [4, 2, 4], lookAt: [0, 0, 0] },     // 1: Specialty
  { pos: [5, -1, 0], lookAt: [0, 0, 0] },    // 2: Doctor
  { pos: [2, 4, -4], lookAt: [0, 0, 0] },    // 3: Time
  { pos: [-4, 0, -4], lookAt: [0, 0, 0] },   // 4: Confirm
  { pos: [0, 0, 8], lookAt: [0, 0, 0] }      // 5: Success
];

function CameraRig({ step }) {
  useFrame((state) => {
    const target = STEP_POSITIONS[step] || STEP_POSITIONS[0];
    state.camera.position.lerp(new THREE.Vector3(...target.pos), 0.05);
    state.camera.lookAt(new THREE.Vector3(...target.lookAt));
  });
  return null;
}

function MedicalCore({ step }) {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
      
      // Expand/contract based on step
      const targetScale = step === 5 ? 1.5 : 1 + (step * 0.1);
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Core Ring 1 */}
        <mesh rotation={[Math.PI/4, 0, 0]}>
          <torusGeometry args={[2, 0.02, 16, 100]} />
          <meshPhysicalMaterial color="#D4AF37" metalness={1} roughness={0.1} emissive="#D4AF37" emissiveIntensity={0.5} />
        </mesh>
        {/* Core Ring 2 */}
        <mesh rotation={[0, Math.PI/4, 0]}>
          <torusGeometry args={[1.5, 0.05, 16, 100]} />
          <meshPhysicalMaterial color="#ffffff" metalness={1} roughness={0} transmission={0.9} thickness={0.5} />
        </mesh>
        
        {/* Central Pulse */}
        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshPhysicalMaterial 
            color={step === 5 ? "#4ade80" : "#D4AF37"} 
            emissive={step === 5 ? "#4ade80" : "#D4AF37"}
            emissiveIntensity={1}
            wireframe
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function BookingConfigurator3D({ currentStep }) {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <color attach="background" args={['#050505']} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} intensity={2} color="#D4AF37" />
        
        <CameraRig step={currentStep} />
        <MedicalCore step={currentStep} />
        
        <ContactShadows position={[0, -3, 0]} opacity={0.4} scale={20} blur={2} far={4} color="#D4AF37" />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
