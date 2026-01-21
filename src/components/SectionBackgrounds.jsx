import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo, Suspense, useState, useEffect } from 'react';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Hook to detect mobile
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
};

// Wrapper - optimized with performance settings
const SectionCanvas = ({ children }) => {
  const isMobile = useIsMobile();

  // Skip 3D backgrounds on mobile for performance
  if (isMobile) {
    return null;
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
      <Canvas
        camera={{ position: [0, 0, 18], fov: 50 }}
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
        dpr={1}
        frameloop="always"
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.8} color="#60a5fa" />
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
};

// ==================== HERO - AI Brain Neural Network (Optimized) ====================
const BrainNeuron = ({ position, color, size = 0.15, delay = 0 }) => {
  const meshRef = useRef();
  const frameCount = useRef(0);

  useFrame((state) => {
    frameCount.current++;
    if (frameCount.current % 3 !== 0) return; // Throttle to every 3rd frame

    const t = state.clock.elapsedTime + delay;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.4) * 0.2;
    const pulse = 1 + Math.sin(t * 1.5) * 0.2;
    meshRef.current.scale.setScalar(pulse);
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.8} />
    </mesh>
  );
};

const NeuralConnection = ({ start, end, color }) => {
  const lineRef = useRef();

  const curve = useMemo(() => {
    const mid = [
      (start[0] + end[0]) / 2,
      (start[1] + end[1]) / 2,
      (start[2] + end[2]) / 2
    ];
    return new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(...start),
      new THREE.Vector3(...mid),
      new THREE.Vector3(...end)
    );
  }, [start, end]);

  const tubeGeo = useMemo(() => new THREE.TubeGeometry(curve, 12, 0.015, 4, false), [curve]);

  return (
    <mesh ref={lineRef} geometry={tubeGeo}>
      <meshBasicMaterial color={color} transparent opacity={0.25} />
    </mesh>
  );
};

const CodeRain = ({ count = 30 }) => {
  const particlesRef = useRef();
  const frameCount = useRef(0);

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = [];
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 1] = Math.random() * 15 - 5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
      speeds.push(Math.random() * 0.02 + 0.01);
    }
    return { positions, speeds };
  }, [count]);

  useFrame(() => {
    frameCount.current++;
    if (frameCount.current % 2 !== 0) return; // Throttle

    const pos = particlesRef.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] -= speeds[i];
      if (pos[i * 3 + 1] < -8) pos[i * 3 + 1] = 8;
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.1} color="#22d3ee" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
};

export const HeroBackground = () => {
  const neurons = useMemo(() => {
    const n = [];
    const count = 15; // Reduced from 25
    for (let i = 0; i < count; i++) {
      n.push({
        pos: [(Math.random() - 0.5) * 18, (Math.random() - 0.5) * 12, (Math.random() - 0.5) * 4 - 10],
        color: ['#60a5fa', '#a78bfa', '#22d3ee'][Math.floor(Math.random() * 3)],
        delay: Math.random() * 5
      });
    }
    return n;
  }, []);

  const connections = useMemo(() => {
    const c = [];
    const count = 8; // Reduced from 15
    for (let i = 0; i < count; i++) {
      const n1 = neurons[Math.floor(Math.random() * neurons.length)];
      const n2 = neurons[Math.floor(Math.random() * neurons.length)];
      if (n1 !== n2) {
        c.push({ start: n1.pos, end: n2.pos, color: '#60a5fa' });
      }
    }
    return c;
  }, [neurons]);

  return (
    <SectionCanvas>
      {neurons.map((n, i) => (
        <BrainNeuron key={i} position={n.pos} color={n.color} delay={n.delay} />
      ))}
      {connections.map((c, i) => (
        <NeuralConnection key={i} start={c.start} end={c.end} color={c.color} />
      ))}
      <CodeRain count={25} />
    </SectionCanvas>
  );
};

