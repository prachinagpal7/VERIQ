import React from "react";
import { Link } from "react-router-dom";

// VERIQ mark: a "Q" (verify IQ) with a check inside the ring.
export const LogoMark = ({ size = 28, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" role="img" aria-label="VERIQ" className={className}>
    <rect width="32" height="32" rx="7" fill="#09090b" />
    <circle cx="15" cy="15" r="8.5" stroke="#818cf8" strokeWidth="2.6" />
    <path d="M17.6 17.6 25.4 25.4" stroke="#818cf8" strokeWidth="2.6" strokeLinecap="round" />
    <path d="M10.9 14.4l2.6 2.6 4.4-5.2" stroke="#e0e7ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Logo = ({ size = 30, showText = true, className = "" }) => (
  <Link to="/" aria-label="VERIQ home" className={`inline-flex items-center gap-2 ${className}`}>
    <LogoMark size={size} />
    {showText && (
      <span className="text-2xl font-semibold tracking-[0.06em] text-zinc-100">VERIQ</span>
    )}
  </Link>
);

export default Logo;