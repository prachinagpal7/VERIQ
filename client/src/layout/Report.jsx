import React, { useState, useEffect } from "react";
import { X, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { difficultyText, verdictTone, scoreTone } from "../utils/problemUi";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const typeLabel = (type) => (type === "chat" ? "Technical chat" : "Video interview");

const secondaryButton =
  "inline-flex shrink-0 items-center gap-1.5 rounded-md border border-zinc-800 px-3 py-1.5 text-sm text-zinc-300 hover:text-zinc-100";

const SectionLabel = ({ children }) => (
  <h3 className="font-mono text-xs text-zinc-500">{children}</h3>
);

// ─── Report modal ───
const FeedbackModal = ({ report, onClose }) => {
  const [showTranscript, setShowTranscript] = useState(false);
  const data = report.report;
  const overall = scoreTone(data?.overallScore);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/90 px-4 py-8"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="report-title"
        className="flex max-h-full w-full max-w-3xl flex-col overflow-hidden rounded-md border border-zinc-800 bg-zinc-950"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-zinc-800 px-6 py-4">
          <div>
            <h2 id="report-title" className="text-base font-medium">
              {report.role}
              <span className="text-zinc-500"> · {typeLabel(report.type)}</span>
            </h2>
            <p className="mt-1 font-mono text-xs text-zinc-500">
              {new Date(report.createdAt).toLocaleDateString()} ·{" "}
              {report.duration}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-1 text-zinc-500 hover:text-zinc-100"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-8 overflow-y-auto p-6">
          {/* Score */}
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs text-zinc-500">overall score</p>
              <p className="mt-1 flex items-baseline gap-1.5">
                <span className={`text-4xl font-semibold ${overall.text}`}>
                  {data?.overallScore ?? "–"}
                </span>
                <span className="font-mono text-sm text-zinc-500">/100</span>
              </p>
            </div>
            <dl className="flex gap-6 font-mono text-xs">
              <div>
                <dt className="text-zinc-500">verdict</dt>
                <dd className={`mt-1 text-sm ${overall.text}`}>
                  {data?.verdict ?? "–"}
                </dd>
              </div>
              <div>
                <dt className="text-zinc-500">duration</dt>
                <dd className="mt-1 text-sm text-zinc-200">{report.duration}</dd>
              </div>
              <div>
                <dt className="text-zinc-500">credits</dt>
                <dd className="mt-1 text-sm text-zinc-200">{report.credits}</dd>
              </div>
            </dl>
          </div>

          {/* Categories */}
          <section>
            <SectionLabel>category breakdown</SectionLabel>
            <ul className="mt-3 divide-y divide-zinc-800 border-y border-zinc-800">
              {(data?.categories ?? []).map((item, i) => {
                const tone = scoreTone(item.score);
                return (
                  <li key={i} className="py-3">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-sm text-zinc-200">{item.name}</p>
                      <span className={`font-mono text-sm ${tone.text}`}>
                        {item.score}/100
                      </span>
                    </div>
                    {/* <div className="mt-2 h-1 overflow-hidden rounded-full bg-zinc-800">
                      <div
                        className={`h-full ${tone.bar}`}
                        style={{ width: `${Math.min(100, item.score)}%` }}
                      />
                    </div> */}
                    <p className="mt-2 text-xs leading-5 text-zinc-500">
                      {item.feedback}
                    </p>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Strengths and improvements */}
          <div className="grid gap-8 sm:grid-cols-2">
            {[
              ["strengths", data?.strengths, "bg-emerald-400"],
              ["to improve", data?.improvements, "bg-amber-400"],
            ].map(([label, items, dot]) => (
              <section key={label}>
                <SectionLabel>{label}</SectionLabel>
                <ul className="mt-3 space-y-2.5">
                  {(items ?? []).map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-sm leading-5 text-zinc-300"
                    >
                      <span
                        className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${dot}`}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          {/* Questions */}
          <section>
            <SectionLabel>questions asked</SectionLabel>
            <ul className="mt-3 divide-y divide-zinc-800 border-y border-zinc-800">
              {(data?.questions ?? []).map((item, index) => (
                <li
                  key={index}
                  className="flex items-start justify-between gap-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="text-sm text-zinc-200">{item.question}</p>
                    <p className="mt-1 text-xs leading-5 text-zinc-500">
                      <span
                        className={`font-mono ${verdictTone(item.verdict).text}`}
                      >
                        {item.verdict}
                      </span>
                      {item.feedback && <> · {item.feedback}</>}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 font-mono text-sm ${
                      scoreTone(item.score).text
                    }`}
                  >
                    {item.score}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Transcript */}
          <section>
            <button
              type="button"
              onClick={() => setShowTranscript(!showTranscript)}
              aria-expanded={showTranscript}
              className="flex w-full items-center justify-between border-y border-zinc-800 py-3 text-left"
            >
              <span className="font-mono text-xs text-zinc-500">
                full transcript
              </span>
              {showTranscript ? (
                <ChevronUp size={16} className="text-zinc-500" />
              ) : (
                <ChevronDown size={16} className="text-zinc-500" />
              )}
            </button>

            {showTranscript && (
              <div className="max-h-96 space-y-4 overflow-y-auto py-4">
                {(report.messages ?? [])
                  .filter((m) => m.role !== "system")
                  .map((m, index) => {
                    const isUser = m.role === "user";
                    return (
                      <div key={index} className="text-sm">
                        <p
                          className={`font-mono text-xs ${
                            isUser ? "text-indigo-300" : "text-zinc-500"
                          }`}
                        >
                          {isUser ? "you" : "interviewer"}
                        </p>
                        <p className="mt-1 whitespace-pre-wrap leading-6 text-zinc-300">
                          {m.content}
                        </p>
                      </div>
                    );
                  })}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

// ─── Page ───
const Report = () => {
  const { accessToken } = useAuth();
  const [selectedReport, setSelectedReport] = useState(null);
  const [pastInterviews, setPastInterviews] = useState([]);
  const [codingAct, setCodingAct] = useState([]);
  const [loading, setLoading] = useState(true);

  const authConfig = {
    headers: { Authorization: `Bearer ${accessToken}` },
    withCredentials: true,
  };

  const fetchPastInterviews = async () => {
    try {
      const { data } = await axios.get(
        "/api/dashboard/report/getPastInterviews",
        authConfig,
      );
      setPastInterviews(data.interviews);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const getCodingActivity = async () => {
    try {
      const { data } = await axios.get("/api/dashboard/dashboard", authConfig);
      setCodingAct(data.recentActivity);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    const load = async () => {
      await Promise.all([fetchPastInterviews(), getCodingActivity()]);
      setLoading(false);
    };
    load();
  }, []);

  // One row per problem (first attempt in the list)
  const uniqueCodingAct = codingAct
    .filter((item) => item.sub === "Coding Practice" && item.problem)
    .filter(
      (item, index, arr) =>
        index === arr.findIndex((a) => a.problem?._id === item.problem._id),
    );

  const scored = pastInterviews.filter(
    (i) => i.report?.overallScore !== undefined,
  );
  const avg = scored.length
    ? Math.round(
        scored.reduce((sum, i) => sum + i.report.overallScore, 0) /
          scored.length,
      )
    : null;

  return (
    <div className="max-w-7xl">
      <h1 className="text-2xl font-semibold tracking-tight">Reports</h1>
      <p className="mt-1 font-mono text-sm text-zinc-400">
        <span className="text-zinc-100">{pastInterviews.length}</span>{" "}
        {pastInterviews.length === 1 ? "interview" : "interviews"} · avg score{" "}
        <span className={avg === null ? "" : scoreTone(avg).text}>
          {avg === null ? "–" : `${avg}/100`}
        </span>
      </p>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-600 border-t-transparent" />
        </div>
      ) : (
        <div className="mt-8 space-y-10">
          {/* Interview reports */}
          <section>
            <h2 className="text-base font-medium">Interview reports</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Open a report for the full feedback.
            </p>

            {pastInterviews.length === 0 ? (
              <p className="mt-4 border-y border-zinc-800 py-6 text-sm text-zinc-500">
                No interviews yet. Your reports will show up here.
              </p>
            ) : (
              <ul className="mt-4 divide-y divide-zinc-800 border-y border-zinc-800">
                {pastInterviews.map((item, index) => {
                  const score = item.report?.overallScore;
                  const tone = scoreTone(score);
                  return (
                    <li
                      key={item._id ?? index}
                      className="flex items-center gap-4 py-3 text-sm"
                    >
                      <span className="hidden w-14 font-mono text-xs text-zinc-500 sm:block">
                        {item.type === "chat" ? "chat" : "video"}
                      </span>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-zinc-200">{item.role}</p>
                        <p className="mt-1 font-mono text-xs text-zinc-500">
                          {new Date(item.createdAt).toLocaleDateString()} ·{" "}
                          {item.duration} · {item.credits} cr
                        </p>
                      </div>

                      <span
                        className={`w-16 text-right font-mono text-sm ${tone.text}`}
                      >
                        {score ?? "–"}
                        <span className="text-xs text-zinc-500">/100</span>
                      </span>
                      <span
                        className={`hidden w-20 text-right font-mono text-xs sm:block ${tone.text}`}
                      >
                        {item.report?.verdict ?? "–"}
                      </span>

                      <div className="w-32 shrink-0 text-right">
                        {item.report ? (
                          <button
                            type="button"
                            onClick={() => setSelectedReport(item)}
                            className={secondaryButton}
                          >
                            View report <ArrowRight size={14} />
                          </button>
                        ) : (
                          <span className="font-mono text-xs text-zinc-500">
                            no report
                          </span>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>

          {/* Coding activity */}
          <section>
            <h2 className="text-base font-medium">Coding activity</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Recent problem submissions.
            </p>

            {uniqueCodingAct.length === 0 ? (
              <p className="mt-4 border-y border-zinc-800 py-6 text-sm text-zinc-500">
                No submissions yet.
              </p>
            ) : (
              <ul className="mt-4 divide-y divide-zinc-800 border-y border-zinc-800">
                {uniqueCodingAct.map((item, index) => {
                  const tone = verdictTone(item.verdict);
                  return (
                    <li
                      key={item._id ?? index}
                      className="flex items-center gap-4 py-3 text-sm"
                    >
                      <span
                        className={`h-2 w-2 shrink-0 rounded-full ${tone.dot}`}
                      />
                      <span className="min-w-0 flex-1 truncate text-zinc-200">
                        {item.problem.title}
                      </span>
                      <span
                        className={`hidden w-16 font-mono text-xs sm:block ${difficultyText(
                          item.problem.difficulty,
                        )}`}
                      >
                        {item.problem.difficulty}
                      </span>
                      <span className="hidden w-24 text-right font-mono text-xs text-zinc-500 md:block">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                      <span
                        className={`w-24 text-right font-mono text-xs ${tone.text}`}
                      >
                        {item.verdict}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </div>
      )}

      {selectedReport && (
        <FeedbackModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
        />
      )}
    </div>
  );
};

export default Report;


/*<div className="mb-2.5 h-1 w-full rounded-full bg-zinc-800">
  <div className={`h-1 rounded-full ${getScoreBg(cat.score)}`} style={{ width: `${cat.score}%` }} />
</div>*/

{/* Coding Activity — smaller, secondary */}
/*<section>
  <div className="mb-3">
    <h2 className="text-lg font-semibold text-white">Coding Activity</h2>
    <p className="mt-1 text-sm text-zinc-500">Recent problem submissions.</p>
  </div>
  <div className="flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
    {codingActivity.map((item, i) => (
      <div key={i}
        className="flex items-center justify-between border-b border-zinc-800 px-6 py-3 last:border-none hover:bg-zinc-800/40 transition">
        <div className="flex items-center gap-3">
          <Code2 size={14} className="text-zinc-600 shrink-0" />
          <div>
            <p className="text-sm font-medium text-zinc-300">{item.title}</p>
            <div className="mt-0.5 flex items-center gap-3 text-xs">
              <span className={item.difficulty === "Easy" ? "text-green-400" : item.difficulty === "Hard" ? "text-red-400" : "text-yellow-400"}>
                {item.difficulty}
              </span>
              <span className="text-zinc-600">{item.date}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          {item.complexity && (
            <span className="font-mono text-xs text-yellow-400">{item.complexity}</span>
          )}
          <span className={`text-xs font-medium ${item.verdict === "Accepted" ? "text-green-400" : "text-red-400"}`}>
            {item.verdict}
          </span>
        </div>
      </div>
    ))}
  </div>
</section>*/