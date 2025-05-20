"use client";
import { useState } from "react";

// RegisterPage: Handles user registration logic and UI
export default function RegisterPage() {
  // State for form fields and feedback
  const [name, setName] = useState(""); // User's name
  const [email, setEmail] = useState(""); // User's email
  const [password, setPassword] = useState(""); // User's password
  const [error, setError] = useState(""); // Error message
  const [success, setSuccess] = useState(""); // Success message

  // Handle registration form submission
  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); // Clear previous error
    setSuccess(""); // Clear previous success
    // Send registration data to the backend
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Registration failed"); // Show error
    } else {
      setSuccess("Registration successful! Logging you in..."); // Show success
      // Save JWT token and user name to localStorage for navbar
      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.user && data.user.name ? data.user.name : "User");
      // Redirect to home page or books page
      window.location.href = "/";
    }
  }

  // Registration form UI
  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
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
          Register
        </button>
        {error && <div className="text-red-600">{error}</div>}
        {success && <div className="text-green-600">{success}</div>}
      </form>
    </div>
  );
}
