// src/components/ThreeBackground.jsx
// Full-viewport ambient 3D particle universe with perpetual depth field,
// scroll parallax (particles never disappear!), and 3D Falling Comets / Meteors

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground({ scrollY = 0, light = false }) {
  const canvasRef = useRef(null);
  const refs = useRef({});
  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const W = window.innerWidth;
    const H = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(52, W / H, 0.1, 300);
    camera.position.set(0, 0, 60);

    // ── Perpetual Ambient Particles Field (Never disappears on scroll) ──
    const COUNT = 2200;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(COUNT * 3);
    const originalZ = new Float32Array(COUNT);
    const col = new Float32Array(COUNT * 3);
    const sz = new Float32Array(COUNT);

    const palette = [
      new THREE.Color(0xd4a853), // Rich gold
      new THREE.Color(0xf5d996), // Bright champagne gold
      new THREE.Color(0x9a7840), // Warm amber gold
      new THREE.Color(0xffffff), // Stellar starlight
      new THREE.Color(0x4d3f28), // Deep bronze
    ];

    for (let i = 0; i < COUNT; i++) {
      // Spread across a broad 3D cylindrical cosmic volume
      const rad = 15 + Math.random() * 55;
      const th = Math.random() * Math.PI * 2;
      pos[i * 3] = rad * Math.cos(th);
      pos[i * 3 + 1] = (Math.random() - 0.5) * 90;
      const z = (Math.random() - 0.5) * 90;
      pos[i * 3 + 2] = z;
      originalZ[i] = z;

      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
      sz[i] = Math.random() * 2.8 + 0.8;
    }

    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sz, 1));

    const pMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2() },
        uScroll: { value: 0 },
      },
      vertexShader: `
        attribute float size;
        varying vec3 vCol;
        varying float vAlpha;
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uScroll;

        void main() {
          vCol = color;
          vec3 p = position;

          // Gentle ambient wave oscillation
          float w = sin(p.x * 0.08 + uTime * 0.4) * 1.6 + cos(p.y * 0.06 + uTime * 0.3) * 1.6;
          p.z += w;

          // Mouse cursor cosmic repulsion / attraction
          float d = length(p.xy);
          p.x += uMouse.x * 45.0 / (d + 10.0);
          p.y += uMouse.y * 35.0 / (d + 10.0);

          // Perpetual scroll depth wrap: particles loop infinitely so they NEVER disappear!
          float zOffset = mod(p.z - uScroll * 0.018 + 50.0, 100.0) - 50.0;
          p.z = zOffset;

          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = size * 320.0 / -mv.z;

          // Smooth depth attenuation: softly fade at far back and near clip
          float dist = -mv.z;
          float fadeFar = smoothstep(120.0, 40.0, dist);
          float fadeNear = smoothstep(5.0, 18.0, dist);
          vAlpha = fadeFar * fadeNear * 0.95;
        }
      `,
      fragmentShader: `
        varying vec3 vCol;
        varying float vAlpha;
        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          float r = length(uv);
          // Soft glowing stellar core with diamond falloff
          float a = clamp(1.0 - smoothstep(0.12, 0.48, r), 0.0, 1.0);
          float starCore = clamp(1.0 - smoothstep(0.0, 0.15, r), 0.0, 1.0) * 0.6;
          gl_FragColor = vec4(vCol + starCore, (a + starCore) * vAlpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
    });

    const particles = new THREE.Points(geo, pMat);
    scene.add(particles);

    // ── 3D Falling Comets / Meteor System ──
    const COMET_COUNT = 6;
    const comets = [];
    const TRAIL_LENGTH = 42;

    for (let cIdx = 0; cIdx < COMET_COUNT; cIdx++) {
      // Trail line geometry with fading vertices
      const trailPositions = new Float32Array(TRAIL_LENGTH * 3);
      const trailColors = new Float32Array(TRAIL_LENGTH * 4); // RGBA

      const trailGeo = new THREE.BufferGeometry();
      trailGeo.setAttribute("position", new THREE.BufferAttribute(trailPositions, 3));
      trailGeo.setAttribute("color", new THREE.BufferAttribute(trailColors, 4));

      const trailMat = new THREE.ShaderMaterial({
        uniforms: {},
        vertexShader: `
          attribute vec4 color;
          varying vec4 vColor;
          void main() {
            vColor = color;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec4 vColor;
          void main() {
            gl_FragColor = vColor;
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const trailMesh = new THREE.Line(trailGeo, trailMat);
      scene.add(trailMesh);

      // Comet Glowing Head
      const headGeo = new THREE.SphereGeometry(0.75, 14, 14);
      const headMat = new THREE.MeshBasicMaterial({
        color: 0xfffaea,
        transparent: true,
        opacity: 0.98,
        blending: THREE.AdditiveBlending,
      });
      const headMesh = new THREE.Mesh(headGeo, headMat);
      scene.add(headMesh);

      comets.push({
        trailMesh,
        trailPositions,
        trailColors,
        headMesh,
        active: false,
        timer: Math.random() * 1.5 + cIdx * 1.2, // Staggered initial delays
        pos: new THREE.Vector3(),
        vel: new THREE.Vector3(),
        history: [],
      });
    }

    // ── Floating Central Golden Sacred Polyhedron (Depth anchor) ──
    const icoGeo = new THREE.IcosahedronGeometry(7, 1);
    const icoMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(0xd4a853) },
      },
      vertexShader: `
        uniform float uTime;
        varying float vY;
        void main() {
          vY = position.y;
          vec3 p = position;
          p += normal * (sin(p.x * 0.7 + uTime * 0.8) * 0.22 + cos(p.z * 0.8 + uTime) * 0.18);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vY;
        void main() {
          float a = clamp((vY + 7.0) / 14.0, 0.0, 1.0);
          gl_FragColor = vec4(uColor * (0.6 + a * 0.4), 0.18 + a * 0.12);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      wireframe: true,
      depthWrite: false,
    });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    ico.position.set(0, 0, -10);
    scene.add(ico);

    // ── Luminous Deep Cyber Grid ──
    const gridGeo = new THREE.PlaneGeometry(220, 220, 44, 44);
    const gridMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uAlpha: { value: 0.09 } },
      vertexShader: `
        uniform float uTime;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = sin(p.x * 0.08 + uTime * 0.22) * cos(p.y * 0.08 + uTime * 0.18) * 2.2;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform float uAlpha;
        void main() {
          float gx = abs(fract(vUv.x * 44.0) - 0.5);
          float gy = abs(fract(vUv.y * 44.0) - 0.5);
          float g  = min(gx, gy);
          float l  = 1.0 - smoothstep(0.0, 0.035, g);
          vec2 e = abs(vUv - 0.5) * 2.0;
          float fade = 1.0 - smoothstep(0.55, 1.0, max(e.x, e.y));
          gl_FragColor = vec4(0.85, 0.68, 0.35, l * uAlpha * fade);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const grid = new THREE.Mesh(gridGeo, gridMat);
    grid.rotation.x = -Math.PI / 2.25;
    grid.position.y = -32;
    scene.add(grid);

    refs.current = { renderer, scene, camera, pMat, icoMat, gridMat, ico, particles, comets };

    // ── Animation Loop ──
    const clock = new THREE.Clock();
    let raf;
    let lastTime = 0;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const dt = Math.min(t - lastTime, 0.1);
      lastTime = t;

      mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.05;
      mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.05;

      pMat.uniforms.uTime.value = t;
      pMat.uniforms.uMouse.value.set(mouse.current.x * 6, mouse.current.y * 4);
      icoMat.uniforms.uTime.value = t;
      gridMat.uniforms.uTime.value = t;

      ico.rotation.x = t * 0.08;
      ico.rotation.y = t * 0.12;
      particles.rotation.y = t * 0.012;

      // ── Update 3D Falling Comets ──
      for (const comet of comets) {
        if (!comet.active) {
          comet.timer -= dt;
          if (comet.timer <= 0) {
            // Spawn comet high in space, angling diagonally across the viewport
            comet.active = true;
            const startX = (Math.random() - 0.3) * 80;
            const startY = 35 + Math.random() * 20;
            const startZ = -10 + (Math.random() - 0.5) * 40;
            comet.pos.set(startX, startY, startZ);

            // Diagonal downward falling velocity with depth trajectory
            const speed = 48 + Math.random() * 32;
            const angle = -Math.PI * 0.68 - Math.random() * 0.25;
            comet.vel.set(
              Math.cos(angle) * speed,
              Math.sin(angle) * speed,
              (Math.random() - 0.5) * 12
            );
            comet.history = [];
            comet.headMesh.visible = true;
            comet.trailMesh.visible = true;
          }
        } else {
          // Advance comet position
          comet.pos.addScaledVector(comet.vel, dt);
          comet.history.unshift(comet.pos.clone());
          if (comet.history.length > TRAIL_LENGTH) comet.history.pop();

          comet.headMesh.position.copy(comet.pos);

          // Update trail line vertices and fading gradient
          const posAttr = comet.trailMesh.geometry.attributes.position;
          const colAttr = comet.trailMesh.geometry.attributes.color;

          for (let j = 0; j < TRAIL_LENGTH; j++) {
            const p = comet.history[j] || comet.pos;
            posAttr.setXYZ(j, p.x, p.y, p.z);

            const ratio = 1 - j / TRAIL_LENGTH; // 1 at head, 0 at tail
            const alpha = Math.pow(ratio, 1.4) * 0.95;
            // Hot white at head, transitioning to rich gold then warm amber
            const r = ratio > 0.7 ? 1.0 : 0.83 + (ratio * 0.17);
            const g = ratio > 0.7 ? 0.96 : 0.66 + (ratio * 0.25);
            const b = ratio > 0.7 ? 0.88 : 0.33;
            colAttr.setXYZW(j, r, g, b, alpha);
          }
          posAttr.needsUpdate = true;
          colAttr.needsUpdate = true;

          // Check if comet has exited the screen area
          if (comet.pos.y < -45 || comet.pos.x < -80 || comet.pos.x > 80) {
            comet.active = false;
            comet.headMesh.visible = false;
            comet.trailMesh.visible = false;
            comet.timer = 0.6 + Math.random() * 2.2; // Quick respawn interval
          }
        }
      }

      camera.position.y = Math.sin(t * 0.07) * 1.5;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const curW = window.innerWidth;
      const curH = window.innerHeight;
      camera.aspect = curW / curH;
      camera.updateProjectionMatrix();
      renderer.setSize(curW, curH);
    };
    window.addEventListener("resize", onResize);

    const onMouseMove = (e) => {
      mouse.current.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.ty = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    if (refs.current.pMat) {
      refs.current.pMat.uniforms.uScroll.value = scrollY;
    }
  }, [scrollY]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        opacity: light ? 0.32 : 0.72,
        transition: "opacity 0.8s",
      }}
    />
  );
}
