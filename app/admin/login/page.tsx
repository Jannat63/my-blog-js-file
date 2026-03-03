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
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow w-96">
        <h1 className="text-xl font-bold mb-6">Admin Login</h1>

        <input
          type="password"
          placeholder="Enter Admin Password"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-black text-white py-3 rounded"
        >
          Login
        </button>
      </div>
    </main>
  );
}