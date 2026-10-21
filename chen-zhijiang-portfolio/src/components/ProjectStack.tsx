import { motion, useReducedMotion, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import type { ReactNode } from "react";
export default function ProjectStack({
  children,
  index,
  total,
  progress,
}: {
  children: ReactNode;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const reduced = useReducedMotion();
  const scale = useTransform(
    progress,
    [index / total, (index + 1) / total],
    [1, 1 - (total - 1 - index) * 0.025],
  );
  return (
    <article
      className="project-stack"
      style={{ top: 108 + index * 12, zIndex: index + 1 }}
    >
      <motion.div
        className="project stack-card"
        style={{ scale: reduced ? 1 : scale }}
      >
        {children}
      </motion.div>
    </article>
  );
}
