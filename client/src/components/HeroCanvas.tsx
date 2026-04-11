import { useRef, useEffect } from "react";
import * as THREE from "three";

const NODE_COUNT   = 95;
const SPREAD_X     = 13;
const SPREAD_Y     = 7;
const SPREAD_Z     = 7;
const CONNECT_DIST = 2.6;
const NODE_COLOR   = 0xa78bfa; // soft violet
const LINE_COLOR   = 0x7c3aed;

export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    // ── Scene & camera ────────────────────────────────────────────────────────
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, el.clientWidth / el.clientHeight, 0.1, 1000);
    camera.position.z = 14;

    // ── Geometry: random nodes ────────────────────────────────────────────────
    const nodes = Array.from({ length: NODE_COUNT }, () =>
      new THREE.Vector3(
        (Math.random() - 0.5) * SPREAD_X * 2,
        (Math.random() - 0.5) * SPREAD_Y * 2,
        (Math.random() - 0.5) * SPREAD_Z * 2,
      )
    );

    // Points (node dots)
    const pointPositions = new Float32Array(NODE_COUNT * 3);
    nodes.forEach((p, i) => {
      pointPositions[i * 3]     = p.x;
      pointPositions[i * 3 + 1] = p.y;
      pointPositions[i * 3 + 2] = p.z;
    });
    const pointGeo = new THREE.BufferGeometry();
    pointGeo.setAttribute("position", new THREE.BufferAttribute(pointPositions, 3));
    const points = new THREE.Points(
      pointGeo,
      new THREE.PointsMaterial({ color: NODE_COLOR, size: 0.12, sizeAttenuation: true, transparent: true, opacity: 0.9 })
    );

    // Line segments (connections between close nodes)
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
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(lineArr), 3));
    const lines = new THREE.LineSegments(
      lineGeo,
      new THREE.LineBasicMaterial({ color: LINE_COLOR, transparent: true, opacity: 0.18 })
    );

    // Group everything so we can rotate together
    const group = new THREE.Group();
    group.add(points, lines);
    scene.add(group);

    // Lights (subtle, for any future mesh additions)
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const pl1 = new THREE.PointLight(0xc4b5fd, 1.2);
    pl1.position.set(8, 8, 8);
    scene.add(pl1);

    // ── Mouse tracking ────────────────────────────────────────────────────────
    const mouse  = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x =  (e.clientX / window.innerWidth  - 0.5);
      mouse.y = -(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── Resize handler ────────────────────────────────────────────────────────
    const onResize = () => {
      if (!el) return;
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // ── Animation loop ────────────────────────────────────────────────────────
    const clock = new THREE.Clock();
    let frameId: number;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smooth mouse follow
      target.x += (mouse.x - target.x) * 0.04;
      target.y += (mouse.y - target.y) * 0.04;

      group.rotation.y = t * 0.055 + target.x * 0.55;
      group.rotation.x = target.y * 0.30;
      const s = 1 + Math.sin(t * 0.28) * 0.018;
      group.scale.set(s, s, s);

      renderer.render(scene, camera);
    };
    animate();

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      pointGeo.dispose();
      lineGeo.dispose();
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-[1]" aria-hidden="true" />;
}
