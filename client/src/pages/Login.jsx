import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import Logo from "../components/Logo";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const inputClass = "mt-1.5 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 outline-none ";

const Login = () => {
  const { setAccessToken, setUser } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if(!email.trim() || !password){
      return toast.error("Please fill all fields");
    }
    if(!emailRegex.test(email.trim())){
      return toast.error("Please enter a valid email");
    }
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/login", { email: email.trim(), password }, { withCredentials: true },);
      setAccessToken(data.accessToken);
      setUser(data.user);
      toast.success(data.message);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-4 py-10 text-zinc-100">
      <Logo />
      <div className="mt-8 w-full max-w-sm rounded-md border border-zinc-900 bg-zinc-900/40 p-6">
        <h1 className="text-xl font-semibold tracking-tight">Log in</h1>
        <p className="mt-1 text-sm text-zinc-400"> Continue your interview practice. </p>
        <form onSubmit={onSubmit} noValidate className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm text-zinc-300"> Email </label>
            <input id="email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass}/>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm text-zinc-300" > Password </label>
            <div className="relative">
              <input id="password" type={showPw ? "text" : "password"} autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className={`${inputClass} pr-10`}/>
              <button type="button" onClick={() => setShowPw(!showPw)} aria-label={showPw ? "Hide password" : "Show password"} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-zinc-500 hover:text-zinc-100">
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading} className="mt-2 w-full rounded-md bg-indigo-400 py-2.5 text-sm font-medium text-zinc-950 hover:bg-indigo-300 disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? "Logging in…" : "Log in"}
          </button>
        </form>
      </div>

      <p className="mt-6 text-sm text-zinc-500">
        Don't have an account?{" "}
        <Link to="/signup" className="text-indigo-300 hover:text-indigo-200"> Sign up </Link>
      </p>
    </div>
  );
};

export default Login;