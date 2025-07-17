import React from "react";
import gmailIcon from "../../../assets/svgs/gmail.svg";
import youtubeIcon from "../../../assets/svgs/youtube.svg";
import linkedinIcon from "../../../assets/svgs/linkedin.svg";
import Image from "next/image";

const iconStyle = { width: 32, height: 32 };

export default function EssentialShortcuts() {
  return (
    <div className="flex gap-4 p-2 bg-gray-100 rounded-xl">
      <a
        href="https://mail.google.com"
        target="_blank"
        rel="noopener noreferrer"
        title="Gmail"
      >
        <Image src={gmailIcon} alt="Gmail" width={32} height={32} />
      </a>
      <a
        href="https://www.youtube.com"
        target="_blank"
        rel="noopener noreferrer"
        title="YouTube"
      >
        <Image src={youtubeIcon} alt="YouTube" width={32} height={32} />
      </a>
      <a
        href="https://www.linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        title="LinkedIn"
      >
        <Image src={linkedinIcon} alt="LinkedIn" width={32} height={32} />
      </a>
    </div>
  );
}
