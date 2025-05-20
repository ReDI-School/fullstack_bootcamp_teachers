import connectToDatabase from "@/lib/mongodb";
import Book from "@/models/Book";
import { NextResponse } from "next/server";

// GET /api/books - Get all books, sorted by newest first
export async function GET() {
  await connectToDatabase();
  const books = await Book.find().sort({ createdAt: -1 });
  return NextResponse.json(books);
}

// POST /api/books - Create a new book
export async function POST(request) {
  await connectToDatabase();
  const data = await request.json();
  const book = await Book.create(data);
  return NextResponse.json(book, { status: 201 });
}
