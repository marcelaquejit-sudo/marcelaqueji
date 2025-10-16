import React from "react";

export default function AboutMeSection() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const animRef = React.useRef(0);
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
  const [showInfo, setShowInfo] = React.useState(false); // desktop: hover para mostrar o card

  const IMG_URL = "https://i.imgur.com/rzOHNIu.jpg";

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
    off.width = w; off.height = h;
    const octx = off.getContext("2d", { willReadFrequently: true })!;
    octx.drawImage(img, 0, 0, w, h);
    const data = octx.getImageData(0, 0, w, h).data;
    const pts: typeof s.points = [];
    const limiar = 255 - thr;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const k = (y * w + x) * 4;
        const R = data[k], G = data[k + 1], B = data[k + 2];
        const lum = 0.2126 * R + 0.7152 * G + 0.0722 * B;
        if (lum < limiar) {
          const nx = (x / (w - 1)) * 2 - 1;
          const ny = (y / (h - 1)) * 2 - 1;
          pts.push({
            x: (Math.random() * 2 - 1) * 1.8,
            y: (Math.random() * 2 - 1) * 1.8,
            tx: nx, ty: ny,
            r: (Math.random() * 0.6 + 0.4) * dot,
            d: Math.random() * 0.7,
          });
        }
      }
    }
    s.points = pts;
    s.started = performance.now() / 1000;
  }, [q, dot, thr]);

  const buildBackground = React.useCallback(() => {
    const s = stateRef.current;
    const BG = s.W < 640 ? 300 : s.W < 1024 ? 600 : 900;
    s.bg = [];
    for (let i = 0; i < BG; i++) {
      const r = Math.random() * 1.6 + 0.6;
      const x = (Math.random() * 2 - 1) * (s.W / 2);
      const y = (Math.random() * 2 - 1) * (s.H / 2);
      s.bg.push({ x, y, ax: x, ay: y, vx: 0, vy: 0, r });
    }
  }, []);

  React.useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
    const s = stateRef.current;

    function resize() {
      s.W = (canvas.width = canvas.clientWidth * devicePixelRatio);
      s.H = (canvas.height = canvas.clientHeight * devicePixelRatio);
      buildBackground();
    }
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      imgRef.current = img;
      buildPoints();
    };
    img.src = IMG_URL;

    function tick() {
      cancelAnimationFrame(animRef.current);
      animRef.current = requestAnimationFrame(tick);
      const t = performance.now() / 1000;
      ctx.clearRect(0, 0, s.W, s.H);
      if (!s.points.length) return;

      // fundo
      ctx.save();
      ctx.translate(s.W / 2, s.H / 2);
      ctx.fillStyle = "rgba(205,210,215,0.9)";
      const mx = s.mouse.x * (s.W / 2), my = s.mouse.y * (s.H / 2);
      for (const p of s.bg) {
        const dx = mx - p.x, dy = my - p.y;
        const d2 = dx * dx + dy * dy;
        const f = 0.08 * Math.exp(-d2 / (2 * 180 * 180));
        p.vx += dx * f + (p.ax - p.x) * 0.01;
        p.vy += dy * f + (p.ay - p.y) * 0.01;
        p.vx *= 0.94; p.vy *= 0.94;
        p.x += p.vx; p.y += p.vy;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * devicePixelRatio, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // retrato
      const scale = Math.min(s.W, s.H) * 0.48;
      ctx.save();
      ctx.translate(s.W / 2, s.H / 2);
      ctx.fillStyle = "#c7ccd1";
      const prog = Math.min(1, (t - s.started) / 2.2);
      const ease = 1 - Math.pow(1 - prog, 3);
      for (const p of s.points) {
        p.x += (p.tx - p.x) * (0.08 + p.d * 0.06) * ease;
        p.y += (p.ty - p.y) * (0.08 + p.d * 0.06) * ease;
        const px = (p.x + s.mouse.x * 0.02) * scale;
        const py = (p.y + s.mouse.y * 0.018) * scale;
        ctx.beginPath();
        ctx.arc(px, py, p.r * devicePixelRatio, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    function onMove(e: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      const s = stateRef.current;
      s.mouse.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      s.mouse.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    }
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerdown", onMove);

    tick();
    return () => {
      cancelAnimationFrame(animRef.current);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", onMove);
      ro.disconnect();
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
      className="relative w-full min-h-[80vh] overflow-hidden flex items-center justify-center scroll-mt-24"
      onMouseEnter={() => setShowInfo(true)}
      onMouseLeave={() => setShowInfo(false)}
    >
      {/* Canvas global (desktop e mobile) */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full touch-none" />

      {/* ===== MOBILE LAYOUT ===== */}
      {/* janela da animação (topo) com fade no fim */}
      <div className="md:hidden relative w-full h-[60vh]">
        {/* Fade no final da animação (mobile) */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24
                     bg-gradient-to-b from-transparent to-white"
          aria-hidden="true"
        />
      </div>

      {/* barra de regulagem compacta — abaixo da animação */}
      <div
        className="md:hidden relative z-10 mx-auto mt-3 w-[min(92%,720px)]
                   rounded-2xl border border-gray-200 bg-white/80 backdrop-blur
                   shadow-[0_6px_24px_rgba(0,0,0,0.08)] px-2 py-2
                   flex items-center gap-2"
      >
        <input
          type="range"
          min={80}
          max={520}
          value={q}
          onChange={(e) => setQ(parseInt(e.target.value))}
          className="w-24 h-2 accent-gray-700"
          aria-label="Resolução"
          title="Resolução"
        />
        <input
          type="range"
          min={1}
          max={5}
          value={dot}
          onChange={(e) => setDot(parseInt(e.target.value))}
          className="w-24 h-2 accent-gray-700"
          aria-label="Espessura"
          title="Espessura"
        />
        <input
          type="range"
          min={0}
          max={220}
          value={thr}
          onChange={(e) => setThr(parseInt(e.target.value))}
          className="w-24 h-2 accent-gray-700"
          aria-label="Contraste"
          title="Contraste"
        />
        <button
          onClick={replay}
          className="h-8 px-3 rounded-lg text-[12px] font-semibold bg-gray-900 text-white hover:opacity-90 transition shrink-0"
        >
          Repetir
        </button>
      </div>

      {/* card "sobre mim" — abaixo da animação, com leve sobreposição */}
      <div
        className="md:hidden relative z-10 w-[min(92%,720px)] mx-auto
                   -mt-6 rounded-3xl border border-white/60 bg-white/90 backdrop-blur-xl
                   shadow-[0_30px_120px_rgba(0,0,0,0.10)] p-5"
      >
        <h2 className="silver-kinetic text-2xl font-extrabold tracking-tight mb-3">
          SOBRE MIM
        </h2>
        <p className="text-gray-700 leading-relaxed text-[15px]">
          <strong>Muito prazer, eu sou a Marcela Queji!</strong><br />
          Tenho 25 anos e desde 2020 aprendo e atuo nesse ramo. Comecei com marketing e design e, com o tempo,
          aprofundei processos e tecnologia. Depois de dezenas de certificados e atendimentos, aprendi que a melhor entrega
          é a que <em>funciona com eficiência</em> — planejada, sofisticada e resolutiva.
        </p>
        <p className="mt-3 text-gray-700 leading-relaxed text-[15px]">
          Hoje, consigo oferecer soluções completas para a sua empresa.<br />
          <strong>Você me diz o que precisa, o resto é comigo.</strong>
        </p>
      </div>

      {/* ===== DESKTOP LAYOUT (preservado) ===== */}
      {/* Fade global no rodapé (também atua no desktop) */}
      <div
        className="hidden md:block pointer-events-none absolute inset-x-0 bottom-0 h-28
                   bg-gradient-to-b from-transparent to-white"
        aria-hidden="true"
      />

      {/* Controles laterais — desktop */}
      <div className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-2xl bg-white/90 text-gray-800 shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-4 backdrop-blur flex-col gap-3 w-[220px]">
        <div className="font-semibold text-[12px]">Foto → Partículas 2D</div>
        <label className="text-[12px] opacity-80">Resolução</label>
        <input className="accent-gray-700" type="range" min={80} max={520} value={q} onChange={(e) => setQ(parseInt(e.target.value))} />
        <label className="text-[12px] opacity-80">Espessura</label>
        <input className="accent-gray-700" type="range" min={1} max={5} value={dot} onChange={(e) => setDot(parseInt(e.target.value))} />
        <label className="text-[12px] opacity-80">Contraste</label>
        <input className="accent-gray-700" type="range" min={0} max={220} value={thr} onChange={(e) => setThr(parseInt(e.target.value))} />
        <button onClick={replay} className="mt-1 h-11 rounded-xl font-semibold bg-gray-900 text-white hover:opacity-90 transition">
          Repetir animação
        </button>
      </div>

      {/* Card “Sobre mim” — desktop, aparece no hover da seção */}
      <div
        className={[
          "hidden md:block absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-10",
          "w-[min(36vw,520px)] rounded-3xl border border-white/60 bg-white/85 backdrop-blur-xl",
          "shadow-[0_30px_120px_rgba(0,0,0,0.10)] p-10 transition-all duration-300",
          showInfo ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none",
        ].join(" ")}
      >
        <h2 className="silver-kinetic text-4xl font-extrabold tracking-tight mb-4">SOBRE MIM</h2>
        <p className="text-gray-700 leading-relaxed">
          <strong>Muito prazer, eu sou a Marcela Queji!</strong><br />
          Tenho 25 anos e desde 2020 aprendo e atuo nesse ramo. Comecei com marketing e design e, com o tempo,
          aprofundei processos e tecnologia. Depois de dezenas de certificados e atendimentos, aprendi que a melhor entrega
          é a que <em>funciona com eficiência</em> — planejada, sofisticada e resolutiva.
        </p>
        <p className="mt-3 text-gray-700 leading-relaxed">
          Hoje, consigo oferecer soluções completas para a sua empresa.<br />
          <strong>Você me diz o que precisa, o resto é comigo.</strong>
        </p>
      </div>
    </section>
  );
}
