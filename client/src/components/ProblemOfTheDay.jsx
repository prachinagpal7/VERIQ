import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { difficultyText } from "../utils/problemUi";

const ProblemOfTheDay = ({ problem }) => {
  if (!problem?._id) return null;

  return (
    <section
      aria-label="Problem of the day"
      className="flex flex-col gap-4 rounded-lg border border-zinc-800 bg-zinc-900/40 p-5 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="min-w-0">
        <p className="font-mono text-xs text-zinc-400">problem of the day</p>
        <h2 className="mt-2 text-base font-medium text-zinc-100">
          {problem.title}
        </h2>
        <p className="mt-1 flex flex-wrap gap-x-3 font-mono text-xs">
          <span className={difficultyText(problem.difficulty)}>
            {problem.difficulty}
          </span>
          <span className="text-zinc-400">{problem.topic}</span>
          <span className="text-zinc-400">
            {problem.acceptanceRate} acceptance
          </span>
        </p>
      </div>

      <Link
        to={`/problem/${problem._id}`}
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-indigo-400 px-4 py-2 text-sm font-medium text-zinc-950 transition-colors hover:bg-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
      >
        Solve
        <ArrowRight size={15} />
      </Link>
    </section>
  );
};

export default ProblemOfTheDay;