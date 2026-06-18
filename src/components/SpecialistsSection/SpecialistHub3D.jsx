import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Float, Sphere, Stars, PerspectiveCamera } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

const departments = [
  { id: 'cardiology', title: 'Cardiology', count: 24, wait: '< 5 min', sat: '99%', pos: [3.5, 1.5, 0] },
  { id: 'neurology', title: 'Neurology', count: 18, wait: '< 8 min', sat: '98%', pos: [-3.5, 2, 1] },
  { id: 'pediatrics', title: 'Pediatrics', count: 32, wait: 'Instant', sat: '99%', pos: [2.5, -2.5, 2] },
  { id: 'mental-wellness', title: 'Mental Wellness', count: 45, wait: 'Instant', sat: '97%', pos: [-3, -1.5, 0] },
  { id: 'dermatology', title: 'Dermatology', count: 12, wait: '< 15 min', sat: '98%', pos: [0, 3.5, -1] },
  { id: 'orthopedics', title: 'Orthopedics', count: 20, wait: '< 10 min', sat: '96%', pos: [1.5, -0.5, 3] },
  { id: 'telemedicine', title: 'Telemedicine', count: '100+', wait: 'Instant', sat: '99%', pos: [-1.5, 0.5, 3.5] },
];

const NodeHTML = ({ data, active, onClick }) => {
  return (
    <motion.div
      className={`hub-node-html ${active ? 'active' : ''}`}
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: active ? 1.05 : 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div className="node-glow" />
      <div className="node-header">
        <div className="node-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </div>
        <h3 className="node-title">{data.title}</h3>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="node-stats"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="node-stat">
              <span>Specialists</span>
              <strong>{data.count}</strong>
            </div>
            <div className="node-stat">
              <span>Wait Time</span>
              <strong>{data.wait}</strong>
            </div>
            <div className="node-stat">
              <span>Satisfaction</span>
              <strong className="text-gold">{data.sat}</strong>
            </div>
            <button className="btn btn-gold btn-block" style={{ marginTop: '16px', padding: '8px', fontSize: '12px' }}>
              Access Department
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const HubNode = ({ data, activeId, setActiveId }) => {
  const isActive = activeId === data.id;
  const ref = useRef();
  
  // Subtle self rotation
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
      ref.current.rotation.x += 0.005;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1} position={data.pos}>
      <group ref={ref}>
        {/* Core physical sphere */}
        <Sphere args={[0.15, 32, 32]}>
          <meshBasicMaterial color={isActive ? "#D4AF37" : "#333"} />
        </Sphere>
        
        {/* Glowing aura */}
        {isActive && (
          <Sphere args={[0.3, 32, 32]}>
            <meshBasicMaterial color="#D4AF37" transparent opacity={0.2} blending={THREE.AdditiveBlending} />
          </Sphere>
        )}
        
        <Html 
          center 
          zIndexRange={[100, 0]} 
          style={{ transition: 'all 0.3s' }}
        >
          <NodeHTML 
            data={data} 
            active={isActive} 
            onClick={() => setActiveId(isActive ? null : data.id)} 
          />
        </Html>
      </group>
    </Float>
  );
};

// The central intelligence core
const CentralCore = () => {
  const coreRef = useRef();
  const ringRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.y = time * 0.2;
      coreRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.05);
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(time * 0.5) * 0.2;
      ringRef.current.rotation.y = time * 0.1;
    }
  });

  return (
    <group>
      <Sphere ref={coreRef} args={[1.5, 64, 64]}>
        <meshStandardMaterial 
          color="#D4AF37" 
          emissive="#D4AF37"
          emissiveIntensity={0.4}
          wireframe 
          transparent 
          opacity={0.15} 
        />
      </Sphere>
      <mesh ref={ringRef}>
        <torusGeometry args={[2.5, 0.02, 16, 100]} />
        <meshBasicMaterial color="#D4AF37" transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[4, 0.01, 16, 100]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.05} />
      </mesh>
    </group>
  );
};

// Scene camera logic to gently track mouse
const SceneRig = () => {
  useFrame((state) => {
    // Parallax effect based on mouse position
    const targetX = (state.pointer.x * 2);
    const targetY = (state.pointer.y * 2);
    
    state.camera.position.x += (targetX - state.camera.position.x) * 0.05;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.05;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
};

export const SpecialistHub3D = () => {
  const [activeId, setActiveId] = useState(null);

  return (
    <div className="hub-canvas-container">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#D4AF37" intensity={1} />
        
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        
        <CentralCore />
        
        {departments.map(dept => (
          <HubNode 
            key={dept.id} 
            data={dept} 
            activeId={activeId} 
            setActiveId={setActiveId} 
          />
        ))}
        
        <SceneRig />
      </Canvas>
    </div>
  );
};
