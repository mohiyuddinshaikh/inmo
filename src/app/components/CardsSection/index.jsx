"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/lib/store";

const THREE_HOURS_MS = 3 * 60 * 60 * 1000;

export default function CardsSection() {
  // Get user preferences from store
  const user = useAppSelector((state) => state.user.user);
  const tag = user?.preferences?.tags?.[0];
  const top = 5;
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["articles", tag, top, page],
    queryFn: async () => {
      if (!tag) return [];

      const params = new URLSearchParams({
        tag,
        top: top.toString(),
        page: page.toString(),
      });
      const response = await fetch(`/api/articles?${params.toString()}`);
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
    enabled: !!tag, // Only run the query if tag exists
    cacheTime: THREE_HOURS_MS,
    staleTime: THREE_HOURS_MS,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <div>Loading articles...</div>;
  if (!tag) return <div>Please select your preferences to see articles</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const handleOpenArticle = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div>
      <h2 className="text-xl font-bold">Articles</h2>
      <ul>
        {data && data.length > 0 ? (
          data.map((article) => (
            <li
              key={article.id}
              className="hover:underline cursor-pointer mt-2"
              onClick={() => handleOpenArticle(article.url)}
            >
              {article.title}
            </li>
          ))
        ) : (
          <li>No articles found.</li>
        )}
      </ul>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
}
