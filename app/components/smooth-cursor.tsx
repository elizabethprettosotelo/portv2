"use client";

import { motion, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Position = {
  x: number;
  y: number;
};

function CursorMark() {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="54"
      viewBox="0 0 50 54"
      fill="none"
      style={{ scale: 0.5 }}
    >
      <path
        d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z"
        fill="#250D47"
        stroke="#9AB1EB"
        strokeWidth="2.25825"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SmoothCursor() {
  const [isEnabled, setIsEnabled] = useState(false);
  const lastMousePos = useRef<Position>({ x: 0, y: 0 });
  const velocity = useRef<Position>({ x: 0, y: 0 });
  const lastUpdateTime = useRef(0);
  const previousAngle = useRef(0);
  const accumulatedRotation = useRef(0);

  const cursorX = useSpring(0, { damping: 45, stiffness: 400, mass: 1, restDelta: 0.001 });
  const cursorY = useSpring(0, { damping: 45, stiffness: 400, mass: 1, restDelta: 0.001 });
  const rotation = useSpring(0, { damping: 60, stiffness: 300, mass: 1, restDelta: 0.001 });
  const scale = useSpring(1, { damping: 35, stiffness: 500, mass: 1, restDelta: 0.001 });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    const frameId = window.requestAnimationFrame(() => setIsEnabled(mediaQuery.matches));

    const handleMediaChange = (event: MediaQueryListEvent) => setIsEnabled(event.matches);
    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      window.cancelAnimationFrame(frameId);
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    let rafId = 0;
    let resetTimer = 0;
    lastUpdateTime.current = Date.now();

    const smoothMouseMove = (event: MouseEvent) => {
      const currentPos = { x: event.clientX, y: event.clientY };
      const currentTime = Date.now();
      const deltaTime = currentTime - lastUpdateTime.current;

      if (deltaTime > 0) {
        velocity.current = {
          x: (currentPos.x - lastMousePos.current.x) / deltaTime,
          y: (currentPos.y - lastMousePos.current.y) / deltaTime,
        };
      }

      lastUpdateTime.current = currentTime;
      lastMousePos.current = currentPos;
      cursorX.set(currentPos.x);
      cursorY.set(currentPos.y);

      const speed = Math.hypot(velocity.current.x, velocity.current.y);
      if (speed > 0.1) {
        const currentAngle = Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI) + 90;
        let angleDiff = currentAngle - previousAngle.current;
        if (angleDiff > 180) angleDiff -= 360;
        if (angleDiff < -180) angleDiff += 360;
        accumulatedRotation.current += angleDiff;
        rotation.set(accumulatedRotation.current);
        previousAngle.current = currentAngle;

        scale.set(0.95);
        window.clearTimeout(resetTimer);
        resetTimer = window.setTimeout(() => scale.set(1), 150);
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        smoothMouseMove(event);
        rafId = 0;
      });
    };

    document.documentElement.classList.add("custom-cursor-active");
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.classList.remove("custom-cursor-active");
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(resetTimer);
    };
  }, [cursorX, cursorY, isEnabled, rotation, scale]);

  if (!isEnabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "fixed",
        left: cursorX,
        top: cursorY,
        translateX: "-50%",
        translateY: "-50%",
        rotate: rotation,
        scale,
        zIndex: 10000,
        pointerEvents: "none",
        willChange: "transform",
      }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <CursorMark />
    </motion.div>
  );
}
