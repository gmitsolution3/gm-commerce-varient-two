"use client";

import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { User, ChevronDown, Package, RefreshCw, Sparkles } from "lucide-react";

export const NavBarMenu = () => {
  const { user, isAuthenticated, logout, loading } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (loading) return null;

  const handleLogout = () => {
    logout();
    toast.success("Logout successfully");
    setDropdownOpen(false);
  };

  return (
    <div className="hidden md:flex items-center gap-4 relative">
      {!isAuthenticated ? (
        <>
          <Link
            href="/auth/sign-in"
            className="group relative px-4 py-2 text-sm font-semibold text-white overflow-hidden rounded-lg transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 bg-white/20 transition-transform group-hover:scale-110"></div>
            <span className="relative flex items-center gap-2">
              <User className="w-4 h-4" />
              Login
            </span>
          </Link>
          
          <Link
            href="/order-tracking"
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white/80 hover:text-white transition-all duration-200 hover:bg-white/10 rounded-lg backdrop-blur-sm"
          >
            <Package className="w-4 h-4" />
            Track Order
          </Link>
          
          <Link
            href="/return-policy"
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white/80 hover:text-white transition-all duration-200 hover:bg-white/10 rounded-lg backdrop-blur-sm"
          >
            <RefreshCw className="w-4 h-4" />
            Returns
          </Link>
        </>
      ) : (
        <div className="relative">
          {/* Profile button with glow effect */}
          <button
            className="group flex items-center gap-3 px-4 py-2 rounded-xl hover:border-white/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/50"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-primary text-sm font-bold shadow-lg">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-primary animate-pulse"></div>
            </div>
            <span className="text-sm font-semibold text-white">{user?.name || "Account"}</span>
            <ChevronDown className="w-4 h-4 text-white/80 group-hover:text-white transition-transform group-hover:translate-y-0.5" />
          </button>

          {/* Dropdown menu with glass effect */}
          {dropdownOpen && (
            <div
              className="absolute right-0 top-10 w-56 bg-white backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl shadow-primary/20 overflow-hidden z-50"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <div className="p-1">
                <Link
                  href="/profile"
                  className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:text-primary hover:bg-primary/10 rounded-xl transition-all duration-200 group"
                >
                  <User className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">My Account</span>
                </Link>
                
                <Link
                  href="/order-tracking"
                  className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:text-primary hover:bg-primary/10 rounded-xl transition-all duration-200 group"
                >
                  <Package className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Track Order</span>
                </Link>
                
                <Link
                  href="/return-policy"
                  className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:text-primary hover:bg-primary/10 rounded-xl transition-all duration-200 group"
                >
                  <RefreshCw className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Returns</span>
                </Link>
                
                <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent my-1"></div>
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200 group"
                >
                  <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};