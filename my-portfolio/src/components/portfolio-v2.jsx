import { useState, useEffect, useRef, useCallback } from "react";

// ══════════════════════════════════════════════════════════════════════════════
//  STYLE INJECTION
//  All CSS lives here so the single-file artifact is self-contained.
//  In a real project → src/styles/globals.css
// ══════════════════════════════════════════════════════════════════════════════
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;0,700;1,300;1,400&family=Plus+Jakarta+Sans:wght@300;400;500&family=DM+Mono:wght@300;400&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
a{text-decoration:none;color:inherit}
button{background:none;border:none;font:inherit}
::selection{background:var(--sel-bg);color:var(--sel-fg)}
img{display:block;max-width:100%}

:root{
  --bg:#080A0D;--bg2:#0C0F15;--surface:#111520;
  --border:rgba(255,255,255,0.065);--border-h:rgba(212,168,83,0.38);
  --gold:#D4A853;--gold-l:#E8C87A;--gold-dim:rgba(212,168,83,0.12);--gold-glow:rgba(212,168,83,0.2);
  --text:#EAE6DE;--text-2:#A09890;--text-3:#545048;
  --sel-bg:rgba(212,168,83,0.18);--sel-fg:#D4A853;
  --shadow:0 32px 80px rgba(0,0,0,0.65);--shadow-s:0 8px 24px rgba(0,0,0,0.42);
  --glow:0 0 48px rgba(212,168,83,0.16);
  --ease-expo:cubic-bezier(0.16,1,0.3,1);--ease-io:cubic-bezier(0.76,0,0.24,1);
  --ff-d:'Playfair Display',Georgia,serif;--ff-b:'Plus Jakarta Sans',sans-serif;--ff-m:'DM Mono',monospace;
}
.light{
  --bg:#F4EFE6;--bg2:#EDE7DC;--surface:#FDFAF5;
  --border:rgba(40,28,12,0.1);--border-h:rgba(142,98,18,0.42);
  --gold:#8E6212;--gold-l:#B07C18;--gold-dim:rgba(142,98,18,0.1);--gold-glow:rgba(142,98,18,0.15);
  --text:#1C1510;--text-2:#6B5C4A;--text-3:#A8977E;
  --sel-bg:rgba(142,98,18,0.14);--sel-fg:#8E6212;
  --shadow:0 32px 80px rgba(28,21,16,0.15);--shadow-s:0 8px 24px rgba(28,21,16,0.1);
  --glow:0 4px 30px rgba(28,21,16,0.12);
}

body{
  background:var(--bg);color:var(--text);font-family:var(--ff-b);font-weight:300;
  overflow-x:hidden;cursor:none;line-height:1.6;
  transition:background 0.65s,color 0.65s;
}
::-webkit-scrollbar{width:2px}
::-webkit-scrollbar-track{background:var(--bg)}
::-webkit-scrollbar-thumb{background:var(--gold)}
.dp{font-family:var(--ff-d)}.mo{font-family:var(--ff-m)}

/* ─── Cursor ─── */
.c-dot{position:fixed;z-index:9999;pointer-events:none;width:5px;height:5px;
  border-radius:50%;background:var(--gold);transform:translate(-50%,-50%);transition:transform 0.1s}
.c-ring{position:fixed;z-index:9998;pointer-events:none;width:34px;height:34px;
  border-radius:50%;border:1px solid rgba(212,168,83,0.5);transform:translate(-50%,-50%);
  transition:width 0.25s,height 0.25s,border-color 0.25s}
.c-ring.on{width:58px;height:58px;border-color:var(--gold)}
.c-glow{position:fixed;z-index:0;pointer-events:none;width:520px;height:520px;
  border-radius:50%;background:radial-gradient(circle,var(--gold-glow) 0%,transparent 70%);
  transform:translate(-50%,-50%);mix-blend-mode:screen;opacity:0.8}
.light .c-glow{mix-blend-mode:multiply;background:radial-gradient(circle,rgba(142,98,18,0.08) 0%,transparent 70%)}

/* ─── Nav ─── */
.nav-link{position:relative;font-size:0.72rem;letter-spacing:0.16em;text-transform:uppercase;
  color:var(--text-2);cursor:none;transition:color 0.3s}
.nav-link::after{content:'';position:absolute;bottom:-4px;left:0;width:0;height:1px;
  background:var(--gold);transition:width 0.35s var(--ease-expo)}
.nav-link:hover,.nav-link.active{color:var(--text)}
.nav-link:hover::after,.nav-link.active::after{width:100%}

/* ─── Buttons ─── */
.btn{position:relative;overflow:hidden;border:1px solid var(--gold);color:var(--gold);
  padding:14px 42px;font-size:0.73rem;letter-spacing:0.2em;text-transform:uppercase;
  font-family:var(--ff-m);cursor:none;transition:color 0.35s;display:inline-block}
.btn::before{content:'';position:absolute;inset:0;background:var(--gold);
  transform:scaleX(0);transform-origin:right;transition:transform 0.4s var(--ease-expo)}
