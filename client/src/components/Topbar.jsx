import React from "react";
import { Menu, Coins } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Logo from "./Logo";

// Status colours, kept separate from the indigo brand accent.
const creditTone = (n) => {
  if (n === 0) return "border-red-500/30 bg-red-500/10 text-red-400";
  if (n === 1) return "border-amber-500/30 bg-amber-500/10 text-amber-400";
  return "border-zinc-800 bg-zinc-900 text-zinc-100";
};

// Mobile: menu button + logo on the left. Desktop: logo lives in the sidebar.
// Credits and avatar are visible on every screen size.
const Topbar = ({ onMenuClick }) => {
  const { user } = useAuth();
  const credits = user?.credits;
  const initial = (user?.name || user?.email || "?").trim().charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-zinc-800 bg-zinc-950/90 px-4 backdrop-blur sm:px-6 lg:justify-end lg:px-8">
      <div className="flex items-center gap-3 lg:hidden">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open menu"
          className="-ml-1 rounded-md p-1 text-zinc-400 hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
        >
          <Menu size={20} />
        </button>
        <Logo />
      </div>

      <div className="flex items-center gap-3">
        <div
          aria-label={`${credits ?? "Unknown"} credits remaining`}
          className={`flex items-center gap-2 rounded-full border px-3 py-1 ${creditTone(credits)}`}
        >
          <Coins size={14} aria-hidden="true" />
          <span className="font-mono text-sm">{credits ?? "–"}</span>
          <span className="text-xs opacity-70">credits</span>
        </div>

        <div
          aria-hidden="true"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-indigo-500/30 bg-indigo-500/15 text-sm font-medium text-indigo-300"
        >
          {initial}
        </div>
      </div>
    </header>
  );
};

export default Topbar;

{
  /*<div className="flex items-center gap-1.5 rounded-xl bg-zinc-900 px-3 py-1.5">
            <Flame size={14} className="text-orange-400" />
            <span className="text-sm font-semibold text-white">{user.streak}</span>
            <span className="text-xs text-zinc-500 hidden sm:block">day streak</span>
          </div>*/
}

{
  /*<button className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-900 text-zinc-400 transition hover:text-white">
            <Search size={14} />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-900 text-zinc-400 transition hover:text-white">
            <Bell size={14} />
          </button>*/
}
