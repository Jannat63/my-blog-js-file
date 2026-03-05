export function calculateReadingTime(content: string) {
  const text = content.replace(/<[^>]*>/g, "");
  const words = text.trim().split(/\s+/).length;

  const wordsPerMinute = 200;
  const minutes = Math.ceil(words / wordsPerMinute);

  return `${minutes} min read`;
}