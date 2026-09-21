"use client";

import { useEffect, useRef, useState } from "react";

const rooms = [
  {
    n: "01",
    name: "Entrada e recepção",
    x: -185,
    z: 92,
    w: 120,
    d: 90,
    h: 34,
    c: "#c5bda9",
    text: "O primeiro limite entre a cidade e a instituição. A entrada simboliza a passagem para um espaço em que a autonomia do paciente podia ser profundamente reduzida.",
  },
  {
    n: "02",
    name: "Administração",
    x: -58,
    z: 92,
    w: 112,
    d: 90,
    h: 42,
    c: "#a9a18e",
    text: "A gestão de uma instituição de saúde também responde pelas condições de atendimento, pela supervisão da equipe e pela proteção das pessoas internadas.",
  },
  {
    n: "03",
    name: "Enfermaria",
    x: 74,
    z: 92,
    w: 135,
    d: 90,
    h: 38,
    c: "#b8ae99",
    text: "A assistência deveria proteger a saúde e a integridade dos pacientes. No caso, o Estado foi responsabilizado por falhas graves no cuidado e na fiscalização.",
  },
  {
    n: "04",
    name: "Dormitório coletivo",
    x: 165,
    z: -12,
    w: 118,
    d: 105,
    h: 30,
    c: "#8e8777",
    text: "O dormitório coletivo representa a perda de privacidade e de individualidade associada ao modelo asilar e à institucionalização prolongada.",
  },
  {
    n: "05",
    name: "Pátio interno",
    x: -6,
    z: -13,
    w: 165,
    d: 110,
    h: 6,
    c: "#777365",
    text: "Mesmo áreas abertas podiam permanecer submetidas à vigilância e ao controle. O pátio ocupa o centro da maquete como contraste entre convivência e confinamento.",
  },
  {
    n: "06",
    name: "Área de isolamento",
    x: -169,
    z: -24,
    w: 104,
    d: 128,
    h: 49,
    c: "#665f53",
    text: "O isolamento é apresentado como símbolo das práticas de contenção e exclusão denunciadas no contexto manicomial. Não indica a localização real de um cômodo específico.",
  },
];

type Room = (typeof rooms)[number] & {
  hit?: { x: number; y: number };
};

const getInitialMapScale = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(max-width: 760px)").matches
    ? 0.72
    : 1.12;

