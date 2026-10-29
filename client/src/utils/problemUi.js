// Shared colour logic for problems and verdicts.
// Colour is used for status only: green = good, amber = partial, red = bad.
// Full class names are written out so Tailwind can detect them.

export const difficultyText = (difficulty) =>
  ({
    Easy: "text-emerald-400",
    Medium: "text-amber-400",
    Hard: "text-red-400",
  })[difficulty] ?? "text-zinc-400";

const GOOD = ["Solved", "Accepted", "Good"];
const PARTIAL = ["Solved with hint", "Partially solved", "Average"];

export const verdictTone = (verdict) => {
  if (!verdict) return { text: "text-zinc-500", dot: "bg-zinc-600" };
  if (GOOD.includes(verdict))
    return { text: "text-emerald-400", dot: "bg-emerald-400" };
  if (PARTIAL.includes(verdict))
    return { text: "text-amber-400", dot: "bg-amber-400" };
  return { text: "text-red-400", dot: "bg-red-400" };
};

// Score (0-100) -> text and bar colours: 80+ green, 60+ amber, below that red.
export const scoreTone = (score) => {
  if (score === undefined || score === null)
    return { text: "text-zinc-500", bar: "bg-zinc-600" };
  if (score >= 80) return { text: "text-emerald-400", bar: "bg-emerald-400" };
  if (score >= 60) return { text: "text-amber-400", bar: "bg-amber-400" };
  return { text: "text-red-400", bar: "bg-red-400" };
};