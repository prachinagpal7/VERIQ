import React, { useState } from "react";
import { CheckCircle2, Video, Flame, Star, Code2, TrendingUp, Edit3, Save, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const topicProgress = [
  { name: "Arrays",              solved: 18, total: 42 },
  { name: "Strings",             solved: 12, total: 31 },
  { name: "Dynamic Programming", solved: 5,  total: 20 },
  { name: "Trees",               solved: 8,  total: 27 },
  { name: "Graphs",              solved: 2,  total: 16 },
  { name: "Stack",               solved: 10, total: 18 },
];

const diffStats = [
  { label: "Easy",   solved: 18, total: 80,  color: "bg-green-400"  },
  { label: "Medium", solved: 15, total: 120, color: "bg-yellow-400" },
  { label: "Hard",   solved: 5,  total: 50,  color: "bg-red-400"    },
];

const Profile = () => {
  const {user} = useAuth();
  const [editing, setEditing]   = useState(false);
  const [name,    setName]      = useState(user.firstName);
  const [bio,     setBio]       = useState("");
  const [college, setCollege]   = useState("");
  const [github,  setGithub]    = useState("");
  const [linkedin,setLinkedin]  = useState("");

  const tempRef = React.useRef({});

  const startEdit = () => {
    tempRef.current = { name, bio, college, github, linkedin };
    setEditing(true);
  };

  const cancelEdit = () => {
    const t = tempRef.current;
    setName(t.name); setBio(t.bio); setCollege(t.college);
    setGithub(t.github); setLinkedin(t.linkedin);
    setEditing(false);
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white capitalize">Profile</h1>
        {!editing ? (
          <button onClick={startEdit}
            className="flex items-center gap-2 rounded-xl border border-zinc-700 px-4 py-2 text-sm text-zinc-400 transition hover:border-yellow-400 hover:text-white">
            <Edit3 size={14} /> Edit/Enter your details
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={cancelEdit}
              className="flex items-center gap-1.5 rounded-xl border border-zinc-700 px-4 py-2 text-sm text-zinc-400 transition hover:text-white">
              <X size={14} /> Cancel
            </button>
            <button onClick={() => setEditing(false)}
              className="flex items-center gap-1.5 rounded-xl bg-yellow-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-yellow-300">
              <Save size={14} /> Save
            </button>
          </div>
        )}
      </div>

      {/* Identity */}
      <div className="flex items-start gap-5 rounded-xl border border-zinc-800 bg-zinc-900 px-6 py-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-yellow-400 text-2xl font-black text-black uppercase">
          {user.firstLetter}
        </div>
        <div className="flex-1 space-y-3">
          {editing ? (
            <>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name..."
                className=" capitalize w-full rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-300 outline-none focus:border-yellow-400"/>
              <input value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Enter your short bio..."
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-300 outline-none focus:border-yellow-400" />
              <input value={college} onChange={(e) => setCollege(e.target.value)} placeholder="Enter your college/school name..."
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-400 outline-none focus:border-yellow-400" />
            </>
          ) : (
            <>
              <p className="text-lg font-semibold text-white">{name}</p>
              <p className="text-sm text-zinc-400">{bio}</p>
              <p className="text-sm text-zinc-600">{college}</p>
            </>
          )}

          <div className="flex flex-wrap gap-4 pt-1">
            {editing ? (
              <>
                <input value={github} onChange={(e) => setGithub(e.target.value)} placeholder="Enter GitHub URL..."
                  className="flex-1 rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs text-zinc-300 outline-none focus:border-yellow-400" />
                <input value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder="Enter LinkedIn URL..."
                  className="flex-1 rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs text-zinc-300 outline-none focus:border-yellow-400" />
              </>
            ) : (
              <>
                <a href={`https://${github}`} target="_blank" rel="noreferrer"
                  className="text-xs text-zinc-500 hover:text-yellow-400 transition">{github}</a>
                <a href={`https://${linkedin}`} target="_blank" rel="noreferrer"
                  className="text-xs text-zinc-500 hover:text-yellow-400 transition">{linkedin}</a>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      {/*<div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle2 size={13} className="text-green-400" />
            <p className="text-xs text-zinc-500">Problems Solved</p>
          </div>
          <p className="text-xl font-semibold text-white">0</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3">
          <div className="flex items-center gap-2 mb-1">
            <Video size={13} className="text-blue-400" />
            <p className="text-xs text-zinc-500">Interviews Done</p>
          </div>
          <p className="text-xl font-semibold text-white">0</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3">
          <div className="flex items-center gap-2 mb-1">
            <Flame size={13} className="text-orange-400" />
            <p className="text-xs text-zinc-500">Day Streak</p>
          </div>
          <p className="text-xl font-semibold text-white">{user.streak}</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3">
          <div className="flex items-center gap-2 mb-1">
            <Star size={13} className="text-yellow-400" />
            <p className="text-xs text-zinc-500">Credits Left</p>
          </div>
          <p className="text-xl font-semibold text-white">{user.credits}</p>
        </div>
      </div>*/}

      {/* Difficulty breakdown */}
      {/*<section>
        <div className="mb-3 flex items-center gap-2">
          <Code2 size={15} className="text-zinc-400" />
          <h2 className="text-lg font-semibold text-white">Problems by Difficulty</h2>
        </div>
        <div className="flex flex-col gap-3">
          {diffStats.map((d, i) => (
            <div key={i} className="flex items-center gap-4">
              <p className={`w-14 text-sm font-medium ${
                d.label === "Easy" ? "text-green-400" : d.label === "Medium" ? "text-yellow-400" : "text-red-400"
              }`}>{d.label}</p>
              
              <div className="flex-1 h-2 rounded-full bg-zinc-800">
                <div className={`h-2 rounded-full ${d.color} transition-all`} style={{ width: `${(d.solved / d.total) * 100}%` }} />
              </div>
              <p className="w-16 text-right text-xs text-zinc-500">{d.solved}/{d.total}</p>
            </div>
          ))}
        </div>
      </section>*/}

      {/* Topic progress */}
      {/*<section>
        <div className="mb-3 flex items-center gap-2">
          <TrendingUp size={15} className="text-zinc-400" />
          <h2 className="text-lg font-semibold text-white">Topic Progress</h2>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {topicProgress.map((t, i) => {
            const pct = Math.round((t.solved / t.total) * 100);
            return (
              <div key={i} className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 hover:border-zinc-700 transition">
                <div className="flex-1 min-w-0 mr-4">
                  <p className="text-sm font-medium text-zinc-300 truncate">{t.name}</p>
                  
                  <div className="mt-2 h-1 w-full rounded-full bg-zinc-800">
                    <div className="h-1 rounded-full bg-yellow-400 transition-all" style={{ width: `${pct}%` }} />
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-base font-bold text-white">{t.solved}</span>
                  <span className="text-xs text-zinc-600">/{t.total}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>*/}

    </div>
  );
};

export default Profile;