// ==================== ABOUT - Personal Journey DNA & Cards ====================
const DNAHelix = ({ position = [0, 0, 0], height = 12 }) => {
  const groupRef = useRef();
  const count = 30;

  useFrame((state) => {
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
  });

  return (
    <group ref={groupRef} position={position}>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 6;
        const y = (i / count) * height - height / 2;
        const radius = 1.5;
        return (
          <group key={i}>
            <mesh position={[Math.cos(angle) * radius, y, Math.sin(angle) * radius]}>
              <sphereGeometry args={[0.12, 12, 12]} />
              <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={1.5} />
            </mesh>
            <mesh position={[Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius]}>
              <sphereGeometry args={[0.12, 12, 12]} />
              <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={1.5} />
            </mesh>
            {i % 3 === 0 && (
              <mesh position={[0, y, 0]} rotation={[0, angle, 0]}>
                <cylinderGeometry args={[0.03, 0.03, radius * 2, 8]} />
                <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.8} transparent opacity={0.5} />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
};

const ProfileFrame = ({ position }) => {
  const groupRef = useRef();

  useFrame((state) => {
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh>
        <boxGeometry args={[2.5, 3, 0.1]} />
        <meshStandardMaterial color="#1e293b" transparent opacity={0.4} />
      </mesh>
      <mesh position={[0, 0, 0.06]}>
        <planeGeometry args={[2.2, 2.7]} />
        <meshStandardMaterial color="#0f172a" emissive="#60a5fa" emissiveIntensity={0.1} />
      </mesh>
      {/* Frame border glow */}
      <mesh>
        <boxGeometry args={[2.6, 3.1, 0.05]} />
        <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={0.5} transparent opacity={0.3} wireframe />
      </mesh>
    </group>
  );
};

const FloatingInfoCard = ({ position, width = 1.5, height = 0.8, delay = 0 }) => {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime + delay;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.6) * 0.4;
    meshRef.current.rotation.y = Math.sin(t * 0.4) * 0.2;
    meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.1;
  });

  return (
    <group ref={meshRef} position={position}>
      <mesh>
        <boxGeometry args={[width, height, 0.05]} />
        <meshStandardMaterial color="#1e3a5f" transparent opacity={0.4} />
      </mesh>
      <mesh position={[0, 0, 0.03]}>
        <boxGeometry args={[width * 0.9, height * 0.15, 0.02]} />
        <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={0.8} transparent opacity={0.6} />
      </mesh>
    </group>
  );
};

export const AboutBackground = () => {
  return (
    <SectionCanvas>
      {/* Minimal subtle 3D elements to avoid text obscuring */}
      {/* Very faint DNA helix - only for visual interest, highly transparent */}
      <group position={[-7, 0, -15]} scale={[0.5, 0.5, 0.5]}>
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[1, 0.05, 8, 16]} />
          <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={0.3} transparent opacity={0.08} />
        </mesh>
      </group>
      <group position={[7, 0, -15]} scale={[0.5, 0.5, 0.5]}>
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[1, 0.05, 8, 16]} />
          <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={0.3} transparent opacity={0.08} />
        </mesh>
      </group>
      {/* Profile Frame pushed even further back */}
      <ProfileFrame position={[0, 0, -18]} />
    </SectionCanvas>
  );
};

// ==================== SKILLS - Orbiting Tech Planets ====================
const TechPlanet = ({ orbitRadius, orbitSpeed, size, color, tilt = 0 }) => {
  const groupRef = useRef();
  const planetRef = useRef();
  const ringRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime * orbitSpeed;
    groupRef.current.position.x = Math.cos(t) * orbitRadius;
    groupRef.current.position.z = Math.sin(t) * orbitRadius - 5;
    groupRef.current.position.y = Math.sin(t * 0.5) * 2;
    planetRef.current.rotation.y += 0.01;
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.02;
    }
  });

  return (
    <group ref={groupRef} rotation={[tilt, 0, 0]}>
      <mesh ref={planetRef}>
        <icosahedronGeometry args={[size, 2]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} wireframe />
      </mesh>
      <mesh ref={ringRef}>
        <torusGeometry args={[size * 1.8, 0.04, 16, 64]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} transparent opacity={0.7} />
      </mesh>
      {/* Inner glow */}
      <mesh>
        <sphereGeometry args={[size * 0.8, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} transparent opacity={0.3} />
      </mesh>
    </group>
  );
};

