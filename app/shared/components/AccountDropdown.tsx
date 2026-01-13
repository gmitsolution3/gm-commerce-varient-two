"use client";

import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function AccountDropdown() {
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated, logout, loading } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (loading) return null;

  const handleLogout = () => {
    toast.success("Logout successfully"), logout();
  };

  return (
    <div className="relative">
      {!isAuthenticated ? (
        <h5
          onClick={() => setOpen(!open)}
          className="cursor-pointer hover:underline border px-3 py-2 text-sm rounded-lg font-bold bg-[#136481] text-white"
        >
          My Account
        </h5>
      ) : (
        <div className="relative">
          {/* Profile circle */}
          <div
            className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold cursor-pointer"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          {/* Dropdown menu */}
          {dropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <Link
                href="/profile"
                className="block px-4 py-2 text-gray-700 hover:bg-[#0970B4] hover:text-white hover:cursor-pointer"
              >
                Profile
              </Link>
              <h5 className="block px-4 py-2 text-gray-700 hover:bg-[#0970B4] hover:text-white hover:cursor-pointer">
                Order Tracking
              </h5>
              <h5 className="block px-4 py-2 text-gray-700 hover:bg-[#0970B4] hover:text-white hover:cursor-pointer">
                Return Policy
              </h5>

              <button
                onClick={() => handleLogout()}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-[#0970B4] hover:text-white hover:cursor-pointer border-t border-gray-300"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}

      {open && (
        <>
          <Link
            href="/auth/sign-in"
            className="hover:cursor-pointer px-3 py-2 border font-bold border-[#1594e9] rounded-lg hover:bg-white hover:text-[#0970B4]"
          >
            Log in
          </Link>
          <h5 className="hover:cursor-pointer px-3 py-2 border font-bold border-[#1594e9] rounded-lg hover:bg-white hover:text-[#0970B4]">
            Order Tracking
          </h5>
          <h5 className="hover:cursor-pointer px-3 py-2 border font-bold border-[#1594e9] rounded-lg hover:bg-white hover:text-[#0970B4]">
            Return Policy
          </h5>
        </>
      )}
    </div>
  );
}
