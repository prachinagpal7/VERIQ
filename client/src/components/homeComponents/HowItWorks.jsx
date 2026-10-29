import React from "react";

const steps = [
  {
    id: "01",
    title: "Create an account",
    description: "Sign up and go straight to practice. No setup.",
  },
  {
    id: "02",
    title: "Choose a mode",
    description: "This week's DSA set, or a mock interview in chat or video.",
  },
  {
    id: "03",
    title: "Practice",
    description: "Solve problems or run a full mock interview. Feedback comes right after.",
  },
  {
    id: "04",
    title: "Review your results",
    description: "See your scores and transcripts, and what to fix before the next session.",
  },
];

const HowItWorks = () => (
  <section id="how-it-works" className="scroll-mt-16 bg-zinc-950">
    <div className="mx-auto max-w-7xl px-6 py-16">
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-100"> How it works </h2>
      <ol className="mt-6 divide-y divide-zinc-800 border-y border-zinc-800">
        {steps.map((s) => (
          <li key={s.id} className="grid gap-1 py-3 sm:grid-cols-[4rem_16rem_1fr] sm:gap-6">
            <span className="font-mono text-sm text-zinc-500">{s.id}</span>
            <h3 className="text-base font-medium text-zinc-100">{s.title}</h3>
            <p className="text-sm leading-relaxed text-zinc-400"> {s.description} </p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default HowItWorks;