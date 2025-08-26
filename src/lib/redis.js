import Redis from "ioredis";

const redis = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: process.env.REDIS_PORT || 6379,
  retryStrategy: (times) => {
    // Don't retry after 3 attempts
    if (times > 3) {
      console.error('Max Redis connection attempts reached');
      return null; // End reconnection
    }
    // Reconnect after
    return Math.min(times * 100, 3000);
  },
  maxRetriesPerRequest: 3,
  enableOfflineQueue: false,
});

redis.on('connect', () => {
  console.log('Connected to Redis');
});

redis.on('error', (err) => {
  console.error('Redis error:', err);
});

export default redis;
