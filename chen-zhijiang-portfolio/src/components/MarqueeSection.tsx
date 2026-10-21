import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useInView,
} from "framer-motion";
import { Pause, Play } from "lucide-react";
import { motionReferences } from "../data/motionReferences";
function Tile({
  src,
  label,
  enabled,
}: {
  src: string;
  label: string;
  enabled: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { margin: "100px" });
  const [failed, setFailed] = useState(false);
  return (
    <div ref={ref} className="motion-tile">
      {src && !failed ? (
        enabled && visible ? (
          <video
            src={src}
            poster={src.replace(".mp4", ".jpg")}
            autoPlay
            muted
            loop
            playsInline
            onError={() => setFailed(true)}
          />
        ) : (
          <img
            src={src.replace(".mp4", ".jpg")}
            alt=""
            loading="lazy"
            onError={() => setFailed(true)}
          />
        )
      ) : (
        <div className="motion-tile-fallback">
          <span>{label}</span>
          <strong>
            CREATIVE
            <br />
            IN MOTION.
          </strong>
        </div>
      )}
    </div>
  );
}
export default function MarqueeSection() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [hidden, setHidden] = useState(document.hidden);
  useEffect(() => {
    const update = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  const right = useMotionValue(-200),
    left = useMotionValue(200);
  useEffect(() => {
    if (reduced || paused) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!ref.current) return;
      const sectionTop =
        ref.current.getBoundingClientRect().top + window.scrollY;
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      right.set(offset - 200);
      left.set(-(offset - 200));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [reduced, paused, right, left]);
  const rows = [motionReferences.slice(0, 11), motionReferences.slice(11)];
  return (
    <section ref={ref} className="image-marquee" aria-label="动态视觉参考">
      <div className="marquee-caption container">
        <p>
          VISUAL INSPIRATION <span>参考动效 · 非个人作品</span>
        </p>
        <button
          onClick={() => setPaused(!paused)}
          aria-label={paused ? "播放参考动效" : "暂停参考动效"}
        >
          {paused ? <Play size={15} /> : <Pause size={15} />}
        </button>
      </div>
      <div aria-hidden="true">
        {rows.map((row, i) => (
          <motion.div
            key={i}
            className="image-track"
            style={{
              x: reduced ? 0 : i === 0 ? right : left,
              willChange: reduced || paused ? "auto" : "transform",
            }}
          >
            {[...row, ...row, ...row].map((item, index) => (
              <Tile
                key={index}
                {...item}
                enabled={!reduced && !paused && !hidden}
              />
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
