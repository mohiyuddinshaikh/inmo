"use client";
import React, { useState } from "react";
import gmailIcon from "../../../assets/svgs/gmail.svg";
import youtubeIcon from "../../../assets/svgs/youtube.svg";
import linkedinIcon from "../../../assets/svgs/linkedin.svg";
import Image from "next/image";
import AddShortcutDialog from "@/app/components/AddShortcutDialog";

const openInNewTab = (url) => {
  console.log("Opening URL:", url);
  window.open(url, "_blank", "noopener,noreferrer");
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

  console.log("links", links);

  return (
    <div className="flex gap-4 p-2 bg-gray-100 rounded-xl">
      <AddShortcutDialog
        open={open}
        setOpen={setOpen}
        onAdd={handleAddShortcut}
      />
      {links.map((link, index) => (
        <button
          key={index}
          onClick={() => openInNewTab(link.link)}
          title={link.name}
          className="cursor-pointer"
        >
          <Image
            src={`https://www.google.com/s2/favicons?sz=64&domain=${link.link}`}
            alt={link.name}
            width={32}
            height={32}
          />
        </button>
      ))}

      <button
        title="Add Shortcut"
        className="cursor-pointer border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center bg-white hover:bg-gray-200 transition"
        onClick={() => setOpen(true)}
      >
        +
      </button>
    </div>
  );
}
