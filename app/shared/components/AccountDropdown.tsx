"use client";

import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Menu, X, User, Package, RefreshCw, Sparkles } from "lucide-react";

export default function AccountDropdown() {
  const { user, isAuthenticated, logout, loading } = useAuth();
  const [open, setOpen] = useState(false);

  if (loading) return null;

  const handleLogout = () => {
    logout();
    toast.success("Logout successfully");
    setOpen(false);
  };

  return (
    <div className="relative">
      {/* Fancy toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative w-10 h-10 flex items-center justify-center border  rounded-xl text-white hover:border-white/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/50"
        aria-label="Menu"
      >
        {open ? (
          <X className="w-5 h-5 transition-transform rotate-90" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </button>

      {/* Dropdown Menu with glass morphism */}
      {open && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setOpen(false)}
          ></div>
          
          <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl overflow-hidden z-50">
            {!isAuthenticated ? (
              <div className="p-1">
                <Link
                  href="/auth/sign-in"
                  className="flex items-center gap-3 px-4 py-3 text-sm text-white hover:bg-primary/90 bg-primary rounded-xl transition-all duration-200 group"
                  onClick={() => setOpen(false)}
                >
                  <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="font-semibold">Login</span>
                </Link>
                
                <Link
                  href="/order-tracking"
                  className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:text-primary hover:bg-primary/10 rounded-xl transition-all duration-200 group"
                  onClick={() => setOpen(false)}
                >
                  <Package className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Track Order</span>
                </Link>
                
                <Link
                  href="/return-policy"
                  className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:text-primary hover:bg-primary/10 rounded-xl transition-all duration-200 group"
                  onClick={() => setOpen(false)}
                >
                  <RefreshCw className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Returns</span>
                </Link>
              </div>
            ) : (
              <div className="p-1">
                {/* User info header */}
                <div className="px-4 py-3 mb-1 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold shadow-lg">
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{user?.name}</p>
                      <p className="text-xs text-primary">Premium Member</p>
                    </div>
                  </div>
                </div>
                
                <Link
                  href="/profile"
                  className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:text-primary hover:bg-primary/10 rounded-xl transition-all duration-200 group"
                  onClick={() => setOpen(false)}
                >
                  <User className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">My Account</span>
                </Link>
                
                <Link
                  href="/order-tracking"
                  className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:text-primary hover:bg-primary/10 rounded-xl transition-all duration-200 group"
                  onClick={() => setOpen(false)}
                >
                  <Package className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Track Order</span>
                </Link>
                
                <Link
                  href="/return-policy"
                  className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:text-primary hover:bg-primary/10 rounded-xl transition-all duration-200 group"
                  onClick={() => setOpen(false)}
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
            )}
          </div>
        </>
      )}
    </div>
  );
}