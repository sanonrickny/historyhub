import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          HistoryHub
        </Link>
        <SearchBar />
        <nav className="nav">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/create" className="nav-link">
            Create New Post
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
