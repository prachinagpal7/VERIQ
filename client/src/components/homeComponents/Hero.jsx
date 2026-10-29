import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const Hero = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const scrollToHowItWorks = () => {
    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="bg-zinc-950 text-zinc-100">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 sm:py-20  lg:grid-cols-2 lg:gap-20">
        <div>
          <h1 className="text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl"> Practice technical interviews. Get scored on every answer.</h1>

          <p className="mt-5 max-w-md text-sm leading-relaxed text-zinc-400 ">
            AI mock interviews that ask follow-up questions and score your answers, plus a weekly set of DSA problems based on current interview trends.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => navigate(user ? "/dashboard" : "/signup")}
              className="rounded-md bg-indigo-400 px-6 py-3 font-medium text-zinc-950 hover:bg-indigo-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
            >
              {user ? "Open dashboard" : "Get started"}
            </button>
            <button
              type="button"
              onClick={scrollToHowItWorks}
              className="rounded-md border border-zinc-800 px-6 py-3 text-zinc-300 hover:text-zinc-100"
            >
              How it works
            </button>
          </div>
        </div>

        {/* Sample session: transcript + scoring */}
        <div className="overflow-hidden rounded-md border border-zinc-800 bg-zinc-900/50 text-sm">
          <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2">
            <span className="font-medium">Technical round · chat</span>
            <span className="font-mono text-xs text-zinc-500">sample</span>
          </div>

          <div className="space-y-3 px-4 py-3">
            <div>
              <p className="font-mono text-xs text-zinc-500">interviewer: </p>
              <p className="mt-1 text-zinc-200 text-xs">
                Explain the difference between BFS and DFS. Which one finds the
                shortest path in an unweighted graph?
              </p>
            </div>
            <div>
              <p className="font-mono text-xs text-indigo-300">you: </p>
              <p className="mt-1 text-zinc-300 text-xs">
                BFS. It explores level by level, so the first time it reaches a
                node is along a shortest path.
              </p>
            </div>
            <div>
              <p className="font-mono text-xs text-zinc-500">interviewer: </p>
              <p className="mt-1 text-zinc-200 text-xs">
                What are its time and space complexity?
              </p>
            </div>
          </div>

          <dl className="grid grid-cols-3 border-t border-zinc-800 font-mono text-xs">
            {[ ["correctness", "8/10"], ["depth", "7/10"], ["communication", "9/10"],
            ].map(([label, value]) => (
              <div key={label} className="px-4 py-2">
                <dt className="text-zinc-500">{label}</dt>
                <dd className="mt-1 text-xs text-zinc-100">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default Hero;