.btn:hover{color:#080A0D}.btn:hover::before{transform:scaleX(1);transform-origin:left}
.btn span{position:relative;z-index:1}
.btn.ghost{border-color:var(--border);color:var(--text-2)}
.btn.ghost::before{background:var(--surface)}.btn.ghost:hover{color:var(--text)}
.light .btn:hover{color:var(--bg)}

/* ─── Reveal animations ─── */
.r{opacity:0;transform:translateY(38px);transition:opacity 0.95s var(--ease-expo),transform 0.95s var(--ease-expo)}
.r.v{opacity:1;transform:none}
.d1{transition-delay:0.1s}.d2{transition-delay:0.2s}.d3{transition-delay:0.3s}
.d4{transition-delay:0.4s}.d5{transition-delay:0.5s}.d6{transition-delay:0.65s}

/* ─── Clip reveal (for lines of text) ─── */
.cr{display:inline-block;clip-path:inset(0 100% 0 0);
  transition:clip-path 1.1s var(--ease-expo)}
.cr.v{clip-path:inset(0 0% 0 0)}

/* ─── Section watermark ─── */
.wm{position:absolute;right:5vw;top:60px;font-family:var(--ff-d);
  font-size:clamp(7rem,16vw,16rem);font-weight:700;
  color:transparent;-webkit-text-stroke:1px var(--border);
  user-select:none;pointer-events:none;line-height:1;z-index:0;opacity:0.7}

/* ─── Divider ─── */
.div{height:1px;background:linear-gradient(90deg,transparent,var(--border) 20%,var(--border) 80%,transparent)}

/* ─── Marquee ─── */
.mq-wrap{overflow:hidden;display:flex;gap:0}
.mq-track{display:flex;gap:52px;align-items:center;animation:mq 30s linear infinite;white-space:nowrap;flex-shrink:0}
.mq-track:nth-child(2){animation-delay:-15s}
@keyframes mq{from{transform:translateX(0)}to{transform:translateX(-50%)}}

/* ─── Skill bars ─── */
.sb-fill{height:1px;background:var(--gold);transition:width 1.5s var(--ease-expo)}

/* ─── Orbs ─── */
@keyframes blob{
  0%,100%{border-radius:60% 40% 70% 30%/50% 60% 40% 70%;transform:translate(0,0) scale(1)}
  33%{border-radius:40% 60% 30% 70%/60% 40% 70% 30%;transform:translate(12px,-18px) scale(1.04)}
  66%{border-radius:70% 30% 60% 40%/40% 70% 30% 60%;transform:translate(-10px,14px) scale(0.97)}
}

/* ─── Proj card ─── */
.pc{background:var(--surface);border:1px solid var(--border);
  position:relative;overflow:hidden;cursor:none;
  transition:border-color 0.4s,box-shadow 0.4s;
  transform-style:preserve-3d}
.pc:hover{border-color:var(--border-h);box-shadow:var(--shadow)}
.pc-tag{font-size:0.65rem;padding:4px 12px;border:1px solid rgba(212,168,83,0.28);
  color:var(--gold);font-family:var(--ff-m);letter-spacing:0.1em}

/* ─── Timeline ─── */
.tl{position:relative;padding-left:36px;padding-bottom:52px}
.tl::before{content:'';position:absolute;left:0;top:8px;width:7px;height:7px;
  border-radius:50%;background:var(--gold);box-shadow:0 0 12px var(--gold-glow)}
.tl::after{content:'';position:absolute;left:3px;top:22px;bottom:0;width:1px;background:var(--border)}
.tl:last-child::after{display:none}.tl:last-child{padding-bottom:0}

/* ─── Form ─── */
.fi{width:100%;background:transparent;border:none;border-bottom:1px solid var(--border);
  color:var(--text);padding:14px 0;font-family:var(--ff-b);font-size:0.94rem;font-weight:300;
  outline:none;transition:border-bottom-color 0.4s}
.fi::placeholder{color:var(--text-3)}.fi:focus{border-bottom-color:var(--gold)}
.label-float{position:absolute;top:14px;left:0;font-size:0.7rem;letter-spacing:0.14em;
  text-transform:uppercase;color:var(--text-3);pointer-events:none;
  transition:top 0.3s,font-size 0.3s,color 0.3s}
.fi:focus~.label-float,.fi:not(:placeholder-shown)~.label-float{top:-10px;font-size:0.6rem;color:var(--gold)}

/* ─── Shimmer ─── */
.shim{background:linear-gradient(90deg,var(--gold) 0%,var(--gold-l) 35%,#FFF5D0 50%,var(--gold-l) 65%,var(--gold) 100%);
  background-size:300% auto;-webkit-background-clip:text;background-clip:text;
  -webkit-text-fill-color:transparent;animation:shim 5s linear infinite}
@keyframes shim{from{background-position:-300% center}to{background-position:300% center}}

/* ─── Noise grain ─── */
.grain{position:fixed;inset:0;z-index:998;pointer-events:none;opacity:0.04;
  background-repeat:repeat;background-size:160px 160px;mix-blend-mode:overlay}
.light .grain{opacity:0.025}

/* ─── Misc ─── */
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes successPop{from{opacity:0;transform:scale(0.9) translateY(12px)}to{opacity:1;transform:none}}

@media(max-width:900px){
  .two-col{grid-template-columns:1fr!important}
  .proj-grid{grid-template-columns:1fr!important}
  .wm{display:none}
  .hide-sm{display:none!important}
}
@media(max-width:600px){
  .stat-grid{grid-template-columns:1fr 1fr!important}
}
`;

// ══════════════════════════════════════════════════════════════════════════════
//  HOOKS
// ══════════════════════════════════════════════════════════════════════════════

/** Fire once when element enters viewport */
const useInView = (threshold = 0.12) => {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, v];
};

/** Hacker-text scramble effect */
const useScramble = (text, active, speed = 26) => {
  const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$&";
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!active) return;
    let f = 0;
    const id = setInterval(() => {
      setOut(text.split("").map((c, i) => {
        if (c === " ") return " ";
        return i < f / 2.8 ? c : CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join(""));
      if (f++ > text.length * 3.2) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [active]);
  return out || text;
};

/** Count from 0 → target */
const useCountUp = (target, active, dur = 1800) => {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    const s = performance.now();
    const tick = (now) => {
      const p = Math.min((now - s) / dur, 1);
      setN(Math.round((1 - Math.pow(1 - p, 4)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active]);
  return n;
};

/** Magnetic button attraction */
const useMagnetic = (str = 0.32, r = 88) => {
  const ref = useRef(null);
  const [off, setOff] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const fn = (e) => {
      const el = ref.current; if (!el) return;
      const rc = el.getBoundingClientRect();
      const dx = e.clientX - (rc.left + rc.width / 2);
      const dy = e.clientY - (rc.top  + rc.height / 2);
      const d  = Math.hypot(dx, dy);
      setOff(d < r ? { x: dx * str, y: dy * str } : { x: 0, y: 0 });
    };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);
  return [ref, off];
};

/** 3D tilt from mouse position inside card */
const useTilt = (max = 9) => {
  const ref = useRef(null);
  const [t, setT] = useState({ rx: 0, ry: 0, gx: 50, gy: 50 });
  const onMove = useCallback((e) => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setT({ rx: y * max, ry: -x * max, gx: (x + 0.5) * 100, gy: (y + 0.5) * 100 });
  }, []);
  const onLeave = useCallback(() => setT({ rx: 0, ry: 0, gx: 50, gy: 50 }), []);
  return [ref, t, onMove, onLeave];
};

// ══════════════════════════════════════════════════════════════════════════════
//  NOISE GRAIN OVERLAY
// ══════════════════════════════════════════════════════════════════════════════
const Grain = () => {
  const [url, setUrl] = useState("");
  useEffect(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 160;
    const ctx = c.getContext("2d");
    const id  = ctx.createImageData(160, 160);
    for (let i = 0; i < id.data.length; i += 4) {
      const v = (Math.random() * 255) | 0;
      id.data[i] = id.data[i + 1] = id.data[i + 2] = v;
      id.data[i + 3] = 255;
    }
    ctx.putImageData(id, 0, 0);
    setUrl(c.toDataURL());
  }, []);
  return url ? <div className="grain" style={{ backgroundImage: `url(${url})` }} /> : null;
};

// ══════════════════════════════════════════════════════════════════════════════
//  THREE.JS BACKGROUND
// ══════════════════════════════════════════════════════════════════════════════
const ThreeBG = ({ scrollY, light }) => {
  const canvas = useRef(null);
  const state  = useRef({});
  const mouse  = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  const init = useCallback(() => {
    const T = window.THREE;
    const el = canvas.current;
    if (!T || !el) return;

    const W = window.innerWidth, H = window.innerHeight;
    const renderer = new T.WebGLRenderer({ canvas: el, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0, 0);

    const scene  = new T.Scene();
    const camera = new T.PerspectiveCamera(52, W / H, 0.1, 200);
    camera.position.z = 58;

    // ── Particles ──
    const N  = 1900;
    const g  = new T.BufferGeometry();
    const p  = new Float32Array(N * 3);
    const cl = new Float32Array(N * 3);
    const sz = new Float32Array(N);
    const pal = [
      new T.Color(0xD4A853), new T.Color(0x9A7840),
      new T.Color(0x3D3225), new T.Color(0xE8C87A),
    ];
    for (let i = 0; i < N; i++) {
      const r  = 20 + Math.random() * 40;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      p[i*3]   = r*Math.sin(ph)*Math.cos(th);
      p[i*3+1] = r*Math.sin(ph)*Math.sin(th);
      p[i*3+2] = r*Math.cos(ph) - 8;
      const c  = pal[Math.floor(Math.random() * pal.length)];
      cl[i*3]=c.r; cl[i*3+1]=c.g; cl[i*3+2]=c.b;
      sz[i] = Math.random() * 2.4 + 0.4;
    }
    g.setAttribute("position", new T.BufferAttribute(p,  3));
    g.setAttribute("color",    new T.BufferAttribute(cl, 3));
    g.setAttribute("size",     new T.BufferAttribute(sz, 1));

    const pMat = new T.ShaderMaterial({
      uniforms: { uT:{value:0}, uM:{value:new T.Vector2()}, uS:{value:0} },
      vertexShader:`
        attribute float size;attribute vec3 color;varying vec3 vC;varying float vA;
        uniform float uT;uniform vec2 uM;uniform float uS;
        void main(){
          vC=color;vec3 q=position;
          float w=sin(q.x*.09+uT*.35)*1.6+cos(q.y*.07+uT*.28)*1.4;q.z+=w;
          float d=length(q.xy);q.x+=uM.x*55./(d+12.);q.y+=uM.y*40./(d+12.);
          q.z-=uS*.02;
          vec4 mv=modelViewMatrix*vec4(q,1.);gl_Position=projectionMatrix*mv;
          gl_PointSize=size*285./-mv.z;
          vA=clamp(1.-(-mv.z-8.)/90.,0.,1.)*.9;
        }
      `,
      fragmentShader:`
        varying vec3 vC;varying float vA;
        void main(){
          vec2 uv=gl_PointCoord-.5;float r=length(uv);
          float a=1.-smoothstep(.28,.5,r);
          gl_FragColor=vec4(vC,a*vA);
        }
      `,
      transparent:true, blending:T.AdditiveBlending, depthWrite:false, vertexColors:true,
    });
    const pts = new T.Points(g, pMat);
    scene.add(pts);

    // ── Icosahedron wireframe ──
    const iGeo = new T.IcosahedronGeometry(5.5, 1);
    const iMat = new T.ShaderMaterial({
      uniforms:{uT:{value:0}},
      vertexShader:`
        uniform float uT;varying float vY;
        void main(){vY=position.y;
          vec3 p=position+normal*(sin(position.x*.9+uT)*.2+sin(position.z+uT*1.1)*.15);
          gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}
      `,
      fragmentShader:`
        varying float vY;
        void main(){float a=clamp((vY+5.5)/11.,0.,1.);
          gl_FragColor=vec4(.83,.66,.33,.14+a*.14);}
      `,
      transparent:true,blending:T.AdditiveBlending,wireframe:true,depthWrite:false,
    });
    const ico = new T.Mesh(iGeo, iMat);
    scene.add(ico);

    // ── Grid ──
    const grGeo = new T.PlaneGeometry(160,160,36,36);
    const grMat = new T.ShaderMaterial({
      uniforms:{uT:{value:0}},
      vertexShader:`
        uniform float uT;varying vec2 vUv;
        void main(){vUv=uv;vec3 p=position;p.z=sin(p.x*.1+uT*.22)*cos(p.y*.1+uT*.18)*1.7;
          gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}
      `,
      fragmentShader:`
        varying vec2 vUv;
        void main(){
          float gx=abs(fract(vUv.x*36.)-.5);float gy=abs(fract(vUv.y*36.)-.5);
          float l=1.-smoothstep(0.,.035,min(gx,gy));
          vec2 e=abs(vUv-.5)*2.;float fade=1.-smoothstep(.6,1.,max(e.x,e.y));
          gl_FragColor=vec4(.83,.66,.33,l*.09*fade);
        }
      `,
      transparent:true,blending:T.AdditiveBlending,depthWrite:false,
    });
    const grid = new T.Mesh(grGeo, grMat);
    grid.rotation.x = -Math.PI/2.2; grid.position.y = -28;
    scene.add(grid);

    state.current = { renderer, scene, camera, pMat, iMat: iMat, grMat, ico, pts };

    // Render loop
    const clock = new T.Clock(); let raf;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      const t = clock.getElapsedTime();
      mouse.current.x += (mouse.current.tx - mouse.current.x) * .045;
      mouse.current.y += (mouse.current.ty - mouse.current.y) * .045;
      pMat.uniforms.uT.value=t;
      pMat.uniforms.uM.value.set(mouse.current.x*6, mouse.current.y*4);
      iMat.uniforms.uT.value=t; grMat.uniforms.uT.value=t;
      ico.rotation.x=t*.09; ico.rotation.y=t*.13;
      pts.rotation.y=t*.013;
      camera.position.y=Math.sin(t*.07)*1.5;
      renderer.render(scene, camera);
    };
    loop();

    const onResize = () => {
      const W=innerWidth,H=innerHeight;
      camera.aspect=W/H; camera.updateProjectionMatrix(); renderer.setSize(W,H);
    };
    window.addEventListener("resize", onResize);
    state.current.kill = () => { cancelAnimationFrame(raf); renderer.dispose(); window.removeEventListener("resize",onResize); };
  }, []);

  useEffect(() => {
    if (window.THREE) { init(); return; }
    const s=document.createElement("script");
    s.src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    s.onload=init; document.head.appendChild(s);
    return () => state.current.kill?.();
  }, []);

  useEffect(() => { const {pMat}=state.current; if(pMat) pMat.uniforms.uS.value=scrollY; }, [scrollY]);

  useEffect(() => {
    const fn=(e)=>{mouse.current.tx=(e.clientX/innerWidth-.5)*2;mouse.current.ty=-(e.clientY/innerHeight-.5)*2};
    window.addEventListener("mousemove",fn);return()=>window.removeEventListener("mousemove",fn);
  },[]);

  return <canvas ref={canvas} style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none",opacity:light?.32:.68,transition:"opacity .8s"}} />;
};

// ══════════════════════════════════════════════════════════════════════════════
//  CURSOR
// ══════════════════════════════════════════════════════════════════════════════
const Cursor = () => {
  const dot  = useRef(null);
  const ring = useRef(null);
  const glow = useRef(null);

  useEffect(() => {
    let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my,gx=mx,gy=my,raf;

    const onMove = (e) => { mx=e.clientX; my=e.clientY; };
    const mark   = (add) => (e) => {
      const el = e.currentTarget;
      if (add) { ring.current?.classList.add("on"); }
      else     { ring.current?.classList.remove("on"); }
    };

    const bind = () => {
      document.querySelectorAll("a,button,[data-h],input,textarea").forEach(el => {
        el.addEventListener("mouseenter", mark(true));
        el.addEventListener("mouseleave", mark(false));
      });
    };
    bind();
    const mo = new MutationObserver(bind);
    mo.observe(document.body, {childList:true,subtree:true});
    window.addEventListener("mousemove", onMove);

    const tick = () => {
      raf=requestAnimationFrame(tick);
      if(dot.current){dot.current.style.left=mx+"px";dot.current.style.top=my+"px";}
      rx+=(mx-rx)*.13; ry+=(my-ry)*.13;
      if(ring.current){ring.current.style.left=rx+"px";ring.current.style.top=ry+"px";}
      gx+=(mx-gx)*.032; gy+=(my-gy)*.032;
      if(glow.current){glow.current.style.left=gx+"px";glow.current.style.top=gy+"px";}
    };
    tick();

    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove",onMove); mo.disconnect(); };
  }, []);

  return (<>
    <div ref={glow} className="c-glow" />
    <div ref={dot}  className="c-dot"  />
    <div ref={ring} className="c-ring" />
  </>);
};

// ══════════════════════════════════════════════════════════════════════════════
//  NAV
// ══════════════════════════════════════════════════════════════════════════════
const NAV = ["hero","about","projects","resume","contact"];

const Nav = ({ active, light, setLight }) => {
  const [sc, setSc] = useState(false);
  useEffect(() => {
    const fn = () => setSc(scrollY > 70);
    window.addEventListener("scroll", fn, {passive:true});
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position:"fixed",top:0,left:0,right:0,zIndex:500,
      padding:"20px 6vw",display:"flex",alignItems:"center",justifyContent:"space-between",
      background: sc ? (light?"rgba(244,239,230,.88)":"rgba(8,10,13,.9)") : "transparent",
      backdropFilter: sc ? "blur(24px)" : "none",
      borderBottom: sc ? "1px solid var(--border)" : "none",
      transition:"background .55s,backdrop-filter .55s,border-color .55s",
    }}>
      <a href="#hero" style={{fontFamily:"var(--ff-d)",fontSize:"1.55rem",color:"var(--gold)",letterSpacing:".04em",lineHeight:1}} data-h>
        AJ.
      </a>
      <div style={{display:"flex",gap:"36px"}}>
        {NAV.map(l=>(
          <a key={l} href={`#${l}`} className={`nav-link ${active===l?"active":""}`} data-h>{l}</a>
        ))}
      </div>
      <button data-h onClick={()=>setLight(p=>!p)} style={{
        padding:"8px 18px",border:"1px solid var(--border)",
        color:"var(--text-2)",fontSize:".68rem",letterSpacing:".14em",
        textTransform:"uppercase",fontFamily:"var(--ff-m)",cursor:"none",
        transition:"border-color .3s,color .3s",
      }}
        onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--gold)";e.currentTarget.style.color="var(--gold)"}}
        onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.color="var(--text-2)"}}
      >
        {light ? "● Dark" : "○ Light"}
      </button>
    </nav>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
