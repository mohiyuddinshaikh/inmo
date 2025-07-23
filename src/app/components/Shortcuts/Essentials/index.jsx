"use client";
import React from "react";
import gmailIcon from "../../../assets/svgs/gmail.svg";
import youtubeIcon from "../../../assets/svgs/youtube.svg";
import linkedinIcon from "../../../assets/svgs/linkedin.svg";
import Image from "next/image";

const iconStyle = { width: 32, height: 32 };

export default function EssentialShortcuts() {
  return (
    <div className="flex gap-4 p-2 bg-gray-100 rounded-xl">
      <button
        onClick={() => window.open("https://mail.google.com", "_blank")}
        title="Gmail"
        className="cursor-pointer"
      >
        <Image src={gmailIcon} alt="Gmail" width={32} height={32} />
      </button>
      <button
        onClick={() => window.open("https://www.youtube.com", "_blank")}
        title="YouTube"
        className="cursor-pointer"
      >
        <Image src={youtubeIcon} alt="YouTube" width={32} height={32} />
      </button>
      <button
        onClick={() => window.open("https://www.linkedin.com", "_blank")}
        title="LinkedIn"
        className="cursor-pointer"
      >
        <Image src={linkedinIcon} alt="LinkedIn" width={32} height={32} />
      </button>
    </div>
  );
}
