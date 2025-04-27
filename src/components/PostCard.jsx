import React from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import "./PostCard.css";

function PostCard({ post }) {
  const timeAgo = formatDistanceToNow(new Date(post.created_at), {
    addSuffix: true,
  });

  return (
    <div className="post-card">
      <p className="post-time">Posted {timeAgo}</p>
      <h2 className="post-title">
        <Link to={`/post/${post.id}`}>{post.title}</Link>
      </h2>
      <p className="post-upvotes">{post.upvotes} upvotes</p>
    </div>
  );
}

export default PostCard;
