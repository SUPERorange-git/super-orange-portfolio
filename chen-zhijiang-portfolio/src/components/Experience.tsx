import { experience } from "../data/experience";
import Reveal from "./Reveal";
export default function Experience() {
  return (
    <section id="experience" className="section container">
      <div className="section-heading">
        <h2>
          EXPERIENCE<span className="blue">.</span>
        </h2>
        <p>从内容出发，让创意走向商业价值。</p>
      </div>
      <div className="experience-list">
        {experience.map((item) => (
          <Reveal className="experience-row" key={item.year + item.company}>
            <span className="experience-year">{item.year}</span>
            <div>
              <h3>{item.company}</h3>
              <p className="role">{item.role}</p>
              <p className="keywords">{item.keywords}</p>
            </div>
            <div className="experience-detail">
              <p>{item.description}</p>
              <div className="result-tags">
                {item.results.map((result) => (
                  <span key={result}>{result}</span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
