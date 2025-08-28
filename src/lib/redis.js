import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL, {
  retryStrategy: (times) => {
    // Don't retry after 3 attempts
    if (times > 3) {
      console.error("Max Redis connection attempts reached");
      return null; // End reconnection
    }
    // Reconnect after
    return Math.min(times * 100, 3000);
  },
  maxRetriesPerRequest: 3,
  enableOfflineQueue: false,
});

redis.on("connect", () => {
  console.log("Connected to Redis");
});

redis.on("error", (err) => {
  console.error("Redis error:", err);
});

export default redis;
