import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  MessageSquare,
  Video,
  Users,
  ChevronDown,
  Lock,
  X,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { verdictTone } from "../utils/problemUi";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const interviewTypes = [
  {
    id: "chat",
    label: "Technical chat",
    icon: MessageSquare,
    baseCredits: 2,
    description: "Text-based technical interview with an AI examiner.",
    available: true,
  },
  {
    id: "video",
    label: "AI video",
    icon: Video,
    baseCredits: 4,
    description: "Live video interview with real-time AI feedback.",
    available: true,
  },
  {
    id: "real",
    label: "Real interviewer",
    icon: Users,
    baseCredits: 10,
    description: "1-on-1 session with a verified industry interviewer.",
    available: false,
  },
];

const roles = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Software Engineer",
  "Data Scientist",
  "Data Analyst",
  "Machine Learning Engineer",
  "AI Engineer",
  "DevOps / SRE Engineer",
  "Cloud Engineer",
  "Mobile Developer",
  "QA / SDET",
  "Cybersecurity Engineer",
  "Database Engineer",
  "Embedded Systems Engineer",
  "Systems Engineer",
  "Product Manager",
];
const topics = [
  "DSA", "C++", "Java", "Python", "JavaScript", "TypeScript", "React", "Angular",
  "Node.js", "Express.js", "Spring Boot", "Django", "SQL", "MongoDB",
  "PostgreSQL", "Redis", "AWS", "Azure", "Docker", "Kubernetes", "Linux",
  "Git", "TensorFlow", "PyTorch", "Selenium", "Flutter",
];
const levels = ["Fresher", "Junior", "Mid-level", "Senior"];
const difficulties = ["Easy", "Medium", "Hard"];
const durations = [
  { id: "15 min", mult: 1 },
  { id: "30 min", mult: 1.5 },
  { id: "45 min", mult: 2 },
  { id: "60 min", mult: 2.5 },
];
const languages = ["English", "Hindi", "Hinglish"];
const STEP_LABELS = ["Role & level", "Focus", "Format"];

// Keeps the "Preparing your session…" screen visible for at least this long
const MIN_PREPARING_MS = 1000;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const inputClass = "w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none ";

const secondaryButton = "inline-flex shrink-0 items-center gap-1.5 rounded-md border border-zinc-800 px-3 py-1.5 text-sm text-zinc-300 hover:text-zinc-100";

const Field = ({ label, htmlFor, hint, children }) => (
  <div>
    {htmlFor ? (
      <label htmlFor={htmlFor} className="block text-sm text-zinc-300">
        {label}
      </label>
    ) : (
      <p className="text-sm text-zinc-300">{label}</p>
    )}
    {hint && <p className="mt-1 text-xs text-zinc-500">{hint}</p>}
    <div className="mt-2">{children}</div>
  </div>
);

