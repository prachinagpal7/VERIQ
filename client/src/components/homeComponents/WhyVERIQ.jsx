import React from "react";
import { X, Check, Dot } from "lucide-react";

// const oldWay = [
//   "Grind through 500+ random LeetCode problems",
//   "Watch hours of YouTube tutorials",
//   "No feedback on your actual answers",
//   "Guess what companies are actually asking right now",
//   //"Scattered resources across 10 tabs",
//   //"No idea if your complexity is right",
// ];

const veriqWay = [
  "25-30 high-priority questions, refreshed weekly",
  "An AI that questions, follows up, and pushes back",
  "Problems pulled from current interview trends",
  "A real score and transcript after every session",
  //"Complexity called out automatically from your code",
];

const stats = [
  { value: "25-30", label: "Weekly DSA Questions" },
  { value: "2",     label: "Interview Modes" },
  //{ value: "AI",    label: "Powered Scoring" },
  //{ value: "100%",  label: "Actionable Feedback" },
];

const WhyVERIQ = () => {
  return (
    <section id="why-veriq" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6 ">

        {/* Old way vs VERIQ */}
        <div className="text-center max-w-2xl mx-auto mb-7">
          {/* <h2 className="text-4xl font-bold text-white">Why VERIQ?</h2> */}
          {/* <p className="mt-4 text-zinc-400 leading-7">
            Most students prepare the hard way. VERIQ fixes that.
          </p> */}
          <h2 className="text-4xl font-bold text-white">What VERIQ provides?</h2>
        </div>

        <div className="grid sm:grid-cols-1 gap-6 max-w-2xl mx-auto ">
          {/* Old way */}
          {/* <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-sm font-semibold text-zinc-500 mb-5 uppercase tracking-widest">The old way</p>
            <ul className="space-y-3">
              {oldWay.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-zinc-500">
                  <X size={14} className="text-red-500 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div> */}

          {/* VERIQ way */}
          <div className="rounded-2xl border border-zinc-800 py-3 px-5 hover:border-yellow-400/50 bg-zinc-900">
            <p className="text-sm font-semibold text-white mb-5  tracking-widest">It provides:</p>
            <ul className="space-y-1">
              {veriqWay.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                  <Dot size={25} className=" mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stats row */}
        <div className="max-w-xl text-center mx-auto grid grid-cols-2 sm:grid-cols-2 gap-px border border-zinc-800 rounded-2xl overflow-hidden mt-12">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center justify-center py-2 bg-zinc-900 hover:bg-zinc-800/60 transition">
              <p className="text-xl font-black text-yellow-400">{s.value}</p>
              <p className="text-xs text-zinc-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyVERIQ;
