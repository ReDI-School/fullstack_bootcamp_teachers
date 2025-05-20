"use client";
import React from "react";

// AddBookForm component: handles the form UI for adding a new book
// Receives all state and handlers as props from the parent page
export default function AddBookForm({
  title,           // Book title value
  setTitle,        // Function to update title
  author,          // Book author value
  setAuthor,       // Function to update author
  description,     // Book description value
  setDescription,  // Function to update description
  coverImage,      // Cover image URL value
  setCoverImage,   // Function to update cover image
  formError,       // Error message to show
  formSuccess,     // Success message to show
  onSubmit,        // Handler for form submission
}) {
  // Form for adding a new book
  return (
    <form onSubmit={onSubmit}>
      {/* Book title input */}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded mb-2"
      />
      {/* Book author input */}
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="w-full border p-2 rounded mb-2"
      />
      {/* Book description input */}
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-2 rounded mb-2"
      />
      {/* Optional cover image URL input */}
      <input
        type="text"
        placeholder="Cover Image URL (optional)"
        value={coverImage}
        onChange={(e) => setCoverImage(e.target.value)}
        className="w-full border p-2 rounded mb-2"
      />
      {/* Submit button */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Add Book
      </button>
      {/* Show error or success messages if present */}
      {formError && <div className="text-red-600 mt-2">{formError}</div>}
      {formSuccess && (
        <div className="text-green-600 mt-2">{formSuccess}</div>
      )}
    </form>
  );
}
