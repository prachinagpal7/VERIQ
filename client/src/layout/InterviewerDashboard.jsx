import React, { useState } from "react";
import { ArrowRight, Star, Clock, CheckCircle2, AlertCircle, Download, ChevronDown, ChevronUp, X, Check, Wallet, Calendar, Users, TrendingUp } from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const upcomingSessions = [
  { id: 1, name: "Rahul M.",  topic: "Data Structures", mode: "Technical Chat", time: "Today, 4:00 PM",     credits: 2 },
  { id: 2, name: "Sneha K.",  topic: "React",           mode: "AI Video",       time: "Tomorrow, 11:00 AM", credits: 4 },
  { id: 3, name: "Amit D.",   topic: "System Design",   mode: "Technical Chat", time: "Jul 15, 3:00 PM",    credits: 2 },
];

const sessionRequests = [
  { id: 1, name: "Pooja R.",  topic: "Node.js",          mode: "Technical Chat", credits: 2 },
  { id: 2, name: "Karan S.",  topic: "HR & Behavioural", mode: "AI Video",       credits: 4 },
];

const recentSessions = [
  { name: "Arjun S.",  topic: "Algorithms",       mode: "Technical Chat", score: 74, verdict: "Good",      credits: 2,  date: "Jul 10", studentRating: 5 },
  { name: "Priya R.",  topic: "HR & Behavioural", mode: "AI Video",       score: 88, verdict: "Excellent", credits: 4,  date: "Jul 8",  studentRating: 5 },
  { name: "Dev P.",    topic: "System Design",    mode: "Technical Chat", score: 55, verdict: "Average",   credits: 2,  date: "Jul 6",  studentRating: 4 },
  { name: "Meera T.",  topic: "Node.js",          mode: "Technical Chat", score: 67, verdict: "Good",      credits: 2,  date: "Jul 4",  studentRating: 5 },
];

const withdrawalHistory = [
  { amount: 50,  method: "UPI · prachi@okaxis",  date: "Jul 1, 2026",  status: "Completed" },
  { amount: 80,  method: "UPI · prachi@okaxis",  date: "Jun 15, 2026", status: "Completed" },
  { amount: 30,  method: "Bank Transfer",         date: "May 30, 2026", status: "Completed" },
];

const topics = ["Data Structures", "Algorithms", "React", "Node.js", "System Design", "HR & Behavioural", "SQL"];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const slots = ["Morning (9–12)", "Afternoon (1–5)", "Evening (6–9)"];

const getVerdictColor = (v) =>
  ["Excellent", "Good"].includes(v) ? "text-green-400" : v === "Average" ? "text-yellow-400" : "text-red-400";

// ─── WITHDRAW MODAL ──────────────────────────────────────────────────────────

