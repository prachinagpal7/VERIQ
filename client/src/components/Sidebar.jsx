import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AlertTriangle, LogOut, X } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import sidebarItem from "../assets/assets";
import { useAuth } from "../context/AuthContext.jsx";
import Logo from "./Logo";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Sidebar = ({ open, onClose }) => {
  const { setAccessToken, setUser, accessToken } = useAuth();
  const navigate = useNavigate();
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // Don't leave the confirmation box open when the mobile drawer closes.
  useEffect(() => {
    if (!open) setConfirmLogout(false);
  }, [open]);

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      const { data } = await axios.get("/api/auth/logout", {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      });
      setAccessToken(null);
      setUser(null);
      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      setLoggingOut(false);
    }
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex w-60 flex-col border-r border-zinc-800 bg-zinc-950 transition-[transform,visibility] duration-200 lg:translate-x-0 ${
        open ? "translate-x-0" : "-translate-x-full max-lg:invisible"
      }`}
    >
      {/* Logo row, same height as the topbar so the borders line up */}
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-zinc-800 pl-6 pr-4">
        <Logo />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="rounded-md p-1 text-zinc-500 hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 lg:hidden"
        >
          <X size={18} />
        </button>
      </div>

      {/* Nav links */}
      <nav aria-label="Main" className="flex-1 overflow-y-auto p-3">
        {sidebarItem.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            end={item.path === "/dashboard"}
            onClick={onClose}
            className={({ isActive }) =>
              `relative mb-1 flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                isActive
                  ? "bg-zinc-900 text-zinc-100"
                  : "text-zinc-400 hover:bg-zinc-900/60 hover:text-zinc-100"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute inset-y-1.5 left-0 w-0.5 rounded-full bg-indigo-400" />
                )}
                <item.icon size={16} className={isActive ? "text-indigo-400" : ""} />
                <span>{item.title}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="shrink-0 border-t border-zinc-800 p-3">
        {!confirmLogout ? (
          <button
            type="button"
            onClick={() => setConfirmLogout(true)}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-zinc-500 transition-colors hover:bg-zinc-900 hover:text-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          >
            <LogOut size={16} />
            Log out
          </button>
        ) : (
          <div
            role="alertdialog"
            aria-label="Confirm log out"
            className="space-y-3 rounded-lg border border-zinc-800 bg-zinc-900 p-3"
          >
            <div className="flex items-start gap-2">
              <AlertTriangle size={14} className="mt-0.5 shrink-0 text-red-400" />
              <div>
                <p className="text-sm font-medium text-zinc-100">Log out?</p>
                <p className="mt-0.5 text-xs leading-4 text-zinc-500">
                  You'll need to sign in again to get back to your dashboard.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                autoFocus
                onClick={() => setConfirmLogout(false)}
                className="flex-1 rounded-md border border-zinc-700 py-1.5 text-xs text-zinc-300 transition-colors hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex-1 rounded-md border border-red-500/30 bg-red-500/10 py-1.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 disabled:opacity-60"
              >
                {loggingOut ? "Logging out…" : "Log out"}
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
