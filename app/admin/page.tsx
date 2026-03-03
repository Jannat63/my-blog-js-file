"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RichEditor from "@/components/RichEditor";

export default function AdminPage() {
  const router = useRouter();

  // 🔐 AUTH
  const [authorized, setAuthorized] = useState(false);

  // 📦 CREATE FORM
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    image: "",
    status: "published",
  });

  

  // 📚 POSTS
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // ✏️ EDIT STATE
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});

  // 🔐 Protect Page
  useEffect(() => {
    const isAdmin = sessionStorage.getItem("admin");
    if (!isAdmin) {
      router.push("/admin/login");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  // 📥 Fetch Posts
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

  // 📝 Create Change
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ➕ Create Post
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

  // 🗑 Delete
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

  // ✏️ Start Edit
  const handleEdit = (post: any) => {
    setEditingId(post.id);
    setEditForm(post);
  };

  // 💾 Save Edit
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
  <div className="min-h-screen bg-gray-100 flex">

    {/* SIDEBAR */}
    <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
      <h2 className="text-xl font-bold mb-8">Admin Panel</h2>

      <nav className="space-y-4 text-sm">
        <p className="font-semibold text-gray-500 uppercase">Dashboard</p>
        <div className="space-y-2">
          <p className="text-gray-700">Create Post</p>
          <p className="text-gray-700">All Posts</p>
        </div>

        <hr />

        <button
          onClick={() => {
            sessionStorage.removeItem("admin");
            router.push("/admin/login");
          }}
          className="mt-6 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </nav>
    </aside>

    {/* MAIN CONTENT */}
    <div className="flex-1 p-8">

      <h1 className="text-3xl font-bold mb-8">
        Dashboard Overview
      </h1>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-gray-500 text-sm">Total Posts</p>
          <p className="text-2xl font-bold">{posts.length}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-gray-500 text-sm">Published</p>
          <p className="text-2xl font-bold">
            {posts.filter(p => p.status === "published").length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-gray-500 text-sm">Drafts</p>
          <p className="text-2xl font-bold">
            {posts.filter(p => p.status === "draft").length}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* CREATE SECTION */}
        <div className="bg-white p-8 rounded-xl shadow-sm border">
          <h2 className="text-xl font-semibold mb-6">
            Create New Post
          </h2>

          <form onSubmit={handleCreate} className="space-y-4">

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Post Title"
              className="w-full border p-3 rounded"
              required
            />

            <input
              name="excerpt"
              value={form.excerpt}
              onChange={handleChange}
              placeholder="Short Description"
              className="w-full border p-3 rounded"
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
  className="w-full border p-3 rounded"
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
              className="w-full border p-3 rounded"
            >
              <option value="published">Publish</option>
              <option value="draft">Save as Draft</option>
            </select>

            <button
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition"
            >
              {loading ? "Saving..." : "Save Post"}
            </button>

          </form>
        </div>

        {/* POSTS SECTION */}
        <div className="bg-white p-8 rounded-xl shadow-sm border">
          <h2 className="text-xl font-semibold mb-6">
            All Posts
          </h2>

          <div className="space-y-4 max-h-[600px] overflow-y-auto">

            {posts.map((post) => (
              <div
                key={post.id}
                className="border p-4 rounded-lg space-y-3 bg-gray-50"
              >

                {editingId === post.id ? (
                  <>
                    <input
                      value={editForm.title}
                      onChange={(e) =>
                        setEditForm({ ...editForm, title: e.target.value })
                      }
                      className="w-full border p-2 rounded"
                    />

                    <RichEditor
                      content={editForm.content}
                      onChange={(value) =>
                        setEditForm({ ...editForm, content: value })
                      }
                    />

                    <select
                      value={editForm.status}
                      onChange={(e) =>
                        setEditForm({ ...editForm, status: e.target.value })
                      }
                      className="w-full border p-2 rounded"
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                    </select>

                    <div className="flex gap-3">
                      <button
                        onClick={handleUpdate}
                        className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Save
                      </button>

                      <button
                        onClick={() => setEditingId(null)}
                        className="bg-gray-400 text-white px-3 py-1 rounded text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between items-center">
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