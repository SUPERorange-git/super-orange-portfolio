import { ArrowUpRight } from "lucide-react";
import { profile } from "../data/profile";
import Magnet from "./Magnet";
import Reveal from "./Reveal";
export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <Reveal>
          <h2>
            LET’S BUILD
            <br />
            SOMETHING
            <br />
            <span>PEOPLE REMEMBER.</span>
          </h2>
        </Reveal>
        <div className="contact-bottom">
          <p>
            Have a project in mind?
            <br />
            <span className="muted">Let’s talk.</span>
          </p>
          <div className="contact-details">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={`tel:${profile.phone}`}>{profile.phone}</a>
          </div>
          <Magnet className="contact-magnet" strength={22}>
            <a className="contact-cta" href={`mailto:${profile.email}`}>
              SEND AN EMAIL{" "}
              <span>
                <ArrowUpRight size={30} />
              </span>
            </a>
          </Magnet>
        </div>
      </div>
    </section>
  );
}
