import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
const links = [
  ["about", "ABOUT"],
  ["work", "WORK"],
  ["experience", "EXPERIENCE"],
  ["contact", "CONTACT"],
];
export default function Navbar() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 30);
      const current = [...links]
        .map(([id]) => document.getElementById(id))
        .filter((el) => el && el.getBoundingClientRect().top <= 180)
        .sort((a, b) => b!.offsetTop - a!.offsetTop)[0];
      setActive(current?.id ?? "");
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <motion.header
      initial={false}
      animate={reduced ? {} : { y: [-20, 0], opacity: [0, 1] }}
      transition={{ duration: 0.7 }}
      className={`navbar ${scrolled ? "scrolled" : ""}`}
    >
      <div className="container nav-inner">
        <a className="wordmark" href="#home" onClick={() => setOpen(false)}>
          CHEN ZHIJIANG
          <span className="brand-dot" />
        </a>
        <nav
          id="primary-nav"
          aria-label="主导航"
          className={open ? "is-open" : ""}
        >
          {links.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "location" : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>
        <a className="nav-cta" href="mailto:1754501408@qq.com">
          LET’S TALK <ArrowUpRight size={16} />
        </a>
        <button
          className="menu-toggle"
          aria-label={open ? "关闭菜单" : "打开菜单"}
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </motion.header>
  );
}
