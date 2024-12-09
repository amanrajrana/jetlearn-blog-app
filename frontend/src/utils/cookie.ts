/**
 * Utility to get a cookie
 */

export const getCookie = (name: string): string | undefined => {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : undefined;
};

/**
 * Utility to delete a cookie
 */
export const deleteCookie = (name: string): void => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

/**
 * Utility to set a cookie
 */
export const setCookie = (
  name: string,
  value: string,
  options?: { path?: string; expires?: Date }
): void => {
  let cookie = `${name}=${encodeURIComponent(value)};`;
  if (options?.path) cookie += `path=${options.path};`;
  if (options?.expires) cookie += `expires=${options.expires.toUTCString()};`;
  document.cookie = cookie;
};
