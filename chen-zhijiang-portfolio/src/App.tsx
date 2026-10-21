import Navbar from './components/Navbar';
import CreatorHero from './components/CreatorHero';
import MarqueeSection from './components/MarqueeSection';
import CreatorAbout from './components/CreatorAbout';
import Capabilities from './components/Capabilities';
import WorkSection from './components/WorkSection';
import CreatorExperience from './components/CreatorExperience';
import Achievements from './components/Achievements';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return <>
    <a className="skip-link" href="#main">跳至主要内容</a>
    <Navbar />
    <main id="main">
      <CreatorHero />
      <MarqueeSection />
      <CreatorAbout />
      <Capabilities />
      <WorkSection />
      <CreatorExperience />
      <Achievements />
      <Education />
      <Contact />
    </main>
    <Footer />
  </>;
}
