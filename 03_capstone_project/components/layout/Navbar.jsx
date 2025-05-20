"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

// Navbar component: shows navigation links and user authentication UI
// Handles login/logout state, dropdown menu, and syncs with localStorage
export default function Navbar() {
  // State for user authentication and dropdown
  const [userName, setUserName] = useState(""); // Current user's name
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Auth status
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown menu state

  // On mount, check if user is logged in by looking at localStorage
  useEffect(() => {
    // Check localStorage for user info on mount
    const token = localStorage.getItem("token");
    const storedName = localStorage.getItem("userName");
    setIsLoggedIn(!!token);
    setUserName(storedName || "");

    // Listen for login/logout changes in other tabs
    function handleStorageChange() {
      const token = localStorage.getItem("token");
      const storedName = localStorage.getItem("userName");
      setIsLoggedIn(!!token);
      setUserName(storedName || "");
    }
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Handle user logout: clear localStorage, update state, close dropdown, redirect
  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    setUserName("");
    setDropdownOpen(false);
    window.location.href = "/";
  }

  // Toggle dropdown menu open/close
  function handleUserClick() {
    setDropdownOpen((open) => !open);
  }

  // Close dropdown if clicking outside
  function handleCloseDropdown(e) {
    if (!e.target.closest("#user-dropdown")) setDropdownOpen(false);
  }

  // Add/remove event listener for closing dropdown on outside click
  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleCloseDropdown);
      return () =>
        document.removeEventListener("mousedown", handleCloseDropdown);
    }
  }, [dropdownOpen]);

  // Navbar UI
  return (
    // Main navbar container
    <nav className="bg-white shadow-md mb-4">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <Link href="/" className="text-xl font-bold text-blue-700">
          LibraryMS
        </Link>
        <div className="space-x-4 flex items-center">
          <Link href="/books" className="text-gray-700 hover:text-blue-600">
            Books
          </Link>
          {!isLoggedIn && (
            <>
              <Link href="/login" className="text-gray-700 hover:text-blue-600">
                Login
              </Link>
              <Link
                href="/register"
                className="text-gray-700 hover:text-blue-600"
              >
                Sign Up
              </Link>
            </>
          )}
          {isLoggedIn && (
            <div className="relative" id="user-dropdown">
              <button
                onClick={handleUserClick}
                className="flex items-center gap-2 px-3 py-2 bg-blue-100 rounded hover:bg-blue-200 focus:outline-none"
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
              >
                <span className="font-semibold text-blue-700">
                  {userName || "User"}
                </span>
                <svg
                  className="w-4 h-4 text-blue-700"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg z-10">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
