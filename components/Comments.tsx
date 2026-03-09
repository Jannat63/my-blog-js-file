"use client";

import { useEffect, useState } from "react";

export default function Comments({ slug }: { slug: string }) {

const [comments,setComments] = useState<any[]>([]);
const [name,setName] = useState("");
const [comment,setComment] = useState("");
const [loading,setLoading] = useState(false);

const [replyTo,setReplyTo] = useState<string | null>(null);
const [showToast,setShowToast] = useState(false);

const fetchComments = async () => {

const res = await fetch(`/api/get-comments?slug=${slug}`);
const data = await res.json();

setComments(data);

};

useEffect(()=>{
fetchComments();
},[]);

const submitComment = async(e:any)=>{

e.preventDefault();

setLoading(true);

await fetch("/api/add-comment",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
name,
comment,
postSlug:slug,
parentId:replyTo || "root"
})
});

setName("");
setComment("");
setReplyTo(null);

setShowToast(true);

setTimeout(()=>{
setShowToast(false);
},4000);

fetchComments();

setLoading(false);

};

const likeComment = async(id:string)=>{

await fetch("/api/like-comment",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({id})
});

fetchComments();

};

const rootComments = comments.filter(
  c => !c.parentId || c.parentId === "root"
);

return(

<div className="mt-20">

{/* Toast */}

{showToast && (

<div className="fixed bottom-6 right-6 z-50">

<div className="bg-black text-white px-6 py-4 rounded-xl shadow-xl flex gap-3">

<div className="text-green-400">✔</div>

<div>
<p className="font-semibold">
Thank you for your comment!
</p>

<p className="text-sm text-gray-300">
Your comment is awaiting approval.
</p>
</div>

</div>

</div>

)}

<h3 className="text-2xl font-semibold mb-8">
Comments ({comments.length})
</h3>

{/* Comment Form */}

<form onSubmit={submitComment} className="space-y-4 mb-12">

{replyTo && (

<p className="text-sm text-gray-500">
Replying to comment
<button
type="button"
onClick={()=>setReplyTo(null)}
className="ml-3 text-red-500"
>
Cancel
</button>
</p>

)}

<input
placeholder="Your name"
className="w-full border border-gray-300 p-3 rounded-lg"
value={name}
onChange={(e)=>setName(e.target.value)}
required
/>

<textarea
placeholder="Write a comment..."
rows={4}
className="w-full border border-gray-300 p-3 rounded-lg"
value={comment}
onChange={(e)=>setComment(e.target.value)}
required
/>

<button
disabled={loading}
className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
>
{loading ? "Submitting..." : "Submit Comment"}
</button>

</form>

{/* Comments */}

<div className="space-y-10">

{rootComments.map((c)=>{

const replies = comments.filter(r=>r.parentId===c.id);

return(

<div key={c.id}>

{/* Main Comment */}

<div className="flex gap-4">

<div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-semibold">
{c.name.charAt(0).toUpperCase()}
</div>

<div className="flex-1">

<p className="font-semibold">
{c.name}
</p>

<p className="text-sm text-gray-500 mb-2">
{c.date}
</p>

<p className="mb-3">
{c.comment}
</p>

<div className="flex gap-4 text-sm">

<button
onClick={()=>likeComment(c.id)}
className="text-gray-600 hover:text-black"
>
👍 {c.likes || 0}
</button>

<button
onClick={()=>setReplyTo(c.id)}
className="text-gray-600 hover:text-black"
>
Reply
</button>

</div>

</div>

</div>

{/* Replies */}

{replies.length>0 && (

<div className="ml-14 mt-6 space-y-6">

{replies.map((r)=>(
<div key={r.id} className="flex gap-4">

<div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center font-semibold text-sm">
{r.name.charAt(0).toUpperCase()}
</div>

<div>

<p className="font-semibold">
{r.name}
</p>

<p className="text-sm text-gray-500 mb-2">
{r.date}
</p>

<p className="mb-2">
{r.comment}
</p>

<button
onClick={()=>likeComment(r.id)}
className="text-sm text-gray-600 hover:text-black"
>
👍 {r.likes || 0}
</button>

</div>

</div>
))}

</div>

)}

</div>

);

})}

{comments.length===0 && (

<p className="text-gray-500 text-sm">
No comments yet. Be the first to comment.
</p>

)}

</div>

</div>

);

}