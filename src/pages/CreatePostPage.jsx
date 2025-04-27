import React from "react";
import { useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";
import { supabase } from "../services/supabaseClient";
import "./CreatePostPage.css";

function CreatePostPage() {
  const navigate = useNavigate();

  async function handleCreatePost(postData) {
    const { data, error } = await supabase
      .from("posts")
      .insert([postData])
      .select();

    if (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    } else {
      navigate(`/post/${data[0].id}`);
    }
  }

  return (
    <div className="create-post-page">
      <h1 className="page-title">Create New Post</h1>
      <PostForm onSubmit={handleCreatePost} buttonText="Create Post" />
    </div>
  );
}

export default CreatePostPage;
