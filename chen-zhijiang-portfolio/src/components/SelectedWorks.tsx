import { ArrowUpRight, Plus, Minus } from "lucide-react";
import { projects } from "../data/projects";
import type { Project } from "../data/projects";
import { useRef, useState } from "react";
import { useScroll } from "framer-motion";
import ProjectStack from "./ProjectStack";
function ProjectArtwork({
  project,
  expanded,
  onToggle,
}: {
  project: Project;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      className={`project-art art-${project.visual}`}
      onClick={onToggle}
      aria-label={`查看${project.name}`}
      aria-expanded={expanded}
      aria-controls={`detail-${project.id}`}
    >
      {project.image ? (
        <img src={project.image} alt={project.name} loading="lazy" />
      ) : (
        <>
          <span className="art-label">
            {project.placeholder ? "VISUAL EXPLORATION" : "PROJECT IMAGE"} /
            PLACEHOLDER
          </span>
          {project.visual === "ip" ? (
            <div className="ip-composition">
              <span>
                ATTENTION
                <br />
                INTO
                <br />
                <em>INFLUENCE.</em>
              </span>
              <div className="ip-lines" />
            </div>
          ) : project.visual === "growth" ? (
            <div className="growth-composition">
              <span>
                THE
                <br />
                GROWTH
                <br />
                EFFECT.
              </span>
              <div className="growth-bars">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <i key={n} style={{ height: `${n * 13}%` }} />
                ))}
              </div>
            </div>
          ) : project.visual === "ai" ? (
            <div className="ai-composition">
              <div className="ai-orb" />
              <span>
                HUMAN IDEAS.
                <br />
                MACHINE POSSIBILITIES.
              </span>
            </div>
          ) : (
            <div className="brand-composition">
              <span>
                FORM.
                <br />
                <em>MEANING.</em>
                <br />
                IMPACT.
              </span>
              <div className="brand-symbol">×</div>
            </div>
          )}
          <span className="art-footer">
            CHEN ZHIJIANG —{" "}
            {project.visual === "ai" ? "AI CREATIVE LAB" : "CREATIVE PORTFOLIO"}
            <span>{project.id} / 04</span>
          </span>
        </>
      )}
      <span className="project-cursor" aria-hidden="true">
        <ArrowUpRight size={28} />
      </span>
    </button>
  );
}
export default function SelectedWorks() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start 0.2", "end end"],
  });
  return (
    <section id="work" className="section container works">
      <div className="section-heading works-heading">
        <h2>
          SELECTED
          <br />
          WORKS<span className="blue">.</span>
        </h2>
        <div>
          <p>
            A selection of brand, content
            <br />
            and growth projects.
          </p>
          <span className="muted">品牌 / 内容 / 创意 / 增长</span>
        </div>
      </div>
      <div
        ref={stackRef}
        className={`projects-stack ${expanded ? "has-expanded" : ""}`}
      >
        {projects.map((project, index) => (
          <ProjectStack
            index={index}
            total={projects.length}
            progress={scrollYProgress}
            key={project.id}
          >
            <ProjectArtwork
              project={project}
              expanded={expanded === project.id}
              onToggle={() =>
                setExpanded(expanded === project.id ? null : project.id)
              }
            />
            <div className="project-copy">
              <div className="project-meta">
                <span className="project-number">/{project.id}</span>
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.name}</p>
                </div>
                <ArrowUpRight className="project-meta-arrow" size={24} />
              </div>
              <div className="project-categories">
                {project.categories.map((category) => (
                  <span key={category}>{category}</span>
                ))}
              </div>
              <p className="project-description">{project.description}</p>
              {project.results.length > 0 && (
                <div className="project-results">
                  {project.results.map((result) => (
                    <span key={result}>{result}</span>
                  ))}
                </div>
              )}
              <button
                className="text-link project-button"
                aria-expanded={expanded === project.id}
                aria-controls={`detail-${project.id}`}
                onClick={() =>
                  setExpanded(expanded === project.id ? null : project.id)
                }
              >
                {expanded === project.id ? "CLOSE PROJECT" : "VIEW PROJECT"}
                {expanded === project.id ? (
                  <Minus size={16} />
                ) : (
                  <Plus size={16} />
                )}
              </button>
              <div
                id={`detail-${project.id}`}
                hidden={expanded !== project.id}
                className="project-expanded"
              >
                <h4>{project.placeholder ? "作品即将补充" : "项目概览"}</h4>
                <p>{project.description}</p>
                <p className="muted">
                  {project.placeholder
                    ? "当前为视觉占位，尚未提供真实作品。"
                    : "以上为已提供的项目概述与成果，案例图片和完整过程后续补充。"}
                </p>
              </div>
            </div>
          </ProjectStack>
        ))}
      </div>
    </section>
  );
}
