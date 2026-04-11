import { useRef, useMemo, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ─── Scene constants ───────────────────────────────────────────────────────────
const NODE_COUNT    = 95;
const SPREAD_X      = 13;
const SPREAD_Y      = 7;
const SPREAD_Z      = 7;
const CONNECT_DIST  = 2.6;   // max distance to draw a connection line
const NODE_COLOR    = "#a78bfa"; // soft violet — matches site accent
const LINE_COLOR    = "#7c3aed";

// ─── The 3-D neural mesh ───────────────────────────────────────────────────────
function NeuralMesh() {
  const groupRef   = useRef<THREE.Group>(null);
  const mouseRef   = useRef({ x: 0, y: 0 });
  const targetRef  = useRef({ x: 0, y: 0 }); // smoothed mouse for lazy parallax

  // Build geometry once on mount
  const { pointPositions, linePositions } = useMemo(() => {
    // Random 3-D node positions
    const nodes = Array.from({ length: NODE_COUNT }, () =>
      new THREE.Vector3(
        (Math.random() - 0.5) * SPREAD_X * 2,
        (Math.random() - 0.5) * SPREAD_Y * 2,
        (Math.random() - 0.5) * SPREAD_Z * 2,
      )
    );

    // Flat Float32Array for Points geometry
    const pointPositions = new Float32Array(NODE_COUNT * 3);
    nodes.forEach((p, i) => {
      pointPositions[i * 3]     = p.x;
      pointPositions[i * 3 + 1] = p.y;
      pointPositions[i * 3 + 2] = p.z;
    });

    // Pairs of vertices for LineSegments (one segment per connection)
    const lineArr: number[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        if (nodes[i].distanceTo(nodes[j]) < CONNECT_DIST) {
          lineArr.push(
            nodes[i].x, nodes[i].y, nodes[i].z,
            nodes[j].x, nodes[j].y, nodes[j].z,
          );
        }
      }
    }

    return {
      pointPositions,
      linePositions: new Float32Array(lineArr),
    };
  }, []);

  // Track raw mouse
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x =  (e.clientX / window.innerWidth  - 0.5);
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Animate every frame
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();

    // Lazy-follow the mouse (lerp for smooth parallax)
    targetRef.current.x += (mouseRef.current.x - targetRef.current.x) * 0.04;
    targetRef.current.y += (mouseRef.current.y - targetRef.current.y) * 0.04;

    // Slow auto-rotation + mouse tilt
    groupRef.current.rotation.y = t * 0.055 + targetRef.current.x * 0.55;
    groupRef.current.rotation.x = targetRef.current.y * 0.30;

    // Subtle breathing scale pulse
    groupRef.current.scale.setScalar(1 + Math.sin(t * 0.28) * 0.018);
  });

  return (
    <group ref={groupRef}>
      {/* ── Glowing node dots ── */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={pointPositions}
            count={pointPositions.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color={NODE_COLOR}
          size={0.12}
          sizeAttenuation
          transparent
          opacity={0.9}
        />
      </points>

      {/* ── Connection lines ── */}
      {linePositions.length > 0 && (
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              array={linePositions}
              count={linePositions.length / 3}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color={LINE_COLOR}
            transparent
            opacity={0.18}
          />
        </lineSegments>
      )}
    </group>
  );
}

// ─── Canvas wrapper (placed as an absolute overlay in the hero) ────────────────
export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 z-[1]" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 14], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]} // cap pixel ratio for performance
      >
        {/* Subtle ambient + accent point light for depth */}
        <ambientLight intensity={0.6} />
        <pointLight position={[8, 8, 8]}  color="#c4b5fd" intensity={1.2} />
        <pointLight position={[-8, -4, -6]} color="#818cf8" intensity={0.6} />

        <Suspense fallback={null}>
          <NeuralMesh />
        </Suspense>
      </Canvas>
    </div>
  );
}
