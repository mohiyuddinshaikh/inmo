import { User } from "@/app/models/User";
import { connectDB } from "@/lib/db";

export async function GET(request) {
  await connectDB();
  const users = await User.find();
  return Response.json(users, { status: 200 });
}

export async function POST(request) {
  await connectDB();
  const body = await request.json();
  const { name, email } = body;
  const newUser = new User({ name, email });
  await newUser.save();
  return Response.json(newUser, { status: 201 });
}
