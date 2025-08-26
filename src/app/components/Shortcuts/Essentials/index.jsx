"use client";
import React, { useState } from "react";
import gmailIcon from "../../../assets/svgs/gmail.svg";
import youtubeIcon from "../../../assets/svgs/youtube.svg";
import linkedinIcon from "../../../assets/svgs/linkedin.svg";
import Image from "next/image";
import AddShortcutDialog from "@/app/components/AddShortcutDialog";

const openInSameTab = (url) => {
  // window.location.href = url;
  window.open(url, "_top");
};

export default function EssentialShortcuts() {
  const [open, setOpen] = useState(false);

  // Handler for Add button (currently just closes dialog)
  const handleAddShortcut = (shortcut) => {
    setLinks([...links, shortcut]);
  };

  const [links, setLinks] = useState([
    {
      name: "Gmail",
      link: "https://mail.google.com",
    },
    {
      name: "YouTube",
      link: "https://www.youtube.com",
    },
    {
      name: "LinkedIn",
      link: "https://www.linkedin.com",
    },
  ]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mt-4">
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-wrap gap-4">
          <AddShortcutDialog
            open={open}
            setOpen={setOpen}
            onAdd={handleAddShortcut}
          />
          {links.map((link, index) => (
            <button
              key={index}
              onClick={() => openInSameTab(link.link)}
              className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group w-20 cursor-pointer"
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 group-hover:shadow-md transition-shadow mb-2">
                <Image
                  src={`https://www.google.com/s2/favicons?sz=128&domain=${link.link}`}
                  alt={link.name}
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <span className="text-xs text-gray-600 group-hover:text-gray-900 truncate w-full">
                {link.name}
              </span>
            </button>
          ))}

          <button
            title="Add Shortcut"
            className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 w-20 cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:border-blue-500 hover:text-blue-500 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <span className="text-xs text-gray-500 mt-2">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
