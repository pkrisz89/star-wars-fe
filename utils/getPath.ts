import urlParser from "url-parse";

export const getPath = (url: string): string => {
  const { pathname } = urlParser(url);

  if (!pathname.startsWith("/api")) return pathname;

  return pathname.slice(5);
};
