"use client";

import { useState } from "react";

export default function AdminPage() {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image: "",
    secret: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/add-post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.success) {
      alert("Post added successfully!");
    } else {
      alert("Error: " + data.error);
    }
  };

  return (
    <main className="min-h-screen max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {["title", "slug", "excerpt", "content", "image", "secret"].map(
          (field) => (
            <input
              key={field}
              name={field}
              placeholder={field}
              onChange={handleChange}
              className="w-full border p-3 rounded"
              required={field !== "excerpt" && field !== "image"}
            />
          )
        )}

        <button className="bg-black text-white px-6 py-3 rounded">
          Publish Post
        </button>
      </form>
    </main>
  );
}