import React, { useCallback, useEffect, useRef, useState } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export interface HoverRevealCardItem {
  id: string | number;
  title: string;
  subtitle?: string;
  imageUrl: string;
  href?: string;
}

interface HoverRevealCardsProps {
  items: HoverRevealCardItem[];
  className?: string;
  cardClassName?: string;
  horizontal?: boolean;
  showArrows?: boolean;
  onCardClick?: (item: HoverRevealCardItem) => void;
  renderOverlay?: (item: HoverRevealCardItem) => React.ReactNode;
  pressedItemId?: React.Key | null;
}

const HoverRevealCards: React.FC<HoverRevealCardsProps> = ({
  items,
  className,
  cardClassName,
  horizontal = false,
  showArrows = true,
  onCardClick,
  renderOverlay,
  pressedItemId,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!horizontal || !el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [horizontal, updateScrollState]);

  const scrollBy = useCallback((direction: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({
      left: direction * el.clientWidth * 0.8,
      behavior: reduced ? "auto" : "smooth",
    });
  }, []);

  const containerClasses = horizontal
    ? "flex gap-4 overflow-x-auto snap-x snap-mandatory overscroll-x-contain pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    : "group grid w-full max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4";

  const cardClasses = cn(
    "relative cursor-pointer overflow-hidden rounded-xl bg-cover bg-center shadow-lg transition-all duration-500 ease-in-out",
    "group-hover:scale-[0.97] group-hover:opacity-60 group-hover:blur-[2px]",
    "hover:scale-105! hover:opacity-100! hover:blur-none!",
    "focus-visible:scale-105! focus-visible:opacity-100! focus-visible:blur-none!",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background",
    horizontal ? "h-80 w-72 flex-none snap-start sm:w-80" : "h-80",
    cardClassName
  );

  return (
    <div className={cn("group relative", "w-full max-w-6xl", horizontal && "mt-2", className)}>
      {horizontal && showArrows && (
        <div className="absolute -top-11 right-0 z-10 flex items-center gap-2">
          <button
            type="button"
            aria-label="Geser ke kiri"
            disabled={!canScrollLeft}
            onClick={() => scrollBy(-1)}
            className="grid size-9 cursor-pointer place-items-center rounded-full border border-accent bg-white/70 text-primary transition hover:bg-primary hover:text-white active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-35"
          >
            <CaretLeft size={16} weight="bold" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Geser ke kanan"
            disabled={!canScrollRight}
            onClick={() => scrollBy(1)}
            className="grid size-9 cursor-pointer place-items-center rounded-full border border-accent bg-white/70 text-primary transition hover:bg-primary hover:text-white active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-35"
          >
            <CaretRight size={16} weight="bold" aria-hidden="true" />
          </button>
        </div>
      )}

      <div
        ref={scrollRef}
        role="list"
        className={containerClasses}
        aria-label={horizontal ? "Daftar kartu, geser untuk melihat lebih banyak" : undefined}
      >
        {items.map((item) => {
          const clickable = Boolean(onCardClick);
          const isPressed = pressedItemId != null && pressedItemId === item.id;
          const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
            if (!onCardClick) return;
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onCardClick(item);
            }
          };
          const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
            if (!onCardClick) return;
            if ((e.target as HTMLElement).closest("a,button")) return;
            onCardClick(item);
          };

          if (clickable) {
            return (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                aria-label={`Putar preview ${item.title}${item.subtitle ? ` oleh ${item.subtitle}` : ""}`}
                aria-pressed={isPressed}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                className={cardClasses}
                style={{ backgroundImage: `url(${item.imageUrl})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                <div className="absolute bottom-0 left-0 p-5 text-white">
                  {item.subtitle && (
                    <p className="text-xs font-light uppercase tracking-widest opacity-80">
                      {item.subtitle}
                    </p>
                  )}
                  <h3 className="mt-1 text-xl font-semibold leading-tight">{item.title}</h3>
                </div>

                {renderOverlay && renderOverlay(item)}
              </div>
            );
          }

          const Tag = item.href ? "a" : "div";
          return (
            <Tag
              key={item.id}
              role="listitem"
              aria-label={`${item.title}${item.subtitle ? `, ${item.subtitle}` : ""}`}
              {...(item.href
                ? {
                    href: item.href,
                    target: "_blank",
                    rel: "noopener noreferrer",
                  }
                : {})}
              className={cardClasses}
              style={{ backgroundImage: `url(${item.imageUrl})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              <div className="absolute bottom-0 left-0 p-5 text-white">
                {item.subtitle && (
                  <p className="text-xs font-light uppercase tracking-widest opacity-80">
                    {item.subtitle}
                  </p>
                )}
                <h3 className="mt-1 text-xl font-semibold leading-tight">{item.title}</h3>
              </div>

              {renderOverlay && renderOverlay(item)}
            </Tag>
          );
        })}

        {horizontal && (
          <>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-8 bg-gradient-to-r from-background to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-8 bg-gradient-to-l from-background to-transparent"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default HoverRevealCards;