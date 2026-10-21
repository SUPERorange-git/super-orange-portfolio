import { useState } from "react";
import { biography } from "../data/biography";
import { profile } from "../data/profile";
import AnimatedText from "./AnimatedText";
import Reveal from "./Reveal";
import ContactButton from "./ContactButton";
function Decoration({ index }: { index: number }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`about-decoration decoration-${index}`} aria-hidden="true">
      {!failed ? (
        <img
          src={`${import.meta.env.BASE_URL}media/reference/decor-${index}.png`}
          alt=""
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="decoration-fallback" />
      )}
    </div>
  );
}
export default function CreatorAbout() {
  return (
    <section
      id="about"
      className="creator-about relative min-h-screen px-5 py-20 sm:px-8 md:px-10"
    >
      <div className="about-decorations">
        {[1, 2, 3, 4].map((index) => (
          <Decoration index={index} key={index} />
        ))}
      </div>
      <Reveal>
        <h2 className="hero-heading creator-section-heading">About me</h2>
      </Reveal>
      <div className="creator-about-copy">
        <h3>CREATIVE WITH A GROWTH MINDSET.</h3>
        {biography.map((text) => (
          <AnimatedText key={text}>{text}</AnimatedText>
        ))}
        <div className="original-position">
          <p>品牌增长 × AI创意 × 内容营销</p>
          <p>
            I create content, visual systems and growth strategies that turn
            attention into brand value.
          </p>
          <p>通过内容、视觉、AI与增长策略，把注意力转化为品牌价值。</p>
        </div>
        <ContactButton />
        <div className="about-info">
          <span>Based in Wuhan, China</span>
          <span>Hubei University</span>
          <span>Broadcasting &amp; Hosting Art</span>
          <span>Interaction Design Study Experience</span>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={`tel:${profile.phone}`}>{profile.phone}</a>
        </div>
      </div>
    </section>
  );
}
