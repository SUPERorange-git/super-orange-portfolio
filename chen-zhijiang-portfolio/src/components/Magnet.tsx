import {
  motion,
  useMotionValue,
  useReducedMotion,
  useInView,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";
import type { ReactNode, PointerEvent } from "react";

/** Local pointer tracking: no global mouse listeners, no movement on touch. */
export default function Magnet({
  children,
  className = "",
  strength = 14,
  padding = 0,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out",
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  padding?: number;
  activeTransition?: string;
  inactiveTransition?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  useEffect(() => {
    if (!padding || reduced || !inView) return;
    const move = (event: globalThis.PointerEvent) => {
      if (event.pointerType !== "mouse" || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2),
        dy = event.clientY - (rect.top + rect.height / 2);
      const active =
        Math.abs(dx) < rect.width / 2 + padding &&
        Math.abs(dy) < rect.height / 2 + padding;
      setActive(active);
      x.set(active ? Math.max(-65, Math.min(65, dx / strength)) : 0);
      y.set(active ? Math.max(-45, Math.min(45, dy / strength)) : 0);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      x.set(0);
      y.set(0);
    };
  }, [padding, reduced, inView, strength, x, y]);
  function move(event: PointerEvent<HTMLDivElement>) {
    if (padding || reduced || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    setActive(true);
    x.set(((event.clientX - rect.left) / rect.width - 0.5) * strength);
    y.set(((event.clientY - rect.top) / rect.height - 0.5) * strength);
  }
  return (
    <div
      ref={ref}
      className={`magnet ${className}`}
      onPointerMove={move}
      onPointerLeave={() => {
        if (padding) return;
        setActive(false);
        x.set(0);
        y.set(0);
      }}
    >
      <motion.div
        style={{
          x: reduced ? 0 : x,
          y: reduced ? 0 : y,
          transition: reduced
            ? "none"
            : active
              ? activeTransition
              : inactiveTransition,
          willChange: active ? "transform" : "auto",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
