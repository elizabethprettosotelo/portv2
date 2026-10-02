"use client";

import { motion } from "motion/react";
import { useRef, useState, type RefObject } from "react";

const PAPER_ROTATIONS = [-9, 0, 9];
const DRAG_CLICK_THRESHOLD = 6;

export default function Folder({
  title,
  count,
  badgeCount,
  isOpen,
  onClick,
  dragConstraintsRef,
  initialPosition,
}: {
  title: string;
  count: number;
  badgeCount?: number;
  isOpen: boolean;
  onClick: () => void;
  dragConstraintsRef: RefObject<HTMLDivElement | null>;
  initialPosition: { left: string; top: string };
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const wasDragged = useRef(false);

  return (
    <motion.button
      type="button"
      drag
      dragConstraints={dragConstraintsRef}
      dragElastic={0.12}
      dragMomentum={false}
      onPointerDown={() => {
        wasDragged.current = false;
      }}
      onDragStart={() => setIsDragging(true)}
      onDrag={(_, info) => {
        if (Math.abs(info.offset.x) > DRAG_CLICK_THRESHOLD || Math.abs(info.offset.y) > DRAG_CLICK_THRESHOLD) {
          wasDragged.current = true;
        }
      }}
      onDragEnd={() => setIsDragging(false)}
      onClick={() => {
        if (wasDragged.current) return;
        onClick();
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      aria-expanded={isOpen}
      className="group absolute flex flex-col items-center gap-3 bg-transparent focus:outline-none active:cursor-grabbing"
      style={{
        left: initialPosition.left,
        top: initialPosition.top,
        perspective: "800px",
        touchAction: "none",
        zIndex: isDragging ? 50 : 10,
      }}
      whileTap={{ scale: 0.97 }}
    >
      <div className="relative h-28 w-36 sm:h-32 sm:w-40">
        {/* folder back + tab */}
        <div className="absolute inset-x-0 bottom-0 h-[85%] rounded-b-xl rounded-tr-xl bg-[#9AB1EB]" style={{ zIndex: 1 }}>
          <div className="absolute -top-2.5 left-0 h-3 w-14 rounded-t-lg bg-[#9AB1EB] sm:w-16" />
        </div>

        {/* papers, sitting on the back panel but tucked behind the front flap */}
        {PAPER_ROTATIONS.slice(0, count).map((rotation, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 bottom-3 h-20 w-16 -translate-x-1/2 rounded-md border border-[#250D47]/15 bg-[#F9FAF3] shadow-sm sm:h-24 sm:w-18"
            style={{ originY: 1, zIndex: 2 }}
            animate={
              isOpen
                ? { y: -46, scaleY: 1, rotate: rotation, opacity: 1 }
                : isHovered
                  ? { y: 0, scaleY: 0.9, rotate: rotation, opacity: 1 }
                  : { y: 0, scaleY: 0.5, rotate: rotation * 0.3, opacity: 1 }
            }
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          />
        ))}

        {/* folder front flap, flips open on click */}
        <motion.div
          className="absolute inset-x-0 bottom-0 h-[62%] rounded-b-xl rounded-tr-2xl bg-[#B9CBF3] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]"
          style={{ zIndex: 3, transformOrigin: "bottom center", transformStyle: "preserve-3d" }}
          animate={isOpen ? { rotateX: -75 } : { rotateX: 0 }}
          whileHover={isOpen ? undefined : { y: -2 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
        />
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm font-bold text-[#250D47] font-formadjr">{title}</span>
        <span className="rounded-full bg-[#250D47]/8 px-2 py-0.5 text-[10px] font-bold text-[#250D47]/60 font-inter">
          {badgeCount ?? count}
        </span>
      </div>
    </motion.button>
  );
}
