import React, { useState, useEffect } from "react";
import { supabase } from "../services/supabaseClient";
import "./CommentSection.css";

function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetchComments();
  }, [postId]);

  async function fetchComments() {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching comments:", error);
    } else {
      setComments(data || []);
    }
  }

  async function addComment(e) {
    e.preventDefault();
    if (!newComment.trim()) return;

    const { error } = await supabase
      .from("comments")
      .insert({ post_id: postId, content: newComment.trim() });

    if (error) {
      console.error("Error adding comment:", error);
    } else {
      setNewComment("");
      fetchComments();
    }
  }

  return (
    <div className="comment-section">
      <h3 className="comments-title">Comments</h3>
      <div className="comments-container">
        {comments.length === 0 ? (
          <p className="no-comments">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              <p>- {comment.content}</p>
            </div>
          ))
        )}
      </div>
      <form onSubmit={addComment} className="comment-form">
        <input
          type="text"
          placeholder="Leave a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="comment-input"
        />
      </form>
    </div>
  );
}

export default CommentSection;
