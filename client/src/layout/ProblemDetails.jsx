import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import ProblemHeader from "../components/problemDetails/ProblemHeader";
import ProblemDescription from "../components/problemDetails/ProblemDescription";
import CodeEditor from "../components/problemDetails/CodeEditor";
import TestCasePanel from "../components/problemDetails/TestCasePanel";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const languages = ["C++", "Python", "Java", "JavaScript"];
const languageMap = {
  "C++": "cpp",
  Python: "python",
  Java: "java",
  JavaScript: "javascript",
};

const emptyProblem = {
  examples: [],
  constraints: [],
  hints: [],
  testCases: [],
  starterCode: {},
};

const ProblemDetails = () => {
  const [lang, setLang] = useState("C++");
  const [codeByLanguage, setCodeByLanguage] = useState({});
  const [activeTab, setActiveTab] = useState("description");
  const [activeCase, setActiveCase] = useState(0);
  const [runResult, setRunResult] = useState(null);
  const [running, setRunning] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [problem, setProblem] = useState(emptyProblem);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [visibleHints, setVisibleHints] = useState(0);
  const { problemId } = useParams();
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  const currentCode = codeByLanguage[languageMap[lang]] || "";

  const getProblem = async () => {
    try {
      const { data } = await axios.post(`/api/dashboard/coding/problemDetails/${problemId}`, {},
        { headers: { Authorization: `Bearer ${accessToken}` }, withCredentials: true,},
      );
      setProblem(data.problem);
    } catch (error) {
      setFailed(true);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProblem();
  }, [accessToken, problemId]);

  const executeCode = async (mode) => {
    try {
      setRunResult(null);
      if(mode === "run") setRunning(true);
      if(mode === "submit") setSubmitting(true);
      const { data } = await axios.post("/api/dashboard/coding/execute",
        {
          problemId,
          language: languageMap[lang],
          code: currentCode,
          input: problem.testCases[activeCase]?.input || "",
          expectedOutput: problem.testCases[activeCase]?.expectedOutput || "",
          mode,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        },
      );
      setRunResult(data.result);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setRunning(false);
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-3 bg-zinc-950">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-600 border-t-transparent" />
        <p className="font-mono text-xs text-zinc-500">loading problem…</p>
      </div>
    );
  }

  if (failed) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 bg-zinc-950 px-4 text-center">
        <p className="text-sm text-zinc-300">Couldn't load this problem.</p>
        <button type="button" onClick={() => navigate("/dashboard/coding")} className="rounded-md border border-zinc-800 px-4 py-2 text-sm text-zinc-300 hover:text-zinc-100">
          Back to problems
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-zinc-950 text-zinc-100">
      <ProblemHeader problem={problem} />

      <div className="flex flex-1 flex-col overflow-hidden lg:flex-row">
        {/* Left: problem */}
        <ProblemDescription problem={problem} activeTab={activeTab} setActiveTab={setActiveTab} visibleHints={visibleHints} setVisibleHints={setVisibleHints}/>

        {/* Right: editor and output */}
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden border-t border-zinc-800 lg:border-l lg:border-t-0">
          <CodeEditor lang={lang} setLang={setLang} codeByLanguage={codeByLanguage} setCodeByLanguage={setCodeByLanguage} problem={problem} setRunResult={setRunResult} languageMap={languageMap} currentCode={currentCode} languages={languages}/>
          <TestCasePanel problem={problem} activeCase={activeCase} setActiveCase={setActiveCase} runResult={runResult} executeCode={executeCode} running={running} submitting={submitting}/>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetails;