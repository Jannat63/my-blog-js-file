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
const [uploading,setUploading] = useState(false);

const [editingId,setEditingId] = useState<string | null>(null);
const [editForm,setEditForm] = useState<any>({});

const [stories,setStories] = useState<any[]>([]);


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

const fetchStories = async()=>{

const res = await fetch("/api/get-stories");
const data = await res.json();

setStories(data.reverse());

};

const fetchComments = async()=>{

const res = await fetch("/api/admin-comments");
const data = await res.json();

setComments(data);

};

useEffect(()=>{

if(authorized){
fetchPosts();
fetchStories();
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


const handleDeleteStory = async(id:string)=>{

if(!confirm("Delete this story?")) return;

const res = await fetch("/api/delete-story",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
id,
secret:process.env.NEXT_PUBLIC_ADMIN_SECRET
})
});

const data = await res.json();

if(data.success){
fetchStories();
}else{
alert(data.error);
}

};

const handleEdit = (post:any)=>{
setEditingId(post.id);

setEditForm({
id: post.id,
title: post.title,
excerpt: post.excerpt,
content: post.content,
image: post.image,
status: post.status
});

};

const handleEditStory = (story:any)=>{

setEditingId(story.id);

setEditForm({
id: story.id,
title: story.title,
excerpt: story.excerpt,
content: story.content,
image: story.image,
status: story.status
});

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


const handleUpdateStory = async()=>{

const res = await fetch("/api/update-story",{
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
fetchStories();
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

<div className="min-h-screen bg-gray-50 flex">

<div className="flex-1 p-10 max-w-7xl mx-auto">

{/* HEADER */}

<div className="flex justify-between items-center mb-10">

<h1 className="text-3xl font-bold text-gray-800">
Admin Dashboard
</h1>

<div className="flex gap-3">

<a
href="/"
target="_blank"
className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
>
View Site
</a>

<button
onClick={()=>{
sessionStorage.removeItem("admin");
router.push("/admin/login");
}}
className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition"
>
Logout
</button>

</div>

</div>

{/* TABS */}

<div className="flex gap-3 mb-10">

<button
onClick={()=>setTab("posts")}
className={`px-5 py-2 rounded-lg font-medium transition ${
tab==="posts"
? "bg-black text-white"
: "bg-gray-200"
}`}
>
Posts
</button>

<button
  onClick={()=>setTab("stories")}
  className={`px-5 py-2 rounded-lg font-medium transition ${
    tab==="stories"
      ? "bg-black text-white"
      : "bg-gray-200"
  }`}
>
Stories
</button>

<button
onClick={()=>setTab("comments")}
className={`px-5 py-2 rounded-lg font-medium transition ${
tab==="comments"
? "bg-black text-white"
: "bg-gray-200"
}`}
>
Comments
</button>

<button
onClick={()=>setTab("analytics")}
className={`px-5 py-2 rounded-lg font-medium transition ${
tab==="analytics"
? "bg-black text-white"
: "bg-gray-200"
}`}
>
Analytics
</button>

</div>

{/* POSTS TAB */}

{tab==="posts" && (

<div className="grid lg:grid-cols-2 gap-10">

{/* CREATE POST */}

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
className="w-full border p-3 rounded-lg"
/>

<input
name="excerpt"
value={form.excerpt}
onChange={handleChange}
placeholder="Short Description"
className="w-full border p-3 rounded-lg"
/>

<RichEditor
content={form.content}
onChange={(value)=>setForm({...form,content:value})}
/>

<input
type="file"
accept="image/*"
className="w-full border p-3 rounded-lg"
onChange={async (e:any)=>{

const file = e.target.files[0];
if(!file) return;

setUploading(true);

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

setUploading(false);

};

reader.readAsDataURL(file);

}}
/>

{uploading && (
<p className="text-sm text-gray-500">
Uploading image...
</p>
)}

{form.image && (
<img
src={form.image}
className="w-full h-48 object-cover rounded-lg"
/>
)}

<select
name="status"
value={form.status}
onChange={handleChange}
className="w-full border p-3 rounded-lg"
>
<option value="published">Publish</option>
<option value="draft">Save as Draft</option>
</select>

<button
disabled={loading}
className="w-full bg-black text-white py-3 rounded-lg"
>
{loading ? "Saving..." : "Save Post"}
</button>

</form>

</div>

{/* POSTS LIST */}

<div className="bg-white p-8 rounded-xl shadow-sm border">

<h2 className="text-xl font-semibold mb-6">
All Posts
</h2>

<div className="space-y-4 max-h-[650px] overflow-y-auto pr-2">

{posts.map((post)=>(
<div key={post.id} className="border rounded-xl p-4">

{editingId===post.id ? (

<div className="space-y-3">

<input
value={editForm.title}
onChange={(e)=>setEditForm({...editForm,title:e.target.value})}
className="w-full border p-2 rounded-lg"
/>

<input
value={editForm.excerpt}
onChange={(e)=>setEditForm({...editForm,excerpt:e.target.value})}
className="w-full border p-2 rounded-lg"
/>

<RichEditor
content={editForm.content}
onChange={(value)=>setEditForm({...editForm,content:value})}
/>

<input
value={editForm.image}
onChange={(e)=>setEditForm({...editForm,image:e.target.value})}
className="w-full border p-2 rounded-lg"
/>

<select
value={editForm.status}
onChange={(e)=>setEditForm({...editForm,status:e.target.value})}
className="w-full border p-2 rounded-lg"
>
<option value="published">Publish</option>
<option value="draft">Draft</option>
</select>

<div className="flex gap-3 pt-2">

<button
onClick={handleUpdate}
className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm"
>
Save
</button>

<button
onClick={()=>setEditingId(null)}
className="bg-gray-400 text-white px-4 py-2 rounded-lg text-sm"
>
Cancel
</button>

</div>

</div>

) : (

<div className="flex items-center justify-between">

<div>

<h3 className="font-semibold text-gray-800">
{post.title}
</h3>

<span
className={`text-xs px-2 py-1 rounded-full ${
post.status==="published"
? "bg-green-100 text-green-700"
: "bg-yellow-100 text-yellow-700"
}`}
>
{post.status}
</span>

</div>

<div className="flex gap-4">

<button
onClick={()=>handleEdit(post)}
className="text-blue-600 text-sm"
>
Edit
</button>

<button
onClick={()=>handleDelete(post.id)}
className="text-red-600 text-sm"
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

{tab==="stories" && (

<div className="grid lg:grid-cols-2 gap-10">

{/* CREATE STORY */}

<div className="bg-white p-8 rounded-xl shadow-sm border">

<h2 className="text-xl font-semibold mb-6">
Create New Story
</h2>

<form
onSubmit={async(e)=>{

e.preventDefault();

await fetch("/api/add-story",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
...form,
secret:process.env.NEXT_PUBLIC_ADMIN_SECRET
})
});

setForm({
title:"",
excerpt:"",
content:"",
image:"",
status:"published"
});

fetchStories();

}}
className="space-y-4"
>

<input
name="title"
value={form.title}
onChange={handleChange}
placeholder="Story Title"
className="w-full border p-3 rounded-lg"
/>

<input
name="excerpt"
value={form.excerpt}
onChange={handleChange}
placeholder="Short Description"
className="w-full border p-3 rounded-lg"
/>

<RichEditor
content={form.content}
onChange={(value)=>setForm({...form,content:value})}
/>

<input
type="file"
accept="image/*"
className="w-full border p-3 rounded-lg"
onChange={async (e:any)=>{

const file = e.target.files[0];
if(!file) return;

setUploading(true);

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

setUploading(false);

};

reader.readAsDataURL(file);

}}
/>

{uploading && (
<p className="text-sm text-gray-500">
Uploading image...
</p>
)}

{form.image && (
<img
src={form.image}
className="w-full h-48 object-cover rounded-lg"
/>
)}

<button className="w-full bg-black text-white py-3 rounded-lg">
Publish Story
</button>

</form>

</div>



{/* STORIES LIST */}

<div className="bg-white p-8 rounded-xl shadow-sm border">

<h2 className="text-xl font-semibold mb-6">
All Stories
</h2>

<div className="space-y-4 max-h-[650px] overflow-y-auto pr-2">

{stories.map((story:any)=>(

<div key={story.id} className="border rounded-xl p-4">

{editingId===story.id ? (

<div className="space-y-3">

<input
value={editForm.title}
onChange={(e)=>setEditForm({...editForm,title:e.target.value})}
className="w-full border p-2 rounded-lg"
/>

<input
value={editForm.excerpt}
onChange={(e)=>setEditForm({...editForm,excerpt:e.target.value})}
className="w-full border p-2 rounded-lg"
/>

<RichEditor
content={editForm.content}
onChange={(value)=>setEditForm({...editForm,content:value})}
/>

<select
value={editForm.status}
onChange={(e)=>setEditForm({...editForm,status:e.target.value})}
className="w-full border p-2 rounded-lg"
>

    <input
value={editForm.image}
onChange={(e)=>setEditForm({...editForm,image:e.target.value})}
className="w-full border p-2 rounded-lg"
placeholder="Image URL"
/>
<option value="published">Publish</option>
<option value="draft">Draft</option>
</select>

<div className="flex gap-3 pt-2">

<button
onClick={handleUpdateStory}
className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm"
>
Save
</button>

<button
onClick={()=>setEditingId(null)}
className="bg-gray-400 text-white px-4 py-2 rounded-lg text-sm"
>
Cancel
</button>

</div>

</div>

) : (

<div className="flex items-center justify-between">

<div>

<h3 className="font-semibold text-gray-800">
{story.title}
</h3>

<span
className={`text-xs px-2 py-1 rounded-full ${
story.status==="published"
? "bg-green-100 text-green-700"
: "bg-yellow-100 text-yellow-700"
}`}
>
{story.status}
</span>

</div>

<div className="flex gap-4">

<button
onClick={()=>handleEditStory(story)}
className="text-blue-600 text-sm"
>
Edit
</button>

<button
onClick={()=>handleDeleteStory(story.id)}
className="text-red-600 text-sm"
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

<div className="bg-white p-8 rounded-xl border">

<h2 className="text-xl font-semibold mb-6">
Comment Moderation
</h2>

<div className="space-y-4">

{comments.map((c)=>(
<div key={c.id} className="border p-4 rounded-lg">

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

{/* ANALYTICS */}

{tab==="analytics" && (

<div className="grid md:grid-cols-3 gap-6">

<div className="bg-white p-6 rounded-xl border">
<p className="text-gray-500 text-sm">Total Posts</p>
<p className="text-2xl font-bold">{posts.length}</p>
</div>

<div className="bg-white p-6 rounded-xl border">
<p className="text-gray-500 text-sm">Published</p>
<p className="text-2xl font-bold">
{posts.filter(p=>p.status==="published").length}
</p>
</div>

<div className="bg-white p-6 rounded-xl border">
<p className="text-gray-500 text-sm">Drafts</p>
<p className="text-2xl font-bold">
{posts.filter(p=>p.status==="draft").length}
</p>
</div>

<div className="bg-white p-6 rounded-xl border">
<p className="text-gray-500 text-sm">Total Comments</p>
<p className="text-2xl font-bold">{comments.length}</p>
</div>

<div className="bg-white p-6 rounded-xl border">
<p className="text-gray-500 text-sm">Pending Comments</p>
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