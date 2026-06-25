/* eslint-disable react/no-unknown-property */
'use client';
import { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

// replace with your own imports, see the usage snippet for details
const cardGLB = "/myportofolioacadmicmeg/assets/card.glb";
const lanyard = "/myportofolioacadmicmeg/assets/lanyard.png";

import * as THREE from 'three';
import './Lanyard.css';

extend({ MeshLineGeometry, MeshLineMaterial });

export default function Lanyard({ position = [0, 0, 30], gravity = [0, -40, 0], fov = 20, transparent = true }) {
  return (
    <div className="lanyard-wrapper">
      <Canvas
        camera={{ position: position, fov: fov }}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={1 / 60}>
          <Band />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
}
function useHeadshotCardTexture() {
  const [cardTex, setCardTex] = useState(null);
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 716;
    const ctx = canvas.getContext('2d');

    const draw = (img) => {
      const CX = 120;   // GLB card UV center (calibrated)
      const CW = 210;   // usable width

      // ── Background ──────────────────────────────────────────────────────
      ctx.fillStyle = '#0b1618';
      ctx.fillRect(0, 0, 512, 716);

      // ── Clip hole ─────────────────────────────────────────────────────
      ctx.fillStyle = '#243a3a';
      ctx.beginPath();
      ctx.roundRect(CX - 28, 18, 56, 18, 9);
      ctx.fill();

      // ── Photo (full card height, equal-ratio) ──────────────────────────
      // ── Front: photo, no clipping ────────────────────────────────────────
      if (img) {
        const maxW = CW;
        const maxH = 660;
        const scale = Math.max(maxW / img.naturalWidth, maxH / img.naturalHeight);
        const dw = img.naturalWidth * scale;
        const dh = img.naturalHeight * scale;
        const dx = CX - dw / 2;
        const dy = 44 + (maxH - dh) / 2;
        ctx.drawImage(img, dx, dy, dw, dh);
      }

      // ── Back face (UV maps to x=256..512, drawn mirrored) ────────────────
      const BCX = 384;  // center of back UV region in canvas
      // Dark background for back
      const bg = ctx.createLinearGradient(256, 0, 512, 716);
      bg.addColorStop(0, '#0a1a1a'); bg.addColorStop(1, '#0d2020');
      ctx.fillStyle = bg;
      ctx.fillRect(256, 0, 256, 716);

      ctx.textAlign = 'center';

      // Decorative teal line top
      ctx.strokeStyle = '#1F97A6';
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.5;
      ctx.beginPath(); ctx.moveTo(BCX - 80, 200); ctx.lineTo(BCX + 80, 200); ctx.stroke();
      ctx.globalAlpha = 1;

      // Name
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px Arial, sans-serif';
      ctx.fillText('Shun Ching Hsieh', BCX, 260);

      // Role badge
      const bW = 180, bH = 26, bX = BCX - bW/2, bY = 272;
      const gr = ctx.createLinearGradient(bX, 0, bX + bW, 0);
      gr.addColorStop(0, '#1F97A6'); gr.addColorStop(1, '#0891b2');
      ctx.fillStyle = gr;
      ctx.beginPath(); ctx.roundRect(bX, bY, bW, bH, 13); ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 13px Arial, sans-serif';
      ctx.fillText('HCI Researcher · PhD 2026', BCX, bY + 17);

      ctx.fillStyle = 'rgba(180,230,230,0.8)';
      ctx.font = '14px Arial, sans-serif';
      ctx.fillText('NCCU · M.Ed. EdTech', BCX, 326);

      ctx.strokeStyle = '#1a3030';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(BCX-80, 342); ctx.lineTo(BCX+80, 342); ctx.stroke();

      ctx.fillStyle = '#1F97A6';
      ctx.font = 'bold 11px Arial, sans-serif';
      ctx.fillText('Human-AI · LLM · EdTech', BCX, 362);

      ctx.fillStyle = 'rgba(150,210,210,0.65)';
      ctx.font = '11px Arial, sans-serif';
      ctx.fillText('megan1001m@gmail.com', BCX, 384);

      // Bottom teal line
      ctx.strokeStyle = '#1F97A6';
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.5;
      ctx.beginPath(); ctx.moveTo(BCX-80, 402); ctx.lineTo(BCX+80, 402); ctx.stroke();
      ctx.globalAlpha = 1;

      const tex = new THREE.CanvasTexture(canvas);
      tex.flipY = false;
      tex.needsUpdate = true;
      setCardTex(tex);
    };

    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => draw(img);
    img.onerror = () => draw(null);
    img.src = '/myportofolioacadmicmeg/assets/me badge.png';
  }, []);
  return cardTex;
}

function Band({ maxSpeed = 50, minSpeed = 0 }) {
  const band = useRef(), fixed = useRef(), j1 = useRef(), j2 = useRef(), j3 = useRef(), card = useRef();
  const vec = new THREE.Vector3(), ang = new THREE.Vector3(), rot = new THREE.Vector3(), dir = new THREE.Vector3();
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 };
  const { nodes, materials } = useGLTF(cardGLB);
  const texture = useTexture(lanyard);
  const cardTexture = useHeadshotCardTexture();
  const [curve] = useState(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]));
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);
  const [isSmall, setIsSmall] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth < 1024
  );

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.50, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmall(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }
    if (fixed.current) {
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)));
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => (e.target.releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={(e) => (e.target.setPointerCapture(e.pointerId), drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation()))))}>
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial map={cardTexture || materials.base.map} map-anisotropy={16} clearcoat={1} clearcoatRoughness={0.15} roughness={0.9} metalness={0.8} />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isSmall ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}
