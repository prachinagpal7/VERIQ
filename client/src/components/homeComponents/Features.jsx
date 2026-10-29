import React from "react";

const features = [
  {
    id: "01",
    title: "AI mock interviews",
    description: "Chat or video interviews. The AI asks follow-up questions, pushes back on weak answers, and scores each one.",
  },
  {
    id: "02",
    title: "Weekly DSA set",
    description: "25–30 high-priority problems, refreshed every week from current interview trends.",
  },
  {
    id: "03",
    title: "Progress tracking",
    description: "Scores, category breakdowns and the full transcript of every session.",
  },
];
//border-t border-zinc-800

const Features = () => (
  <section id="features" className="scroll-mt-16 bg-zinc-950">
    <div className="mx-auto max-w-7xl  px-6 py-16">
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-100"> What's included </h2>
      <div className="mt-6 grid gap-10 md:grid-cols-3">
        {features.map((f) => (
          <div key={f.id} className="border-t border-zinc-800 pt-3">
            <p className="font-mono text-xs text-zinc-500">{f.id}</p>
            <h3 className="mt-3 text-base font-medium text-zinc-100"> {f.title} </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400"> {f.description} </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;