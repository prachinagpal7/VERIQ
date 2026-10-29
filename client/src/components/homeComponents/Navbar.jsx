import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import Logo from "../Logo";

const navLinks = [
  { label: "Features", id: "features" },
  { label: "How it works", id: "how-it-works" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const scrollToSection = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950">
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-6">
        <Logo />
        <ul className="hidden md:flex gap-8 text-sm text-zinc-400">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button type="button" onClick={() => scrollToSection(link.id)} className="hover:text-zinc-100"> {link.label} </button>
            </li>
          ))}
        </ul>
        <div className="col-start-3 flex items-center justify-end gap-2">
          {user ? (
            <button type="button" onClick={() => navigate("/dashboard")} className="rounded-md bg-indigo-400 px-4 py-2 text-sm font-medium text-zinc-950 hover:bg-indigo-300"> Dashboard </button>
          ) : (
            <>
              <button type="button" onClick={() => navigate("/login")} className="rounded-md px-4 py-2 text-sm text-zinc-300 hover:text-zinc-100"> Log in </button>
              <button type="button" onClick={() => navigate("/signup")} className="rounded-md bg-indigo-400 px-4 py-2 text-sm font-medium text-zinc-950 hover:bg-indigo-300"> Sign up </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;