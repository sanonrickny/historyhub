import React, { useState } from "react";
import "./PostForm.css";

function PostForm({ initialData = {}, onSubmit, buttonText }) {
  const [title, setTitle] = useState(initialData.title || "");
  const [content, setContent] = useState(initialData.content || "");
  const [imageUrl, setImageUrl] = useState(initialData.image_url || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content, image_url: imageUrl });
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="form-input"
      />
      <textarea
        placeholder="Content (Optional)"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="form-textarea"
      />
      <input
        type="text"
        placeholder="Image URL (Optional)"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className="form-input"
      />
      <button type="submit" className="form-button">
        {buttonText || "Create Post"}
      </button>
    </form>
  );
}

export default PostForm;
