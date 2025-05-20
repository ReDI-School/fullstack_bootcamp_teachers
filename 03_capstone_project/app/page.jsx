export default function HomePage() {
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Library Management System</h1>
      <p className="text-lg mb-8">Manage your books and favorites easily.</p>
      <div className="flex justify-center gap-4">
        <a href="/books" className="bg-blue-600 text-white px-4 py-2 rounded">Browse Books</a>
        <a href="/login" className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Sign In</a>
      </div>
    </div>
  );
}
