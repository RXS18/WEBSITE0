import React, { useEffect, useRef, useState } from 'react';
import { blurOf, full, thumb } from '../../lib/media';

interface ImgProps {
  /** Path relative to /public, original extension (e.g. "img/JoeAllan.jpg"). */
  path: string;
  alt: string;
  className?: string;
  /** `sizes` attribute so phones pick the 640px file. */
  sizes?: string;
  eager?: boolean;
}

/** WebP with srcset and a blurred inline placeholder that fades out on load. */
const Img: React.FC<ImgProps> = ({ path, alt, className = '', sizes = '(min-width: 1024px) 33vw, 100vw', eager }) => {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  const blur = blurOf(path);

  // Cached images can finish before React attaches onLoad.
  useEffect(() => {
    if (ref.current?.complete && ref.current.naturalWidth > 0) setLoaded(true);
  }, []);

  return (
    <span
      className="block h-full w-full overflow-hidden bg-alt"
      style={blur ? { backgroundImage: `url(${blur.b})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
    >
      <img
        ref={ref}
        src={full(path)}
        srcSet={`${thumb(path)} 640w, ${full(path)} 1600w`}
        sizes={sizes}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        width={blur?.w}
        height={blur?.h}
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      />
    </span>
  );
};

export default Img;
