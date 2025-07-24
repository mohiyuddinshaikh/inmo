export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get("tag") || "javascript";
  const top = searchParams.get("top") || "30";
  const page = searchParams.get("page") || "1";
  const url = `https://dev.to/api/articles?tag=${encodeURIComponent(
    tag
  )}&top=${encodeURIComponent(top)}&page=${encodeURIComponent(page)}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch articles" }),
        {
          status: res.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    const data = await res.json();
    return new Response(JSON.stringify(data), {
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
