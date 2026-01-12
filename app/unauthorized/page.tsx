import React from "react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
      <p className="text-gray-500 mt-2">
        You don’t have permission to access this page.
      </p>
    </div>
  );
}
