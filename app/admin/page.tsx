"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RichEditor from "@/components/RichEditor";

export default function AdminPage() {

const router = useRouter();

const [authorized,setAuthorized] = useState(false);

const [tab,setTab] = useState("posts");

const [form,setForm] = useState({
title:"",
excerpt:"",
content:"",
image:"",
status:"published"
});

const [posts,setPosts] = useState<any[]>([]);
const [comments,setComments] = useState<any[]>([]);
const [loading,setLoading] = useState(false);

const [editingId,setEditingId] = useState<string | null>(null);
const [editForm,setEditForm] = useState<any>({});

useEffect(()=>{

const isAdmin = sessionStorage.getItem("admin");

if(!isAdmin){
router.push("/admin/login");
}else{
setAuthorized(true);
}

},[router]);

const fetchPosts = async()=>{

const res = await fetch("/api/get-posts");
const data = await res.json();

setPosts(data.reverse());

};

const fetchComments = async()=>{

const res = await fetch("/api/admin-comments");
const data = await res.json();

setComments(data);

};

useEffect(()=>{

if(authorized){
fetchPosts();
fetchComments();
}

},[authorized]);

const handleChange = (e:any)=>{

setForm({
...form,
[e.target.name]:e.target.value
});

};

const handleCreate = async(e:any)=>{

e.preventDefault();
setLoading(true);

const res = await fetch("/api/add-post",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
...form,
secret:process.env.NEXT_PUBLIC_ADMIN_SECRET
})
});

const data = await res.json();

if(data.success){

setForm({
title:"",
excerpt:"",
content:"",
image:"",
status:"published"
});

fetchPosts();

}else{
alert(data.error);
}

setLoading(false);

};

const handleDelete = async(id:string)=>{

if(!confirm("Delete this post?")) return;

const res = await fetch("/api/delete-post",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
id,
secret:process.env.NEXT_PUBLIC_ADMIN_SECRET
})
});

const data = await res.json();

if(data.success){
fetchPosts();
}else{
alert(data.error);
}

};

const handleEdit = (post:any)=>{
setEditingId(post.id);
setEditForm(post);
};

const handleUpdate = async()=>{

const res = await fetch("/api/update-post",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
...editForm,
secret:process.env.NEXT_PUBLIC_ADMIN_SECRET
})
});

const data = await res.json();

if(data.success){
setEditingId(null);
fetchPosts();
}else{
alert(data.error);
}

};

const approveComment = async(id:string)=>{

await fetch("/api/approve-comment",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({id})
});

fetchComments();

};

const deleteComment = async(id:string)=>{

await fetch("/api/delete-comment",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({id})
});

fetchComments();

};

if(!authorized){

return(
<div className="min-h-screen flex items-center justify-center bg-gray-100">
<p className="text-gray-500 text-sm">
Checking authorization...
</p>
</div>
);

}

