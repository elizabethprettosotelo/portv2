"use client";

import { useRouter } from "next/navigation";
import { useRef, ReactNode } from "react";

interface TransitionLinkProps {
  href: string;
  className?: string;
  children: ReactNode;
}

export default function TransitionLink({ href, className, children }: TransitionLinkProps) {
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const overlay = overlayRef.current;
    if (!overlay) {
      router.push(href);
      return;
    }

    // Slide the overlay down over the page
    overlay.classList.remove("slide-off");
    overlay.classList.add("slide-down");

    // After the cover animation completes, navigate
    const onCoverDone = () => {
      overlay.removeEventListener("animationend", onCoverDone);
      router.push(href);
    };
    overlay.addEventListener("animationend", onCoverDone);
  };

  return (
    <>
      {/* Full-screen overlay */}
      <div ref={overlayRef} className="page-transition-overlay" aria-hidden="true" />

      <button onClick={handleClick} className={className}>
        {children}
      </button>
    </>
  );
}
