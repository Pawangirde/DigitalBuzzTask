import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Updated paths for each widget
  const navItems = [
    { name: "DateTime Widget", path: "/" },
    { name: "DropDown / Select Widget", path: "/dropdown" },
    { name: "Chart Widget", path: "/chart" },
    { name: "Multi Document Upload", path: "/upload" },
    { name: "FireBase Notification", path: "/notifications" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 ">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out
        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 ">
          <Link
            to="/"
            className="text-xl font-bold text-gray-700 dark:text-gray-200"
          >
            DIGITALBUZZ
          </Link>
          <button
            className="sm:hidden text-gray-600 dark:text-gray-300"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="mt-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-6 py-3 rounded-md mx-2 transition ${
                location.pathname === item.path
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 sm:ml-64">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 flex items-center justify-between bg-white dark:bg-gray-800 shadow px-5 py-3.5">
          <div className="flex items-center gap-2">
            {/* Mobile Sidebar Toggle */}
            <button
              className="sm:hidden text-gray-600 dark:text-gray-300"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {navItems.find((item) => item.path === location.pathname)?.name ||
                "Dashboard"}
            </h1>
          </div>

          {/* Right-side */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/notifications")}
              className="text-gray-600 dark:text-gray-300 hover:text-blue-500"
            >
              🔔
            </button>
            <img
              src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              alt="User avatar"
              className="w-8 h-8 rounded-full border"
            />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
