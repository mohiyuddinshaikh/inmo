import React from "react";
import PreferenceForm from "../components/PreferenceForm";

export default async function Preferences() {
  const res = await fetch("https://dev.to/api/tags?per_page=50");
  const tags = await res.json();
  return <PreferenceForm tags={tags} />;
}
