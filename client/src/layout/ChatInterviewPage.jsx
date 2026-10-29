import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const formatTime = (s) =>
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

// Timer colour is a status signal: neutral, then amber, then red.
const timerColor = (s) => {
  if (s <= 60) return "text-red-400";
  if (s <= 300) return "text-amber-400";
  return "text-zinc-300";
};

const errMsg = (error) => error.response?.data?.message || error.message;

const TechnicalChatSession = () => {
  const navigate = useNavigate();
  const { interviewId } = useParams();
  const { accessToken } = useAuth();

  const [input, setInput] = useState("");
  const [seconds, setSeconds] = useState(null);
  const [ended, setEnded] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [messages, setMessages] = useState([]);
  const [interview, setInterview] = useState(null);
  const [generatingReport, setGeneratingReport] = useState(false);
  const [confirmEnd, setConfirmEnd] = useState(false);

  const bottomRef = useRef(null);
  const endingRef = useRef(false); // guards against double end (timer + button)

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
    withCredentials: true,
  };

  const visible = (list) =>
    list.filter((m) => m.role !== "system" && m.content !== "Begin the interview.");

  const generateFirstQuestion = async () => {
    try {
      setThinking(true);
      const { data } = await axios.post(
        `/api/dashboard/interview/generateFirstQuestion/${interviewId}`,
        {},
        config
      );
      setInterview(data.interview);
      setMessages(visible(data.interview.messages));
      setSeconds(data.remainingSeconds);
    } catch (error) {
      toast.error(errMsg(error));
    } finally {
      setThinking(false);
    }
  };

  const getInterview = async () => {
    try {
      const { data } = await axios.post(
        `/api/dashboard/interview/getInterview/${interviewId}`,
        {},
        config
      );
      setInterview(data.interview);
      if (data.remainingSeconds !== undefined) setSeconds(data.remainingSeconds);
      if (data.interview.messages.length === 0) return generateFirstQuestion();
      setMessages(visible(data.interview.messages));
    } catch (error) {
      toast.error(errMsg(error));
    }
  };

  useEffect(() => {
    if (accessToken) getInterview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interviewId, accessToken]);

  // Countdown. Depends on "has a value" rather than the value itself,
  // so the interval is created once instead of every second.
  const hasTimer = seconds !== null;
  useEffect(() => {
    if (ended || !hasTimer) return;
    const timer = setInterval(() => {
      setSeconds((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [ended, hasTimer]);

  useEffect(() => {
    if (seconds === 0 && !ended) endInterview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds, ended]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  const sendMessage = async () => {
    const userInput = input.trim();
    if (!userInput || thinking || ended || generatingReport) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userInput }]);
    setThinking(true);
    try {
      const { data } = await axios.post(
        `/api/dashboard/interview/nextQuestion/${interviewId}`,
        { input: userInput },
        config
      );
      setInterview(data.interview);
      setMessages(visible(data.interview.messages));
      if (data.ended) setEnded(true);
    } catch (error) {
      toast.error(errMsg(error));
      // roll back the optimistic message and give the answer back to the user
      setMessages((prev) => prev.slice(0, -1));
      setInput(userInput);
    } finally {
      setThinking(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const generateReport = async () => {
    try {
      const { data } = await axios.post(
        `/api/dashboard/report/generateReport/${interviewId}`,
        {},
        config
      );
      setInterview(data.interview);
    } finally {
      setGeneratingReport(false);
    }
  };

  const endInterview = async () => {
    if (endingRef.current) return;
    endingRef.current = true;
    setConfirmEnd(false);
    try {
      setGeneratingReport(true);
      const { data } = await axios.post(
        `/api/dashboard/interview/endInterview/${interviewId}`,
        {},
        config
      );
      setInput("");
      setInterview(data.interview);
      await generateReport();
      setEnded(true);
    } catch (error) {
      toast.error(errMsg(error));
      setGeneratingReport(false);
      endingRef.current = false;
    }
  };

  const locked = ended || generatingReport;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-zinc-800 px-6">
        <div className="flex min-w-0 items-center gap-3">
          <span className="text-sm font-medium text-zinc-100">Technical interview</span>
          {interview && (
            <span className="truncate font-mono text-xs text-zinc-500">
              {interview.role} / {interview.difficulty}
            </span>
          )}
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-zinc-500">remaining</span>
            <span className={`text-sm tabular-nums ${timerColor(seconds ?? 0)}`}>
              {formatTime(seconds ?? 0)}
            </span>
          </div>

          {ended ? (
            <button
              onClick={() => navigate("/dashboard/report")}
              className="rounded-md bg-indigo-500 px-3.5 py-1.5 text-xs font-medium text-white"
            >
              View report
            </button>
          ) : confirmEnd ? (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-zinc-500">End now?</span>
              <button
                onClick={endInterview}
                className="rounded-md border border-red-500/40 px-3 py-1.5 font-medium text-red-400"
              >
                End
              </button>
              <button
                onClick={() => setConfirmEnd(false)}
                className="rounded-md border border-zinc-800 px-3 py-1.5 text-zinc-400"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmEnd(true)}
              disabled={generatingReport || seconds === null}
              className="rounded-md border border-zinc-800 px-3.5 py-1.5 text-xs font-medium text-zinc-300 disabled:opacity-40"
            >
              {generatingReport ? "Generating report…" : "End interview"}
            </button>
          )}
        </div>
      </header>

      {/* Transcript */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-3xl px-6 py-4">
          <p className="mb-4 border-b border-zinc-800 pb-2 font-mono text-xs text-zinc-500">
            session recorded for feedback and scoring
          </p>

          <ol className="space-y-7">
            {messages.map((msg, i) => {
              const isAI = msg.role === "assistant";
              return (
                <li key={i}>
                  <div
                    className={`mb-1.5 font-mono text-xs ${
                      isAI ? "text-zinc-500" : "text-indigo-400"
                    }`}
                  >
                    {isAI ? "interviewer" : "you"}
                  </div>
                  <div
                    className={`whitespace-pre-wrap text-sm leading-7 ${
                      isAI ? "text-zinc-200" : "border-l border-zinc-800 pl-4 text-zinc-300"
                    }`}
                  >
                    {msg.content}
                  </div>
                </li>
              );
            })}

            {thinking && (
              <li>
                <div className="mb-1.5 font-mono text-xs text-zinc-500">interviewer</div>
                <div className="font-mono text-sm text-zinc-500" aria-live="polite">
                  thinking…
                </div>
              </li>
            )}
          </ol>

          {generatingReport && (
            <p className="mt-8 border-t border-zinc-800 pt-4 font-mono text-xs text-zinc-500" aria-live="polite">
              interview ended. generating your report…
            </p>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <div className="shrink-0 border-t border-zinc-800">
        <div className="mx-auto w-full max-w-3xl px-6 py-4">
          <div className="flex items-end gap-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={locked}
              rows={3}
              aria-label="Your answer"
              placeholder={locked ? "Session ended." : "Type your answer"}
              className="flex-1 resize-none rounded-md border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm leading-6 text-zinc-100 outline-none placeholder:text-zinc-600  disabled:opacity-40"
            />
            <button onClick={sendMessage} disabled={!input.trim() || thinking || locked} aria-label="Send answer" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-indigo-500 text-white disabled:cursor-not-allowed disabled:opacity-30">
              <ArrowUp size={16} />
            </button>
          </div>
          <p className="mt-2 font-mono text-xs text-zinc-600">
            enter to send · shift+enter for a new line
          </p>
        </div>
      </div>
    </div>
  );
};

export default TechnicalChatSession;