import { useCallback, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import type { MotionValue } from "framer-motion";
import { experience } from "../data/experience";
import { ArrowUpRight } from "lucide-react";
import InfoDrawer from "./InfoDrawer";
function CareerCard({
  item,
  index,
  progress,
  onOpen,
}: {
  item: (typeof experience)[number];
  index: number;
  progress: MotionValue<number>;
  onOpen: () => void;
}) {
  const reduced = useReducedMotion();
  const scale = useTransform(
    progress,
    [index / 3, (index + 1) / 3],
    [1, 1 - (2 - index) * 0.03],
  );
  return (
    <article
      className="career-stack"
      style={
        {
          "--stack-offset": `${index * 28}px`,
          zIndex: index + 1,
        } as React.CSSProperties
      }
    >
      <motion.div
        className="career-card"
        style={{ scale: reduced ? 1 : scale }}
      >
        <header className="career-header">
          <span className="career-number">0{index + 1}</span>
          <div>
            <p>{item.year}</p>
            <h3>{item.company}</h3>
            <p>{item.role}</p>
          </div>
          <button
            className="live-project"
            onClick={onOpen}
            aria-haspopup="dialog"
          >
            Live Project <ArrowUpRight size={17} />
          </button>
        </header>
        <div className="career-body">
          <div className="career-left">
            <div className="career-keyword">
              <img
                className="career-placeholder"
                src={`${import.meta.env.BASE_URL}media/experience/${index + 1}-1.svg`}
                alt="项目图片占位"
                loading="lazy"
              />
              <span>{item.keywords}</span>
              <strong>
                {index === 0 ? "BRAND." : index === 1 ? "CONTENT." : "AI."}
              </strong>
            </div>
            <div className="career-description">
              <img
                className="career-placeholder"
                src={`${import.meta.env.BASE_URL}media/experience/${index + 1}-2.svg`}
                alt="项目图片占位"
                loading="lazy"
              />
              <p>{item.description}</p>
            </div>
          </div>
          <div className={`career-results career-visual-${index}`}>
            <img
              className="career-placeholder"
              src={`${import.meta.env.BASE_URL}media/experience/${index + 1}-3.svg`}
              alt="项目图片占位"
              loading="lazy"
            />
            <div className="career-orbits" aria-hidden="true" />
            <span className="career-results-label">
              {item.results.length
                ? "SELECTED RESULTS"
                : "AI EDUCATION / NEW MEDIA"}
            </span>
            {item.results.length ? (
              <div className="career-result-list">
                {item.results.map((result) => (
                  <p key={result}>{result}</p>
                ))}
              </div>
            ) : (
              <div className="career-education-visual">
                <strong>
                  繁星计划
                  <br />
                  2024
                </strong>
                <p>湖北大学生文博短视频创造营</p>
              </div>
            )}
          </div>
        </div>
        <p className="career-media-note">
          VISUAL PLACEHOLDERS · 项目图片待补充
        </p>
      </motion.div>
    </article>
  );
}
export default function CreatorExperience() {
  const [selected, setSelected] = useState<number | null>(null);
  const close = useCallback(() => setSelected(null), []);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.2", "end end"],
  });
  return (
    <section id="experience" className="creator-experience">
      <div className="container">
        <h2 className="hero-heading creator-section-heading">Project</h2>
        <div ref={ref} className="career-cards">
          {experience.map((item, index) => (
            <CareerCard
              key={item.company}
              item={item}
              index={index}
              progress={scrollYProgress}
              onOpen={() => setSelected(index)}
            />
          ))}
        </div>
      </div>
      {selected !== null && (
        <InfoDrawer item={experience[selected]} onClose={close} />
      )}
    </section>
  );
}
