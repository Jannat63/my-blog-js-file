"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [secret, setSecret] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    if (loading) return;

    setLoading(true);

    const res = await fetch("/api/admin-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: secret,
        token: token,
      }),
    });

    const data = await res.json();

    if (data.success) {
      sessionStorage.setItem("admin", "true");
      router.push("/admin");
    } else {
      alert("Invalid password or authenticator code");
    }

    setLoading(false);
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

          <div className="absolute inset-0 bg-black/40"></div>

          <div className="absolute bottom-10 left-8 text-white max-w-xs">
            <p className="text-lg font-semibold">
              “Simply all the tools that I need.”
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

            {/* FORM */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >

              {/* PASSWORD */}
              <input
                type="password"
                placeholder="Enter Admin Password"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                className="w-full border border-gray-200 p-3 rounded-lg mb-4 focus:outline-none focus:border-black transition"
              />

              {/* GOOGLE AUTHENTICATOR */}
              <input
                type="text"
                placeholder="Authenticator Code"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full border border-gray-200 p-3 rounded-lg mb-4 focus:outline-none focus:border-black transition"
              />

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition font-medium disabled:opacity-70 flex items-center justify-center gap-2"
              >

                {loading && (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                )}

                {loading ? "Logging in..." : "Login"}

              </button>

            </form>

            <p className="text-center text-xs text-gray-400 mt-6">
              Ahsan's Blog Admin Panel
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}