import { useState } from "react";
import { ArrowUpRight, Minus } from "lucide-react";
import { projects } from "../data/projects";
import Reveal from "./Reveal";
export default function WorkSection() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section id="work" className="creator-work">
      <div className="container">
        <h2 className="creator-section-heading">Work</h2>
        <p className="work-intro">
          A selection of brand, content and growth projects.
        </p>
        <div className="work-list">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.1}>
              <article className="work-row">
                <span className="work-number">{project.id}</span>
                <div className="work-content">
                  <h3>{project.title}</h3>
                  <h4>{project.name}</h4>
                  <p>{project.description}</p>
                  <div className="work-tags">
                    {project.categories.map((category) => (
                      <span key={category}>{category}</span>
                    ))}
                  </div>
                  <div className="work-results">
                    {project.results.map((result) => (
                      <span key={result}>{result}</span>
                    ))}
                  </div>
                  <button
                    className="work-toggle"
                    aria-expanded={open === project.id}
                    aria-controls={`work-detail-${project.id}`}
                    onClick={() =>
                      setOpen(open === project.id ? null : project.id)
                    }
                  >
                    {open === project.id ? "CLOSE PROJECT" : "VIEW PROJECT"}
                    {open === project.id ? (
                      <Minus size={17} />
                    ) : (
                      <ArrowUpRight size={17} />
                    )}
                  </button>
                  <div
                    id={`work-detail-${project.id}`}
                    hidden={open !== project.id}
                    className="work-detail"
                  >
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.name}
                        loading="lazy"
                      />
                    ) : (
                      <>
                        <span>PROJECT VISUAL · PLACEHOLDER</span>
                        <strong>{project.title}</strong>
                        <p>
                          {project.placeholder
                            ? "当前为视觉占位，尚未提供真实作品。"
                            : "以上为已提供的项目概述与成果，案例图片和完整过程后续补充。"}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
