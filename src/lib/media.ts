import { asset } from './asset';
import blurData from './blur.json';

interface BlurEntry { b: string; w: number; h: number }
const blurMap = blurData as Record<string, BlurEntry>;

const swap = (path: string, suffix: string) => path.replace(/\.(jpe?g|png)$/i, `${suffix}.webp`);

/** 1600px WebP for full-size viewing. `path` is relative to /public (e.g. "img/JoeAllan.jpg"). */
export const full = (path: string): string => asset(swap(path, ''));
/** 640px WebP for grids and cards. */
export const thumb = (path: string): string => asset(swap(path, '-sm'));
/** Tiny inline blur placeholder + natural size. */
export const blurOf = (path: string): BlurEntry | undefined => blurMap[path];
