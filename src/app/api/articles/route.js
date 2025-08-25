export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const tagsParam = searchParams.get("tags");
  const top = searchParams.get("top") || "10";
  // const page = searchParams.get("page") || "1";

  if (!tagsParam || !tagsParam.length) {
    return new Response(
      JSON.stringify({ error: "Tags parameter is required" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // Parse tags from comma-separated string and take first 3
  const tags = tagsParam.split(",").slice(0, 3);

  try {
    // Make parallel API calls for each tag with allSettled
    const responses = await Promise.allSettled(
      tags.map((tag) => {
        const url = `https://dev.to/api/articles?tag=${encodeURIComponent(
          tag.trim()
        )}&top=${encodeURIComponent(top)}&per_page=50`;
        return fetch(url).then((res) => res.json());
      })
    );

    // Process settled promises and filter out failed requests
    const successfulResponses = responses
      .filter((result) => result.status === "fulfilled")
      .map((result) => result.value);

    // Combine results and add tag information
    const data = successfulResponses.flatMap((articles, index) =>
      Array.isArray(articles)
        ? articles.map((article) => ({
            ...article,
            tag: tags[index],
            tagIndex: index,
          }))
        : []
    );

    // Remove duplicates by article ID and randomize the order
    const uniqueArticles = [];
    const articleIds = new Set();

    // First deduplicate
    for (const article of data) {
      if (!articleIds.has(article.id)) {
        articleIds.add(article.id);
        uniqueArticles.push(article);
      }
    }

    // Randomize the array using Fisher-Yates shuffle
    for (let i = uniqueArticles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [uniqueArticles[i], uniqueArticles[j]] = [uniqueArticles[j], uniqueArticles[i]];
    }
    
    return new Response(JSON.stringify(uniqueArticles), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
