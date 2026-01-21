import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import { Float } from '@react-three/drei';
import { useTheme } from '../context/ThemeContext';

// Subtle floating particles - optimized
const Particles = ({ count = 30, isDark }) => {
  const meshRef = useRef();
  const frameCount = useRef(0);

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
    // Throttle to every 2nd frame for performance
    frameCount.current++;
    if (frameCount.current % 2 !== 0) return;

    meshRef.current.rotation.y = state.clock.elapsedTime * 0.015;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.008) * 0.03;
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
        color={isDark ? "#f43f5e" : "#e11d48"}
        transparent
        opacity={isDark ? 0.5 : 0.3}
        sizeAttenuation
      />
    </points>
  );
};

// Subtle floating shape - optimized
const FloatingShape = ({ position, isDark }) => {
  const meshRef = useRef();
  const frameCount = useRef(0);

  useFrame((state) => {
    // Throttle to every 3rd frame
    frameCount.current++;
    if (frameCount.current % 3 !== 0) return;

    meshRef.current.rotation.x = state.clock.elapsedTime * 0.05;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.08;
  });

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial
          color={isDark ? "#f43f5e" : "#e11d48"}
          transparent
          opacity={0.06}
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
        dpr={1}
        frameloop="always"
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.3} color="#f43f5e" />

        <Particles count={25} isDark={isDark} />

        <FloatingShape position={[-5, 3, -8]} isDark={isDark} />
        <FloatingShape position={[5, -3, -10]} isDark={isDark} />
      </Canvas>
    </div>
  );
};

export default Background3D;

