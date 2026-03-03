"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  const [authorized, setAuthorized] = useState(false);
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    image: "",
    status: "published",
  });

  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔐 Protect Page
  useEffect(() => {
    const isAdmin = sessionStorage.getItem("admin");
    if (!isAdmin) {
      router.push("/admin/login");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  const fetchPosts = async () => {
    const res = await fetch("/api/get-posts");
    const data = await res.json();
    setPosts(data.reverse());
  };

  useEffect(() => {
    if (authorized) {
      fetchPosts();
    }
  }, [authorized]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/add-post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        secret: process.env.NEXT_PUBLIC_ADMIN_SECRET,
      }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Post saved!");
      setForm({
        title: "",
        excerpt: "",
        content: "",
        image: "",
        status: "published",
      });
      fetchPosts();
    } else {
      alert(data.error);
    }

    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;

    const res = await fetch("/api/delete-post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        secret: process.env.NEXT_PUBLIC_ADMIN_SECRET,
      }),
    });

    const data = await res.json();

    if (data.success) {
      fetchPosts();
    } else {
      alert(data.error);
    }
  };

  if (!authorized) return null;

  return (
    <main className="min-h-screen bg-gray-50 px-8 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-10">Admin Dashboard</h1>

        <div className="grid md:grid-cols-2 gap-10">

          {/* Create Post */}
          <div className="bg-white p-8 rounded-xl shadow border">
            <h2 className="text-xl font-semibold mb-6">Create Post</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full border p-3 rounded"
                required
              />

              <input
                name="excerpt"
                value={form.excerpt}
                onChange={handleChange}
                placeholder="Excerpt"
                className="w-full border p-3 rounded"
              />

              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                placeholder="Content"
                className="w-full border p-3 rounded h-32"
                required
              />

              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="Image URL"
                className="w-full border p-3 rounded"
              />

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              >
                <option value="published">Publish</option>
                <option value="draft">Draft</option>
              </select>

              <button
                disabled={loading}
                className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition"
              >
                {loading ? "Saving..." : "Save Post"}
              </button>
            </form>
          </div>

          {/* Posts List */}
          <div className="bg-white p-8 rounded-xl shadow border">
            <h2 className="text-xl font-semibold mb-6">All Posts</h2>

            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="border p-4 rounded flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-semibold">{post.title}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        post.status === "published"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {post.status}
                    </span>
                  </div>

                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}