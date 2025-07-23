"use client";
import React from "react";
import gmailIcon from "../../../assets/svgs/gmail.svg";
import youtubeIcon from "../../../assets/svgs/youtube.svg";
import linkedinIcon from "../../../assets/svgs/linkedin.svg";
import Image from "next/image";

const openInNewTab = (url) => {
  if (typeof chrome !== "undefined" && chrome.tabs) {
    chrome.tabs.create({ url });
  } else {
    // Fallback for web version
    window.open(url, "_blank", "noopener,noreferrer");
  }
};

export default function EssentialShortcuts() {
  return (
    <div className="flex gap-4 p-2 bg-gray-100 rounded-xl">
      <button
        onClick={() => openInNewTab("https://mail.google.com")}
        title="Gmail"
        className="cursor-pointer"
      >
        <Image src={gmailIcon} alt="Gmail" width={32} height={32} />
      </button>

      <button
        onClick={() => openInNewTab("https://www.youtube.com")}
        title="YouTube"
        className="cursor-pointer"
      >
        <Image src={youtubeIcon} alt="YouTube" width={32} height={32} />
      </button>

      <button
        onClick={() => openInNewTab("https://www.linkedin.com")}
        title="LinkedIn"
        className="cursor-pointer"
      >
        <Image src={linkedinIcon} alt="LinkedIn" width={32} height={32} />
      </button>
    </div>
  );
}
