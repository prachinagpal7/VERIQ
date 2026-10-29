import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const tabs = [
  {
    id: "interview",
    label: "AI interview",
    note: "Pick a topic, difficulty and duration, then start.",
    path: "veriq / interview",
  },
  {
    id: "dsa",
    label: "Weekly DSA",
    note: "A new set of problems every week.",
    path: "veriq / weekly-dsa",
  },
];

const interviewTypes = [
  { label: "Technical chat", credits: 2, active: true },
  { label: "AI video", credits: 4, active: false },
];

const problems = [
  { title: "Two Sum", difficulty: "Easy", status: "solved" },
  { title: "Merge Intervals", difficulty: "Medium", status: "attempted" },
  { title: "Trapping Rain Water", difficulty: "Hard", status: "unsolved" },
];

const difficultyColor = {
  Easy: "text-emerald-400",
  Medium: "text-amber-400",
  Hard: "text-red-400",
};

const statusDot = {
  solved: "bg-emerald-400",
  attempted: "bg-amber-400",
  unsolved: "bg-zinc-600",
};

const InterviewPreview = () => (
  <div className="space-y-3 p-5">
    <div className="flex border-b border-zinc-800 text-sm">
      {interviewTypes.map((t) => (
        <span key={t.label} className={`-mb-px border-b-2 px-4 pb-2.5 ${t.active ? "border-indigo-400 text-zinc-100" : "border-transparent text-zinc-500"}`}>
          {t.label}
          <span className="ml-2 font-mono text-xs text-zinc-500"> {t.credits} cr </span>
        </span>
      ))}
    </div>
    <div className="grid grid-cols-3 gap-3">
      {[["topic", "Data Structures"], ["difficulty", "Medium"], ["duration", "30 min"],
      ].map(([label, value]) => (
        <div key={label}>
          <p className="font-mono text-xs text-zinc-500">{label}</p>
          <div className="mt-1.5 flex items-center justify-between rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-300">
            <span className="truncate">{value}</span>
            <ChevronDown className="h-3.5 w-3.5 shrink-0 text-zinc-600" />
          </div>
        </div>
      ))}
    </div>
    <span aria-hidden="true" className="inline-block rounded-md bg-indigo-400 px-4 py-1 mt-2 text-sm font-medium text-zinc-950"> Start interview </span>
    <div className="flex items-center justify-between border-t border-zinc-800 pt-4">
      <div>
        <p className="font-mono text-xs text-zinc-500">last session</p>
        <p className="mt-1 text-sm text-zinc-300"> Data Structures · Technical chat · 28 min </p>
      </div>
      <p className="font-mono text-sm text-zinc-100">72/100</p>
    </div>
  </div>
);

const DsaPreview = () => (
  <div className="space-y-5 p-5">
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-medium text-zinc-100">Weekly DSA</h3>
      <p className="font-mono text-xs text-zinc-500"> 3 solved · 25 remaining </p>
    </div>
    <div className="flex gap-4 font-mono text-xs">
      {["All", "Easy", "Medium", "Hard"].map((f, i) => (
        <span key={f} className={i === 0 ? "text-zinc-100" : "text-zinc-500"}> {f} </span>
      ))}
    </div>
    <ul className="divide-y divide-zinc-800 border-y border-zinc-800">
      {problems.map((p) => (
        <li key={p.title} className="flex items-center gap-3 py-3 text-sm">
          <span className={`h-2 w-2 shrink-0 rounded-full ${statusDot[p.status]}`} />
          <span className="flex-1 text-zinc-300">{p.title}</span>
          <span className={`font-mono text-xs ${difficultyColor[p.difficulty]}`}> {p.difficulty} </span>
        </li>
      ))}
    </ul>
  </div>
);

const PlatformPreview = () => {
  const [active, setActive] = useState("interview");
  const current = tabs.find((t) => t.id === active);
  return (
    <section id="platform-preview" className="scroll-mt-16 bg-zinc-950 ">
      <div className="mx-auto grid max-w-7xl px-6 py-16 items-start gap-8 lg:grid-cols-3 lg:gap-10 ">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-100"> Inside the platform </h2>
          <div role="tablist" aria-label="Platform preview" className="mt-6 flex gap-6 lg:flex-col lg:gap-1">
            {tabs.map((t) => (
              <button key={t.id} type="button" role="tab" aria-selected={active === t.id} onClick={() => setActive(t.id)} className={`border-l-2 py-2 pl-4 text-left ${ active === t.id ? "border-indigo-400 text-zinc-100" : "border-zinc-800 text-zinc-500 hover:text-zinc-300" }`}>
                <span className="block text-sm font-medium">{t.label}</span>
                <span className="mt-0.5 hidden text-xs text-zinc-500 lg:block"> {t.note} </span>
              </button>
            ))}
          </div>
        </div>
        <div className="min-h-72 overflow-hidden rounded-md border border-zinc-800 bg-zinc-900/50  lg:col-span-2">
          <div className="border-b border-zinc-800 px-5 py-3">
            <p className="font-mono text-xs text-zinc-500">{current.path}</p>
          </div>
          {active === "interview" ? <InterviewPreview /> : <DsaPreview />}
        </div>
      </div>
    </section>
  );
};

export default PlatformPreview;

