import { ArrowDown, ArrowUpRight, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Magnet from "./Magnet";
import { media } from "../data/profile";
export default function Hero() {
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef);
  const [hidden, setHidden] = useState(document.hidden);
  useEffect(() => {
    const update = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  const stopped = paused || !!reduced || !inView || hidden;
  useEffect(() => {
    if (!video.current) return;
    if (stopped) video.current.pause();
    else void video.current.play().catch(() => setFailed(true));
  }, [stopped]);
  function toggle() {
    setPaused(!paused);
    if (video.current) {
      if (paused) void video.current.play().catch(() => setFailed(true));
      else video.current.pause();
    }
  }
  return (
    <section
      ref={sectionRef}
      id="home"
      className={`hero ${stopped ? "motion-paused" : ""}`}
    >
      <div className="hero-art" aria-hidden="true">
        {media.heroVideo && !failed ? (
          <video
            ref={video}
            src={media.heroVideo}
            poster={media.heroPoster || undefined}
            autoPlay={!stopped}
            muted
            loop
            playsInline
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="orbital">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="orbit orbit-three" />
            <div className="orbit-core" />
          </div>
        )}
      </div>
      <div className="hero-shade" />
      <div className="container hero-content">
        <motion.h1
          initial={false}
          animate={
            reduced
              ? {}
              : {
                  clipPath: ["inset(0 0 100% 0)", "inset(0 0 0% 0)"],
                  y: [28, 0],
                }
          }
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          BUILDING BRANDS
          <br />
          THROUGH CONTENT,
          <br />
          <span>AI &amp; GROWTH.</span>
        </motion.h1>
        <div className="hero-bottom">
          <div className="hero-position">
            <span className="tiny-cross">+</span>
            <p>品牌增长 × AI创意 × 内容营销</p>
            <span>CREATIVE × TECHNOLOGY × BUSINESS GROWTH</span>
          </div>
          <div className="hero-intro">
            <p>
              I create content, visual systems and growth strategies that turn
              attention into brand value.
            </p>
            <p className="chinese">
              通过内容、视觉、AI与增长策略，
              <br />
              把注意力转化为品牌价值。
            </p>
            <Magnet strength={14}>
              <a className="text-link" href="#work">
                EXPLORE MY WORK <ArrowUpRight size={18} />
              </a>
            </Magnet>
          </div>
        </div>
        <div className="hero-foot">
          <a href="#about">
            SCROLL TO EXPLORE <ArrowDown size={15} />
          </a>
          <span className="hero-media-label">
            {media.heroVideo && !failed
              ? "MOTION BACKGROUND"
              : "ABSTRACT MOTION · V1 PLACEHOLDER"}
          </span>
          <button
            onClick={toggle}
            aria-label={paused ? "播放背景动画" : "暂停背景动画"}
            disabled={!!reduced}
          >
            {stopped ? <Play size={14} /> : <Pause size={14} />}
          </button>
          <span>WUHAN, CHINA / 2026</span>
        </div>
      </div>
    </section>
  );
}
