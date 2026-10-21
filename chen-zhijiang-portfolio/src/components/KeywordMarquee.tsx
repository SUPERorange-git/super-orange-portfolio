import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
const rows = [
  ["BRAND", "CONTENT", "STRATEGY", "GROWTH"],
  ["AI", "CREATIVE", "VISUAL", "DIGITAL MARKETING"],
];
export default function KeywordMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const right = useTransform(scrollYProgress, [0, 1], [-160, 30]);
  const left = useTransform(scrollYProgress, [0, 1], [30, -160]);
  return (
    <div ref={ref} className="keyword-marquee" aria-hidden="true">
      {rows.map((row, index) => (
        <motion.div
          key={index}
          className="marquee-track"
          style={{ x: reduced ? 0 : index === 0 ? right : left }}
        >
          {[...row, ...row, ...row].map((word, i) => (
            <span key={i}>
              {word}
              <i>×</i>
            </span>
          ))}
        </motion.div>
      ))}
    </div>
  );
}
