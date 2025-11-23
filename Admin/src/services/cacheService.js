// Cache service để tối ưu hóa performance
class CacheService {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  set(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  get(key) {
    const cached = this.cache.get(key);
    if (!cached) return null;

    // Kiểm tra xem cache đã hết hạn chưa
    if (Date.now() - cached.timestamp > this.cacheTimeout) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  clear(key) {
    if (key) {
      this.cache.delete(key);
    } else {
      this.cache.clear();
    }
  }

  has(key) {
    const cached = this.cache.get(key);
    if (!cached) return false;

    if (Date.now() - cached.timestamp > this.cacheTimeout) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }
}

export const cacheService = new CacheService();
