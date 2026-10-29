import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowRight, Bookmark, CheckCircle2, Circle } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import ProblemOfTheDay from "../components/ProblemOfTheDay";
import { difficultyText } from "../utils/problemUi";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const difficultyFilters = ["All", "Easy", "Medium", "Hard"];
const statusFilters = ["All", "Solved", "Unsolved", "Saved"];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400";

const Chip = ({ active, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    className={`rounded-full border px-3 py-1 text-sm transition-colors ${focusRing} ${
      active
        ? "border-indigo-500/40 bg-indigo-500/15 text-indigo-300"
        : "border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
    }`}
  >
    {children}
  </button>
);

const CodingPractice = () => {
  const { accessToken } = useAuth();
  const [problems, setProblems] = useState([]);
  const [savedIds, setSavedIds] = useState([]);
  const [solvedIds, setSolvedIds] = useState([]);
  const [pofd, setPofd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  const [search, setSearch] = useState("");
  const [diffFilter, setDiffFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const solvedSet = useMemo(() => new Set(solvedIds), [solvedIds]);
  const savedSet = useMemo(() => new Set(savedIds), [savedIds]);

  const getCodingPractice = async () => {
    setLoading(true);
    setFailed(false);
    try {
      const { data } = await axios.get("/api/dashboard/coding", {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      });
      setProblems(data.problems);
      setSavedIds(data.savedProblems);
      setSolvedIds(data.solvedProblems);
      setPofd(data.problemOfTheDay);
    } catch (error) {
      setFailed(true);
      toast.error(error.response?.data?.message || error.message);
    }
    setLoading(false);
  };

  // Wait for the token. On a hard refresh it can be null for a moment.
  useEffect(() => {
    if (accessToken) getCodingPractice();
  }, [accessToken]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return problems.filter((q) => {
      if (diffFilter !== "All" && q.difficulty !== diffFilter) return false;
      if (statusFilter === "Solved" && !solvedSet.has(q._id)) return false;
      if (statusFilter === "Unsolved" && solvedSet.has(q._id)) return false;
      if (statusFilter === "Saved" && !savedSet.has(q._id)) return false;
      return q.title.toLowerCase().includes(term);
    });
  }, [problems, search, diffFilter, statusFilter, solvedSet, savedSet]);

  // Toggle locally after the server confirms, instead of refetching the whole page.
  const bookmark = async (problemId) => {
    try {
      const { data } = await axios.post(
        `/api/dashboard/coding/bookmark/${problemId}`,
        {},
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        },
      );
      setSavedIds((prev) =>
        prev.includes(problemId)
          ? prev.filter((id) => id !== problemId)
          : [...prev, problemId],
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const clearFilters = () => {
    setSearch("");
    setDiffFilter("All");
    setStatusFilter("All");
  };

  // Count only this week's problems. The solved list can include older ones.
  const total = problems.length;
  const solved = problems.filter((p) => solvedSet.has(p._id)).length;
  const percent = total ? Math.round((solved / total) * 100) : 0;

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Weekly DSA</h1>
          <p className="mt-1 text-sm text-zinc-400">
            High-priority interview questions, updated weekly from current
            trends.
          </p>
        </div>
        <div className="relative">
          <label htmlFor="problem-search" className="sr-only"> Search problems </label>
          <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"/>
          <input id="problem-search" type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search problems" className="w-full rounded-md border border-zinc-800 bg-zinc-900/40 py-2 pl-9 pr-3 text-sm text-zinc-100 placeholder:text-zinc-500  focus:outline-none   sm:w-64"/>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20" role="status" aria-label="Loading">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-600 border-t-transparent" />
        </div>
      ) : failed ? (
        <div className="mt-8 flex flex-col items-start gap-4 border-y border-zinc-800 py-6">
          <p className="text-sm text-zinc-400">
            Couldn't load this week's problems. Check your connection and try
            again.
          </p>
          <button
            type="button"
            onClick={getCodingPractice}
            className={`rounded-md border border-zinc-800 px-3 py-1.5 text-sm text-zinc-300 hover:text-zinc-100 ${focusRing}`}
          >
            Try again
          </button>
        </div>
      ) : (
        <div className="mt-8 space-y-8">
          {/* Weekly progress */}
          <div>
            <p className="text-sm text-zinc-400">
              <span className="font-mono text-zinc-100">{solved}</span> of{" "}
              <span className="font-mono text-zinc-100">{total}</span> solved
              this week
            </p>
            <div
              role="progressbar"
              aria-label="Weekly progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={percent}
              className="mt-2 h-1 overflow-hidden rounded-full bg-zinc-800"
            >
              <div
                className="h-full rounded-full bg-indigo-500 transition-[width] duration-300"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>

          <ProblemOfTheDay problem={pofd} />

          {/* Filters */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div role="group" aria-label="Difficulty" className="flex flex-wrap gap-2">
              {difficultyFilters.map((f) => (
                <Chip key={f} active={diffFilter === f} onClick={() => setDiffFilter(f)}>
                  {f}
                </Chip>
              ))}
            </div>
            <div role="group" aria-label="Status" className="flex flex-wrap gap-2">
              {statusFilters.map((f) => (
                <Chip key={f} active={statusFilter === f} onClick={() => setStatusFilter(f)}>
                  {f}
                </Chip>
              ))}
            </div>
          </div>

          {/* Problem list */}
          <section>
            <h2 className="text-base font-medium">Problems</h2>
            <p className="mt-1 text-sm text-zinc-400" aria-live="polite">
              Showing {filtered.length} of {total}
            </p>

            {filtered.length === 0 ? (
              <div className="mt-4 flex flex-col items-start gap-4 border-y border-zinc-800 py-6">
                <p className="text-sm text-zinc-400">
                  No problems match these filters.
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className={`rounded-md border border-zinc-800 px-3 py-1.5 text-sm text-zinc-300 hover:text-zinc-100 ${focusRing}`}
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <ul className="mt-4 divide-y divide-zinc-900 overflow-hidden rounded-lg border border-zinc-900 bg-zinc-900/40">
                {filtered.map((q) => {
                  const isSolved = solvedSet.has(q._id);
                  const isSaved = savedSet.has(q._id);

                  return (
                    <li key={q._id} className="flex items-center gap-4 px-4 py-3 transition-colors hover:bg-zinc-900">
                      {isSolved ? (
                        <CheckCircle2 size={16} className="shrink-0 text-green-400" aria-hidden="true" />
                      ) : (
                        <Circle size={16} className="shrink-0 text-zinc-700" aria-hidden="true" />
                      )}
                      <span className="sr-only">{isSolved ? "Solved" : "Not solved"}:</span>
                      <div className="min-w-0 flex-1">
                        <Link to={`/problem/${q._id}`} className={`block truncate rounded text-sm font-semibold text-zinc-200 hover:text-white ${focusRing}`}> {q.title} </Link>
                        <p className="mt-1 flex flex-wrap gap-x-3 font-mono text-xs">
                          <span className={difficultyText(q.difficulty)}>{q.difficulty}</span>
                          <span className="text-zinc-500">{q.topic}</span>
                          <span className="text-zinc-600 ">{q.acceptanceRate} acceptance</span>
                          {q.companies?.length > 0 && (
                            <span className="hidden text-zinc-600 md:inline"> {q.companies[0]} </span>
                          )}
                        </p>
                      </div>
                      <button type="button" onClick={() => bookmark(q._id)} aria-pressed={isSaved} aria-label={isSaved ? `Remove ${q.title} from saved` : `Save ${q.title}`} className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md transition-colors ${focusRing} ${ isSaved ? "text-indigo-400" : "text-zinc-600 hover:text-zinc-300" }`}>
                        <Bookmark size={16} fill={isSaved ? "currentColor" : "none"} />
                      </button>
                      <Link to={`/problem/${q._id}`} className={`inline-flex shrink-0 items-center gap-1.5 rounded-md border border-zinc-800 px-3 py-1.5 text-sm text-zinc-300 transition-colors hover:border-zinc-700 hover:text-zinc-100 ${focusRing}`}>
                        Solve <ArrowRight size={14} />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default CodingPractice;