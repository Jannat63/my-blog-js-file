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
    <main className="min-h-screen flex bg-gray-100">

      {/* LEFT IMAGE PANEL */}
      <div className="hidden md:flex w-1/2 relative">

        <img
          src="/login.jpg"
          alt="Login"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Quote text */}
        <div className="relative z-10 text-white p-12 flex flex-col justify-end">

          <h2 className="text-2xl font-semibold leading-relaxed max-w-md">
            “Simply all the tools that my team and I need.”
          </h2>

          <p className="text-sm text-gray-300 mt-4">
            Admin Dashboard
          </p>

        </div>

      </div>


      {/* RIGHT LOGIN PANEL */}
      <div className="flex w-full md:w-1/2 items-center justify-center px-8">

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


          {/* Password Field */}
          <input
            type="password"
            placeholder="Enter Admin Password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            className="w-full border border-gray-200 p-3 rounded-lg mb-5 focus:outline-none focus:border-black transition"
          />


          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition font-medium"
          >
            Login
          </button>


          {/* Footer */}
          <p className="text-center text-xs text-gray-400 mt-6">
            Ahsan's Blog Admin Panel
          </p>

        </div>

      </div>

    </main>
  );
}