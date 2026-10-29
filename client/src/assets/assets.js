import {LayoutDashboard, Code2, Bot, FileText, User, Settings} from "lucide-react";

const sidebarItem = [
  {
    id: 1,
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    id: 2,
    title: "Weekly DSA",
    icon: Code2,
    path: "/dashboard/coding",
  },
  {
    id: 3,
    title: "AI Interviews",
    icon: Bot,
    path: "/dashboard/interview",
  },
  {
    id: 4,
    title: "Reports",
    icon: FileText,
    path: "/dashboard/report",
  },
];

export default sidebarItem;