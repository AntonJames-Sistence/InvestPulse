interface CacheData<T> {
  data: T;
  timestamp: number;
}

export const setCache = <T>(key: string, data: T): void => {
  const cacheData: CacheData<T> = { data, timestamp: Date.now() };
  localStorage.setItem(key, JSON.stringify(cacheData));
};

export const getCache = <T>(key: string, expiry: number): T | null => {
  const cachedData = localStorage.getItem(key);
  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData) as CacheData<T>;
    if (Date.now() - timestamp < expiry) {
      return data;
    }
  }
  return null;
};

export const clearCache = (key: string): void => {
  localStorage.removeItem(key);
};
