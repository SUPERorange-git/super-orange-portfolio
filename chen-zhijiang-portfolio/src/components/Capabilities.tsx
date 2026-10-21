import { ArrowUpRight } from "lucide-react";
import { capabilities } from "../data/capabilities";
export default function Capabilities() {
  return (
    <section className="section container">
      <div className="section-heading">
        <h2>
          WHAT I DO<span className="blue">.</span>
        </h2>
        <p>从策略到表达，从内容到增长。</p>
      </div>
      <div className="capability-grid">
        {capabilities.map((item, index) => (
          <article className="capability" key={item.title}>
            <div className="capability-top">
              <span>0{index + 1}</span>
              <ArrowUpRight size={20} />
            </div>
            <h3>{item.title}</h3>
            <p>{item.name}</p>
            <ul>
              {item.items.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
