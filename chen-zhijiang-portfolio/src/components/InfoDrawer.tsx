import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import type { experience } from "../data/experience";
export default function InfoDrawer({
  item,
  onClose,
}: {
  item: (typeof experience)[number];
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current?.focus();
    const keys = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab") {
        const items = ref.current?.querySelectorAll<HTMLElement>(
          'a[href],button,[tabindex="0"]',
        );
        if (!items?.length) return;
        const first = items[0],
          last = items[items.length - 1];
        if (
          event.shiftKey &&
          (document.activeElement === first ||
            document.activeElement === ref.current)
        ) {
          event.preventDefault();
          last.focus();
        } else if (
          !event.shiftKey &&
          (document.activeElement === last ||
            document.activeElement === ref.current)
        ) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", keys);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", keys);
      previous?.focus();
    };
  }, [onClose]);
  return createPortal(
    <div className="info-drawer-layer">
      <button
        className="drawer-scrim"
        aria-label="关闭详情"
        tabIndex={-1}
        onClick={onClose}
      />
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        tabIndex={-1}
        className="info-drawer"
        initial={{ x: reduced ? 0 : "100%" }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <button
          className="drawer-close"
          onClick={onClose}
          aria-label="关闭详情面板"
        >
          <X />
        </button>
        <p>{item.year}</p>
        <h2 id="drawer-title">{item.company}</h2>
        <h3>{item.role}</h3>
        <p>{item.keywords}</p>
        <p>{item.description}</p>
        <ul>
          {item.results.map((result) => (
            <li key={result}>{result}</li>
          ))}
        </ul>
        <a className="live-project" href="mailto:1754501408@qq.com">
          1754501408@qq.com
        </a>
      </motion.div>
    </div>,
    document.body,
  );
}