const Select = ({ id, value, onChange, options }) => (
  <div className="relative">
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${inputClass} cursor-pointer appearance-none pr-9`}
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
    <ChevronDown
      size={14}
      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500"
    />
  </div>
);

const Segmented = ({ label, value, onChange, options }) => (
  <div
    role="group"
    aria-label={label}
    className="inline-flex flex-wrap rounded-md border border-zinc-800 p-0.5 text-sm"
  >
    {options.map((option) => (
      <button
        key={option}
        type="button"
        aria-pressed={value === option}
        onClick={() => onChange(option)}
        className={`rounded px-3 py-1 ${
          value === option
            ? "bg-zinc-800 text-zinc-100"
            : "text-zinc-400 hover:text-zinc-100"
        }`}
      >
        {option}
      </button>
    ))}
  </div>
);

const ConfigureModal = ({ type, balance, starting, onClose, onConfirm }) => {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState(roles[3]);
  const [level, setLevel] = useState(levels[1]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [difficulty, setDifficulty] = useState("Medium");
  const [duration, setDuration] = useState("30 min");
  const [language, setLanguage] = useState("English");
  const [attachResume, setAttachResume] = useState(false);
  const [resumeName, setResumeName] = useState("");

  // Escape closes the dialog (unless a session is being created)
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && !starting && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [starting, onClose]);

  const toggleTopic = (topic) =>
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic],
    );

  const credits = useMemo(() => {
    const mult = durations.find((d) => d.id === duration).mult;
    const topicExtra = Math.max(0, selectedTopics.length - 1);
    const resumeExtra = attachResume ? 1 : 0;
    return Math.ceil(type.baseCredits * mult + topicExtra + resumeExtra);
  }, [type, duration, selectedTopics, attachResume]);

  // balance is null when the user's credits aren't known; the server still validates
  const insufficientCredits = balance !== null && credits > balance;

  const handleStart = () =>
    onConfirm({
      type: type.id,
      role,
      level,
      topics: selectedTopics,
      difficulty,
      duration,
      language,
      attachResume,
      resumeName,
      credits,
    });

  const summary = [
    ["role", role],
    ["level", level],
    ["difficulty", difficulty],
    ["duration", duration],
    ["focus", selectedTopics.length ? selectedTopics.join(", ") : "general"],
    ...(type.id === "video" ? [["language", language]] : []),
    ...(attachResume ? [["resume", resumeName || "-"]] : []),
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/90 px-4 py-8"
      onClick={(e) => e.target === e.currentTarget && !starting && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="configure-title"
        className="flex max-h-[88vh] w-full max-w-lg flex-col overflow-hidden rounded-md border border-zinc-800 bg-zinc-950"
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 pb-4 pt-5">
          <div>
            <h2 id="configure-title" className="text-base font-medium">
              {type.label}
            </h2>
            <p className="mt-1 font-mono text-xs text-zinc-500">
              step {step + 1} of {STEP_LABELS.length} ·{" "}
              {STEP_LABELS[step].toLowerCase()}
            </p>
          </div>
          {!starting && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="p-1 text-zinc-500 hover:text-zinc-100"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Progress */}
        <div className="h-0.5 bg-zinc-800">
          <div
            className="h-full bg-indigo-400"
            style={{ width: `${((step + 1) / STEP_LABELS.length) * 100}%` }}
          />
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {starting ? (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-600 border-t-transparent" />
              <p className="text-sm text-zinc-300">Preparing your session…</p>
            </div>
          ) : (
            <>
              {step === 0 && (
                <div className="space-y-6">
                  <Field label="Role" htmlFor="role">
                    <Select
                      id="role"
                      value={role}
                      onChange={setRole}
                      options={roles}
                    />
                  </Field>
                  <Field label="Experience level">
                    <Segmented
                      label="Experience level"
                      value={level}
                      onChange={setLevel}
                      options={levels}
                    />
                  </Field>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-6">
                  <Field
                    label="Focus areas (optional)"
                    hint="Each area after the first adds 1 credit. Leave empty for a general role-based interview."
                  >
                    <div
                      role="group"
                      aria-label="Focus areas"
                      className="flex flex-wrap gap-2"
                    >
                      {topics.map((topic) => {
                        const active = selectedTopics.includes(topic);
                        return (
                          <button
                            key={topic}
                            type="button"
                            aria-pressed={active}
                            onClick={() => toggleTopic(topic)}
                            className={`rounded-md border px-2.5 py-1 text-xs ${
                              active
                                ? "border-indigo-400 bg-zinc-900 text-zinc-100"
                                : "border-zinc-800 text-zinc-400 hover:text-zinc-100"
                            }`}
                          >
                            {topic}
                          </button>
                        );
                      })}
                    </div>
                  </Field>
                  <Field label="Difficulty">
                    <Segmented
                      label="Difficulty"
                      value={difficulty}
                      onChange={setDifficulty}
                      options={difficulties}
                    />
                  </Field>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <Field label="Duration">
                    <Segmented
                      label="Duration"
                      value={duration}
                      onChange={setDuration}
                      options={durations.map((d) => d.id)}
                    />
                  </Field>

                  {type.id === "video" && (
                    <Field label="Language" htmlFor="language">
                      <Select
                        id="language"
                        value={language}
                        onChange={setLanguage}
                        options={languages}
                      />
                    </Field>
                  )}

                  <div>
                    <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-300">
                      <input
                        type="checkbox"
                        checked={attachResume}
                        onChange={(e) => setAttachResume(e.target.checked)}
                        className="h-4 w-4 accent-indigo-400"
                      />
                      Attach resume
                      <span className="text-zinc-500">(+1 credit)</span>
                    </label>
                    {attachResume && (
                      <input
                        type="file"
                        aria-label="Resume file"
                        onChange={(e) =>
                          setResumeName(e.target.files?.[0]?.name || "")
                        }
                        className="mt-3 w-full rounded-md border border-zinc-800 bg-zinc-950 p-2 text-sm text-zinc-400 outline-none focus:border-indigo-400 file:mr-3 file:rounded file:border-0 file:bg-zinc-800 file:px-3 file:py-1.5 file:text-sm file:text-zinc-200"
                      />
                    )}
                  </div>

                  {/* Summary */}
                  <div className="border-t border-zinc-800 pt-4">
                    <dl className="space-y-2 font-mono text-xs">
                      {summary.map(([key, value]) => (
                        <div key={key} className="flex justify-between gap-6">
                          <dt className="text-zinc-500">{key}</dt>
                          <dd className="text-right text-zinc-200">{value}</dd>
                        </div>
                      ))}
                    </dl>
                    <dl className="mt-4 space-y-2 border-t border-zinc-800 pt-4 font-mono text-xs">
                      <div className="flex justify-between">
                        <dt className="text-zinc-500">credits required</dt>
                        <dd className="text-sm text-zinc-100">{credits}</dd>
                      </div>
                      {balance !== null && (
                        <div className="flex justify-between">
                          <dt className="text-zinc-500">your balance</dt>
                          <dd className="text-zinc-200">{balance}</dd>
                        </div>
                      )}
                    </dl>
                    {insufficientCredits && (
                      <p className="mt-3 text-xs text-red-400">
                        Not enough credits for this configuration.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        {!starting && (
          <div className="flex items-center justify-between border-t border-zinc-800 px-6 py-4">
            <button
              type="button"
              onClick={() => (step === 0 ? onClose() : setStep((s) => s - 1))}
              className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-100"
            >
              <ArrowLeft size={14} />
              {step === 0 ? "Cancel" : "Back"}
            </button>

            {step < STEP_LABELS.length - 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s + 1)}
                className="inline-flex items-center gap-2 rounded-md bg-indigo-400 px-4 py-2 text-sm font-medium text-zinc-950 hover:bg-indigo-300"
              >
                Continue <ArrowRight size={14} />
              </button>
            ) : (
              <button
                type="button"
                disabled={insufficientCredits}
                onClick={handleStart}
                className="inline-flex items-center gap-2 rounded-md bg-indigo-400 px-4 py-2 text-sm font-medium text-zinc-950 hover:bg-indigo-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Start interview <ArrowRight size={14} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const Interview = () => {
  const navigate = useNavigate();
  const { accessToken, setUser, user } = useAuth();
  const [selectedType, setSelectedType] = useState("chat");
  const [modalOpen, setModalOpen] = useState(false);
  const [starting, setStarting] = useState(false);
  const [pastInterviews, setPastInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const current = interviewTypes.find((t) => t.id === selectedType);
  const balance = typeof user?.credits === "number" ? user.credits : null;

  const authConfig = {
    headers: { Authorization: `Bearer ${accessToken}` },
    withCredentials: true,
  };

  const handleConfirm = async (config) => {
    try {
      setStarting(true);
      // The request and the delay run together, so the wait is at least 1s
      // but never 1s plus the request time
      const [{ data }] = await Promise.all([
        axios.post("/api/dashboard/interview/create", config, authConfig),
        sleep(MIN_PREPARING_MS),
      ]);
      toast.success(data.message);
      setUser(data.user);
      const interviewId = data.interview._id;
      navigate(
        config.type === "chat"
          ? `/dashboard/chatInterviewPage/${interviewId}`
          : `/dashboard/aiInterviewPage/${interviewId}`,
      );
    } catch (error) {
      setStarting(false);
      toast.error(error.response?.data?.message || error.message);
    }
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPastInterviews();
  }, []);

  return (
    <div className="max-w-7xl">
      <h1 className="text-2xl font-semibold tracking-tight">Interviews</h1>
      <p className="mt-1 text-sm text-zinc-400">
        Choose a format, then configure your session.
      </p>

      {/* Launcher */}
      <section className="mt-8 rounded-md border border-zinc-800 bg-zinc-900/40">
        <div
          role="tablist"
          aria-label="Interview format"
          className="flex border-b border-zinc-800"
        >
          {interviewTypes.map((type) => {
            const Icon = type.icon;
            const active = selectedType === type.id;
            return (
              <button
                key={type.id}
                type="button"
                role="tab"
                aria-selected={active}
                aria-disabled={!type.available}
                onClick={() => type.available && setSelectedType(type.id)}
                className={`-mb-px flex flex-1 items-center justify-center gap-2 border-b-2 px-4 py-3.5 text-sm ${
                  active
                    ? "border-indigo-400 text-zinc-100"
                    : type.available
                      ? "border-transparent text-zinc-400 hover:text-zinc-100"
                      : "cursor-not-allowed border-transparent text-zinc-600"
                }`}
              >
                <Icon size={16} />
                <span className="hidden sm:inline">{type.label}</span>
                {type.available ? (
                  <span className="font-mono text-xs text-zinc-500">
                    from {type.baseCredits} cr
                  </span>
                ) : (
                  <Lock size={12} />
                )}
              </button>
            );
          })}
        </div>

        {current.available ? (
          <div className="flex flex-col items-start justify-between gap-5 p-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm text-zinc-200">{current.description}</p>
              <p className="mt-1.5 text-xs text-zinc-500">
                Role, level, focus and format are set in the next step.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="inline-flex shrink-0 items-center gap-2 rounded-md bg-indigo-400 px-4 py-2 text-sm font-medium text-zinc-950 hover:bg-indigo-300"
            >
              Configure and start <ArrowRight size={15} />
            </button>
          </div>
        ) : (
          <div className="p-6">
            <p className="text-sm text-zinc-300">
              Real interviewer sessions are coming soon.
            </p>
            <p className="mt-1 text-xs text-zinc-500">{current.description}</p>
          </div>
        )}
      </section>

      {/* Past interviews */}
      <section className="mt-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-base font-medium">Past interviews</h2>
            <p className="mt-1 font-mono text-xs text-zinc-500">
              {loading
                ? "loading…"
                : `${pastInterviews.length} ${
                    pastInterviews.length === 1 ? "session" : "sessions"
                  } completed`}
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/dashboard/report")}
            className={secondaryButton}
          >
            View reports <ArrowRight size={14} />
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-600 border-t-transparent" />
          </div>
        ) : pastInterviews.length === 0 ? (
          <p className="mt-4 border-y border-zinc-800 py-6 text-sm text-zinc-500">
            No interviews yet. Configure one above to get your first report.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-zinc-800 border-y border-zinc-800">
            {pastInterviews.map((item, index) => {
              const tone = verdictTone(item.report?.verdict);
              return (
                <li
                  key={item._id ?? index}
                  className="flex items-center gap-4 py-3 text-sm"
                >
                  <span
                    className={`h-2 w-2 shrink-0 rounded-full ${tone.dot}`}
                  />
                  <span className="min-w-0 flex-1 truncate text-zinc-200">
                    {item.role}
                  </span>
                  <span className="hidden w-16 font-mono text-xs text-zinc-500 sm:block">
                    {item.type === "chat" ? "chat" : "video"}
                  </span>
                  <span className="hidden w-24 text-right font-mono text-xs text-zinc-500 md:block">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                  <span className="w-12 text-right font-mono text-xs text-zinc-200">
                    {item.report?.overallScore ?? "–"}
                  </span>
                  <span
                    className={`w-20 text-right font-mono text-xs ${tone.text}`}
                  >
                    {item.report?.verdict ?? "–"}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {modalOpen && (
        <ConfigureModal
          type={current}
          balance={balance}
          starting={starting}
          onClose={() => setModalOpen(false)}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
};

export default Interview;



{/* Scheduled */}
{/*<section>
  <div className="mb-3 flex items-center gap-2">
    <Calendar size={15} className="text-zinc-400" />
    <h2 className="text-lg font-semibold text-white">Scheduled</h2>
  </div>
  <div className="flex items-center justify-center rounded-xl border border-zinc-800 border-dashed bg-zinc-900/50 px-6 py-10 text-center">
    <div>
      <p className="text-sm text-zinc-500">No interviews scheduled.</p>
      <p className="mt-1 text-xs text-zinc-700">Sessions booked with real interviewers will appear here.</p>
    </div>
  </div>
</section>*/}
