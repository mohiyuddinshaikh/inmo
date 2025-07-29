import { User } from "@/app/models/User";
import { connectDB } from "@/lib/db";

export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  if (email) {
    const user = await User.findOne({ email }).populate("preferences");
    console.log("user", user);
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }
    return Response.json(user, { status: 200 });
  }
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