const SkillGrid = () => {
  const gridRef = useRef();

  useFrame((state) => {
    const positions = gridRef.current.geometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      const z = Math.sin(x * 0.5 + state.clock.elapsedTime) * 0.3 +
        Math.sin(y * 0.5 + state.clock.elapsedTime * 0.7) * 0.3;
      positions.setZ(i, z);
    }
    positions.needsUpdate = true;
  });

  return (
    <mesh ref={gridRef} rotation={[-Math.PI / 3, 0, 0]} position={[0, -4, -8]}>
      <planeGeometry args={[25, 25, 30, 30]} />
      <meshStandardMaterial color="#1e40af" wireframe transparent opacity={0.25} emissive="#60a5fa" emissiveIntensity={0.3} />
    </mesh>
  );
};

const DataStream = ({ startPos, endPos }) => {
  const particlesRef = useRef();
  const count = 20;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const t = i / count;
      pos[i * 3] = startPos[0] + (endPos[0] - startPos[0]) * t;
      pos[i * 3 + 1] = startPos[1] + (endPos[1] - startPos[1]) * t;
      pos[i * 3 + 2] = startPos[2] + (endPos[2] - startPos[2]) * t;
    }
    return pos;
  }, [startPos, endPos]);

  useFrame((state) => {
    const pos = particlesRef.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      const t = ((i / count) + state.clock.elapsedTime * 0.3) % 1;
      pos[i * 3] = startPos[0] + (endPos[0] - startPos[0]) * t;
      pos[i * 3 + 1] = startPos[1] + (endPos[1] - startPos[1]) * t;
      pos[i * 3 + 2] = startPos[2] + (endPos[2] - startPos[2]) * t;
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.1} color="#22d3ee" transparent opacity={0.8} sizeAttenuation />
    </points>
  );
};

export const SkillsBackground = () => {
  const isMobile = useIsMobile();

  return (
    <SectionCanvas>
      <SkillGrid />
      <TechPlanet orbitRadius={5} orbitSpeed={0.3} size={0.6} color="#60a5fa" tilt={0.2} />
      <TechPlanet orbitRadius={7} orbitSpeed={0.2} size={0.5} color="#a78bfa" tilt={-0.3} />
      <TechPlanet orbitRadius={4} orbitSpeed={0.4} size={0.4} color="#22d3ee" tilt={0.1} />
      <TechPlanet orbitRadius={8} orbitSpeed={0.15} size={0.7} color="#fb7185" tilt={-0.15} />
      <TechPlanet orbitRadius={3} orbitSpeed={0.5} size={0.35} color="#f472b6" tilt={0.25} />
      {!isMobile && (
        <>
          <DataStream startPos={[-8, 4, -8]} endPos={[8, -4, -8]} />
          <DataStream startPos={[8, 3, -9]} endPos={[-8, -3, -9]} />
        </>
      )}
    </SectionCanvas>
  );
};

// ==================== PROJECTS - Floating Workstation ====================
const Monitor3D = ({ position, rotation = [0, 0, 0], scale = 1 }) => {
  const groupRef = useRef();
  const screenRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    groupRef.current.position.y = position[1] + Math.sin(t * 0.4 + position[0]) * 0.3;
    groupRef.current.rotation.y = rotation[1] + Math.sin(t * 0.25) * 0.1;
    if (screenRef.current) {
      screenRef.current.material.emissiveIntensity = 0.15 + Math.sin(t * 2) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Monitor body */}
      <mesh>
        <boxGeometry args={[3, 2, 0.15]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      {/* Screen */}
      <mesh ref={screenRef} position={[0, 0, 0.08]}>
        <planeGeometry args={[2.7, 1.7]} />
        <meshStandardMaterial color="#0a0f1a" emissive="#60a5fa" emissiveIntensity={0.15} />
      </mesh>
      {/* Code lines */}
      {[-0.5, -0.2, 0.1, 0.4].map((y, i) => (
        <mesh key={i} position={[-0.4 + (i % 2) * 0.2, y, 0.1]}>
          <planeGeometry args={[1.2 - (i % 3) * 0.2, 0.1]} />
          <meshStandardMaterial
            color={['#60a5fa', '#a78bfa', '#22d3ee', '#fb7185'][i]}
            emissive={['#60a5fa', '#a78bfa', '#22d3ee', '#fb7185'][i]}
            emissiveIntensity={1}
            transparent opacity={0.8}
          />
        </mesh>
      ))}
      {/* Stand */}
      <mesh position={[0, -1.3, 0]}>
        <cylinderGeometry args={[0.1, 0.15, 0.5, 16]} />
        <meshStandardMaterial color="#374151" />
      </mesh>
      <mesh position={[0, -1.6, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.08, 16]} />
        <meshStandardMaterial color="#374151" />
      </mesh>
    </group>
  );
};

