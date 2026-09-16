/* oxlint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const useMedia = (queries: string[], values: number[], defaultValue: number): number => {
  const get = () => {
    if (typeof window === 'undefined') return defaultValue;
    return values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue;
  };

  const [value, setValue] = useState<number>(get);

  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach(q => matchMedia(q).addEventListener('change', handler));
    return () => queries.forEach(q => matchMedia(q).removeEventListener('change', handler));
  }, [queries]);

  return value;
};

const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
};

const preloadImages = async (urls: string[]): Promise<void> => {
  await Promise.all(
    urls.map(
      src =>
        new Promise<void>(resolve => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        })
    )
  );
};

export interface Item {
  id: string;
  img: string;
  url: string;
  height: number;
  title?: string;
  tags?: string[];
}

interface GridItem extends Item {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface MasonryProps {
  items: Item[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: 'bottom' | 'top' | 'left' | 'right' | 'center' | 'random';
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
  revealOnScroll?: boolean;
}

const Masonry: React.FC<MasonryProps> = ({
  items,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
  revealOnScroll = false
}) => {
  const columns = useMedia(
    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'],
    [5, 4, 3, 2],
    1
  );

  const [containerRef, { width }] = useMeasure<HTMLDivElement>();
  const [imagesReady, setImagesReady] = useState(false);

  const getInitialPosition = (item: GridItem) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };

    let direction = animateFrom;
    if (animateFrom === 'random') {
      const dirs = ['top', 'bottom', 'left', 'right'];
      direction = dirs[Math.floor(Math.random() * dirs.length)] as typeof animateFrom;
    }

    switch (direction) {
      case 'top':
        return { x: item.x, y: -200 };
      case 'bottom':
        return { x: item.x, y: window.innerHeight + 200 };
      case 'left':
        return { x: -200, y: item.y };
      case 'right':
        return { x: window.innerWidth + 200, y: item.y };
      case 'center':
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2
        };
      default:
        return { x: item.x, y: item.y + 100 };
    }
  };

  useEffect(() => {
    preloadImages(items.map(i => i.img)).then(() => setImagesReady(true));
  }, [items]);

  const grid = useMemo<GridItem[]>(() => {
    if (!width) return [];
    const colHeights = new Array(columns).fill(0);
    const gap = 16;
    const totalGaps = (columns - 1) * gap;
    const columnWidth = (width - totalGaps) / columns;

    return items.map(child => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = col * (columnWidth + gap);
      const height = child.height / 2;
      const y = colHeights[col];

      colHeights[col] += height + gap;
      return { ...child, x, y, w: columnWidth, h: height };
    });
  }, [columns, items, width]);

  const hasMounted = useRef(false);
  const entranceStRef = useRef<ReturnType<typeof ScrollTrigger.create> | null>(null);
  const scrubStRef = useRef<ReturnType<typeof ScrollTrigger.create> | null>(null);
  const scrubReady = useRef(false);

  useLayoutEffect(() => {
    if (!imagesReady) return;

    const container = containerRef.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animProps = { x: item.x, y: item.y, width: item.w, height: item.h };

      if (!hasMounted.current) {
        if (reduced) {
          gsap.set(selector, { ...animProps, opacity: 1, filter: 'blur(0px)' });
          return;
        }
        const start = getInitialPosition(item);
        const hidden = {
          opacity: 0,
          x: start.x,
          y: start.y,
          width: item.w,
          height: item.h,
          ...(blurToFocus && { filter: 'blur(10px)' })
        };
        if (revealOnScroll) {
          gsap.set(selector, hidden);
        } else {
          gsap.fromTo(selector, hidden, {
            opacity: 1,
            ...animProps,
            ...(blurToFocus && { filter: 'blur(0px)' }),
            duration: 0.8,
            ease: 'power3.out',
            delay: index * stagger
          });
        }
      } else {
        if (reduced) {
          gsap.set(selector, animProps);
          return;
        }
        gsap.to(selector, {
          ...animProps,
          duration,
          ease,
          overwrite: 'auto'
        });
      }
    });

    if (container && !reduced && revealOnScroll && !hasMounted.current) {
      entranceStRef.current = ScrollTrigger.create({
        trigger: container,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          grid.forEach((item, index) => {
            gsap.to(`[data-key="${item.id}"]`, {
              opacity: 1,
              x: item.x,
              y: item.y,
              width: item.w,
              height: item.h,
              ...(blurToFocus && { filter: 'blur(0px)' }),
              duration: 0.8,
              ease: 'power3.out',
              delay: index * stagger
            });
          });
          hasMounted.current = true;
        }
      });
    }

    if (container && !reduced && revealOnScroll && !scrubReady.current) {
      scrubReady.current = true;
      scrubStRef.current = ScrollTrigger.create({
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.4,
        animation: gsap.fromTo(container, { yPercent: 4 }, { yPercent: -4, ease: 'none' })
      });
    }

    return () => {
      entranceStRef.current?.kill();
      scrubStRef.current?.kill();
      entranceStRef.current = null;
      scrubStRef.current = null;
      scrubReady.current = false;
    };
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease, revealOnScroll]);

  const tallest = grid.length ? Math.max(...grid.map(g => g.y + g.h)) : 0;

  const handleMouseEnter = (id: string, element: HTMLElement) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (scaleOnHover) {
      gsap.to(`[data-key="${id}"]`, {
        scale: hoverScale,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay') as HTMLElement;
      if (overlay) gsap.to(overlay, { opacity: 0.3, duration: 0.3 });
    }
  };

  const handleMouseLeave = (id: string, element: HTMLElement) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (scaleOnHover) {
      gsap.to(`[data-key="${id}"]`, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay') as HTMLElement;
      if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.3 });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: tallest ? tallest + 32 : 'auto' }}
    >
      {grid.map(item => (
        <a
          key={item.id}
          data-key={item.id}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.title ?? item.url}
          className="group absolute box-content cursor-pointer rounded-[10px] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          style={{ willChange: 'transform, width, height, opacity' }}
          onMouseEnter={e => handleMouseEnter(item.id, e.currentTarget)}
          onMouseLeave={e => handleMouseLeave(item.id, e.currentTarget)}
        >
          <div
            className="relative w-full h-full bg-cover bg-center rounded-[10px] shadow-[0px_10px_50px_-10px_rgba(0,0,0,0.2)]"
            style={{ backgroundImage: `url(${item.img})` }}
          >
            {colorShiftOnHover && (
              <div className="color-overlay absolute inset-0 rounded-[10px] bg-gradient-to-tr from-[#9a3412]/50 to-[#059669]/45 opacity-0 pointer-events-none" />
            )}
            {item.tags && item.tags.length > 0 ? (
              <span
                aria-hidden="true"
                className="absolute left-2.5 top-2.5 z-[1] rounded-full bg-black/50 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm"
              >
                {item.tags[0]}
              </span>
            ) : null}
            <span
              aria-hidden="true"
              className="absolute right-2.5 top-2.5 grid size-6 translate-y-1 place-items-center rounded-full bg-white/90 text-primary opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
            >
              <ArrowUpRight size={13} strokeWidth={2.5} />
            </span>
            {(item.title || (item.tags && item.tags.length > 0)) && (
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 rounded-b-[10px] bg-gradient-to-t from-black/70 to-transparent px-3 pb-2 pt-10 normal-case opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                {item.title ? (
                  <p className="text-xs font-bold leading-tight text-white">{item.title}</p>
                ) : null}
                {item.tags && item.tags.length > 0 ? (
                  <p className="mt-1 flex flex-wrap gap-1">
                    {item.tags.map(tag => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/25 px-1.5 py-0.5 text-[9px] leading-none font-semibold uppercase text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </p>
                ) : null}
              </div>
            )}
          </div>
        </a>
      ))}
    </div>
  );
};

export default Masonry;
