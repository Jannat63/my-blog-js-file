"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [secret, setSecret] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (secret === process.env.NEXT_PUBLIC_ADMIN_SECRET) {
      sessionStorage.setItem("admin", "true");
      router.push("/admin");
    } else {
      alert("Wrong password");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-6">

      <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl border">

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">
            Admin Login
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Access the blog dashboard
          </p>
        </div>

        {/* Input */}
        <input
          type="password"
          placeholder="Enter Admin Password"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          className="w-full border border-gray-200 p-3 rounded-lg mb-5 focus:outline-none focus:border-black transition"
        />

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition font-medium"
        >
          Login
        </button>

        {/* Footer Text */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Ahsan's Blog Admin Panel
        </p>

      </div>

    </main>
  );
}