//  HELPERS
// ══════════════════════════════════════════════════════════════════════════════
const Label = ({ children }) => (
  <p className="mo" style={{fontSize:".7rem",letterSpacing:".22em",textTransform:"uppercase",color:"var(--gold)",marginBottom:"16px",display:"flex",alignItems:"center",gap:"12px"}}>
    <span style={{display:"inline-block",width:"26px",height:"1px",background:"var(--gold)"}} />
    {children}
  </p>
);

const MagBtn = ({ href, children, ghost }) => {
  const [ref, off] = useMagnetic(.3, 85);
  return (
    <a href={href} ref={ref} data-h style={{display:"inline-block",transform:`translate(${off.x}px,${off.y}px)`,transition:"transform .4s var(--ease-expo)"}}>
      <span className={`btn ${ghost?"ghost":""}`}><span>{children}</span></span>
    </a>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
//  HERO
// ══════════════════════════════════════════════════════════════════════════════
const MARQUEE_ITEMS = ["React","Three.js","TypeScript","WebGL","Node.js","Design Systems","GSAP","Motion Design","Next.js","Figma","GLSL","PostgreSQL","Framer Motion","UX Direction"];

const Hero = () => {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 280);
    const t2 = setTimeout(() => setPhase(2), 1100);
    const t3 = setTimeout(() => setPhase(3), 1900);
    return () => [t1,t2,t3].forEach(clearTimeout);
  }, []);

  const name = useScramble("Alex Jordan", phase >= 2);

  return (
    <section id="hero" style={{minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",padding:"0 9vw",position:"relative",zIndex:1,overflow:"hidden"}}>
      
      {/* Floating orbs — decorative depth elements */}
      <div style={{position:"absolute",right:"8vw",top:"18%",width:"380px",height:"380px",
        background:"radial-gradient(circle at 40% 40%, rgba(212,168,83,.12) 0%, transparent 70%)",
        animation:"blob 9s ease-in-out infinite",borderRadius:"60% 40% 70% 30%/50% 60% 40% 70%",
        filter:"blur(1px)",pointerEvents:"none"}} />
      <div style={{position:"absolute",right:"14vw",top:"28%",width:"220px",height:"220px",
        background:"radial-gradient(circle, rgba(212,168,83,.07) 0%, transparent 65%)",
        animation:"blob 12s ease-in-out infinite reverse",borderRadius:"40% 60% 30% 70%/60% 40% 70% 30%",
        animationDelay:"-3s",filter:"blur(2px)",pointerEvents:"none"}} />

      {/* Vertical side label */}
      <div className="hide-sm" style={{position:"absolute",left:"36px",top:"50%",transform:"translateY(-50%) rotate(-90deg)",
        transformOrigin:"center",fontSize:".62rem",letterSpacing:".26em",color:"var(--text-3)",
        textTransform:"uppercase",whiteSpace:"nowrap",fontFamily:"var(--ff-m)",
        opacity:phase>=3?1:0,transition:"opacity 1.2s ease .5s"}}>
        Creative Technologist · 2025
      </div>

      <div style={{maxWidth:"800px"}}>
        {/* Label */}
        <div style={{opacity:phase>=1?1:0,transform:phase>=1?"none":"translateY(18px)",transition:"opacity .7s,transform .7s"}}>
          <Label>Open to opportunities</Label>
        </div>

        {/* Scramble name */}
        <h1 className="dp" style={{
          fontSize:"clamp(3.2rem,8.5vw,7.8rem)",fontWeight:300,lineHeight:1.02,letterSpacing:"-.02em",
          marginBottom:"6px",color:"var(--text)",
          opacity:phase>=2?1:0,transform:phase>=2?"none":"translateY(36px)",
          transition:"opacity .9s var(--ease-expo) .1s,transform .9s var(--ease-expo) .1s",
        }}>
          {name}
        </h1>

        {/* Role — shimmer */}
        <h2 className="dp shim" style={{
          fontSize:"clamp(3.2rem,8.5vw,7.8rem)",fontWeight:300,lineHeight:1.02,letterSpacing:"-.02em",
          marginBottom:"36px",fontStyle:"italic",
          opacity:phase>=2?1:0,transform:phase>=2?"none":"translateY(36px)",
          transition:"opacity .9s var(--ease-expo) .25s,transform .9s var(--ease-expo) .25s",
        }}>
          builds the future.
        </h2>

        {/* Tagline */}
        <p style={{
          fontSize:"1.05rem",fontWeight:300,lineHeight:1.82,color:"var(--text-2)",
          maxWidth:"520px",marginBottom:"52px",
          opacity:phase>=3?1:0,transform:phase>=3?"none":"translateY(22px)",
          transition:"opacity .8s var(--ease-expo) .2s,transform .8s var(--ease-expo) .2s",
        }}>
          Senior engineer & creative developer at the intersection of engineering precision
          and visual intelligence. I craft digital experiences that outlast trends.
        </p>

        {/* CTAs — magnetic */}
        <div style={{
          display:"flex",gap:"18px",flexWrap:"wrap",
          opacity:phase>=3?1:0,transform:phase>=3?"none":"translateY(22px)",
          transition:"opacity .8s var(--ease-expo) .4s,transform .8s var(--ease-expo) .4s",
        }}>
          <MagBtn href="#projects">View Work</MagBtn>
          <MagBtn href="#contact" ghost>Let's Talk</MagBtn>
        </div>
      </div>

      {/* Marquee strip */}
      <div style={{
        position:"absolute",bottom:0,left:0,right:0,
        borderTop:"1px solid var(--border)",borderBottom:"1px solid var(--border)",
        padding:"14px 0",
        opacity:phase>=3?1:0,transition:"opacity 1.2s ease .8s",overflow:"hidden",
      }}>
        <div style={{display:"flex",gap:0}}>
          {[0,1].map(k=>(
            <div key={k} className="mq-track" style={{animationDelay:k===1?"-15s":"0s"}}>
              {[...MARQUEE_ITEMS,...MARQUEE_ITEMS].map((item,i)=>(
                <span key={i} style={{display:"flex",alignItems:"center",gap:"48px"}}>
                  <span className="mo" style={{fontSize:".68rem",letterSpacing:".18em",textTransform:"uppercase",color:"var(--text-3)"}}>
                    {item}
                  </span>
                  <span style={{width:"4px",height:"4px",borderRadius:"50%",background:"var(--gold)",opacity:.4}} />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{
        position:"absolute",bottom:"80px",right:"6vw",
        display:"flex",flexDirection:"column",alignItems:"center",gap:"10px",
        opacity:phase>=3?.45:0,transition:"opacity 1.4s ease 1s",
      }}>
        <div style={{width:"1px",height:"54px",background:"linear-gradient(to bottom,var(--gold),transparent)",animation:"fadeIn 2s ease infinite alternate"}} />
        <span className="mo" style={{fontSize:".58rem",letterSpacing:".2em",color:"var(--text-3)",textTransform:"uppercase",writingMode:"vertical-rl"}}>scroll</span>
      </div>
    </section>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
//  ABOUT + SKILLS
// ══════════════════════════════════════════════════════════════════════════════
const SKILLS = [
  {n:"React / Next.js",    p:96, c:"Frontend"},
  {n:"Three.js / WebGL",   p:88, c:"Creative"},
  {n:"Motion Design",      p:91, c:"Creative"},
  {n:"TypeScript",         p:93, c:"Frontend"},
  {n:"Node.js / APIs",     p:87, c:"Backend"},
  {n:"UI / UX Direction",  p:90, c:"Design"},
  {n:"System Architecture",p:83, c:"Backend"},
  {n:"Creative Direction", p:86, c:"Design"},
];

const SkillBar = ({ n, p, c, delay, visible }) => (
  <div style={{marginBottom:"26px"}}>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:"10px",alignItems:"baseline"}}>
      <span style={{fontSize:".88rem",fontWeight:400,color:"var(--text)"}}>{n}</span>
      <div style={{display:"flex",gap:"12px",alignItems:"center"}}>
        <span className="mo" style={{fontSize:".62rem",color:"var(--text-3)",letterSpacing:".1em"}}>{c}</span>
        <span className="mo" style={{fontSize:".76rem",color:"var(--gold)"}}>{p}</span>
      </div>
    </div>
    <div style={{height:"1px",background:"var(--border)",position:"relative"}}>
      <div className="sb-fill" style={{width:visible?`${p}%`:"0%",transitionDelay:`${delay}ms`}} />
      <div style={{
        position:"absolute",right:`${100-p}%`,top:"-3.5px",
        width:"8px",height:"8px",borderRadius:"50%",border:"1px solid var(--gold)",background:"var(--bg2)",
        opacity:visible?1:0,transition:`opacity .3s ${delay+1500}ms`,
      }} />
    </div>
  </div>
);

const StatNum = ({ target, label, suffix="" }) => {
  const [ref, v] = useInView(.5);
  const n = useCountUp(target, v);
  return (
    <div ref={ref} style={{borderTop:"1px solid var(--border)",paddingTop:"22px"}}>
      <div className="dp" style={{fontSize:"clamp(2.4rem,4vw,3.8rem)",fontWeight:300,color:"var(--gold)",lineHeight:1}}>
        {n}{suffix}
      </div>
      <div style={{fontSize:".75rem",color:"var(--text-2)",marginTop:"7px",letterSpacing:".05em"}}>{label}</div>
    </div>
  );
};

const About = () => {
  const [sRef, sv] = useInView();

  return (
    <section id="about" style={{minHeight:"100vh",padding:"130px 0",position:"relative",zIndex:1,overflow:"hidden"}}>
      <div className="wm" style={{opacity:.5}}>02</div>
      <div style={{padding:"0 9vw"}}>
        <Label>About me</Label>

        <div className="two-col" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"88px",alignItems:"start"}}>
          
          {/* Left */}
          <div>
            <h2 className="dp" style={{fontSize:"clamp(2rem,4vw,3.6rem)",fontWeight:300,lineHeight:1.12,marginBottom:"32px"}}>
              Where engineering meets{" "}
              <em style={{color:"var(--gold)"}}>artistry</em>
            </h2>
            <p style={{color:"var(--text-2)",lineHeight:1.88,marginBottom:"22px",fontSize:".97rem"}}>
              Nine years building products that live at the intersection of technical excellence
              and visual intelligence. I've shipped to millions, led design systems, and written
              GLSL shaders that made investors stop mid-pitch.
            </p>
            <p style={{color:"var(--text-2)",lineHeight:1.88,fontSize:".97rem",marginBottom:"48px"}}>
              Currently available for senior IC roles, founding engineer positions,
              and selective consulting engagements where craft is non-negotiable.
            </p>

            {/* Stats */}
            <div className="stat-grid" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"28px"}}>
              <StatNum target={9}  suffix="+" label="Years exp."       />
              <StatNum target={42}        label="Projects shipped"  />
              <StatNum target={3}         label="Unicorns built"     />
            </div>
          </div>

          {/* Right — Skills */}
          <div ref={sRef}>
            <div className="mo" style={{fontSize:".65rem",letterSpacing:".2em",textTransform:"uppercase",color:"var(--gold)",marginBottom:"28px",marginTop:"4px"}}>
              Expertise
            </div>
            {SKILLS.map((s,i) => (
              <SkillBar key={s.n} {...s} delay={i*70} visible={sv} />
            ))}
          </div>
        </div>

        {/* Philosophy strip */}
        <div style={{
          marginTop:"100px",padding:"44px",
          border:"1px solid var(--border)",
          display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"48px",
          background:"rgba(255,255,255,.018)",
        }}>
          {[
            ["Precision","Every pixel, every millisecond — intentional."],
            ["Restraint","Animations communicate hierarchy. Nothing decorative."],
            ["Durability","Code and design that ages with grace, not debt."],
          ].map(([t,d]) => (
            <div key={t}>
              <div className="dp" style={{fontSize:"1.15rem",color:"var(--text)",marginBottom:"10px",fontStyle:"italic"}}>{t}</div>
              <div style={{fontSize:".85rem",color:"var(--text-2)",lineHeight:1.7}}>{d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
//  PROJECTS
// ══════════════════════════════════════════════════════════════════════════════
const PROJECTS = [
  {id:1,title:"Aether Design System",cat:"Design System · React",year:"2024",wide:true,
   desc:"A token-driven, fully accessible design system powering 14 product teams. 280+ components, automated Figma-to-code pipeline, and sub-30ms render budgets enforced by CI.",
   tags:["React","TypeScript","Storybook","Design Tokens"],accent:"rgba(212,168,83,"},
  {id:2,title:"Luminary Analytics",cat:"SaaS · Data Visualization",year:"2024",wide:false,
   desc:"Real-time analytics processing 40M events/day. Custom WebGL chart engine, spatial UI.",
   tags:["WebGL","D3","ClickHouse","Next.js"],accent:"rgba(122,156,173,"},
  {id:3,title:"Chorus Creative Studio",cat:"Agency · 3D Web",year:"2023",wide:false,
   desc:"Award-winning site with custom GLSL shaders. 98 Lighthouse despite heavy 3D.",
   tags:["Three.js","GLSL","GSAP"],accent:"rgba(160,128,96,"},
  {id:4,title:"Meridian OS",cat:"App · Systems Design",year:"2023",wide:true,
   desc:"Next-gen project management OS for distributed teams. Offline-first, CRDT-based, AI-assisted workflows, and a spatial canvas interface that rethinks how teams see their work.",
   tags:["Electron","CRDTs","SQLite","AI","Design"],accent:"rgba(109,138,122,"},
];

const ProjCard = ({ p }) => {
  const [tRef, t, onMove, onLeave] = useTilt(8);
  const [hov, setHov] = useState(false);

  return (
    <div
      ref={tRef}
      className="pc"
      style={{
        gridColumn: p.wide ? "span 2" : "span 1",
        minHeight: p.wide ? "400px" : "340px",
        transform:`perspective(1200px) rotateX(${t.rx}deg) rotateY(${t.ry}deg) scale(${hov?1.012:1})`,
        transition:`box-shadow .4s, border-color .4s, transform .6s var(--ease-expo)`,
      }}
      onMouseMove={onMove}
      onMouseLeave={(e) => { onLeave(e); setHov(false); }}
      onMouseEnter={() => setHov(true)}
    >
      {/* Dynamic gradient highlight following tilt */}
      <div style={{
        position:"absolute",inset:0,pointerEvents:"none",
        background:`radial-gradient(ellipse at ${t.gx}% ${t.gy}%, ${p.accent}.14) 0%, transparent 60%)`,
        transition:"background .15s",
        zIndex:0,
      }} />

      {/* Content */}
      <div style={{position:"relative",zIndex:1,padding:"36px",height:"100%",display:"flex",flexDirection:"column"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"20px"}}>
          <span className="mo" style={{fontSize:".66rem",letterSpacing:".18em",color:p.accent+"0.9)",textTransform:"uppercase"}}>{p.cat}</span>
          <span className="mo" style={{fontSize:".66rem",color:"var(--text-3)"}}>{p.year}</span>
        </div>

        <h3 className="dp" style={{
          fontSize: p.wide ? "2.5rem" : "1.9rem",
          fontWeight:300,lineHeight:1.08,color:"var(--text)",
          marginBottom:"auto",
          transform:`translateY(${hov?-6:0}px)`,transition:"transform .45s var(--ease-expo)",
        }}>
          {p.title}
        </h3>

        {/* Reveal on hover */}
        <div style={{
          marginTop:"24px",
          opacity:hov?1:0,transform:hov?"none":"translateY(14px)",
          transition:"opacity .4s var(--ease-expo), transform .4s var(--ease-expo)",
        }}>
          <p style={{fontSize:".88rem",color:"var(--text-2)",lineHeight:1.72,marginBottom:"18px"}}>{p.desc}</p>
          <div style={{display:"flex",gap:"8px",flexWrap:"wrap"}}>
            {p.tags.map(t=><span key={t} className="pc-tag">{t}</span>)}
          </div>
        </div>
      </div>

      {/* Bottom accent bar */}
      <div style={{
        position:"absolute",bottom:0,left:0,right:0,height:"2px",
        background:`linear-gradient(90deg, transparent, ${p.accent}0.8), transparent)`,
        opacity:hov?1:0,transition:"opacity .4s",
      }} />
    </div>
  );
};

const Projects = () => {
  const [ref, v] = useInView(.08);
  return (
    <section id="projects" style={{minHeight:"100vh",padding:"130px 0",position:"relative",zIndex:1,overflow:"hidden"}}>
      <div className="wm">03</div>
      <div style={{padding:"0 9vw"}} ref={ref}>
        <div className={`r ${v?"v":""}`}>
          <Label>Selected work</Label>
          <h2 className="dp" style={{fontSize:"clamp(2rem,4vw,3.4rem)",fontWeight:300,marginBottom:"64px",maxWidth:"460px"}}>
            Work that <em style={{color:"var(--gold)"}}>mattered</em>
          </h2>
        </div>

        <div className="proj-grid" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"18px"}}>
          {PROJECTS.map(p => <ProjCard key={p.id} p={p} />)}
        </div>
      </div>
    </section>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
//  RESUME
// ══════════════════════════════════════════════════════════════════════════════
const EXP = [
  {role:"Staff Engineer",co:"Vercel",period:"2022 – 2024",
   desc:"Led frontend infrastructure for the dashboard. Architected the template marketplace — 4M monthly visitors, 0.1s LCP.",
   tags:["React","Rust","Edge Functions"]},
  {role:"Senior Creative Developer",co:"Stripe",period:"2020 – 2022",
   desc:"Built stripe.com marketing pages and the interactive docs system. WebGL animation owner across all branded experiences.",
   tags:["Three.js","GSAP","Next.js"]},
  {role:"Founding Engineer",co:"Ramp (YC W19)",period:"2019 – 2020",
   desc:"First design engineering hire. Shipped initial product in 6 weeks. Defined frontend standards adopted company-wide.",
   tags:["React","TypeScript","Design Systems"]},
];

const Resume = () => {
  const [ref, v] = useInView(.08);
  return (
    <section id="resume" style={{minHeight:"100vh",padding:"130px 0",position:"relative",zIndex:1,overflow:"hidden"}}>
      <div className="wm">04</div>
      <div style={{padding:"0 9vw"}} ref={ref}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:"72px",flexWrap:"wrap",gap:"24px"}}>
          <div className={`r ${v?"v":""}`}>
            <Label>Experience</Label>
            <h2 className="dp" style={{fontSize:"clamp(2rem,4vw,3.4rem)",fontWeight:300}}>
              Where I've <em style={{color:"var(--gold)"}}>contributed</em>
            </h2>
          </div>
          <div className={`r d3 ${v?"v":""}`}>
            <MagBtn href="#">↓ Download CV</MagBtn>
          </div>
        </div>

        <div className="two-col" style={{display:"grid",gridTemplateColumns:"3fr 1.1fr",gap:"80px",alignItems:"start"}}>

          {/* Timeline */}
          <div>
            {EXP.map((e,i)=>(
              <div key={i} className={`tl r d${i+1} ${v?"v":""}`}>
                <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:"8px",marginBottom:"10px"}}>
                  <div>
                    <span style={{fontWeight:400,color:"var(--text)",fontSize:"1.05rem"}}>{e.role}</span>
                    <span style={{color:"var(--gold)",margin:"0 10px"}}>·</span>
                    <span style={{color:"var(--text-2)",fontSize:".95rem"}}>{e.co}</span>
                  </div>
                  <span className="mo" style={{fontSize:".7rem",color:"var(--text-3)",letterSpacing:".1em"}}>{e.period}</span>
                </div>
                <p style={{color:"var(--text-2)",lineHeight:1.78,fontSize:".9rem",marginBottom:"16px"}}>{e.desc}</p>
                <div style={{display:"flex",gap:"8px",flexWrap:"wrap"}}>
                  {e.tags.map(t=>(
                    <span key={t} className="mo" style={{fontSize:".62rem",color:"var(--text-3)",border:"1px solid var(--border)",padding:"3px 10px",letterSpacing:".1em"}}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className={`r d4 ${v?"v":""}`}>
            <div style={{marginBottom:"44px"}}>
              <div className="mo" style={{fontSize:".63rem",letterSpacing:".2em",color:"var(--gold)",marginBottom:"20px",textTransform:"uppercase"}}>Education</div>
              <div style={{borderTop:"1px solid var(--border)",paddingTop:"20px"}}>
                <p style={{fontWeight:400,fontSize:".9rem",marginBottom:"5px"}}>B.S. Computer Science</p>
                <p style={{color:"var(--gold)",fontSize:".85rem",marginBottom:"5px"}}>Carnegie Mellon University</p>
                <p style={{color:"var(--text-2)",fontSize:".78rem"}}>2019 · Minor in HCI</p>
              </div>
            </div>

            <div>
              <div className="mo" style={{fontSize:".63rem",letterSpacing:".2em",color:"var(--gold)",marginBottom:"20px",textTransform:"uppercase"}}>Core Stack</div>
              {["React / Next.js","TypeScript","Node.js / Bun","Three.js / R3F","PostgreSQL","AWS / GCP","Figma","GLSL / WebGL"].map(t=>(
                <div key={t} style={{padding:"10px 0",borderBottom:"1px solid var(--border)",fontSize:".85rem",color:"var(--text-2)",display:"flex",alignItems:"center",gap:"10px"}}>
                  <span style={{width:"4px",height:"4px",borderRadius:"50%",background:"var(--gold)",flexShrink:0}} />
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
//  CONTACT
// ══════════════════════════════════════════════════════════════════════════════
const Contact = () => {
  const [form,   setForm]   = useState({name:"",email:"",message:""});
  const [status, setStatus] = useState("idle"); // idle|busy|ok|err
  const [errs,   setErrs]   = useState({});
  const [ref, v] = useInView(.08);

  const validate = () => {
    const e = {};
    if (!form.name.trim())                     e.name    = "Required";
    if (!/^\S+@\S+\.\S+$/.test(form.email))   e.email   = "Valid email required";
    if (form.message.trim().length < 20)        e.message = "At least 20 characters";
    return e;
  };

  const submit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrs(e); return; }
    setErrs({}); setStatus("busy");
    await new Promise(r => setTimeout(r, 1700));
    setStatus("ok");
  };

  return (
    <section id="contact" style={{padding:"130px 0 0",position:"relative",zIndex:1,borderTop:"1px solid var(--border)"}}>
      <div className="wm">05</div>
      <div style={{padding:"0 9vw"}} ref={ref}>

        {/* Big statement */}
        <div className={`r ${v?"v":""}`} style={{marginBottom:"88px"}}>
          <h2 className="dp" style={{fontSize:"clamp(3rem,7vw,7rem)",fontWeight:300,lineHeight:1.02,letterSpacing:"-.02em"}}>
            Let's build<br />
            <em className="shim">something</em><br />
            extraordinary.
          </h2>
        </div>

        <div className="two-col" style={{display:"grid",gridTemplateColumns:"1fr 1.5fr",gap:"88px",alignItems:"start"}}>

          {/* Info */}
          <div className={`r d2 ${v?"v":""}`}>
            {[["Email","alex@alexjordan.dev"],["Phone","+1 (415) 555-0192"],["Location","San Francisco, CA"]].map(([l,val])=>(
              <div key={l} style={{marginBottom:"36px"}}>
                <p className="mo" style={{fontSize:".62rem",letterSpacing:".2em",color:"var(--gold)",textTransform:"uppercase",marginBottom:"8px"}}>{l}</p>
                <p style={{fontSize:".97rem",color:"var(--text)"}}>{val}</p>
              </div>
            ))}
            <div style={{borderTop:"1px solid var(--border)",paddingTop:"32px"}}>
              <p className="mo" style={{fontSize:".62rem",letterSpacing:".2em",color:"var(--gold)",textTransform:"uppercase",marginBottom:"16px"}}>Elsewhere</p>
              {[["GitHub","github.com/alexjordan"],["LinkedIn","linkedin.com/in/alexjordan"],["Dribbble","dribbble.com/alexjordan"],["Twitter","twitter.com/alexjordan"]].map(([n,u])=>(
                <a key={n} href="#" data-h style={{
                  display:"flex",justifyContent:"space-between",alignItems:"center",
                  padding:"10px 0",borderBottom:"1px solid var(--border)",
                  color:"var(--text-2)",fontSize:".88rem",transition:"color .25s, padding-left .25s",
                }}
                  onMouseEnter={e=>{e.currentTarget.style.color="var(--gold)";e.currentTarget.style.paddingLeft="6px"}}
                  onMouseLeave={e=>{e.currentTarget.style.color="var(--text-2)";e.currentTarget.style.paddingLeft="0"}}
                >
                  <span>{n}</span>
                  <span style={{fontSize:".75rem",opacity:.6}}>↗</span>
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className={`r d3 ${v?"v":""}`}>
            {status === "ok" ? (
              <div style={{
                padding:"60px 44px",border:"1px solid rgba(212,168,83,.3)",textAlign:"center",
                animation:"successPop .6s var(--ease-expo) both",
              }}>
                <div className="dp" style={{fontSize:"3rem",color:"var(--gold)",marginBottom:"16px"}}>✓</div>
                <p className="dp" style={{fontSize:"1.6rem",fontWeight:300,color:"var(--text)",marginBottom:"8px",fontStyle:"italic"}}>
                  Message received.
                </p>
                <p style={{color:"var(--text-2)",fontSize:".88rem"}}>I'll reply within 24 hours.</p>
              </div>
            ) : (
              <div>
                {[
                  {f:"name",    label:"Full name",     ph:"Jane Smith",         type:"text"},
                  {f:"email",   label:"Email address", ph:"jane@company.com",   type:"email"},
                ].map(({f,label,ph,type})=>(
                  <div key={f} style={{position:"relative",marginBottom:"36px"}}>
                    <input type={type} className="fi" placeholder={ph}
                      value={form[f]} onChange={e=>setForm(p=>({...p,[f]:e.target.value}))} data-h />
                    <label className="label-float">{label}</label>
                    {errs[f] && <p style={{fontSize:".72rem",color:"#C87070",marginTop:"6px"}}>{errs[f]}</p>}
                  </div>
                ))}
                <div style={{position:"relative",marginBottom:"44px"}}>
                  <textarea className="fi" placeholder="Tell me about the project..." rows={5}
                    value={form.message} onChange={e=>setForm(p=>({...p,message:e.target.value}))} data-h />
                  <label className="label-float">Message</label>
                  {errs.message && <p style={{fontSize:".72rem",color:"#C87070",marginTop:"6px"}}>{errs.message}</p>}
                </div>

                <MagBtn href="#" ghost>
                  <span onClick={(e)=>{e.preventDefault();submit();}} style={{display:"flex",alignItems:"center",gap:"10px"}}>
                    {status==="busy" ? (
                      <><span style={{width:"11px",height:"11px",border:"1px solid currentColor",borderTopColor:"transparent",borderRadius:"50%",display:"inline-block",animation:"spin .8s linear infinite"}} />Sending</>
                    ) : "Send Message →"}
                  </span>
                </MagBtn>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        marginTop:"100px",padding:"32px 9vw",borderTop:"1px solid var(--border)",
        display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"16px",
      }}>
        <span className="dp" style={{fontSize:"1.4rem",color:"var(--gold)"}}>AJ.</span>
        <span style={{fontSize:".75rem",color:"var(--text-3)"}}>© 2025 Alex Jordan. Crafted with React & Three.js.</span>
        <button data-h onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} style={{
          fontSize:".7rem",color:"var(--text-3)",fontFamily:"var(--ff-m)",letterSpacing:".14em",
          cursor:"none",transition:"color .25s",textTransform:"uppercase",
        }}
          onMouseEnter={e=>e.currentTarget.style.color="var(--gold)"}
          onMouseLeave={e=>e.currentTarget.style.color="var(--text-3)"}
        >
          ↑ Back to top
        </button>
      </footer>
    </section>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
//  ROOT APP
// ══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [light,   setLight]   = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [active,  setActive]  = useState("hero");

  // Track scroll + active section
  useEffect(() => {
    const fn = () => {
      setScrollY(window.scrollY);
      const secs = ["hero","about","projects","resume","contact"];
      for (let i = secs.length - 1; i >= 0; i--) {
        const el = document.getElementById(secs[i]);
        if (el && window.scrollY >= el.offsetTop - 180) { setActive(secs[i]); break; }
      }
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      {/* Inject styles */}
      <style>{STYLES}</style>

      <div className={light ? "light" : ""} style={{ background: "var(--bg)", minHeight: "100vh" }}>
        {/* Effects layer */}
        <Grain />
        <Cursor />
        <ThreeBG scrollY={scrollY} light={light} />

        {/* App shell */}
        <Nav active={active} light={light} setLight={setLight} />

        <main style={{ position: "relative", zIndex: 1 }}>
          <Hero />
          <div className="div" style={{ margin: "0 9vw" }} />
          <About />
          <div className="div" style={{ margin: "0 9vw" }} />
          <Projects />
          <div className="div" style={{ margin: "0 9vw" }} />
          <Resume />
          <Contact />
        </main>
      </div>
    </>
  );
}
