"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import classnames from "classnames";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

export default function PreferenceForm({ tags }) {
  const { data: session } = useSession();
  const user = session?.user;

  const handleSaveTags = async () => {
    const { connectDB } = await import("@/lib/db");
    const { Preferences } = await import("@/app/models/Preferences");
    await connectDB();
    const newPreferences = new Preferences({
      tags: selectedTags,
      user: user.id,
    });
    await newPreferences.save();
    console.log("save");
    toast.success("Preferences saved successfully");
  };

  const [selectedTags, setSelectedTags] = useState([]);
  console.log("selectedTags", selectedTags);

  const handleTagClick = (tagId) => {
    setSelectedTags((prevSelected) => {
      const isSelected = prevSelected.includes(tagId);
      if (isSelected) {
        return prevSelected.filter((id) => id !== tagId);
      }
      if (!isSelected && prevSelected.length >= 3) {
        toast.warning("You can select up to 3 preferences only.");
        return prevSelected;
      }
      return [...prevSelected, tagId];
    });
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Select your Interests
      </h1>
      <div className="flex flex-col gap-4 justify-center items-center">
        <ul className="flex flex-wrap gap-4 justify-center">
          {tags.map((tag) => (
            <li
              key={tag.id}
              className={classnames(
                "p-4 rounded-3xl cursor-pointer text-white bg-gray-600 font-bold hover:bg-gray-800 hover:text-orange-500 transition-all duration-300 select-none",
                {
                  "bg-gray-800 !text-orange-500": selectedTags.includes(tag.id),
                }
              )}
              onClick={() => handleTagClick(tag.id)}
            >
              {tag.name}
            </li>
          ))}
        </ul>
        <Button
          className="w-2xl p-4 text-md mt-8 rounded-2xl cursor-pointer"
          onClick={handleSaveTags}
          disabled={selectedTags.length === 0}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
