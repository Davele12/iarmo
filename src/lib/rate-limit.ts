export class RateLimiter {
  private buckets = new Map<string, { count: number; expires: number }>();
  constructor(private limit = 5, private windowMs = 600_000, private capacity = 10_000) {}
  allow(key: string, now = Date.now()): boolean {
    for (const [id, bucket] of this.buckets) if (bucket.expires <= now) this.buckets.delete(id);
    const bucket = this.buckets.get(key);
    if (!bucket) {
      if (this.buckets.size >= this.capacity) return false;
      this.buckets.set(key, { count: 1, expires: now + this.windowMs });
      return true;
    }
    if (bucket.count >= this.limit) return false;
    bucket.count += 1;
    return true;
  }
}
