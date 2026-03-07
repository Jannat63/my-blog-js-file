"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RichEditor from "@/components/RichEditor";

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

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});

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

  const handleCreate = async (e: any) => {
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

  const handleEdit = (post: any) => {
    setEditingId(post.id);
    setEditForm(post);
  };

  const handleUpdate = async () => {
    const res = await fetch("/api/update-post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...editForm,
        secret: process.env.NEXT_PUBLIC_ADMIN_SECRET,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setEditingId(null);
      fetchPosts();
    } else {
      alert(data.error);
    }
  };

  if (!authorized) return null;

  return (
    <div className="admin-ui min-h-screen flex">

      {/* SIDEBAR */}
      <aside className="w-64 glass p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-8">Admin Panel</h2>

        <nav className="space-y-6 text-sm">

          <div>
            <p className="font-semibold text-gray-400 uppercase text-xs mb-3">
              Dashboard
            </p>

            <div className="space-y-2">
              <p className="px-3 py-2 rounded-lg bg-gray-100 font-medium">
                Create Post
              </p>

              <p className="px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer transition">
                All Posts
              </p>
            </div>
          </div>

          <hr />

          <button
            onClick={() => {
              sessionStorage.removeItem("admin");
              router.push("/admin/login");
            }}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>

        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold">Dashboard Overview</h1>

          <div className="text-sm text-gray-500">
            Logged in as <span className="font-medium text-white">Admin</span>
          </div>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="stat-card p-6 rounded-xl">
            <p className="text-gray-400 text-sm">Total Posts</p>
            <p className="text-2xl font-bold">{posts.length}</p>
          </div>

          <div className="stat-card p-6 rounded-xl">
            <p className="text-gray-400 text-sm">Published</p>
            <p className="text-2xl font-bold">
              {posts.filter((p) => p.status === "published").length}
            </p>
          </div>

          <div className="stat-card p-6 rounded-xl">
            <p className="text-gray-400 text-sm">Drafts</p>
            <p className="text-2xl font-bold">
              {posts.filter((p) => p.status === "draft").length}
            </p>
          </div>

        </div>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* CREATE POST */}
          <div className="glass p-8 rounded-xl">

            <h2 className="text-xl font-semibold mb-6">
              Create New Post
            </h2>

            <form onSubmit={handleCreate} className="space-y-4">

              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Post Title"
                className="w-full bg-white/5 border border-white/10 p-3 rounded-lg outline-none"
                required
              />

              <input
                name="excerpt"
                value={form.excerpt}
                onChange={handleChange}
                placeholder="Short Description"
                className="w-full bg-white/5 border border-white/10 p-3 rounded-lg outline-none"
              />

              <RichEditor
                content={form.content}
                onChange={(value) =>
                  setForm({ ...form, content: value })
                }
              />

              <input
                type="file"
                accept="image/*"
                className="w-full bg-white/5 border border-white/10 p-3 rounded-lg"
                onChange={async (e: any) => {
                  const file = e.target.files[0];
                  if (!file) return;

                  const reader = new FileReader();

                  reader.onloadend = async () => {
                    const res = await fetch("/api/upload-image", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        file: reader.result,
                        secret: process.env.NEXT_PUBLIC_ADMIN_SECRET,
                      }),
                    });

                    const data = await res.json();

                    if (data.url) {
                      setForm({ ...form, image: data.url });
                    } else {
                      alert("Image upload failed");
                    }
                  };

                  reader.readAsDataURL(file);
                }}
              />

              {form.image && (
                <img
                  src={form.image}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg mt-4"
                />
              )}

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 p-3 rounded-lg outline-none"
              >
                <option value="published">Publish</option>
                <option value="draft">Save as Draft</option>
              </select>

              <button
                disabled={loading}
                className="btn-neon w-full py-3 font-medium"
              >
                {loading ? "Saving..." : "Save Post"}
              </button>

            </form>
          </div>

          {/* POSTS LIST */}
          <div className="glass p-8 rounded-xl">

            <h2 className="text-xl font-semibold mb-6">
              All Posts
            </h2>

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">

              {posts.map((post) => (
                <div
                  key={post.id}
                  className="glass p-4 rounded-xl hover:shadow-lg transition"
                >

                  {editingId === post.id ? (
                    <>
                      <input
                        value={editForm.title}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            title: e.target.value,
                          })
                        }
                        className="w-full bg-white/5 border border-white/10 p-2 rounded-lg mb-3"
                      />

                      <RichEditor
                        content={editForm.content}
                        onChange={(value) =>
                          setEditForm({
                            ...editForm,
                            content: value,
                          })
                        }
                      />

                      <select
                        value={editForm.status}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            status: e.target.value,
                          })
                        }
                        className="w-full bg-white/5 border border-white/10 p-2 rounded-lg mt-3"
                      >
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                      </select>

                      <div className="flex gap-3 mt-3">

                        <button
                          onClick={handleUpdate}
                          className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm"
                        >
                          Save
                        </button>

                        <button
                          onClick={() => setEditingId(null)}
                          className="bg-gray-400 text-white px-3 py-1 rounded-lg text-sm"
                        >
                          Cancel
                        </button>

                      </div>
                    </>
                  ) : (

                    <div className="flex items-center justify-between">

                      <div className="flex items-center gap-4">

                        {post.image && (
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-14 h-14 object-cover rounded-lg"
                          />
                        )}

                        <div>
                          <h3 className="font-semibold">
                            {post.title}
                          </h3>

                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              post.status === "published"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-yellow-500/20 text-yellow-400"
                            }`}
                          >
                            {post.status}
                          </span>
                        </div>

                      </div>

                      <div className="flex gap-3">

                        <button
                          onClick={() => handleEdit(post)}
                          className="text-blue-500 text-sm"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(post.id)}
                          className="text-red-500 text-sm"
                        >
                          Delete
                        </button>

                      </div>

                    </div>

                  )}

                </div>
              ))}

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}