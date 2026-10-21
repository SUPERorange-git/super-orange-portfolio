import { ArrowUpRight } from "lucide-react";
import { media, profile } from "../data/profile";
import Reveal from "./Reveal";
import Magnet from "./Magnet";
import AnimatedText from "./AnimatedText";
import KeywordMarquee from "./KeywordMarquee";
export default function About() {
  return (
    <section id="about" className="section container about">
      <div className="section-rail">
        <span>ABOUT ME</span>
        <span>A MULTIDISCIPLINARY PERSPECTIVE</span>
      </div>
      <div className="about-grid">
        <Magnet className="portrait-magnet" strength={18}>
          <Reveal className="portrait">
            {media.portrait ? (
              <img src={media.portrait} alt="陈枳江人物照片" loading="lazy" />
            ) : (
              <>
                <div className="portrait-frame" />
                <span className="portrait-monogram">
                  CZ<span>J</span>
                </span>
                <span className="portrait-note">
                  PORTRAIT
                  <br />
                  PLACEHOLDER
                </span>
              </>
            )}
            <div className="portrait-caption">
              <span>陈枳江</span>
              <span>
                CHEN ZHIJIANG <ArrowUpRight size={16} />
              </span>
            </div>
          </Reveal>
        </Magnet>
        <div className="about-copy">
          <h2>
            CREATIVE
            <br />
            WITH A GROWTH
            <br />
            <span className="muted">MINDSET.</span>
          </h2>
          <AnimatedText className="lead-cn">
            我拥有新闻传播、新媒体运营与交互设计的复合背景。
          </AnimatedText>
          <p>
            从品牌内容、个人IP、新媒体矩阵，到AI创意、视觉表达与数字营销，我关注的不只是“做出好看的内容”，而是如何让创意真正产生传播价值和商业价值。
          </p>
          <p>
            我的工作覆盖品牌策略、内容策划、视觉创意、短视频、直播、达人合作、广告投放、私域运营及AI创新应用。
          </p>
          <p>
            曾在企业品牌、商业空间、高校及文化项目中参与内容与增长项目，并持续探索AI在品牌、视觉和内容生产中的实际应用。
          </p>
          <div className="about-info">
            <span>Based in Wuhan, China</span>
            <span>Hubei University</span>
            <span>Broadcasting &amp; Hosting Art</span>
            <span>Interaction Design Study Experience</span>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={`tel:${profile.phone}`}>{profile.phone}</a>
          </div>
        </div>
      </div>
      <div className="about-signoff">
        Strategy <span>×</span> Content <span>×</span> Visual <span>×</span> AI
      </div>
      <KeywordMarquee />
    </section>
  );
}