const WithdrawModal = ({ available, onClose }) => {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("UPI");
  const [upi,    setUpi]    = useState("");
  const [done,   setDone]   = useState(false);

  const handleWithdraw = () => {
    if (!amount || Number(amount) > available) return;
    setDone(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl">
        <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
          <h3 className="font-semibold text-white">Withdraw Earnings</h3>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition"><X size={16} /></button>
        </div>
        {!done ? (
          <div className="p-5 space-y-4">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3">
              <p className="text-xs text-zinc-500">Available to withdraw</p>
              <p className="text-2xl font-black text-yellow-400 mt-0.5">₹{available}</p>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-zinc-500">Amount (₹)</label>
              <input type="number" value={amount} onChange={e => setAmount(e.target.value)}
                placeholder={`Max ₹${available}`}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-sm text-white outline-none focus:border-yellow-400 placeholder:text-zinc-600" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-zinc-500">Method</label>
              <div className="flex gap-2">
                {["UPI", "Bank Transfer"].map(m => (
                  <button key={m} onClick={() => setMethod(m)}
                    className={`flex-1 rounded-xl border py-2 text-sm transition
                      ${method === m ? "border-yellow-400 bg-yellow-400/10 text-yellow-400" : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-600"}`}>
                    {m}
                  </button>
                ))}
              </div>
            </div>
            {method === "UPI" && (
              <div className="space-y-1.5">
                <label className="text-xs text-zinc-500">UPI ID</label>
                <input value={upi} onChange={e => setUpi(e.target.value)} placeholder="yourname@upi"
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-sm text-white outline-none focus:border-yellow-400 placeholder:text-zinc-600" />
              </div>
            )}
            <button onClick={handleWithdraw}
              disabled={!amount || Number(amount) > available || Number(amount) <= 0}
              className="w-full rounded-xl bg-yellow-400 py-2.5 text-sm font-bold text-black transition hover:bg-yellow-300 disabled:opacity-30 disabled:cursor-not-allowed">
              Withdraw ₹{amount || "0"}
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 p-8 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-400/10 border border-green-400/20">
              <Check size={20} className="text-green-400" />
            </div>
            <p className="font-semibold text-white">Withdrawal Requested</p>
            <p className="text-sm text-zinc-500">₹{amount} via {method}. Credited within 24 hours.</p>
            <button onClick={onClose} className="mt-2 rounded-xl border border-zinc-700 px-5 py-2 text-sm text-zinc-400 hover:text-white transition">Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── MAIN ────────────────────────────────────────────────────────────────────

const InterviewerDashboard = () => {
  const [availableNow,   setAvailableNow]   = useState(true);
  const [selectedDays,   setSelectedDays]   = useState(["Mon", "Wed", "Fri"]);
  const [selectedSlots,  setSelectedSlots]  = useState(["Afternoon (1–5)"]);
  const [selectedTopics, setSelectedTopics] = useState(["Data Structures", "Algorithms", "React"]);
  const [requests,       setRequests]       = useState(sessionRequests);
  const [showWithdraw,   setShowWithdraw]   = useState(false);
  const [showHistory,    setShowHistory]    = useState(false);
  const [showAvail,      setShowAvail]      = useState(false);

  const totalEarned   = 186;
  const thisMonth     = 56;
  const pendingAmount = 24;
  const withdrawable  = totalEarned - 160; // 26

  const toggleDay   = d  => setSelectedDays(p  => p.includes(d)  ? p.filter(x => x !== d)  : [...p, d]);
  const toggleSlot  = s  => setSelectedSlots(p => p.includes(s)  ? p.filter(x => x !== s)  : [...p, s]);
  const toggleTopic = t  => setSelectedTopics(p=> p.includes(t)  ? p.filter(x => x !== t)  : [...p, t]);
  const handleRequest = (id, accept) => setRequests(p => p.filter(r => r.id !== id));

  return (
    <div className="space-y-8">

      {/* Greeting — stats as plain text, no boxes */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Hey, Prachi</h1>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-zinc-500">
            <span>24 sessions conducted</span>
            <span className="text-zinc-700">·</span>
            <span className="flex items-center gap-1"><Star size={12} className="text-yellow-400" /> 4.8 rating</span>
            <span className="text-zinc-700">·</span>
            <span>3 sessions this week</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-zinc-500">Available now</span>
          <button onClick={() => setAvailableNow(!availableNow)}
            className={`relative h-5 w-9 rounded-full transition-colors ${availableNow ? "bg-yellow-400" : "bg-zinc-700"}`}>
            <div className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${availableNow ? "translate-x-4" : ""}`} />
          </button>
          {availableNow && <span className="text-xs text-green-400 font-medium">● Live</span>}
        </div>
      </div>

      {/* Earnings */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <Wallet size={15} className="text-zinc-400" />
          <h2 className="text-lg font-semibold text-white">Earnings</h2>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900">

          {/* Earnings overview row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px border-b border-zinc-800">
            {[
              { label: "Total Earned",  value: `₹${totalEarned}`,   sub: "All time"       },
              { label: "This Month",    value: `₹${thisMonth}`,     sub: "July 2026"      },
              { label: "Pending",       value: `₹${pendingAmount}`, sub: "Processing"     },
              { label: "Withdrawable",  value: `₹${withdrawable}`,  sub: "Available now"  },
            ].map((e, i) => (
              <div key={i} className="flex flex-col justify-center px-5 py-4">
                <p className="text-xs text-zinc-500">{e.label}</p>
                <p className="text-xl font-bold text-white mt-0.5">{e.value}</p>
                <p className="text-xs text-zinc-700 mt-0.5">{e.sub}</p>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between px-5 py-3">
            <p className="text-xs text-zinc-600">Credits convert to ₹10 per credit</p>
            <div className="flex gap-2">
              <button onClick={() => setShowHistory(!showHistory)}
                className="flex items-center gap-1.5 rounded-xl border border-zinc-700 px-4 py-1.5 text-xs text-zinc-400 hover:text-white transition">
                History {showHistory ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              </button>
              <button onClick={() => setShowWithdraw(true)}
                className="flex items-center gap-1.5 rounded-xl bg-yellow-400 px-4 py-1.5 text-xs font-bold text-black hover:bg-yellow-300 transition">
                <Download size={12} /> Withdraw
              </button>
            </div>
          </div>

          {/* Withdrawal history */}
          {showHistory && (
            <div className="border-t border-zinc-800">
              {withdrawalHistory.length === 0 ? (
                <p className="px-5 py-4 text-sm text-zinc-600">No withdrawals yet.</p>
              ) : (
                withdrawalHistory.map((w, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-zinc-800 last:border-none px-5 py-3">
                    <div>
                      <p className="text-sm font-medium text-zinc-300">₹{w.amount} withdrawn</p>
                      <p className="text-xs text-zinc-600 mt-0.5">{w.method} · {w.date}</p>
                    </div>
                    <span className="text-xs font-medium text-green-400">{w.status}</span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </section>

      {/* Session Requests */}
      {requests.length > 0 && (
        <section>
          <div className="mb-3 flex items-center gap-2">
            <AlertCircle size={15} className="text-yellow-400" />
            <h2 className="text-lg font-semibold text-white">Session Requests</h2>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400 text-xs font-bold text-black">
              {requests.length}
            </span>
          </div>
          <div className="flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
            {requests.map((r) => (
              <div key={r.id} className="flex items-center justify-between border-b border-zinc-800 last:border-none px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-800 text-sm font-bold text-white shrink-0">
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-200">{r.name}</p>
                    <div className="mt-0.5 flex items-center gap-3 text-xs text-zinc-600">
                      <span>{r.topic}</span>
                      <span>{r.mode}</span>
                      <span className="flex items-center gap-1 text-yellow-400"><Star size={10} />+{r.credits} credits</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => handleRequest(r.id, false)}
                    className="flex h-8 w-8 items-center justify-center rounded-xl border border-zinc-700 text-zinc-500 hover:border-red-500 hover:text-red-400 transition">
                    <X size={14} />
                  </button>
                  <button onClick={() => handleRequest(r.id, true)}
                    className="flex h-8 w-8 items-center justify-center rounded-xl border border-zinc-700 text-zinc-500 hover:border-green-500 hover:text-green-400 transition">
                    <Check size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Upcoming Appointments */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <Calendar size={15} className="text-zinc-400" />
          <h2 className="text-lg font-semibold text-white">Appointments</h2>
          <span className="text-sm text-zinc-600">({upcomingSessions.length} upcoming)</span>
        </div>
        <div className="flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
          {upcomingSessions.map((s) => (
            <div key={s.id} className="flex items-center justify-between border-b border-zinc-800 last:border-none px-6 py-4 hover:bg-zinc-800/40 transition">
              <div className="flex items-center gap-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-800 text-sm font-bold text-white shrink-0">
                  {s.name[0]}
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-200">{s.name}</p>
                  <div className="mt-0.5 flex items-center gap-3 text-xs text-zinc-600">
                    <span>{s.topic}</span>
                    <span>{s.mode}</span>
                    <span className="flex items-center gap-1"><Clock size={10} />{s.time}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <span className="flex items-center gap-1 text-xs text-yellow-400 font-medium">
                  <Star size={11} />+{s.credits}
                </span>
                <button className="flex items-center gap-1.5 rounded-xl bg-yellow-400 px-4 py-1.5 text-xs font-bold text-black hover:bg-yellow-300 transition">
                  Join <ArrowRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Availability Settings */}
      <section>
        <div className="mb-3">
          <button onClick={() => setShowAvail(!showAvail)}
            className="flex w-full items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 px-6 py-4 text-left hover:border-zinc-700 transition">
            <div className="flex items-center gap-2">
              <Users size={15} className="text-zinc-400" />
              <h2 className="text-base font-semibold text-white">Availability Settings</h2>
              <span className="text-xs text-zinc-600">
                {selectedDays.length} days · {selectedSlots.length} slots · {selectedTopics.length} topics
              </span>
            </div>
            {showAvail ? <ChevronUp size={15} className="text-zinc-500" /> : <ChevronDown size={15} className="text-zinc-500" />}
          </button>
        </div>

        {showAvail && (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 divide-y divide-zinc-800">

            {/* Days */}
            <div className="px-6 py-4 space-y-3">
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Available Days</p>
              <div className="flex flex-wrap gap-2">
                {days.map(d => (
                  <button key={d} onClick={() => toggleDay(d)}
                    className={`rounded-xl border px-4 py-1.5 text-sm font-medium transition
                      ${selectedDays.includes(d) ? "border-yellow-400 bg-yellow-400/10 text-yellow-400" : "border-zinc-800 text-zinc-500 hover:border-zinc-600"}`}>
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Time slots */}
            <div className="px-6 py-4 space-y-3">
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Time Slots</p>
              <div className="flex flex-wrap gap-2">
                {slots.map(s => (
                  <button key={s} onClick={() => toggleSlot(s)}
                    className={`rounded-xl border px-4 py-1.5 text-sm font-medium transition
                      ${selectedSlots.includes(s) ? "border-yellow-400 bg-yellow-400/10 text-yellow-400" : "border-zinc-800 text-zinc-500 hover:border-zinc-600"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Topics */}
            <div className="px-6 py-4 space-y-3">
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Interview Topics</p>
              <div className="flex flex-wrap gap-2">
                {topics.map(t => (
                  <button key={t} onClick={() => toggleTopic(t)}
                    className={`rounded-xl border px-4 py-1.5 text-sm font-medium transition
                      ${selectedTopics.includes(t) ? "border-yellow-400 bg-yellow-400/10 text-yellow-400" : "border-zinc-800 text-zinc-500 hover:border-zinc-600"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end px-6 py-4">
              <button className="flex items-center gap-2 rounded-xl bg-yellow-400 px-5 py-2 text-sm font-bold text-black hover:bg-yellow-300 transition">
                Save Availability
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Performance */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <TrendingUp size={15} className="text-zinc-400" />
          <h2 className="text-lg font-semibold text-white">Your Performance</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { label: "Student Rating",   value: "4.8 / 5",  sub: "Avg across 24 sessions"  },
            { label: "Completion Rate",  value: "96%",       sub: "Sessions completed on time" },
            { label: "Repeat Students",  value: "38%",       sub: "Booked you more than once" },
          ].map((p, i) => (
            <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4">
              <p className="text-xs text-zinc-500">{p.label}</p>
              <p className="text-2xl font-bold text-white mt-1">{p.value}</p>
              <p className="text-xs text-zinc-600 mt-1">{p.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Sessions */}
      <section>
        <div className="mb-3">
          <h2 className="text-lg font-semibold text-white">Recent Sessions</h2>
          <p className="mt-1 text-sm text-zinc-500">Your completed interview sessions.</p>
        </div>
        <div className="flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
          {recentSessions.map((s, i) => (
            <div key={i} className="flex items-center justify-between border-b border-zinc-800 last:border-none px-6 py-3.5 hover:bg-zinc-800/40 transition">
              <div className="flex items-center gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-800 text-xs font-bold text-white shrink-0">
                  {s.name[0]}
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-300">{s.name}</p>
                  <div className="mt-0.5 flex items-center gap-3 text-xs text-zinc-600">
                    <span>{s.topic}</span>
                    <span>{s.mode}</span>
                    <span>{s.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-5 shrink-0">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={11} className={i < s.studentRating ? "text-yellow-400 fill-yellow-400" : "text-zinc-700"} />
                  ))}
                </div>
                <span className={`text-xs font-medium ${getVerdictColor(s.verdict)}`}>{s.verdict}</span>
                <span className="flex items-center gap-1 text-xs text-yellow-400 font-medium">
                  <Star size={11} />+{s.credits}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Withdraw Modal */}
      {showWithdraw && <WithdrawModal available={withdrawable} onClose={() => setShowWithdraw(false)} />}

    </div>
  );
};

export default InterviewerDashboard;

