import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../Logo";

const platformLinks = [
  { label: "Features", id: "features" },
  { label: "How it works", id: "how-it-works" },
  { label: "Inside the platform", id: "platform-preview" },
];

const socials = [
  { label: "GitHub", href: "https://github.com/prachinagpal7" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/prachi-nagpal-cse" },
];

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-3">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div>
            <Logo />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-500"> AI mock interviews and weekly DSA practice for developers preparing for placements. </p>
          </div>
          <div className="flex gap-16 text-sm">
            <div>
              <h3 className="font-mono text-xs text-zinc-500">platform</h3>
              <ul className="mt-3 space-y-2">
                {platformLinks.map((l) => (
                  <li key={l.id}>
                    <button type="button" onClick={() => scrollToSection(l.id)} className="text-zinc-400 hover:text-zinc-100"> {l.label} </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-mono text-xs text-zinc-500">connect</h3>
              <ul className="mt-3 space-y-2">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-zinc-100"> {s.label} </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-zinc-900 pt-3 text-xs text-zinc-500 sm:flex-row sm:justify-end">
          <p>© {new Date().getFullYear()} VERIQ. Built by Prachi.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;