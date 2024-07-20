interface NewsCacheData<T> {
  data: T;
  timestamp: number;
}

export const setNewsCache = <T>(key: string, data: T, expiry: number): void => {
  const cacheData: NewsCacheData<T> = { data, timestamp: Date.now() };
  localStorage.setItem(key, JSON.stringify(cacheData));
};

export const getNewsCache = <T>(key: string, expiry: number): T | null => {
  const cachedData = localStorage.getItem(key);
  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData) as NewsCacheData<T>;
    if (Date.now() - timestamp < expiry) {
      return data;
    }
  }
  return null;
};

export const clearNewsCache = (key: string): void => {
  localStorage.removeItem(key);
};
