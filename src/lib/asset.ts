const base = import.meta.env.BASE_URL.replace(/\/+$/, '');

/**
 * Builds a URL for a file in /public, honouring the Vite `base` used on
 * GitHub Pages. Avoids the doubled slash you get from naive concatenation.
 */
export const asset = (path: string): string => `${base}/${path.replace(/^\/+/, '')}`;