return(

<div className="admin-ui min-h-screen flex">



{/* MAIN */}

<div className="flex-1 p-8">

{/* HEADER */}

<div className="flex justify-between items-center mb-8">

  <h1 className="text-3xl font-bold">
    Admin Dashboard
  </h1>

  <div className="flex items-center gap-3">

    <a
      href="/"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
    >
      View Site
    </a>

    <button
      onClick={()=>{
        sessionStorage.removeItem("admin");
        router.push("/admin/login");
      }}
      className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition"
    >
      Logout
    </button>

  </div>

</div>

{/* TABS */}
<div className="flex gap-3 mb-10">

  <button
    onClick={() => setTab("posts")}
    className={`px-5 py-2 rounded-lg font-medium transition ${
      tab === "posts"
        ? "bg-black text-white shadow"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
    }`}
  >
    Posts
  </button>

  <button
    onClick={() => setTab("comments")}
    className={`px-5 py-2 rounded-lg font-medium transition ${
      tab === "comments"
        ? "bg-black text-white shadow"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
    }`}
  >
    Comments
  </button>

  <button
    onClick={() => setTab("analytics")}
    className={`px-5 py-2 rounded-lg font-medium transition ${
      tab === "analytics"
        ? "bg-black text-white shadow"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
    }`}
  >
    Analytics
  </button>

</div>

{/* POSTS TAB */}

{tab==="posts" && (

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

<div className="border border-white/10 rounded-lg overflow-hidden">

<RichEditor
content={form.content}
onChange={(value)=>setForm({...form,content:value})}
/>

</div>

<input
type="file"
accept="image/*"
className="w-full bg-white/5 border border-white/10 p-3 rounded-lg"
onChange={async (e:any)=>{

const file = e.target.files[0];
if(!file) return;

const reader = new FileReader();

reader.onloadend = async ()=>{

const res = await fetch("/api/upload-image",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
file:reader.result,
secret:process.env.NEXT_PUBLIC_ADMIN_SECRET
})
});

const data = await res.json();

if(data.url){
setForm({...form,image:data.url});
}else{
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

{posts.map((post,index)=>(
<div key={post.id || index} className="glass p-4 rounded-xl">

{editingId===post.id ? (

<>

<input
value={editForm.title}
onChange={(e)=>setEditForm({...editForm,title:e.target.value})}
className="w-full bg-white/5 border border-white/10 p-2 rounded-lg mb-3"
/>

<RichEditor
content={editForm.content}
onChange={(value)=>setEditForm({...editForm,content:value})}
/>

<div className="flex gap-3 mt-3">

<button
onClick={handleUpdate}
className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm"
>
Save
</button>

<button
onClick={()=>setEditingId(null)}
className="bg-gray-400 text-white px-3 py-1 rounded-lg text-sm"
>
Cancel
</button>

</div>

</>

) : (

<div className="flex items-center justify-between">

<div>
<h3 className="font-semibold">{post.title}</h3>

<span className="text-xs">{post.status}</span>
</div>

<div className="flex gap-3">

<button
onClick={()=>handleEdit(post)}
className="text-blue-500 text-sm"
>
Edit
</button>

<button
onClick={()=>handleDelete(post.id)}
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

)}

{/* COMMENTS TAB */}

{tab==="comments" && (

<div className="glass p-8 rounded-xl">

<h2 className="text-xl font-semibold mb-6">
Comment Moderation
</h2>

<div className="space-y-4">

{comments.map((c,index)=>(
<div key={c.id || index} className="border p-4 rounded-lg">

<p className="font-semibold">{c.name}</p>

<p className="text-xs text-gray-400 mb-2">
{c.postSlug} • {c.date}
</p>

<p className="mb-3">{c.comment}</p>

<div className="flex gap-3">

{c.status!=="approved" && (
<button
onClick={()=>approveComment(c.id)}
className="bg-green-600 text-white px-3 py-1 rounded"
>
Approve
</button>
)}

<button
onClick={()=>deleteComment(c.id)}
className="bg-red-600 text-white px-3 py-1 rounded"
>
Delete
</button>

</div>

</div>
))}

</div>

</div>

)}

{/* ANALYTICS TAB */}

{tab==="analytics" && (

<div className="grid md:grid-cols-3 gap-6">

<div className="stat-card p-6 rounded-xl">
<p className="text-gray-400 text-sm">Total Posts</p>
<p className="text-2xl font-bold">{posts.length}</p>
</div>

<div className="stat-card p-6 rounded-xl">
<p className="text-gray-400 text-sm">Published</p>
<p className="text-2xl font-bold">
{posts.filter(p=>p.status==="published").length}
</p>
</div>

<div className="stat-card p-6 rounded-xl">
<p className="text-gray-400 text-sm">Drafts</p>
<p className="text-2xl font-bold">
{posts.filter(p=>p.status==="draft").length}
</p>
</div>

<div className="stat-card p-6 rounded-xl">
<p className="text-gray-400 text-sm">Total Comments</p>
<p className="text-2xl font-bold">{comments.length}</p>
</div>

<div className="stat-card p-6 rounded-xl">
<p className="text-gray-400 text-sm">Pending Comments</p>
<p className="text-2xl font-bold">
{comments.filter(c=>c.status!=="approved").length}
</p>
</div>

</div>

)}

</div>

</div>

);

}