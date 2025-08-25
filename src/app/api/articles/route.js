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
  
  // Get or generate a seed for consistent ordering
  const seed = request.headers.get('x-user-id') || 'default-seed';

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

    // Sort by a consistent hash of the article ID to maintain stable order
    uniqueArticles.sort((a, b) => {
      const hashA = Math.abs(hashCode(a.id + seed));
      const hashB = Math.abs(hashCode(b.id + seed));
      return hashA - hashB;
    });

    // Helper function to generate consistent hash codes
    function hashCode(str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
      }
      return hash;
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
