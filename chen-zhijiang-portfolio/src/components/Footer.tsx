import { ArrowUp } from "lucide-react";
export default function Footer() {
  return (
    <footer className="container footer">
      <div>
        <a className="wordmark" href="#home">
          CHEN ZHIJIANG
        </a>
        <p>Brand Growth / AI Creative / Visual / New Media</p>
      </div>
      <span>Wuhan · China</span>
      <span>© 2026</span>
      <a href="#home" aria-label="返回顶部">
        <ArrowUp size={20} />
      </a>
    </footer>
  );
}
