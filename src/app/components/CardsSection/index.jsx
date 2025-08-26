"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/lib/store";
import axios from "axios";
import classNames from "classnames";

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

      const response = await axios.get("/api/articles", {
        params: {
          tags: tags.join(","),
          top: top.toString(),
          page: page.toString(),
        },
        headers: {
          "x-user-id": user?._id || "anonymous",
        },
      });
      return response?.data?.data;
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

  // Check if there's a next page (if we have less items than requested, it's the last page)
  const isLastPage = !data || data.length < top;
  const isFirstPage = page === 1;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900">Articles</h2>
        </div>

        <div className="divide-y divide-gray-100">
          {data && data.length > 0 ? (
            data.map((article) => (
              <div
                key={article.id}
                className="p-6 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                onClick={() => handleOpenArticle(article.url)}
              >
                <h3 className="text-lg font-medium text-gray-900 hover:text-blue-600">
                  {article.title}
                </h3>
              </div>
            ))
          ) : (
            <div className="p-6 text-gray-500">No articles found.</div>
          )}
        </div>

        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex-1 flex items-center justify-center sm:justify-between">
              <div className="hidden sm:block">
                <p className="text-sm text-gray-700">
                  Page <span className="font-medium">{page}</span>
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  className={classNames(
                    "relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                    {
                      "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed":
                        isFirstPage,
                      "bg-white border-gray-300 text-gray-700 hover:bg-gray-50":
                        !isFirstPage,
                    }
                  )}
                  onClick={() => !isFirstPage && setPage(page - 1)}
                  disabled={isFirstPage}
                >
                  Previous
                </button>
                <button
                  className={classNames(
                    "relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                    {
                      "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed":
                        isLastPage,
                      "bg-white border-gray-300 text-gray-700 hover:bg-gray-50":
                        !isLastPage,
                    }
                  )}
                  onClick={() => !isLastPage && setPage(page + 1)}
                  disabled={isLastPage}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
