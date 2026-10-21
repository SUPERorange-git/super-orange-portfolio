import FadeIn from "./FadeIn";
import type { ReactNode } from "react";
export default function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <FadeIn className={className} delay={delay}>
      {children}
    </FadeIn>
  );
}
