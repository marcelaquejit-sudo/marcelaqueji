import React from "react";

export default function AboutMeSection() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const animRef = React.useRef<number>(0);
  const runningRef = React.useRef<boolean>(false);
  const imgRef = React.useRef<HTMLImageElement | null>(null);

  const stateRef = React.useRef({
    points: [] as { x: number; y: number; tx: number; ty: number; r: number; d: number }[],
    bg: [] as { x: number; y: number; ax: number; ay: number; vx: number; vy: number; r: number }[],
    W: 0,
    H: 0,
    started: 0,
    mouse: { x: 0, y: 0 },
  });

  const [q, setQ] = React.useState(320);
  const [dot, setDot] = React.useState(2);
  const [thr, setThr] = React.useState(80);
  const [showInfo, setShowInfo] = React.useState(false);

  // imagem base
  const IMG_URL = "https://i.imgur.com/rzOHNIu.jpg";

  // DPR cap pra aliviar no mobile
  const getDPR = () => Math.min(1.75, typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1);

  // cria pontos do retrato
  const buildPoints = React.useCallback(() => {
    const s = stateRef.current;
    const canvas = canvasRef.current!;
    if (!imgRef.current || !canvas) return;

    const img = imgRef.current;
    const samples = q;
    const off = document.createElement("canvas");
    const ratio = img.height / img.width;
    const w = samples;
    const h = Math.round(samples * ratio);
    off.width = w;
    off.height = h;
    const octx = off.getContext("2d", { willReadFrequently: true })!;
    octx.drawImage(img, 0, 0, w, h);
    const data = octx.getImageData(0, 0, w, h).data;

    const pts: typeof s.points = [];
    const limiar = 255 - thr;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const k = (y * w + x) * 4;
        const R = data[k],
          G = data[k + 1],
          B = data[k + 2];
        const lum = 0.2126 * R + 0.7152 * G + 0.0722 * B;
        if (lum < limiar) {
          const nx = (x / (w - 1)) * 2 - 1;
          const ny = (y / (h - 1)) * 2 - 1;
          pts.push({
            x: (Math.random() * 2 - 1) * 1.8,
            y: (Math.random() * 2 - 1) * 1.8,
            tx: nx,
            ty: ny,
            r: (Math.random() * 0.6 + 0.4) * dot,
            d: Math.random() * 0.7,
          });
        }
      }
    }
    s.points = pts;
    s.started = performance.now() / 1000;
  }, [q, dot, thr]);

  // cria partículas de fundo (menos no mobile)
  const buildBackground = React.useCallback(() => {
    const s = stateRef.current;
    const isMobile = s.W < 640;
    const BG = isMobile ? 220 : s.W < 1024 ? 520 : 900;
    s.bg = [];
    for (let i = 0; i < BG; i++) {
      const r = Math.random() * 1.4 + 0.5;
      const x = (Math.random() * 2 - 1) * (s.W / 2);
      const y = (Math.random() * 2 - 1) * (s.H / 2);
      s.bg.push({ x, y, ax: x, ay: y, vx: 0, vy: 0, r });
    }
  }, []);

  React.useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
    const s = stateRef.current;

    // resize com DPR cap
    let resizeRAF = 0;
    const onResize = () => {
      cancelAnimationFrame(resizeRAF);
      resizeRAF = requestAnimationFrame(() => {
        const dpr = getDPR();
        const w = canvas.clientWidth * dpr;
        const h = canvas.clientHeight * dpr;
        s.W = canvas.width = Math.max(1, Math.floor(w));
        s.H = canvas.height = Math.max(1, Math.floor(h));
        buildBackground();
      });
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(canvas);
    onResize();

    // carrega imagem e constroi pontos
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      imgRef.current = img;
      buildPoints();
    };
    img.src = IMG_URL;

    // throttle pointer
    let pmRAF = 0;
    const onMove = (e: PointerEvent) => {
      if (pmRAF) return;
      pmRAF = requestAnimationFrame(() => {
        const rect = canvas.getBoundingClientRect();
        s.mouse.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        s.mouse.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        pmRAF = 0;
      });
    };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerdown", onMove);

    // prefer-reduced-motion → render estático
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const tick = () => {
      if (!runningRef.current) return;
      animRef.current = requestAnimationFrame(tick);

      const dpr = getDPR();
      const t = performance.now() / 1000;
      ctx.clearRect(0, 0, s.W, s.H);
      if (!s.points.length) return;

      // fundo
      ctx.save();
      ctx.translate(s.W / 2, s.H / 2);
      ctx.fillStyle = "rgba(205,210,215,0.85)";
      const mx = s.mouse.x * (s.W / 2);
      const my = s.mouse.y * (s.H / 2);
      for (const p of s.bg) {
        const dx = mx - p.x,
          dy = my - p.y;
        const d2 = dx * dx + dy * dy;
        const f = 0.08 * Math.exp(-d2 / (2 * 180 * 180));
        p.vx += dx * f + (p.ax - p.x) * 0.01;
        p.vy += dy * f + (p.ay - p.y) * 0.01;
        p.vx *= 0.94;
        p.vy *= 0.94;
        p.x += p.vx;
        p.y += p.vy;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * dpr, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // retrato
      const scale = Math.min(s.W, s.H) * 0.48;
      ctx.save();
      ctx.translate(s.W / 2, s.H / 2);
      ctx.fillStyle = "#c7ccd1";
      const prog = prefersReduced ? 1 : Math.min(1, (t - s.started) / 2.2);
      const ease = 1 - Math.pow(1 - prog, 3);
      for (const p of s.points) {
        p.x += (p.tx - p.x) * (0.08 + p.d * 0.06) * ease;
        p.y += (p.ty - p.y) * (0.08 + p.d * 0.06) * ease;
        const px = (p.x + s.mouse.x * 0.02) * scale;
        const py = (p.y + s.mouse.y * 0.018) * scale;
        ctx.beginPath();
        ctx.arc(px, py, p.r * dpr, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    // pausa quando a seção sai da tela
    const io = new IntersectionObserver(
      (entries) => {
        const inView = entries[0]?.isIntersecting;
        if (inView && !runningRef.current) {
          runningRef.current = true;
          cancelAnimationFrame(animRef.current);
          animRef.current = requestAnimationFrame(tick);
        } else if (!inView && runningRef.current) {
          runningRef.current = false;
          cancelAnimationFrame(animRef.current);
        }
      },
      { threshold: 0.1 }
    );
    io.observe(canvas);

    // start se já estiver em view
    runningRef.current = true;
    animRef.current = requestAnimationFrame(tick);

    return () => {
      runningRef.current = false;
      cancelAnimationFrame(animRef.current);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", onMove);
      ro.disconnect();
      io.disconnect();
    };
  }, [buildPoints, buildBackground]);

  React.useEffect(() => {
    buildPoints();
  }, [buildPoints]);

  const replay = () => {
    const s = stateRef.current;
    for (const p of s.points) {
      p.x = (Math.random() * 2 - 1) * 1.8;
      p.y = (Math.random() * 2 - 1) * 1.8;
    }
    s.started = performance.now() / 1000;
  };

  return (
    <section
      id="sobre"
      className="relative w-full min-h-[80vh] overflow-hidden bg-white flex items-center justify-center scroll-mt-24"
      onMouseEnter={() => setShowInfo(true)}
      onMouseLeave={() => setShowInfo(false)}
      onTouchStart={() => setShowInfo((v) => !v)}
    >
      {/* Canvas */}
      <canvas ref={canvasRef} aria-hidden className="absolute inset-0 w-full h-full touch-none" />

      {/* Fades para integrar bordas */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent z-[5]" />
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 sm:w-28 bg-gradient-to-r from-white to-transparent z-[5]" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 sm:w-28 bg-gradient-to-l from-white to-transparent z-[5]" />

      {/* Controles — só no desktop */}
      <div className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-2xl bg-white/90 text-gray-800 shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-4 backdrop-blur flex-col gap-3 w-[240px]">
        <div className="font-semibold text-xs">Foto → Partículas 2D</div>
        <label className="opacity-80 text-xs">Resolução</label>
        <input className="accent-gray-700" type="range" min={80} max={520} value={q} onChange={(e) => setQ(parseInt(e.target.value))} />
        <label className="opacity-80 text-xs">Espessura</label>
        <input className="accent-gray-700" type="range" min={1} max={5} value={dot} onChange={(e) => setDot(parseInt(e.target.value))} />
        <label className="opacity-80 text-xs">Contraste</label>
        <input className="accent-gray-700" type="range" min={0} max={220} value={thr} onChange={(e) => setThr(parseInt(e.target.value))} />
        <button onClick={replay} className="mt-1 inline-flex items-center rounded-lg bg-gray-900 text-white px-3 py-1.5 text-sm font-semibold">
          Repetir animação
        </button>
      </div>

      {/* Botão mobile para abrir/fechar o texto */}
      <div className="fixed right-4 bottom-4 z-20 md:hidden">
        <button
          onClick={() => setShowInfo((v) => !v)}
          className="rounded-full bg-white/90 backdrop-blur px-4 py-2 text-sm font-semibold text-gray-800 shadow-[0_10px_25px_rgba(0,0,0,0.08)] border border-white/60"
        >
          {showInfo ? "Fechar" : "Mostrar texto"}
        </button>
      </div>

      {/* Card de texto */}
      <div
        className={`absolute right-3 sm:right-6 md:right-10 top-1/2 -translate-y-1/2 z-10 w-[min(92vw,520px)] rounded-3xl border border-white/60 bg-white/85 backdrop-blur-xl shadow-[0_30px_120px_rgba(0,0,0,0.10)] p-5 sm:p-7 md:p-10 transition-all duration-500 ${
          showInfo ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6 pointer-events-none"
        }`}
      >
        <h2 className="silver-kinetic text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-3 sm:mb-4">SOBRE MIM</h2>
        <p className="text-gray-700 leading-relaxed text-[15px] sm:text-base">
          <strong>Muito prazer, eu sou a Marcela Queji!</strong>
          <br />
          Tenho 25 anos e desde 2020 aprendo e atuo nesse ramo. Comecei com marketing e design e, com o tempo, aprofundei processos e tecnologia.
          Depois de dezenas de certificados e atendimentos, aprendi que a melhor entrega é a que <em>funciona com eficiência</em> — simples, bonita e resolutiva.
        </p>
        <p className="mt-3 text-gray-700 leading-relaxed text-[15px] sm:text-base">
          Hoje, consigo oferecer soluções completas para a sua empresa.
          <br />
          <strong>Você me diz o que precisa, o resto é comigo.</strong>
        </p>
      </div>
    </section>
  );
}