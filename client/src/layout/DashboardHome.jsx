import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Code2, BrainCircuit } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import ProblemOfTheDay from "../components/ProblemOfTheDay";
import { difficultyText, verdictTone } from "../utils/problemUi";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const actions = [
  {
    title: "Weekly DSA",
    description: "This week's high-priority interview questions.",
    path: "/dashboard/coding",
    Icon: Code2,
  },
  {
    title: "AI interview",
    description: "Chat or video interview with feedback.",
    path: "/dashboard/interview",
    Icon: BrainCircuit,
  },
];

const secondaryButton =
  "inline-flex shrink-0 items-center gap-1.5 rounded-md border border-zinc-800 px-3 py-1.5 text-sm text-zinc-300 hover:text-zinc-100";

const DashboardHome = () => {
  const navigate = useNavigate();
  const { accessToken, user, setUser } = useAuth();
  const [saved, setSaved] = useState([]);
  const [recent, setRecent] = useState([]);
  const [pofd, setPofd] = useState(null);
  const [loading, setLoading] = useState(true);

  const getDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/dashboard/dashboard", {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      });
      setUser(data.user);
      setSaved(data.savedProblems);
      setRecent(data.recentActivity);
      setPofd(data.problemOfTheDay);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  // Show every interview, but only the first attempt per coding problem
  const uniqueRecent = recent.filter((item, index, arr) => {
    if (item.sub === "AI Interview") return true;
    return (
      index ===
      arr.findIndex(
        (a) =>
          a.sub === "Coding Practice" && a.problem?._id === item.problem?._id,
      )
    );
  });

  return (
    <div className="max-w-7xl">
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      <p className="mt-1 text-sm text-zinc-400">
        Welcome back,{" "}
        <span className="capitalize text-zinc-200">{user?.firstName}</span>.
      </p>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-600 border-t-transparent" />
        </div>
      ) : (
        <div className="mt-8 space-y-10">
          <ProblemOfTheDay problem={pofd} />

          {/* Start practicing */}
          <section>
            <h2 className="text-base font-medium">Start practicing</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {actions.map(({ title, description, path, Icon }) => (
                <button
                  key={title}
                  type="button"
                  onClick={() => navigate(path)}
                  className="flex items-start gap-4 rounded-md border border-zinc-800 bg-zinc-900/40 p-4 text-left hover:bg-zinc-900"
                >
                  <Icon size={18} className="mt-0.5 shrink-0 text-zinc-400" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-zinc-100">
                      {title}
                    </span>
                    <span className="mt-1 block text-sm text-zinc-500">
                      {description}
                    </span>
                  </span>
                  <ArrowRight
                    size={16}
                    className="mt-0.5 shrink-0 text-zinc-600"
                  />
                </button>
              ))}
            </div>
          </section>

          {/* Recent activity */}
          <section>
            <h2 className="text-base font-medium">Recent activity</h2>
            <p className="mt-1 text-sm text-zinc-500">Your latest attempts.</p>

            {uniqueRecent.length === 0 ? (
              <p className="mt-4 border-y border-zinc-800 py-6 text-sm text-zinc-500">
                No activity yet. Solve a problem or take an interview to see it
                here.
              </p>
            ) : (
              <ul className="mt-4 divide-y divide-zinc-800 border-y border-zinc-800">
                {uniqueRecent.map((item, index) => {
                  const isCoding = item.sub === "Coding Practice";
                  const verdict = isCoding
                    ? item.verdict
                    : item.interview?.report?.verdict;
                  const tone = verdictTone(verdict);

                  return (
                    <li
                      key={item._id ?? index}
                      className="flex items-center gap-4 py-3 text-sm"
                    >
                      <span
                        className={`h-2 w-2 shrink-0 rounded-full ${tone.dot}`}
                      />
                      <span className="min-w-0 flex-1 truncate text-zinc-200">
                        {isCoding ? item.problem?.title : item.interview?.role}
                      </span>
                      <span className="hidden w-20 font-mono text-xs text-zinc-500 sm:block">
                        {isCoding ? "dsa" : "interview"}
                      </span>
                      <span
                        className={`w-36 text-right font-mono text-xs ${tone.text}`}
                      >
                        {verdict ?? "–"}
                      </span>
                      <span className="hidden w-24 text-right font-mono text-xs text-zinc-500 md:block">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>

          {/* Saved problems */}
          <section>
            <h2 className="text-base font-medium">Saved problems</h2>
            <p className="mt-1 text-sm text-zinc-500">Your bookmarks.</p>

            {saved.length === 0 ? (
              <div className="mt-4 flex flex-col items-start gap-4 border-y border-zinc-800 py-6">
                <p className="text-sm text-zinc-500">
                  Nothing saved. Bookmark a problem to solve it later.
                </p>
                <button
                  type="button"
                  onClick={() => navigate("/dashboard/coding")}
                  className={secondaryButton}
                >
                  Browse problems
                </button>
              </div>
            ) : (
              <ul className="mt-4 divide-y divide-zinc-800 border-y border-zinc-800">
                {saved.map((item, index) => (
                  <li
                    key={item.problem?._id ?? index}
                    className="flex items-center gap-4 py-3"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm text-zinc-200">
                        {item.problem?.title}
                      </p>
                      <p className="mt-1 flex flex-wrap gap-x-3 font-mono text-xs">
                        <span className={difficultyText(item.problem?.difficulty)}>
                          {item.problem?.difficulty}
                        </span>
                        <span className="text-zinc-500">
                          {item.problem?.topic}
                        </span>
                        <span className="text-zinc-500">
                          {item.problem?.acceptanceRate} acceptance
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigate(`/problem/${item.problem._id}`)}
                      className={secondaryButton}
                    >
                      Solve <ArrowRight size={14} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;




{/* Continue Solving 
      <section>
        <div className="mb-3">
          <h2 className="text-lg font-semibold text-white">Continue Solving</h2>
          <p className="mt-1 text-sm text-zinc-500">You left this incomplete.</p>
        </div>
        <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 px-6 py-4 transition hover:border-zinc-700">
          <div>
            <h3 className="font-semibold text-zinc-200">Merge Intervals</h3>
            <div className="mt-1 flex items-center gap-3 text-sm">
              <span className="text-yellow-400">Medium</span>
              <span className="text-zinc-500">Intervals</span>
              <span className="flex items-center gap-1 text-zinc-600">
                <Clock size={11} /> 2d ago
              </span>
            </div>
          </div>
          <button className="flex items-center gap-2 rounded-xl border border-zinc-700 px-5 py-2 text-sm font-medium text-white transition hover:border-yellow-400">
            Continue <ArrowRight size={15} />
          </button>
        </div>



  { title: "Two Sum", sub: "Coding Practice", verdict: "Accepted", time: "2h ago"},
  { title: "Valid Parentheses", sub: "Coding Practice", verdict: "Accepted", time: "Yesterday"},
  { title: "HR Interview Round", sub: "AI Interview", verdict: null, time: "2d ago"},
  { title: "Merge Intervals", sub: "Coding Practice", verdict: "Wrong Answer", time: "3d ago"},


  { title: "Longest Substring Without Repeating Characters", difficulty: "Medium", topic: "Sliding Window" },
  { title: "Binary Tree Level Order Traversal", difficulty: "Medium", topic: "Trees"},


  const totalSolved = 38;
  const totalProblems = 250;
  const readiness = Math.round((totalSolved / totalProblems) * 100);
  const streakDays = weekStreak.filter(Boolean).length;

      </section>
*/}



/*<div>
  <h1 className="text-2xl font-bold text-white">
    Hey, {user?.firstName} 👋
  </h1>
  <p className="mt-1 text-sm text-zinc-500">
    {totalSolved} solved · 0 attempted · {totalProblems - totalSolved} remaining
  </p>
</div>*/