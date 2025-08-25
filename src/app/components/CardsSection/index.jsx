"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/lib/store";
import axios from "axios";

const THREE_HOURS_MS = 3 * 60 * 60 * 1000;

export default function CardsSection() {
  // Get user preferences from store
  const user = useAppSelector((state) => state.user.user);
  const tags = user?.preferences?.tags?.slice(0, 3) || [];
  const top = 20; // top articles fo these many days
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["articles", tags.join(","), top, page],
    queryFn: async () => {
      if (!tags.length) return [];

      const response = await axios.get('/api/articles', {
        params: {
          tags: tags.join(","),
          top: top.toString(),
          page: page.toString(),
        },
        headers: {
          'x-user-id': user?._id || 'anonymous',
        },
      });
      return response.data;
    },
    enabled: tags.length > 0, // Only run the query if we have tags
    cacheTime: THREE_HOURS_MS,
    staleTime: THREE_HOURS_MS,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <div>Loading articles...</div>;
  if (!tags.length)
    return <div>Please select your preferences to see articles</div>;
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
