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
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6">

      {/* MAIN CONTAINER */}
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2">

        {/* LEFT IMAGE */}
        <div className="relative hidden md:block">

          <img
            src="/login.jpg"
            alt="Login"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* soft dark overlay */}
          <div className="absolute inset-0 bg-black/30"></div>

          {/* text on image */}
          <div className="absolute bottom-10 left-8 text-white max-w-xs">
            <p className="text-lg font-semibold">
              “Simply all the tools that my team and I need.”
            </p>

            <p className="text-sm text-gray-200 mt-2">
              Admin Dashboard
            </p>
          </div>

        </div>


        {/* LOGIN PANEL */}
        <div className="flex items-center justify-center p-10">

          <div className="w-full max-w-sm">

            <h1 className="text-2xl font-bold text-center">
              Admin Login
            </h1>

            <p className="text-sm text-gray-500 text-center mt-2 mb-6">
              Access the blog dashboard
            </p>

            {/* password input */}
            <input
              type="password"
              placeholder="Enter Admin Password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              className="w-full border border-gray-200 p-3 rounded-lg mb-4 focus:outline-none focus:border-black transition"
            />

            {/* login button */}
            <button
              onClick={handleLogin}
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition font-medium"
            >
              Login
            </button>

            <p className="text-center text-xs text-gray-400 mt-6">
              Ahsan's Blog Admin Panel
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}