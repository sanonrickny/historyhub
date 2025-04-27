import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PostCard from "../components/PostCard";
import { supabase } from "../services/supabaseClient";
import "./HomePage.css";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [orderBy, setOrderBy] = useState(
    searchParams.get("orderBy") || "created_at"
  );

  useEffect(() => {
    fetchPosts();
  }, [searchQuery, orderBy]);

  async function fetchPosts() {
    setLoading(true);
    let query = supabase.from("posts").select("*");

    // Search filter
    if (searchQuery) {
      query = query.ilike("title", `%${searchQuery}%`);
    }

    // Order by
    query = query.order(orderBy, { ascending: false });

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching posts:", error);
    } else {
      setPosts(data || []);
    }
    setLoading(false);
  }

  function handleOrderChange(newOrderBy) {
    setOrderBy(newOrderBy);
    setSearchParams({
      search: searchQuery,
      orderBy: newOrderBy,
    });
  }

  return (
    <div className="home-page">
      <div className="order-options">
        <span className="order-label">Order by:</span>
        <button
          className={`order-button ${orderBy === "created_at" ? "active" : ""}`}
          onClick={() => handleOrderChange("created_at")}
        >
          Newest
        </button>
        <button
          className={`order-button ${orderBy === "upvotes" ? "active" : ""}`}
          onClick={() => handleOrderChange("upvotes")}
        >
          Most Popular
        </button>
      </div>

      {searchQuery && (
        <p className="search-results">
          {posts.length === 0
            ? `No results found for "${searchQuery}"`
            : `Showing results for "${searchQuery}"`}
        </p>
      )}

      {loading ? (
        <div className="loading">
          <p>Loading posts...</p>
        </div>
      ) : posts.length > 0 ? (
        <div className="posts-container">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="no-posts">
          <p>No posts found.</p>
        </div>
      )}
    </div>
  );
}

export default HomePage;
