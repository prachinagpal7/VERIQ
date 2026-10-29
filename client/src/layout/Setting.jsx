import React, { useState } from "react";
import { Save, Eye, EyeOff, AlertTriangle } from "lucide-react";

const Toggle = ({ enabled, onChange }) => (
  <button
    onClick={() => onChange(!enabled)}
    className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${enabled ? "bg-yellow-400" : "bg-zinc-700"}`}
  >
    <div className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${enabled ? "translate-x-4" : "translate-x-0"}`} />
  </button>
);

const Input = (props) => (
  <input
    {...props}
    className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white outline-none transition focus:border-yellow-400 placeholder:text-zinc-600"
  />
);

// Two-column row: label left, control right
const Row = ({ label, hint, children }) => (
  <div className="grid grid-cols-1 gap-2 py-4 border-b border-zinc-800 last:border-none sm:grid-cols-[1fr_320px] sm:items-center sm:gap-8">
    <div>
      <p className="text-sm font-medium text-zinc-300">{label}</p>
      {hint && <p className="mt-0.5 text-xs text-zinc-600">{hint}</p>}
    </div>
    <div>{children}</div>
  </div>
);

const SectionTitle = ({ title, subtitle }) => (
  <div className="mb-1">
    <h2 className="text-base font-semibold text-white">{title}</h2>
    {subtitle && <p className="mt-0.5 text-xs text-zinc-500">{subtitle}</p>}
  </div>
);

const Section = ({ children }) => (
  <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-6">
    {children}
  </div>
);

