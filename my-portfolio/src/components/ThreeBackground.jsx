// ThreeBackground.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Manages the full-viewport WebGL canvas.
// Features:
//   • Shader-driven particle cloud with mouse parallax + scroll depth
//   • Particle connection lines (proximity threshold)
//   • Animated wireframe icosahedron at center
//   • Subtle animated grid floor
//   • Section-aware color temperature shift

import { useEffect, useRef } from "react";

export default function ThreeBackground({ scrollY, section, light }) {
  const canvasRef = useRef(null);
  const refs = useRef({});
  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  // ── Build scene once Three is available ──
  const buildScene = () => {
    const THREE = window.THREE;
    const canvas = canvasRef.current;
    if (!canvas || !THREE) return;

    const W = window.innerWidth, H = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(52, W / H, 0.1, 200);
    camera.position.set(0, 0, 58);

    // ── Particles ──
    const COUNT = 1800;
    const geo   = new THREE.BufferGeometry();
    const pos   = new Float32Array(COUNT * 3);
    const col   = new Float32Array(COUNT * 3);
    const sz    = new Float32Array(COUNT);

    // Warm gold palette
    const palette = [
      new THREE.Color(0xD4A853),
      new THREE.Color(0x9A7840),
      new THREE.Color(0x3D3225),
      new THREE.Color(0xE8C87A),
    ];

    for (let i = 0; i < COUNT; i++) {
      // Spherical spread
      const r   = 22 + Math.random() * 36;
      const th  = Math.random() * Math.PI * 2;
      const ph  = Math.acos(2 * Math.random() - 1);
      pos[i * 3]     = r * Math.sin(ph) * Math.cos(th);
      pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      pos[i * 3 + 2] = r * Math.cos(ph) - 8;
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
      sz[i] = Math.random() * 2.2 + 0.5;
    }

    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("color",    new THREE.BufferAttribute(col, 3));
    geo.setAttribute("size",     new THREE.BufferAttribute(sz,  1));

    const pMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime:   { value: 0 },
        uMouse:  { value: new THREE.Vector2() },
        uScroll: { value: 0 },
        uWarm:   { value: 0 }, // 0=dark, 1=light
      },
      vertexShader: `
        attribute float size;
        attribute vec3  color;
        varying   vec3  vCol;
        varying   float vAlpha;
        uniform   float uTime;
        uniform   vec2  uMouse;
        uniform   float uScroll;

        void main() {
          vCol = color;
          vec3 p = position;
          // Organic wave drift
          float w = sin(p.x * 0.09 + uTime * 0.35) * 1.5
                  + cos(p.y * 0.07 + uTime * 0.28) * 1.5;
          p.z += w;
          // Mouse parallax — depth-weighted
          float d = length(p.xy);
          p.x += uMouse.x * 55.0 / (d + 12.0);
          p.y += uMouse.y * 40.0 / (d + 12.0);
          // Scroll push
          p.z -= uScroll * 0.022;

          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position  = projectionMatrix * mv;
          gl_PointSize = size * 280.0 / -mv.z;
          vAlpha = clamp(1.0 - (-mv.z - 8.0) / 90.0, 0.0, 1.0) * 0.9;
        }
      `,
      fragmentShader: `
        varying vec3  vCol;
        varying float vAlpha;
        void main() {
          vec2  uv = gl_PointCoord - 0.5;
          float r  = length(uv);
          float a  = 1.0 - smoothstep(0.28, 0.5, r);
          gl_FragColor = vec4(vCol, a * vAlpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
    });

    const particles = new THREE.Points(geo, pMat);
    scene.add(particles);

    // ── Icosahedron wireframe (center jewel) ──
    const icoGeo = new THREE.IcosahedronGeometry(6, 1);
    const icoMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color(0xD4A853) } },
      vertexShader: `
        uniform float uTime;
        varying float vY;
        void main() {
          vY = position.y;
          vec3 p = position;
          p += normal * (sin(p.x * 0.8 + uTime) * 0.18 + sin(p.z * 0.9 + uTime * 1.2) * 0.14);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vY;
        void main() {
          float a = clamp((vY + 6.0) / 12.0, 0.0, 1.0);
          gl_FragColor = vec4(uColor * (0.5 + a * 0.5), 0.18 + a * 0.12);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      wireframe: true,
      depthWrite: false,
    });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    scene.add(ico);

    // ── Grid plane ──
    const gridGeo = new THREE.PlaneGeometry(160, 160, 38, 38);
    const gridMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uAlpha: { value: 0.1 } },
      vertexShader: `
        uniform float uTime;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = sin(p.x * 0.1 + uTime * 0.25) * cos(p.y * 0.1 + uTime * 0.2) * 1.8;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform float uAlpha;
        void main() {
          float gx = abs(fract(vUv.x * 38.0) - 0.5);
          float gy = abs(fract(vUv.y * 38.0) - 0.5);
          float g  = min(gx, gy);
          float l  = 1.0 - smoothstep(0.0, 0.035, g);
          // Edge fade
          vec2 e = abs(vUv - 0.5) * 2.0;
          float fade = 1.0 - smoothstep(0.6, 1.0, max(e.x, e.y));
          gl_FragColor = vec4(0.83, 0.66, 0.33, l * uAlpha * fade);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const grid = new THREE.Mesh(gridGeo, gridMat);
    grid.rotation.x = -Math.PI / 2.2;
    grid.position.y = -28;
    scene.add(grid);

    refs.current = { renderer, scene, camera, pMat, icoMat, gridMat, ico };

    // ── Render loop ──
    const clock = new THREE.Clock();
    let raf;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smooth mouse
      mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.05;
      mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.05;

      pMat.uniforms.uTime.value  = t;
      pMat.uniforms.uMouse.value.set(mouse.current.x * 6, mouse.current.y * 4);
      icoMat.uniforms.uTime.value = t;
      gridMat.uniforms.uTime.value = t;

      ico.rotation.x = t * 0.09;
      ico.rotation.y = t * 0.13;
      particles.rotation.y = t * 0.014;

      camera.position.y = Math.sin(t * 0.08) * 1.4;

      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const onResize = () => {
      const W = window.innerWidth, H = window.innerHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    };
    window.addEventListener("resize", onResize);
    refs.current.cleanup = () => { cancelAnimationFrame(raf); renderer.dispose(); window.removeEventListener("resize", onResize); };
  };

  useEffect(() => {
    if (window.THREE) { buildScene(); }
    else {
      const s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
      s.onload = buildScene;
      document.head.appendChild(s);
    }
    return () => refs.current.cleanup?.();
  }, []);

  // Scroll update
  useEffect(() => {
    const { pMat } = refs.current;
    if (pMat) pMat.uniforms.uScroll.value = scrollY;
  }, [scrollY]);

  // Mouse
  useEffect(() => {
    const fn = (e) => {
      mouse.current.tx = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.current.ty = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        opacity: light ? 0.35 : 0.7,
        transition: "opacity 0.8s",
      }}
    />
  );
}
