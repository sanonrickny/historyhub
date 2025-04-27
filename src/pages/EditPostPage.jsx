import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import PostForm from "../components/PostForm";
import { supabase } from "../services/supabaseClient";
import "./EditPostPage.css";

function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [id]);

  async function fetchPost() {
    setLoading(true);
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching post:", error);
      navigate("/");
    } else {
      setPost(data);
    }
    setLoading(false);
  }

  async function handleUpdatePost(postData) {
    const { error } = await supabase
      .from("posts")
      .update(postData)
      .eq("id", id);

    if (error) {
      console.error("Error updating post:", error);
      alert("Failed to update post. Please try again.");
    } else {
      navigate(`/post/${id}`);
    }
  }

  if (loading) {
    return (
      <div className="loading">
        <p>Loading post...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="not-found">
        <p>Post not found.</p>
        <Link to="/" className="back-link">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="edit-post-page">
      <h1 className="page-title">Update Post</h1>
      <PostForm
        initialData={post}
        onSubmit={handleUpdatePost}
        buttonText="Update Post"
      />
    </div>
  );
}

export default EditPostPage;
