import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
const elements = {
  div: motion.create("div"),
  section: motion.create("section"),
  h2: motion.create("h2"),
};
export default function FadeIn({
  children,
  as = "div",
  className = "",
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
}: {
  children: ReactNode;
  as?: keyof typeof elements;
  className?: string;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
}) {
  const reduced = useReducedMotion();
  const Component = elements[as];
  return (
    <Component
      className={className}
      initial={false}
      whileInView={reduced ? {} : { opacity: [0, 1], x: [x, 0], y: [y, 0] }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{
        delay: reduced ? 0 : delay,
        duration,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </Component>
  );
}
