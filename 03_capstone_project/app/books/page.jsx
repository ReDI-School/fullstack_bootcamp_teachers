"use client";
import { useEffect, useState } from "react";
import AddBookForm from "@/components/books/AddBookForm";
import BookList from "@/components/books/BookList";

// Main page for listing and adding books
export default function BooksPage() {
  // State for the list of books and loading/error status
  const [books, setBooks] = useState(null); // Array of books from API
  const [loading, setLoading] = useState(true); // Loading indicator
  const [error, setError] = useState(null); // Error message if fetch fails

  // State for the Add Book form fields and feedback
  const [title, setTitle] = useState(""); // Book title
  const [author, setAuthor] = useState(""); // Book author
  const [description, setDescription] = useState(""); // Book description
  const [coverImage, setCoverImage] = useState(""); // Optional cover image URL
  const [formError, setFormError] = useState(""); // Error message for form
  const [formSuccess, setFormSuccess] = useState(""); // Success message for form

  // Fetch books from the API when the page loads
  useEffect(() => {
    fetchBooks();
  }, []);

  // Fetch all books from the backend API
  function fetchBooks() {
    setLoading(true); // Show loading indicator
    fetch("/api/books")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load books");
        return res.json();
      })
      .then((data) => {
        setBooks(data); // Save books in state
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message); // Show error if fetch fails
        setLoading(false);
      });
  }

  // Handle form submission for adding a new book
  function handleAddBook(e) {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");
    // Validate required fields
    if (!title || !author || !description) {
      setFormError("Please fill in all required fields!");
      return;
    }
    // Send POST request to API to add the new book
    fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author, description, coverImage }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add book");
        return res.json();
      })
      .then(() => {
        setFormSuccess("Book added successfully!"); // Show success message
        setTitle("");
        setAuthor("");
        setDescription("");
        setCoverImage("");
        fetchBooks(); // Refresh the book list
      })
      .catch((err) => setFormError(err.message)); // Show error message if failed
  }

  // Show loading or error messages if needed
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading books: {error}</div>;

  // Main page layout: Add book form on the left, book list on the right
  return (
    <div className="max-w-4xl mx-auto py-8 flex flex-col md:flex-row gap-8">
      {/* Add Book Section: Form for adding a new book */}
      <section className="md:w-1/3 w-full bg-gray-50 rounded shadow p-6 h-fit">
        <h2 className="text-xl font-bold mb-4 text-blue-700">Add New Book</h2>
        <AddBookForm
          title={title}
          setTitle={setTitle}
          author={author}
          setAuthor={setAuthor}
          description={description}
          setDescription={setDescription}
          coverImage={coverImage}
          setCoverImage={setCoverImage}
          formError={formError}
          formSuccess={formSuccess}
          onSubmit={handleAddBook}
        />
      </section>

      {/* Book List Section: Shows all books in a scrollable window */}
      <section className="md:w-2/3 w-full">
        <h2 className="text-2xl font-bold mb-4">Book List</h2>
        <div className="overflow-y-auto h-96 md:h-[600px] pr-2">
          <BookList books={books} />
        </div>
      </section>
    </div>
  );
}

