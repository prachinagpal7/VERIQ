import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Code2, Users, ArrowRight, Sparkles, Check } from "lucide-react";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from "../context/AuthContext";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const roles = [
  {
    id: "interviewee",
    label: "Interviewee",
    icon: Code2,
    heading: "I want to prepare and get hired",
    points: [
      "Solve each week's most important DSA interview questions",
      "Take AI-powered chat or video mock interviews",
      "Get AI feedback and performance reports",
      "Track your interview skills and improve week after week",
    ],
  },
  {
    id: "interviewer",
    label: "Interviewer",
    icon: Users,
    heading: "I want to conduct interviews and earn",
    points: [
      "Conduct mock interviews for students",
      "Earn credits for every session you take",
      "Use AI-generated questions for candidates",
      "Set your availability and interview topics",
    ],
  },
];

const RoleSelection = () => {
  const [selected, setSelected] = useState(null);
  const {accessToken, user, setUser} = useAuth();
  const navigate = useNavigate();

  const roleSelect = async () => {
    if (!selected) {
      return toast.error("Please select a role");
    }
    try {
      const response = await axios.post("/api/auth/role", {
      role: selected
      }, {
          headers: {Authorization: `Bearer ${accessToken}`},
          withCredentials: true
      });
      toast.success(response.data.message);
      setUser(response.data.user)
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-12">

      {/* Logo */}
      <div className="flex items-center gap-2 mb-12">
        <Sparkles size={20} className="text-yellow-400" />
        <h1 className="text-2xl font-black tracking-widest text-yellow-400">VERIQ</h1>
      </div>

      {/* Heading */}
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-white">How will you use VERIQ?</h2>
        <p className="mt-2 text-sm text-zinc-500">Choose your role. {/*You can change this later from settings.*/}</p>
      </div>

      {/* Role options*/}
      {/*selected box background - bg-yellow-400/5 */}
      <div className="w-full max-w-2xl flex flex-col sm:flex-row gap-3">
        {roles.map((role) => {
          const Icon = role.icon;
          const isSelected = selected === role.id;
          return (
            <button
              key={role.id}
              onClick={() => setSelected(role.id)}     
              className={`flex-1 rounded-2xl border text-left p-6 transition-all bg-zinc-900
                ${isSelected
                  ? "border-yellow-400"
                  : "border-zinc-800 hover:border-zinc-600"}`}
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-5">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl border
                  ${isSelected ? "border-yellow-400/40 bg-yellow-400/10 text-yellow-400" : "border-zinc-700 bg-zinc-800 text-zinc-400"}`}>
                  <Icon size={18} />
                </div>
                {isSelected && (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400">
                    <Check size={12} className="text-black" strokeWidth={3} />
                  </div>
                )}
              </div>

              <p className={`text-base font-semibold mb-1 ${isSelected ? "text-white" : "text-zinc-300"}`}>
                {role.label}
              </p>
              <p className="text-xs text-zinc-500 mb-5 leading-5">{role.heading}</p>

              {/* Points */}
              <ul className="space-y-2">
                {role.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-zinc-500">
                    <div className={`mt-0.5 h-1.5 w-1.5 rounded-full shrink-0 ${isSelected ? "bg-yellow-400" : "bg-zinc-700"}`} />
                    {point}
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>

      {/* Continue */}
      <div className="mt-8 w-full max-w-2xl">
        <button
          onClick={() => roleSelect()}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-yellow-400 py-3.5 text-sm font-bold text-black transition hover:bg-yellow-300 "
        >
          Continue as {selected ? roles.find(r => r.id === selected)?.label : "..."}
          <ArrowRight size={16} />
        </button>
        <p className="mt-3 text-center text-xs text-zinc-700">
          You can switch roles anytime {/*from your profile settings*/}.
        </p>
      </div>

    </div>
  );
};

export default RoleSelection;