import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const CTA = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <section className=" bg-zinc-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-16 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-100"> Start practicing </h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-400"> Run a mock interview or work through this week's DSA set. </p>
        </div>

        <div className="flex gap-3">
          {user ? (
            <button type="button" onClick={() => navigate("/dashboard")} className="rounded-md bg-indigo-400 px-6 py-3 text-sm font-medium text-zinc-950 hover:bg-indigo-300"> Open dashboard </button>
          ) : (
            <>
              <button type="button" onClick={() => navigate("/signup")} className="rounded-md bg-indigo-400 px-6 py-3 text-sm font-medium text-zinc-950 hover:bg-indigo-300" > Create account </button>
              <button type="button" onClick={() => navigate("/login")} className="rounded-md border border-zinc-800 px-6 py-3 text-sm text-zinc-300 hover:text-zinc-100"> Log in </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTA;