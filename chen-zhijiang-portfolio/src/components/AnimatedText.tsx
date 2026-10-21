import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import type { MotionValue } from "framer-motion";
function Character({
  letter,
  index,
  total,
  progress,
}: {
  letter: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(
    progress,
    [index / total, (index + 1) / total],
    [0.2, 1],
  );
  return (
    <span className="animated-character">
      <span className="character-placeholder">{letter}</span>
      <motion.span className="character-ink" style={{ opacity }}>
        {letter}
      </motion.span>
    </span>
  );
}
export default function AnimatedText({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });
  const characters = Array.from(children);
  return (
    <p ref={ref} className={`animated-text ${className}`} aria-label={children}>
      {reduced ? (
        children
      ) : (
        <span aria-hidden="true">
          {characters.map((letter, index) => (
            <Character
              key={index}
              letter={letter}
              index={index}
              total={characters.length}
              progress={scrollYProgress}
            />
          ))}
        </span>
      )}
    </p>
  );
}