const Laptop3D = ({ position, rotation = [0, 0, 0] }) => {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    groupRef.current.position.y = position[1] + Math.sin(t * 0.5 + position[0]) * 0.25;
    groupRef.current.rotation.y = rotation[1] + Math.sin(t * 0.3) * 0.15;
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* Base */}
      <mesh position={[0, 0, 0.4]} rotation={[-0.1, 0, 0]}>
        <boxGeometry args={[1.8, 0.08, 1.2]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 0.6, -0.1]} rotation={[0.3, 0, 0]}>
        <boxGeometry args={[1.8, 1.2, 0.05]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      <mesh position={[0, 0.6, -0.07]} rotation={[0.3, 0, 0]}>
        <planeGeometry args={[1.6, 1]} />
        <meshStandardMaterial color="#0a0f1a" emissive="#a78bfa" emissiveIntensity={0.15} />
      </mesh>
    </group>
  );
};

const FloatingCodeBlock = ({ position, delay = 0 }) => {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime + delay;
    groupRef.current.position.y = position[1] + Math.sin(t * 0.6) * 0.5;
    groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.3;
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh>
        <boxGeometry args={[1.5, 1, 0.05]} />
        <meshStandardMaterial color="#1e293b" transparent opacity={0.5} />
      </mesh>
      {[0.3, 0.1, -0.1, -0.3].map((y, i) => (
        <mesh key={i} position={[-0.2, y, 0.03]}>
          <planeGeometry args={[0.8 - i * 0.1, 0.08]} />
          <meshStandardMaterial
            color={['#60a5fa', '#22d3ee', '#a78bfa', '#fb7185'][i]}
            emissive={['#60a5fa', '#22d3ee', '#a78bfa', '#fb7185'][i]}
            emissiveIntensity={1}
            transparent opacity={0.9}
          />
        </mesh>
      ))}
    </group>
  );
};

export const ProjectsBackground = () => {
  const isMobile = useIsMobile();

  return (
    <SectionCanvas>
      {!isMobile && (
        <>
          <Monitor3D position={[-6, 1, -8]} rotation={[0, 0.4, 0]} scale={0.8} />
          <Monitor3D position={[6, 0, -9]} rotation={[0, -0.3, 0]} scale={0.7} />
          <Laptop3D position={[-4, -2, -8]} rotation={[0, 0.5, 0]} />
          <Laptop3D position={[4, 2, -9]} rotation={[0, -0.4, 0]} />
        </>
      )}
      <FloatingCodeBlock position={[-7, 3, -10]} delay={0} />
      <FloatingCodeBlock position={[7, -2, -11]} delay={1.5} />
      <FloatingCodeBlock position={[0, -4, -10]} delay={3} />
    </SectionCanvas>
  );
};

