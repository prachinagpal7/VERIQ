import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Role from "./pages/Role";
import Dashboard from "./pages/Dashboard";
import DashboardHome from "./layout/DashboardHome";
import Coding from "./layout/Coding";
import Interview from "./layout/Interview";
import Report from "./layout/Report";
import Profile from "./layout/Profile";
import Setting from "./layout/Setting";
import ProblemDetails from "./layout/ProblemDetails";
import ChatInterviewPage from "./layout/ChatInterviewPage";
import AiInterviewPage from "./layout/AiInterviewPage";
import InterviewerDashboard from "./layout/InterviewerDashboard";
import ProtectedRoutes from "./components/ProtectedRoutes";

const toastOptions = {
  duration: 2000,
  style: {
    background: "#09090b",
    color: "#f4f4f5",
    border: "1px solid #27272a",
    borderRadius: "6px",
    padding: "10px 14px",
    fontSize: "13px",
    boxShadow: "none",
  },
  success: { iconTheme: { primary: "#34d399", secondary: "#09090b" },},
  error: { iconTheme: { primary: "#f87171", secondary: "#09090b" },},
};
//style: { border: "1px solid rgba(52, 211, 153, 0.35)" },  ,   style: { border: "1px solid rgba(248, 113, 113, 0.35)" }, 

const App = () => {
  return (
    <>
      <Toaster position="top-right" toastOptions={toastOptions} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/role" element={<Role />} />
        <Route path="/dashboard" element={
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        }>
          <Route index element={<DashboardHome />} />
          <Route path="coding" element={<Coding />} />
          <Route path="interview" element={<Interview />} />
          <Route path="report" element={<Report />} />
          <Route path="profile" element={<Profile />} />
          <Route path="setting" element={<Setting />} />
          <Route path="chatInterviewPage/:interviewId" element={<ChatInterviewPage />} />
          <Route path="aiInterviewPage/:interviewId" element={<AiInterviewPage />} />
          <Route path="interviewerDashboard" element={<InterviewerDashboard />} />
        </Route>
        <Route path="/problem/:problemId" element={
          <ProtectedRoutes>
            <ProblemDetails />
          </ProtectedRoutes>
        }/>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
