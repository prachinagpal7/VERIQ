import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Video, VideoOff, ArrowRight } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const formatTime = (s) =>
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

const timerColor = (s) => {
  if (s <= 60) return "text-red-400";
  if (s <= 300) return "text-amber-400";
  return "text-zinc-300";
};

const errMsg = (error) => error.response?.data?.message || error.message;

const AiInterviewPage = () => {
  const navigate = useNavigate();
  const { interviewId } = useParams();
  const { accessToken } = useAuth();

  const [seconds, setSeconds] = useState(null);
  const [thinking, setThinking] = useState(false);
  const [generatingReport, setGeneratingReport] = useState(false);
  const [camOn, setCamOn] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [ended, setEnded] = useState(false);
  const [confirmEnd, setConfirmEnd] = useState(false);
  const [interview, setInterview] = useState(null);
  const [messages, setMessages] = useState([]);
  const [mediaStream, setMediaStream] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);

  const videoRef = useRef(null);
  const aiVideoRef = useRef(null);
  const streamRef = useRef(null);
  const recognitionRef = useRef(null);
  const transcriptRef = useRef("");
  const shouldListenRef = useRef(false);
  const endingRef = useRef(false);

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
    withCredentials: true,
  };

  const currentQuestion =
    messages.filter((m) => m.role === "assistant").at(-1)?.content || "";
  const currentQuestionNo = interview?.questionsAsked || 0;
  const totalQuestions = interview?.targetQuestions || 0;
  const isLast = currentQuestionNo >= totalQuestions;

  /* ---------- camera / mic ---------- */

  const startMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream;
      setMediaStream(stream);
      setCamOn(true);
    } catch (error) {
      console.error("Media permission error:", error);
      toast.error("Camera and microphone permission is required for the video interview.");
    }
  };

  useEffect(() => {
    if (videoRef.current && mediaStream) videoRef.current.srcObject = mediaStream;
  }, [mediaStream]);

  const stopMedia = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setMediaStream(null);
    setCamOn(false);
  };

  const toggleCamera = () => {
    if (!mediaStream || ended) return;
    const track = mediaStream.getVideoTracks()[0];
    if (track) {
      track.enabled = !track.enabled;
      setCamOn(track.enabled);
    }
  };

  /* ---------- speech recognition ---------- */

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error("Speech recognition is not supported in this browser.");
      return;
    }
    window.speechSynthesis.cancel(); // don't record the interviewer's voice
    transcriptRef.current = "";
    setTranscript("");
    shouldListenRef.current = true;

    const createRecognition = () => {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onstart = () => setListening(true);

      recognition.onresult = (event) => {
        let finalText = "";
        let interimText = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const text = event.results[i][0].transcript;
          if (event.results[i].isFinal) finalText += text + " ";
          else interimText += text;
        }
        if (finalText) transcriptRef.current += finalText;
        setTranscript(transcriptRef.current + interimText);
      };

      recognition.onerror = (event) => {
        if (event.error === "not-allowed" || event.error === "service-not-allowed") {
          shouldListenRef.current = false;
          setListening(false);
          toast.error("Microphone permission is required.");
        }
      };

      // The browser ends recognition after silence; restart while the user is answering.
      recognition.onend = () => {
        if (shouldListenRef.current) {
          setTimeout(() => {
            if (shouldListenRef.current) createRecognition();
          }, 300);
        } else {
          setListening(false);
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    };
    createRecognition();
  };

  const stopListening = () => {
    shouldListenRef.current = false;
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setListening(false);
  };

  /* ---------- interview api ---------- */

  const generateFirstQuestion = async () => {
    try {
      setThinking(true);
      const { data } = await axios.post(
        `/api/dashboard/interview/generateFirstQuestion/${interviewId}`,
        {},
        config
      );
      setInterview(data.interview);
      setMessages(data.interview.messages);
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
      if (data.interview.status === "completed") {
        setEnded(true);
        return;
      }
      await startMedia();
      if (data.interview.messages.length === 0) return generateFirstQuestion();
      setMessages(data.interview.messages);
    } catch (error) {
      toast.error(errMsg(error));
    }
  };

  useEffect(() => {
    if (accessToken) getInterview();
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
      shouldListenRef.current = false;
      recognitionRef.current?.stop();
      window.speechSynthesis.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interviewId, accessToken]);

  /* ---------- timer ---------- */

  const hasTimer = seconds !== null;
  useEffect(() => {
    if (ended || !hasTimer) return;
    const timer = setInterval(() => {
      setSeconds((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [ended, hasTimer]);

  useEffect(() => {
    if (seconds === 0 && interview?.status === "started" && !ended) endInterview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds, interview, ended]);

  /* ---------- interviewer voice ---------- */

  const resetAiVideo = () => {
    const video = aiVideoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  const speakQuestion = (text) => {
    window.speechSynthesis.cancel();
    const video = aiVideoRef.current;
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.95;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => {
      setSpeaking(false);
      resetAiVideo();
    };
    utterance.onerror = () => {
      setSpeaking(false);
      resetAiVideo();
    };
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (!currentQuestion || ended) return;
    speakQuestion(currentQuestion);
    return () => {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    };
  }, [currentQuestion, ended]);

  /* ---------- actions ---------- */

  const sendMessage = async () => {
    const userInput = transcriptRef.current.trim();
    if (ended || thinking || generatingReport) return;
    if (!userInput) {
      toast.error("Please answer the question before continuing.");
      return;
    }
    stopListening();
    setThinking(true);
    try {
      const { data } = await axios.post(
        `/api/dashboard/interview/nextQuestion/${interviewId}`,
        { input: userInput },
        config
      );
      setInterview(data.interview);
      setMessages(data.interview.messages);
      transcriptRef.current = "";
      setTranscript("");
      if (data.ended) {
        setEnded(true);
        stopMedia();
      }
    } catch (error) {
      toast.error(errMsg(error)); // transcript is kept so the answer isn't lost
    } finally {
      setThinking(false);
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
    stopListening();
    window.speechSynthesis.cancel();
    try {
      setGeneratingReport(true);
      const { data } = await axios.post(
        `/api/dashboard/interview/endInterview/${interviewId}`,
        {},
        config
      );
      setInterview(data.interview);
      await generateReport();
      setEnded(true);
      stopMedia();
    } catch (error) {
      toast.error(errMsg(error));
      setGeneratingReport(false);
      endingRef.current = false;
    }
  };

  const busy = thinking || generatingReport;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-zinc-800 px-6">
        <div className="flex min-w-0 items-center gap-3">
          <span className="text-sm font-medium">Video interview</span>
          {interview && (
            <span className="truncate font-mono text-xs text-zinc-500">
              {interview.role} / {interview.duration}
            </span>
          )}
        </div>

        <div className="flex items-center gap-5">
          <span className="hidden font-mono text-xs text-zinc-500 sm:inline">
            q {currentQuestionNo}/{totalQuestions}
          </span>
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

      {/* Main */}
      <div className="grid flex-1 overflow-hidden lg:grid-cols-[1fr_400px]">
        {/* Stage */}
        <div className="flex min-h-0 flex-col items-center justify-center gap-5 overflow-y-auto p-6">
          {/* Interviewer tile */}
          <div className="relative aspect-video w-full max-w-xl overflow-hidden rounded-md border border-zinc-800 bg-zinc-900">
            <video
              ref={aiVideoRef}
              src="/veriqAi.mp4"
              muted
              playsInline
              loop
              className="h-full w-full object-cover"
            />
            <span className="absolute bottom-0 left-0 border-r border-t border-zinc-800 bg-zinc-950 px-2.5 py-1 font-mono text-xs text-zinc-400">
              interviewer
            </span>
            {speaking && (
              <span className="absolute right-0 top-0 flex items-center gap-2 border-b border-l border-zinc-800 bg-zinc-950 px-2.5 py-1 font-mono text-xs text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                speaking
              </span>
            )}
          </div>

          {/* Self tile */}
          <div className="relative aspect-video w-48 overflow-hidden rounded-md border border-zinc-800 bg-zinc-900">
            <video ref={videoRef} autoPlay muted playsInline className="h-full w-full object-cover" />
            {!camOn && (
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 font-mono text-xs text-zinc-500">
                {mediaStream ? "camera off" : "no camera"}
              </div>
            )}
            <span className="absolute bottom-0 left-0 border-r border-t border-zinc-800 bg-zinc-950 px-2 py-0.5 font-mono text-xs text-indigo-400">
              you
            </span>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleCamera}
              disabled={!mediaStream || ended}
              aria-label={camOn ? "Turn camera off" : "Turn camera on"}
              className="flex h-10 w-10 items-center justify-center rounded-md border border-zinc-800 bg-zinc-900 text-zinc-300 disabled:opacity-40"
            >
              {camOn ? <Video size={16} /> : <VideoOff size={16} />}
            </button>
            <button
              onClick={listening ? stopListening : startListening}
              disabled={ended || busy}
              className={`rounded-md px-5 py-2.5 text-sm font-medium disabled:opacity-40 ${
                listening
                  ? "border border-red-500/40 text-red-400"
                  : "bg-indigo-500 text-white"
              }`}
            >
              {listening ? "Stop answering" : "Start answering"}
            </button>
          </div>
        </div>

        {/* Question panel */}
        <aside className="flex min-h-0 flex-col border-t border-zinc-800 lg:border-l lg:border-t-0">
          <div className="flex-1 space-y-8 overflow-y-auto p-6">
            <section>
              <h2 className="mb-2 font-mono text-xs text-zinc-500">
                question {currentQuestionNo} of {totalQuestions}
              </h2>
              <p className="text-sm leading-7 text-zinc-100">
                {currentQuestion || (thinking ? "Preparing your first question…" : "")}
              </p>
            </section>

            <section>
              <h2 className="mb-2 flex items-center gap-2 font-mono text-xs text-zinc-500">
                your answer
                {listening && (
                  <span className="flex items-center gap-1.5 text-red-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                    listening
                  </span>
                )}
              </h2>
              <div className="min-h-[7rem] border-l border-zinc-800 pl-4">
                {transcript ? (
                  <p className="text-sm leading-6 text-zinc-300">{transcript}</p>
                ) : (
                  <p className="text-sm leading-6 text-zinc-600">
                    Press “Start answering” and speak. Your words appear here.
                  </p>
                )}
              </div>
            </section>
          </div>

          <div className="border-t border-zinc-800 p-4">
            {ended ? (
              <button
                onClick={() => navigate("/dashboard/report")}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-indigo-500 py-2.5 text-sm font-medium text-white"
              >
                View report <ArrowRight size={15} />
              </button>
            ) : (
              <button
                onClick={sendMessage}
                disabled={busy || !transcript.trim()}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-indigo-500 py-2.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                {thinking ? "Interviewer is thinking…" : isLast ? "Finish interview" : "Next question"}
                {!thinking && <ArrowRight size={15} />}
              </button>
            )}
            <p className="mt-2 font-mono text-xs text-zinc-600">
              answer fully before moving on
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AiInterviewPage;



/*const nextQuestion = () => {
    if (qIndex + 1 < questions.length) setQIndex(q => q + 1);
    else setEnded(true);
  };*/

              /*const [isRecording, setIsRecording] = useState(false);
              {isRecording && (
              <div className="flex items-center gap-2 text-xs text-red-400">
                <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                Recording your answer...
              </div>
            )}*/

              /*<button onClick={toggleMicrophone} 
              className={`flex h-10 w-10 items-center justify-center rounded-xl border transition
                ${micOn ? "border-zinc-700 bg-zinc-900 text-white hover:border-zinc-500" : "border-red-800 bg-red-950/40 text-red-400"}`}>
              {micOn ? <Mic size={16} /> : <MicOff size={16} />}
            </button>
            const toggleMicrophone = () => {
    if (!mediaStream || ended) return;
    if (!mediaStream) return;
    const audioTrack = mediaStream.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      setMicOn(audioTrack.enabled);
    }
  };
  
   AI interviewer "camera" 
          <div className="relative w-full max-w-lg aspect-video rounded-2xl border border-zinc-800 bg-zinc-900 flex items-center justify-center overflow-hidden">
            <div className="flex flex-col items-center gap-3">
              <div className={`flex h-16 w-16 items-center justify-center rounded-full bg-yellow-400 text-2xl font-black text-black transition-all
                ${speaking ? "ring-4 ring-yellow-400/40 scale-105" : ""}`}>
                AI
              </div>
              {speaking && (
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i}
                      className="w-1 rounded-full bg-yellow-400 animate-pulse"
                      style={{ height: `${8 + Math.random() * 16}px`, animationDelay: `${i * 100}ms` }} />
                  ))}
                </div>
              )}
            </div>
            <div className="absolute bottom-3 left-3 rounded-lg bg-black/60 px-2.5 py-1 text-xs text-zinc-300">
              AI Interviewer
            </div>
            {speaking && (
              <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-lg bg-green-500/20 border border-green-500/30 px-2 py-1">
                <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-green-400">Speaking</span>
              </div>
            )}
          </div>*/
