import { motion, useReducedMotion } from "framer-motion";
import Magnet from "./Magnet";
import ContactButton from "./ContactButton";
import FooterMarquee from './FooterMarquee';
import { lazy, Suspense } from "react";
const ParticleBackground = lazy(() => import("./ParticleBackground"));
export default function CreatorHero() {
  const reduced = useReducedMotion();
  const entrance = (delay: number, y: number) => ({
    initial: reduced ? false : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: {
      delay: reduced ? 0 : delay,
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  });
  return (
    <section
      id="home"
      className="creator-hero relative flex flex-col overflow-hidden bg-[#030014]"
    >
      <Suspense fallback={null}>
        <ParticleBackground />
      </Suspense>
      <motion.h1
        className="hero-heading creator-name font-black uppercase leading-none"
        {...entrance(0.15, 40)}
      >
        <span>Hi, i'm</span>
        <span>Chen ZhiJiang</span>
      </motion.h1>
      <motion.div className="creator-portrait" {...entrance(0.6, 30)}>
        <Magnet strength={3} padding={150}>
          <img
            src={`${import.meta.env.BASE_URL}media/art-portrait.png`}
            alt="陈枳江艺术肖像"
            fetchPriority="high"
          />
        </Magnet>
      </motion.div>
      <div className="creator-hero-bottom">
        <motion.p {...entrance(0.35, 20)}>
          a 3d creator driven by crafting striking and unforgettable projects
        </motion.p>
        <motion.div {...entrance(0.5, 20)}>
          <ContactButton />
        </motion.div>
      </div>
      <FooterMarquee/>
    </section>
  );
}
