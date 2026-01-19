import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import { Float } from '@react-three/drei';
import { useTheme } from '../context/ThemeContext';
import * as THREE from 'three';

// Subtle floating particles
const Particles = ({ count = 50, isDark }) => {
  const meshRef = useRef();

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15 - 10;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.05;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color={isDark ? "#10b981" : "#059669"}
        transparent
        opacity={isDark ? 0.6 : 0.4}
        sizeAttenuation
      />
    </points>
  );
};

// Subtle floating shape
const FloatingShape = ({ position, isDark }) => {
  const meshRef = useRef();

  useFrame((state) => {
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={isDark ? "#10b981" : "#059669"}
          transparent
          opacity={0.08}
          wireframe
        />
      </mesh>
    </Float>
  );
};

const Background3D = () => {
  const { isDark } = useTheme();

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#10b981" />

        <Particles count={40} isDark={isDark} />

        <FloatingShape position={[-5, 3, -8]} isDark={isDark} />
        <FloatingShape position={[5, -3, -10]} isDark={isDark} />
        <FloatingShape position={[0, -5, -12]} isDark={isDark} />
      </Canvas>
    </div>
  );
};

export default Background3D;
