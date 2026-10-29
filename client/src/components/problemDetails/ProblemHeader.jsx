import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const formatTime = (totalSeconds) => {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const ProblemHeader = ({ problem }) => {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(0);

  // Elapsed time since the page opened
  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-zinc-800 bg-zinc-950 px-4">
      <div className="flex min-w-0 items-center gap-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex shrink-0 items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-100"
        >
          <ArrowLeft size={15} />
          Back
        </button>
        <span className="h-4 w-px shrink-0 bg-zinc-800" aria-hidden="true" />
        <h1 className="truncate text-sm font-medium text-zinc-100">
          {problem.title}
        </h1>
      </div>

      <p className="shrink-0 font-mono text-xs text-zinc-500" title="Time elapsed">
        time <span className="ml-1 text-sm text-zinc-200">{formatTime(seconds)}</span>
      </p>
    </header>
  );
};

export default ProblemHeader;