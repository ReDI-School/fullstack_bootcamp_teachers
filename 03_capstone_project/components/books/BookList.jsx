"use client";
import React from "react";

// BookList component: displays a list of books with their details and cover image
// Receives an array of books as a prop from the parent page
export default function BookList({ books }) {
  // If there are no books, show a friendly message
  if (!books || books.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No books found, add one!
      </div>
    );
  }

  return (
    // Unordered list of books
    <ul className="space-y-3">
      {books.map((book) => (
        // Each book is shown as a card
        <li
          key={book._id}
          className="border p-4 rounded bg-white flex flex-col justify-center md:flex-row items-center md:items-start gap-4"
        >
          {/* Book details: title, author, description */}
          <div className="flex-1 w-full h-full">
            <h3 className="font-semibold text-lg mb-1">{book.title}</h3>
            <p className="text-gray-600 mb-1">Author: {book.author}</p>
            <p className="text-gray-500 text-sm">{book.description}</p>
          </div>
          {/* Show cover image on the right if available */}
          {book.coverImage && book.coverImage.trim() !== "" && (
            <img
              src={book.coverImage}
              alt={book.title + " cover"}
              className="w-32 h-40 object-cover rounded shadow md:ml-2"
            />
          )}
        </li>
      ))}
    </ul>
  );
}
