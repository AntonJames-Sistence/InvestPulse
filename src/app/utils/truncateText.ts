export const truncateText = (
  text: string | null,
  maxLength: number
): string => {
  if (!text) return '';
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};
