"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent, WheelEvent as ReactWheelEvent } from "react";
import type { Figure } from "./types";

const MIN = 1;
const MAX = 8;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

type View = { scale: number; x: number; y: number };
const FIT: View = { scale: 1, x: 0, y: 0 };

function Icon({ d }: { d: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

const ICONS = {
  expand: "M14 4h6v6M20 4l-7 7M10 20H4v-6M4 20l7-7",
  plus: "M12 5v14M5 12h14",
  minus: "M5 12h14",
  fit: "M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5",
  close: "M6 6l12 12M18 6L6 18",
};

function Viewer({ figure, onClose }: { figure: Figure; onClose: () => void }) {
  const [view, setView] = useState<View>(FIT);
  const [moving, setMoving] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef<{ dist: number; view: View; mid: { x: number; y: number } } | null>(null);
  const drag = useRef<{ x: number; y: number; view: View } | null>(null);

  // Zoom toward a point given in stage coordinates relative to its center.
  const zoomAt = useCallback((next: number, px: number, py: number, from?: View) => {
    setView((current) => {
      const v = from ?? current;
      const scale = clamp(next, MIN, MAX);
      if (scale === MIN) return FIT;
      const k = scale / v.scale;
      return { scale, x: px - (px - v.x) * k, y: py - (py - v.y) * k };
    });
  }, []);

  const center = (clientX: number, clientY: number) => {
    const box = stage.current!.getBoundingClientRect();
    return { x: clientX - box.left - box.width / 2, y: clientY - box.top - box.height / 2 };
  };

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "+" || e.key === "=") setView((v) => ({ ...v, scale: clamp(v.scale * 1.5, MIN, MAX) }));
      if (e.key === "-") setView((v) => (v.scale / 1.5 <= MIN ? FIT : { ...v, scale: v.scale / 1.5 }));
      if (e.key === "0") setView(FIT);
      const step = 60;
      if (e.key === "ArrowLeft") setView((v) => ({ ...v, x: v.x + step }));
      if (e.key === "ArrowRight") setView((v) => ({ ...v, x: v.x - step }));
      if (e.key === "ArrowUp") setView((v) => ({ ...v, y: v.y + step }));
      if (e.key === "ArrowDown") setView((v) => ({ ...v, y: v.y - step }));
      if (e.key === "Tab" && dialog.current) {
        const items = Array.from(dialog.current.querySelectorAll<HTMLElement>("button"));
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const onWheel = (e: ReactWheelEvent) => {
    const p = center(e.clientX, e.clientY);
    zoomAt(view.scale * Math.exp(-e.deltaY * 0.0015), p.x, p.y);
  };

  const onPointerDown = (e: ReactPointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    setMoving(true);
    if (pointers.current.size === 2) {
      const [a, b] = Array.from(pointers.current.values());
      gesture.current = { dist: Math.hypot(a.x - b.x, a.y - b.y), view, mid: center((a.x + b.x) / 2, (a.y + b.y) / 2) };
      drag.current = null;
    } else {
      drag.current = { x: e.clientX, y: e.clientY, view };
    }
  };

  const onPointerMove = (e: ReactPointerEvent) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (gesture.current && pointers.current.size === 2) {
      const [a, b] = Array.from(pointers.current.values());
      const g = gesture.current;
      zoomAt(g.view.scale * (Math.hypot(a.x - b.x, a.y - b.y) / g.dist), g.mid.x, g.mid.y, g.view);
    } else if (drag.current && view.scale > 1) {
      const d = drag.current;
      setView({ ...d.view, x: d.view.x + e.clientX - d.x, y: d.view.y + e.clientY - d.y });
    }
  };

  const onPointerUp = (e: ReactPointerEvent) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) gesture.current = null;
    if (pointers.current.size === 0) {
      drag.current = null;
      setMoving(false);
    }
  };

  const onDoubleClick = (e: ReactMouseEvent) => {
    const p = center(e.clientX, e.clientY);
    if (view.scale > 1) setView(FIT);
    else zoomAt(3, p.x, p.y);
  };

  const button =
    "flex h-10 w-10 items-center justify-center rounded-full text-[#FAF9F6] transition hover:bg-[#FAF9F6]/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B5D65A]";

  return (
    <div
      ref={dialog}
      role="dialog"
      aria-modal="true"
      aria-label={figure.alt}
      className="fixed inset-0 z-[100] flex flex-col bg-[#1A0933]/95"
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3 text-[#FAF9F6] sm:px-6">
        <p className="min-w-0 truncate text-sm font-semibold">{figure.caption ?? figure.alt}</p>
        <div className="flex shrink-0 items-center gap-1">
          <button type="button" className={button} onClick={() => setView((v) => (v.scale / 1.5 <= MIN ? FIT : { ...v, scale: v.scale / 1.5 }))} aria-label="Zoom out">
            <Icon d={ICONS.minus} />
          </button>
          <span className="w-12 text-center text-sm tabular-nums" aria-live="polite">
            {Math.round(view.scale * 100)}%
          </span>
          <button type="button" className={button} onClick={() => setView((v) => ({ ...v, scale: clamp(v.scale * 1.5, MIN, MAX) }))} aria-label="Zoom in">
            <Icon d={ICONS.plus} />
          </button>
          <button type="button" className={button} onClick={() => setView(FIT)} aria-label="Fit to screen">
            <Icon d={ICONS.fit} />
          </button>
          <button type="button" ref={closeBtn} className={`${button} ml-2`} onClick={onClose} aria-label="Close">
            <Icon d={ICONS.close} />
          </button>
        </div>
      </div>

      <div
        ref={stage}
        className={`relative min-h-0 flex-1 touch-none overflow-hidden ${view.scale > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"}`}
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onDoubleClick={onDoubleClick}
        onClick={(e: ReactMouseEvent) => {
          if (e.target === e.currentTarget && view.scale === 1) onClose();
        }}
      >
        <div
          className="absolute inset-4 sm:inset-8"
          style={{
            transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})`,
            transition: moving ? "none" : "transform 150ms ease-out",
          }}
        >
          <Image
            src={figure.src}
            alt={figure.alt}
            fill
            unoptimized
            draggable={false}
            className="select-none object-contain"
            sizes="100vw"
          />
        </div>
      </div>

      <p className="px-4 pb-4 text-center text-xs text-[#FAF9F6]/60 sm:px-6">
        Scroll or pinch to zoom, drag to move, double-click to zoom in. Esc to close.
      </p>
    </div>
  );
}

export default function ZoomableImage({
  figure,
  sizes,
  framed,
  priority,
}: {
  figure: Figure;
  sizes: string;
  framed?: boolean;
  priority?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => {
    setOpen(false);
    trigger.current?.focus();
  }, []);

  return (
    <>
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Open larger: ${figure.alt}`}
        className={`group relative block w-full cursor-zoom-in overflow-hidden rounded-lg text-left ${
          figure.detail
            ? "transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_16px_36px_-16px_rgba(37,13,71,0.32)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            : ""
        } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8EB522] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF9F6] ${
          framed ? "border border-[#250D47]/10" : ""
        }`}
      >
        <Image
          src={figure.src}
          alt={figure.alt}
          width={figure.width}
          height={figure.height}
          sizes={sizes}
          priority={priority}
          unoptimized={figure.detail || figure.src.endsWith(".svg")}
          className="h-auto w-full"
        />
        {figure.detail && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#250D47]/80 text-[#FAF9F6] shadow-sm backdrop-blur-sm transition duration-500 ease-out sm:translate-y-1 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-visible:translate-y-0 sm:group-focus-visible:opacity-100"
          >
            <Icon d={ICONS.expand} />
          </span>
        )}
      </button>
      {open && <Viewer figure={figure} onClose={close} />}
    </>
  );
}
