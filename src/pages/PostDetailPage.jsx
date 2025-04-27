import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import CommentSection from "../components/CommentSection";
import { supabase } from "../services/supabaseClient";
import { formatDistanceToNow } from "date-fns";
import "./PostDetailPage.css";

function PostDetailPage() {
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

  async function handleUpvote() {
    const { error } = await supabase
      .from("posts")
      .update({ upvotes: post.upvotes + 1 })
      .eq("id", id);

    if (error) {
      console.error("Error upvoting post:", error);
    } else {
      setPost({ ...post, upvotes: post.upvotes + 1 });
    }
  }

  async function handleDelete() {
    if (window.confirm("Are you sure you want to delete this post?")) {
      const { error } = await supabase.from("posts").delete().eq("id", id);

      if (error) {
        console.error("Error deleting post:", error);
        alert("Failed to delete post. Please try again.");
      } else {
        navigate("/");
      }
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

  const timeAgo = formatDistanceToNow(new Date(post.created_at), {
    addSuffix: true,
  });

  return (
    <div className="post-detail">
      <p className="post-time">Posted {timeAgo}</p>
      <h1 className="post-title">{post.title}</h1>

      <div className="post-content">
        {post.content && <p>{post.content}</p>}
        {post.image_url && (
          <img src={post.image_url} alt={post.title} className="post-image" />
        )}
      </div>

      <div className="post-actions">
        <button onClick={handleUpvote} className="upvote-button">
          <span className="upvote-icon">👍</span>
          <span className="upvote-count">{post.upvotes} upvotes</span>
        </button>
        <div className="edit-actions">
          <Link
            to={`/edit/${post.id}`}
            className="edit-button"
            title="Edit post"
          >
            <span className="edit-icon">✏️</span>
          </Link>
          <button
            onClick={handleDelete}
            className="delete-button"
            title="Delete post"
          >
            <span className="delete-icon">🗑️</span>
          </button>
        </div>
      </div>

      <CommentSection postId={post.id} />
    </div>
  );
}

export default PostDetailPage;
