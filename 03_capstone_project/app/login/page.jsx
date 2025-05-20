"use client";
import { useState } from "react";

// LoginPage: Handles user login logic and UI
export default function LoginPage() {
  // State for form fields and feedback
  const [email, setEmail] = useState(""); // User's email
  const [password, setPassword] = useState(""); // User's password
  const [error, setError] = useState(""); // Error message
  const [success, setSuccess] = useState(""); // Success message

  // Handle login form submission
  async function handleSubmit(e) {
    // Prevent default form submission behavior
    e.preventDefault();
    // Clear previous error and success messages
    setError(""); // Clear previous error
    setSuccess(""); // Clear previous success
    // Send login data to the backend
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    // Get JSON response from the backend
    const data = await res.json();
    // Check if the response was successful
    if (!res.ok) {
      // If not, show an error message
      setError(data.error || "Login failed"); // Show error
    } else {
      // If successful, show a success message and redirect
      setSuccess("Login successful! Redirecting..."); // Show success
      // Save JWT token and user name to localStorage for navbar
      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.user && data.user.name ? data.user.name : "User");
      // Redirect to home page or books page
      window.location.href = "/";
    }
  }

  // Login form UI
  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {/* Form that calls handleSubmit on submission */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email input field */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          Sign In
        </button>
        {error && <div className="text-red-600">{error}</div>}
        {success && <div className="text-green-600">{success}</div>}
      </form>
    </div>
  );
}
