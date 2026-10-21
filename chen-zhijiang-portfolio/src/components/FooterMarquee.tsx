import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
export default function FooterMarquee() {
  const { scrollY } = useScroll();
  const x = useTransform(scrollY, [0, 1200], [0, -200]);
  const reduced = useReducedMotion();
  return (
    <div className="hero-footer-marquee" aria-hidden="true">
      <motion.div style={{ x: reduced ? 0 : x }}>
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i}>
            CREATIVE × TECHNOLOGY × BUSINESS GROWTH <i>CHEN ZHIJIANG</i>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
