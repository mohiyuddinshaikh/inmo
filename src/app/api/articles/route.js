import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL);

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const tagsParam = searchParams.get("tags");
  const top = searchParams.get("top") || "10";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");

  if (!tagsParam || !tagsParam.length) {
    return new Response(
      JSON.stringify({ error: "Tags parameter is required" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const tags = tagsParam.split(",").slice(0, 3);
  const seed = request.headers.get("x-user-id") || "default-seed";
  const cacheKey = `articles:${seed}:${tags.join(",")}:${top}`;

  try {
    // 1. Check Redis cache
    let cached = await redis.get(cacheKey);
    let uniqueArticles;

    if (cached) {
      uniqueArticles = JSON.parse(cached);
    } else {
      // 2. Fetch from dev.to
      const responses = await Promise.allSettled(
        tags.map((tag) => {
          const url = `https://dev.to/api/articles?tag=${encodeURIComponent(
            tag.trim()
          )}&top=${encodeURIComponent(top)}&per_page=50`;
          return fetch(url).then((res) => res.json());
        })
      );

      const successfulResponses = responses
        .filter((result) => result.status === "fulfilled")
        .map((result) => result.value);

      const data = successfulResponses.flatMap((articles, index) =>
        Array.isArray(articles)
          ? articles.map((article) => ({
              ...article,
              tag: tags[index],
              tagIndex: index,
            }))
          : []
      );

      // Deduplicate
      const unique = [];
      const articleIds = new Set();
      for (const article of data) {
        if (!articleIds.has(article.id)) {
          articleIds.add(article.id);
          unique.push(article);
        }
      }

      // Deterministic shuffle (stable for user)
      unique.sort((a, b) => {
        const hashA = Math.abs(hashCode(a.id + seed));
        const hashB = Math.abs(hashCode(b.id + seed));
        return hashA - hashB;
      });

      uniqueArticles = unique;

      // Cache for 1 hour
      await redis.setex(cacheKey, 3600, JSON.stringify(uniqueArticles));
    }

    // 3. Slice per page
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = uniqueArticles.slice(start, end);

    return new Response(
      JSON.stringify({
        page,
        limit,
        total: uniqueArticles.length,
        data: paginated,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}