// ==================== EXPERIENCE - Career Rocket Journey ====================
const Rocket3D = ({ position }) => {
  const groupRef = useRef();
  const flameRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    groupRef.current.position.y = position[1] + Math.sin(t * 0.5) * 0.5;
    groupRef.current.rotation.z = Math.sin(t * 0.3) * 0.1;
    if (flameRef.current) {
      flameRef.current.scale.y = 1 + Math.sin(t * 10) * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={[0, 0, 0.2]}>
      {/* Body */}
      <mesh>
        <cylinderGeometry args={[0.2, 0.3, 1.2, 16]} />
        <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={0.3} />
      </mesh>
      {/* Nose */}
      <mesh position={[0, 0.8, 0]}>
        <coneGeometry args={[0.2, 0.5, 16]} />
        <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={0.5} />
      </mesh>
      {/* Fins */}
      {[0, 2.1, 4.2].map((rot, i) => (
        <mesh key={i} position={[0, -0.4, 0]} rotation={[0, rot, 0]}>
          <boxGeometry args={[0.05, 0.4, 0.3]} />
          <meshStandardMaterial color="#22d3ee" />
        </mesh>
      ))}
      {/* Flame */}
      <mesh ref={flameRef} position={[0, -0.9, 0]}>
        <coneGeometry args={[0.15, 0.6, 16]} />
        <meshStandardMaterial color="#fbbf24" emissive="#ff6b00" emissiveIntensity={2} transparent opacity={0.8} />
      </mesh>
    </group>
  );
};

const TimelinePath3D = () => {
  const pathRef = useRef();

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-8, -3, -5),
      new THREE.Vector3(-4, 0, -4),
      new THREE.Vector3(0, 2, -5),
      new THREE.Vector3(4, 0, -4),
      new THREE.Vector3(8, 3, -5),
    ]);
  }, []);

  const tubeGeo = useMemo(() => new THREE.TubeGeometry(curve, 100, 0.08, 8, false), [curve]);

  useFrame((state) => {
    pathRef.current.material.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime) * 0.2;
  });

  return (
    <mesh ref={pathRef} geometry={tubeGeo}>
      <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={0.5} transparent opacity={0.6} />
    </mesh>
  );
};

