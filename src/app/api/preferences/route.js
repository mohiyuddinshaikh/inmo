import { connectDB } from "@/lib/db";
import { Preferences } from "@/app/models/Preferences";
import { User } from "@/app/models/User";

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { userId, tags } = body;

    if (!userId || !tags || tags.length === 0) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const newPreferences = new Preferences({ userId, tags });
    await newPreferences.save();
    // Update the user to reference the new preferences
    await User.findByIdAndUpdate(userId, { preferences: newPreferences._id });

    return new Response(
      JSON.stringify({
        message: "Preference added successfully",
        preference: { userId, tags },
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Failed to add preference",
        details: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const preferences = await Preferences.find();
    return new Response(JSON.stringify(preferences), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Failed to fetch preferences",
        details: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