export default function InstitutionMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selected, setSelected] = useState(0);
  const [angle, setAngle] = useState(-0.68);
  const [scale, setScale] = useState(getInitialMapScale);
  const [autoRotate, setAutoRotate] = useState(false);
  const angleRef = useRef(angle);
  const scaleRef = useRef(scale);
  const selectedRef = useRef(selected);
  const autoRotateRef = useRef(autoRotate);
  const drawRef = useRef<() => void>(() => {});

  scaleRef.current = scale;
  selectedRef.current = selected;
  autoRotateRef.current = autoRotate;

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (canvasElement === null) return;
    const drawingContext = canvasElement.getContext("2d");
    if (drawingContext === null) return;
    const canvas = canvasElement;
    const context = drawingContext;

    let frame = 0;
    let deviceScale = 1;
    let dragging = false;
    let lastX = 0;
    const roomData = rooms as Room[];

    const resize = () => {
      deviceScale = Math.min(window.devicePixelRatio || 1, 2);
      const box = canvas.getBoundingClientRect();
      canvas.width = box.width * deviceScale;
      canvas.height = box.height * deviceScale;
      context.setTransform(deviceScale, 0, 0, deviceScale, 0, 0);
      draw();
    };

    const iso = (x: number, y: number, z: number) => {
      const cosine = Math.cos(angleRef.current);
      const sine = Math.sin(angleRef.current);
      const rotatedX = x * cosine - z * sine;
      const rotatedZ = x * sine + z * cosine;
      return {
        x: canvas.clientWidth / 2 + rotatedX * scaleRef.current,
        y:
          canvas.clientHeight * 0.47 + (rotatedZ * 0.48 - y) * scaleRef.current,
      };
    };

    const shade = (hex: string, factor: number) => {
      const value = parseInt(hex.slice(1), 16);
      const red = Math.min(255, Math.max(0, (value >> 16) * factor));
      const green = Math.min(255, Math.max(0, ((value >> 8) & 255) * factor));
      const blue = Math.min(255, Math.max(0, (value & 255) * factor));
      return `rgb(${red | 0},${green | 0},${blue | 0})`;
    };

    const polygon = (
      points: { x: number; y: number }[],
      fill: string,
      stroke = "#2a271f",
    ) => {
      context.beginPath();
      points.forEach((point, index) => {
        if (index) context.lineTo(point.x, point.y);
        else context.moveTo(point.x, point.y);
      });
      context.closePath();
      context.fillStyle = fill;
      context.fill();
      context.strokeStyle = stroke;
      context.lineWidth = 1;
      context.stroke();
    };

    const paintOrder = () => {
      // direção horizontal em que a câmera "está" (onde rotatedZ aumenta)
      const ux = Math.sin(angleRef.current);
      const uz = Math.cos(angleRef.current);

      // intervalo de t > 0 em que A, deslocado por t*u, sobrepõe B num eixo
      const range = (
        a0: number,
        a1: number,
        b0: number,
        b1: number,
        u: number,
      ): [number, number] => {
        if (Math.abs(u) < 1e-9)
          return a0 < b1 && b0 < a1 ? [0, Infinity] : [1, 0];
        const lo = (b0 - a1) / u;
        const hi = (b1 - a0) / u;
        return lo < hi ? [lo, hi] : [hi, lo];
      };

      // true se A fica atrás de B (A deve ser desenhado antes)
      const isBehind = (a: Room, b: Room) => {
        const [xLo, xHi] = range(
          a.x - a.w / 2,
          a.x + a.w / 2,
          b.x - b.w / 2,
          b.x + b.w / 2,
          ux,
        );
        const [zLo, zHi] = range(
          a.z - a.d / 2,
          a.z + a.d / 2,
          b.z - b.d / 2,
          b.z + b.d / 2,
          uz,
        );
        return Math.max(xLo, zLo, 0) < Math.min(xHi, zHi);
      };

      const sorted: Room[] = [];
      const visited = new Set<Room>();
      const visit = (room: Room) => {
        if (visited.has(room)) return;
        visited.add(room);
        roomData.forEach((other) => {
          if (other !== room && isBehind(other, room)) visit(other);
        });
        sorted.push(room);
      };
      roomData.forEach(visit);
      return sorted;
    };

    const drawRoom = (room: Room, index: number) => {
      const { x, z, w, d, h } = room;

      const A = iso(x - w / 2, 0, z - d / 2);
      const B = iso(x + w / 2, 0, z - d / 2);
      const C = iso(x + w / 2, 0, z + d / 2);
      const D = iso(x - w / 2, 0, z + d / 2);

      const At = iso(x - w / 2, h, z - d / 2);
      const Bt = iso(x + w / 2, h, z - d / 2);
      const Ct = iso(x + w / 2, h, z + d / 2);
      const Dt = iso(x - w / 2, h, z + d / 2);

      polygon([D, C, Ct, Dt], shade(room.c, 0.68));
      polygon([B, C, Ct, Bt], shade(room.c, 0.8));

      polygon(
        [At, Bt, Ct, Dt],
        index === selectedRef.current ? "#a33a30" : room.c,
        index === selectedRef.current ? "#f0dfc4" : "#28251f",
      );

      const marker = iso(x, h + 13, z);
      room.hit = marker;
    };

    function draw() {
      context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      const gradient = context.createRadialGradient(
        canvas.clientWidth * 0.5,
        canvas.clientHeight * 0.46,
        30,
        canvas.clientWidth * 0.5,
        canvas.clientHeight * 0.46,
        canvas.clientWidth * 0.7,
      );
      gradient.addColorStop(0, "#d8cfbc");
      gradient.addColorStop(1, "#8f8674");
      context.fillStyle = gradient;
      context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

      polygon(
        [
          iso(-270, -2, -160),
          iso(270, -2, -160),
          iso(270, -2, 170),
          iso(-270, -2, 170),
        ],
        "#aaa18e",
        "#5e574b",
      );
      paintOrder().forEach((room) => drawRoom(room, roomData.indexOf(room)));

      context.strokeStyle = "#776f5f";
      context.setLineDash([4, 7]);
      context.beginPath();

      for (let index = -240; index <= 240; index += 40) {
        const start = iso(index, 0, -150);
        const end = iso(index, 0, 160);

        context.moveTo(start.x, start.y);
        context.lineTo(end.x, end.y);
      }

      context.stroke();
      context.setLineDash([]);

      roomData.forEach((room, index) => {
        if (!room.hit) return;

        const marker = room.hit;

        context.beginPath();
        context.arc(marker.x, marker.y, 14, 0, Math.PI * 2);

        context.fillStyle =
          index === selectedRef.current ? "#171511" : "#eee7d7";

        context.fill();

        context.strokeStyle = "#171511";
        context.lineWidth = 1;
        context.stroke();

        context.fillStyle =
          index === selectedRef.current ? "#f3ead8" : "#171511";

        context.font = "700 10px Libre Franklin, sans-serif";
        context.textAlign = "center";
        context.textBaseline = "middle";

        context.fillText(room.n, marker.x, marker.y + 0.5);
      });
    }

    drawRef.current = draw;

    const pointerDown = (event: PointerEvent) => {
      dragging = true;
      lastX = event.clientX;
      canvas.setPointerCapture(event.pointerId);
    };

    const pointerMove = (event: PointerEvent) => {
      if (!dragging) return;
      angleRef.current += (event.clientX - lastX) * 0.008;
      lastX = event.clientX;
      draw();
    };

    const pointerUp = (event: PointerEvent) => {
      if (Math.abs(event.clientX - lastX) < 4) {
        let closest = -1;
        let distance = 28;
        roomData.forEach((room, index) => {
          if (!room.hit) return;
          const currentDistance = Math.hypot(
            event.offsetX - room.hit.x,
            event.offsetY - room.hit.y,
          );
          if (currentDistance < distance) {
            distance = currentDistance;
            closest = index;
          }
        });
        if (closest >= 0) setSelected(closest);
      }
      dragging = false;
      draw();
    };

    const wheel = (event: WheelEvent) => {
      event.preventDefault();
      setScale((current) =>
        Math.max(0.65, Math.min(1.8, current - event.deltaY * 0.001)),
      );
    };

    canvas.addEventListener("pointerdown", pointerDown);
    canvas.addEventListener("pointermove", pointerMove);
    canvas.addEventListener("pointerup", pointerUp);
    canvas.addEventListener("wheel", wheel, { passive: false });
    window.addEventListener("resize", resize);
    resize();

    const animate = () => {
      if (autoRotateRef.current && !dragging) {
        angleRef.current += 0.0025;
        draw();
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointerdown", pointerDown);
      canvas.removeEventListener("pointermove", pointerMove);
      canvas.removeEventListener("pointerup", pointerUp);
      canvas.removeEventListener("wheel", wheel);
    };
  }, []);

  useEffect(() => {
    drawRef.current();
  }, [angle, scale, selected]);

  const selectedRoom = rooms[selected];

  return (
    <section
      className="institution-map section-block"
      aria-labelledby="map-title"
    >
      <div className="map-intro">
        <div>
          <p className="eyebrow">RECONSTITUIÇÃO ESPACIAL · ARQUIVO EDUCATIVO</p>
          <h2 id="map-title">Uma instituição vista por dentro</h2>
        </div>
        <p>
          Uma leitura espacial ajuda a compreender como o isolamento, a
          vigilância e a perda de autonomia podiam fazer parte da própria
          organização institucional.
        </p>
      </div>
      <p className="map-disclaimer">
        <strong>Nota de rigor histórico:</strong> esta é uma representação
        artística e educativa baseada no contexto documental disponível. Não foi
        localizada uma planta arquitetônica original da instituição; a
        disposição dos ambientes não deve ser interpretada como reprodução
        exata.
      </p>
      <div className="map-viewer">
        <canvas
          ref={canvasRef}
          aria-label="Maquete tridimensional interativa da instituição"
        />
        <div className="map-toolbar">
          <button
            type="button"
            onClick={() => {
              setAngle(-0.68);
              setScale(getInitialMapScale());
              setSelected(0);
            }}
          >
            Recentrar
          </button>
          <button
            type="button"
            onClick={() => setAutoRotate((current) => !current)}
          >
            {autoRotate ? "Parar giro" : "Giro automático"}
          </button>
        </div>
        <div className="map-hint">
          Arraste para girar · role para aproximar · selecione os números
        </div>
        <aside className="map-caption" aria-live="polite">
          <span className="map-number">{selectedRoom.n}</span>
          <h3>{selectedRoom.name}</h3>
          <p>{selectedRoom.text}</p>
        </aside>
      </div>
      <nav className="map-legend" aria-label="Ambientes da reconstituição">
        {rooms.map((room, index) => (
          <button
            type="button"
            className={index === selected ? "active" : ""}
            key={room.n}
            onClick={() => setSelected(index)}
          >
            <strong>{room.n}</strong>
            <span>{room.name}</span>
          </button>
        ))}
      </nav>
    </section>
  );
}
