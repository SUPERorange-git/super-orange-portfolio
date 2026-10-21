import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { achievements } from "../data/achievements";
function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  const [number, setNumber] = useState(value);
  useEffect(() => {
    if (!visible || reduced) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / 950, 1);
      setNumber(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [visible, value, reduced]);
  return (
    <span ref={ref} aria-label={`${value}${suffix}`}>
      <span aria-hidden="true">
        {number}
        {suffix}
      </span>
    </span>
  );
}
export default function Achievements() {
  return (
    <section className="achievements" aria-labelledby="impact-title">
      <div className="container">
        <div className="section-heading">
          <h2 id="impact-title">CREATIVITY, MEASURED.</h2>
          <p>让创意的价值，被看见。</p>
        </div>
        <div className="metrics">
          {achievements.map((metric) => (
            <div className="metric" key={metric.label}>
              <Counter value={metric.value} suffix={metric.suffix} />
              <p>{metric.label}</p>
            </div>
          ))}
        </div>
        <p className="metric-note">
          SELECTED RESULTS ACROSS BRAND &amp; CONTENT PROJECTS ·
          数据来自上述工作及项目经历
        </p>
      </div>
    </section>
  );
}
