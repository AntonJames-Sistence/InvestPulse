const keywords = [
  'crypto',
  'cryptocurrency',
  'coin',
  'blockchain',
  'bitcoin',
  'ethereum',
];

export const isRelevantArticle = (
  title: string,
  description: string
): boolean => {
  const content = `${title} ${description}`.toLowerCase();
  return keywords.some((keyword) => content.includes(keyword));
};
