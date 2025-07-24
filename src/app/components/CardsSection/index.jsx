"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const THREE_HOURS_MS = 3 * 60 * 60 * 1000;

export default function CardsSection() {
  // Default values for tag, top, and page
  const tag = "javascript";
  const top = 30;
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["articles", tag, top, page],
    queryFn: async () => {
      const params = new URLSearchParams({
        tag,
        top: top.toString(),
        page: page.toString(),
      });
      const response = await fetch(`/api/articles?${params.toString()}`);
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
    cacheTime: THREE_HOURS_MS,
    staleTime: THREE_HOURS_MS,
  });

  if (isLoading) return <div>Loading articles...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Articles</h2>
      <ul>
        {data && data.length > 0 ? (
          data.map((article) => <li key={article.id}>{article.title}</li>)
        ) : (
          <li>No articles found.</li>
        )}
      </ul>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
}
