import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

// POST /api/auth/register - Register a new user
export async function POST(request) {
  await connectToDatabase();
  const { name, email, password } = await request.json();
  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }
  // Create user
  const user = await User.create({ name, email, password });
  return NextResponse.json({ _id: user._id, name: user.name, email: user.email });
}
