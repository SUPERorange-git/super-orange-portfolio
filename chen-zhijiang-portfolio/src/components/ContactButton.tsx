import { ArrowUpRight } from "lucide-react";
import Magnet from "./Magnet";
export default function ContactButton() {
  return (
    <Magnet strength={20}>
      <a
        href="#contact"
        className="creator-contact inline-flex items-center justify-center gap-5 rounded-full px-8 py-3 text-xs uppercase tracking-widest sm:px-10 sm:py-4 md:text-base"
      >
        Contact Me <ArrowUpRight size={20} />
      </a>
    </Magnet>
  );
}