const Settings = () => {
  const [email,       setEmail]      = useState("prachi@example.com");
  const [role,        setRole]       = useState("interviewee");
  const [currentPw,  setCurrentPw]  = useState("");
  const [newPw,      setNewPw]      = useState("");
  const [confirmPw,  setConfirmPw]  = useState("");
  const [showPw,     setShowPw]     = useState(false);
  const [deleteText, setDeleteText] = useState("");

  const [notifs, setNotifs] = useState({
    interviewReminder: true,
    reportReady:       true,
    creditLow:         true,
    newFeatures:       false,
    weeklyDigest:      false,
  });

  const notifItems = [
    { key: "interviewReminder", label: "Interview reminders",    hint: "Notified before a scheduled session starts"  },
    { key: "reportReady",       label: "Report ready",           hint: "When your interview feedback is generated"   },
    { key: "creditLow",         label: "Low credits warning",    hint: "Alert when credits drop below 5"             },
    { key: "newFeatures",       label: "Product updates",        hint: "New features and platform announcements"     },
    { key: "weeklyDigest",      label: "Weekly progress digest", hint: "Summary of your activity every Monday"       },
  ];

  return (
    <div className="space-y-10">

      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="mt-1 text-sm text-zinc-500">Manage your account and preferences.</p>
      </div>

      {/* Account */}
      <div className="space-y-3">
        <SectionTitle title="Account" subtitle="Update your login email and platform role." />
        <Section>
          <Row label="Email address" hint="Used for login and notifications">
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Row>
          <Row label="Platform role" hint="Switch between Interviewee and Interviewer">
            <div className="flex gap-2">
              {["interviewee", "interviewer"].map((r) => (
                <button key={r} onClick={() => setRole(r)}
                  className={`flex-1 rounded-xl border py-2 text-sm font-medium capitalize transition
                    ${role === r
                      ? "border-yellow-400 bg-yellow-400/10 text-yellow-400"
                      : "border-zinc-700 bg-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"}`}>
                  {r}
                </button>
              ))}
            </div>
          </Row>
          <div className="flex justify-end py-4">
            <button className="flex items-center gap-2 rounded-xl bg-yellow-400 px-5 py-2 text-sm font-semibold text-black transition hover:bg-yellow-300">
              <Save size={14} /> Save Changes
            </button>
          </div>
        </Section>
      </div>

      {/* Password */}
      <div className="space-y-3">
        <SectionTitle title="Password" subtitle="Change your login password." />
        <Section>
          <Row label="Current password" hint="Enter your existing password to verify">
            <div className="relative">
              <Input
                type={showPw ? "text" : "password"}
                value={currentPw}
                onChange={(e) => setCurrentPw(e.target.value)}
                placeholder="Current password"
              />
              <button onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition">
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </Row>
          <Row label="New password" hint="Minimum 8 characters">
            <Input type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)} placeholder="New password" />
          </Row>
          <Row label="Confirm new password">
            <div className="space-y-1.5">
              <Input type="password" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} placeholder="Repeat new password" />
              {newPw && confirmPw && newPw !== confirmPw && (
                <p className="text-xs text-red-400">Passwords don't match.</p>
              )}
            </div>
          </Row>
          <div className="flex justify-end py-4">
            <button
              disabled={!currentPw || !newPw || newPw !== confirmPw}
              className="flex items-center gap-2 rounded-xl bg-yellow-400 px-5 py-2 text-sm font-semibold text-black transition hover:bg-yellow-300 disabled:opacity-30 disabled:cursor-not-allowed">
              <Save size={14} /> Update Password
            </button>
          </div>
        </Section>
      </div>

      {/* Notifications */}
      <div className="space-y-3">
        <SectionTitle title="Notifications" subtitle="Control what VERIQ sends you." />
        <Section>
          {notifItems.map(({ key, label, hint }) => (
            <div key={key} className="flex items-center justify-between gap-8 py-4 border-b border-zinc-800 last:border-none">
              <div>
                <p className="text-sm font-medium text-zinc-300">{label}</p>
                <p className="mt-0.5 text-xs text-zinc-600">{hint}</p>
              </div>
              <Toggle enabled={notifs[key]} onChange={() => setNotifs(p => ({ ...p, [key]: !p[key] }))} />
            </div>
          ))}
        </Section>
      </div>

      {/* Credits */}
      <div className="space-y-3">
        <SectionTitle title="Credits" subtitle="Your current balance and session pricing." />
        <Section>
          <Row label="Current balance" hint="Credits are deducted per interview session">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-yellow-400">12</span>
              <span className="text-sm text-zinc-500">credits</span>
            </div>
          </Row>
          <Row label="Session pricing" hint="Each interview type costs a fixed number of credits">
            <div className="space-y-2 text-sm text-zinc-500">
              <div className="flex justify-between">
                <span>Technical Chat Assessment</span>
                <span className="text-white font-medium">2 credits</span>
              </div>
              <div className="flex justify-between">
                <span>AI Video Interview</span>
                <span className="text-white font-medium">4 credits</span>
              </div>
              <div className="flex justify-between">
                <span>Real Interviewer</span>
                <span className="text-white font-medium">10 credits</span>
              </div>
            </div>
          </Row>
          <Row label="Top up credits" hint="Purchase more credits for interview sessions">
            <button disabled className="w-full rounded-xl border border-zinc-700 py-2 text-sm text-zinc-600 cursor-not-allowed">
              Coming Soon
            </button>
          </Row>
        </Section>
      </div>

      {/* Danger Zone */}
      <div className="space-y-3">
        <SectionTitle title="Danger Zone" />
        <div className="rounded-xl border border-red-900/40 bg-red-950/10 px-6">
          <div className="grid grid-cols-1 gap-2 py-4 sm:grid-cols-[1fr_320px] sm:items-start sm:gap-8">
            <div className="flex items-start gap-3">
              <AlertTriangle size={15} className="text-red-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-red-400">Delete Account</p>
                <p className="mt-1 text-xs text-zinc-600 leading-5">
                  Permanently deletes your account, all submissions, interviews, and reports. This cannot be undone.
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-zinc-600">
                Type <span className="font-mono text-zinc-400">delete my account</span> to confirm
              </p>
              <div className="flex gap-2">
                <Input value={deleteText} onChange={(e) => setDeleteText(e.target.value)} placeholder="delete my account" />
                <button
                  disabled={deleteText !== "delete my account"}
                  className="shrink-0 rounded-xl border border-red-800 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-950/40 disabled:opacity-30 disabled:cursor-not-allowed">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Settings;