const MilestoneFlag = ({ position, color }) => {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    groupRef.current.position.y = position[1] + Math.sin(t * 0.8 + position[0]) * 0.2;
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh>
        <cylinderGeometry args={[0.03, 0.03, 1.5, 8]} />
        <meshStandardMaterial color="#94a3b8" />
      </mesh>
      <mesh position={[0.3, 0.5, 0]}>
        <planeGeometry args={[0.6, 0.4]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

const GradCap3D = ({ position }) => {
  const groupRef = useRef();

  useFrame((state) => {
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6) * 0.3;
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[1, 0.06, 1]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      <mesh>
        <cylinderGeometry args={[0.35, 0.35, 0.25, 6]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      <mesh position={[0.4, 0.15, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
        <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={1} />
      </mesh>
      <mesh position={[0.4, -0.05, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={1} />
      </mesh>
    </group>
  );
};

export const ExperienceBackground = () => {
  const isMobile = useIsMobile();

  return (
    <SectionCanvas>
      <TimelinePath3D />
      <Rocket3D position={[-7, 2, -8]} />
      <MilestoneFlag position={[-4, -1, -9]} color="#60a5fa" />
      <MilestoneFlag position={[0, 1, -9]} color="#a78bfa" />
      <MilestoneFlag position={[4, -1, -9]} color="#22d3ee" />
      {!isMobile && (
        <>
          <GradCap3D position={[-3, 3, -8]} />
          <GradCap3D position={[5, 2, -9]} />
        </>
      )}
    </SectionCanvas>
  );
};

// ==================== CONTACT - Global Communication Network ====================
const Globe3D = () => {
  const globeRef = useRef();
  const ringsRef = useRef([]);

  useFrame((state) => {
    globeRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    ringsRef.current.forEach((ring, i) => {
      if (ring) {
        ring.rotation.x = state.clock.elapsedTime * (0.3 + i * 0.1);
        ring.rotation.z = state.clock.elapsedTime * (0.2 + i * 0.15);
      }
    });
  });

  return (
    <group position={[0, 0, -5]}>
      <mesh ref={globeRef}>
        <icosahedronGeometry args={[2, 2]} />
        <meshStandardMaterial color="#1e40af" emissive="#60a5fa" emissiveIntensity={0.5} wireframe />
      </mesh>
      {[2.5, 3, 3.5].map((radius, i) => (
        <mesh key={i} ref={(el) => (ringsRef.current[i] = el)}>
          <torusGeometry args={[radius, 0.03, 16, 64]} />
          <meshStandardMaterial
            color={['#60a5fa', '#a78bfa', '#22d3ee'][i]}
            emissive={['#60a5fa', '#a78bfa', '#22d3ee'][i]}
            emissiveIntensity={1.2}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
      {/* Globe glow */}
      <mesh>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshStandardMaterial color="#60a5fa" transparent opacity={0.1} />
      </mesh>
    </group>
  );
};

const SatelliteNode = ({ orbitRadius, orbitSpeed, tilt }) => {
  const groupRef = useRef();
  const satelliteRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime * orbitSpeed;
    groupRef.current.position.x = Math.cos(t) * orbitRadius;
    groupRef.current.position.z = Math.sin(t) * orbitRadius - 5;
    groupRef.current.position.y = Math.sin(t) * orbitRadius * Math.sin(tilt);
    satelliteRef.current.rotation.y += 0.02;
  });

  return (
    <group ref={groupRef}>
      <mesh ref={satelliteRef}>
        <boxGeometry args={[0.2, 0.1, 0.2]} />
        <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={1} />
      </mesh>
      {/* Solar panels */}
      <mesh position={[-0.3, 0, 0]}>
        <boxGeometry args={[0.3, 0.02, 0.15]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.3, 0, 0]}>
        <boxGeometry args={[0.3, 0.02, 0.15]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
};

const EmailIcon3D = ({ position, delay = 0 }) => {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime + delay;
    groupRef.current.position.y = position[1] + Math.sin(t * 0.6) * 0.4;
    groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.3;
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Envelope body */}
      <mesh>
        <boxGeometry args={[1.2, 0.8, 0.1]} />
        <meshStandardMaterial color="#1e3a5f" transparent opacity={0.6} />
      </mesh>
      {/* Envelope flap */}
      <mesh position={[0, 0.3, 0.05]} rotation={[0.6, 0, 0]}>
        <planeGeometry args={[1.2, 0.6]} />
        <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={0.5} transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
      {/* @ symbol represented as torus */}
      <mesh position={[0, -0.1, 0.08]}>
        <torusGeometry args={[0.15, 0.03, 16, 32]} />
        <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={1} />
      </mesh>
    </group>
  );
};

const SignalWave = ({ position, delay = 0 }) => {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime + delay;
    const scale = 1 + (t % 2) * 0.5;
    meshRef.current.scale.setScalar(scale);
    meshRef.current.material.opacity = Math.max(0, 0.5 - (t % 2) * 0.25);
  });

  return (
    <mesh ref={meshRef} position={position}>
      <ringGeometry args={[0.3, 0.35, 32]} />
      <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={1} transparent opacity={0.5} side={THREE.DoubleSide} />
    </mesh>
  );
};

export const ContactBackground = () => {
  const isMobile = useIsMobile();

  return (
    <SectionCanvas>
      <Globe3D />
      <SatelliteNode orbitRadius={5} orbitSpeed={0.4} tilt={0.5} />
      <SatelliteNode orbitRadius={6} orbitSpeed={0.3} tilt={-0.3} />
      <SatelliteNode orbitRadius={4.5} orbitSpeed={0.5} tilt={0.2} />
      {!isMobile && (
        <>
          <EmailIcon3D position={[-7, 2, -8]} delay={0} />
          <EmailIcon3D position={[7, -1, -9]} delay={1.5} />
          <EmailIcon3D position={[-5, -3, -8]} delay={3} />
        </>
      )}
      <SignalWave position={[-6, 1, -9]} delay={0} />
      <SignalWave position={[6, 2, -10]} delay={0.7} />
      <SignalWave position={[0, -2, -9]} delay={1.4} />
    </SectionCanvas>
  );
};
