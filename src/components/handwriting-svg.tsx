import { motion } from "framer-motion";
import * as opentype from "opentype.js";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const DEFAULT_FONT_URL = "/fonts/handwriting.ttf";

interface HandwritingSvgProps {
  path?: string;
  text?: string;
  fontUrl?: string;
  className?: string;
  strokeClassName?: string;
  duration?: number;
  delay?: number;
  strokeWidth?: number;
  width?: number;
  height?: number;
  fontSize?: number;
  ease?: "linear" | "easeIn" | "easeOut" | "easeInOut";
}

export function HandwritingSvg({
  path: pathProp,
  text,
  fontUrl = DEFAULT_FONT_URL,
  className,
  strokeClassName,
  duration = 2,
  delay = 0.5,
  strokeWidth = 2,
  width = 100,
  height = 100,
  fontSize = 48,
  ease = "easeInOut",
}: HandwritingSvgProps) {
  const [fontPath, setFontPath] = useState<string | null>(null);
  const [fontViewBox, setFontViewBox] = useState(`0 0 ${width} ${height}`);
  const [fontReady, setFontReady] = useState(false);

  const needsFont = !!text && !pathProp;
  const d = pathProp ?? fontPath;
  const loading = needsFont && !fontReady;

  useEffect(() => {
    if (!needsFont) return;
    let cancelled = false;
    fetch(fontUrl)
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        if (cancelled) {
          return;
        }
        const font = opentype.parse(buffer);
        const p = font.getPath(text, 0, fontSize, fontSize);
        const bbox = p.getBoundingBox();
        const pad = 5;
        const vx = Math.floor(bbox.x1) - pad;
        const vy = Math.floor(bbox.y1) - pad;
        const vw = Math.ceil(bbox.x2 - bbox.x1) + pad * 2;
        const vh = Math.ceil(bbox.y2 - bbox.y1) + pad * 2;
        setFontViewBox(`${vx} ${vy} ${vw} ${vh}`);
        setFontPath(p.toPathData(2));
      })
      .catch(() => {
        if (!cancelled) {
          setFontPath(null);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setFontReady(true);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [needsFont, text, fontUrl, fontSize]);

  if (loading) {
    return (
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className={cn("text-muted-foreground", className)}
        aria-hidden={true}
      >
        <title>Handwriting SVG loading</title>
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={14}
        >
          Loading…
        </text>
      </svg>
    );
  }

  if (!d) {
    return (
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className={cn("text-muted-foreground", className)}
        aria-hidden={true}
      >
        <title>Handwriting SVG</title>
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={12}
        >
          {text ? "Invalid font" : "Provide path or text"}
        </text>
      </svg>
    );
  }

  const svgViewBox = pathProp ? `0 0 ${width} ${height}` : fontViewBox;

  return (
    <svg
      width={width}
      height={height}
      viewBox={svgViewBox}
      className={cn("text-primary", className)}
      aria-hidden={true}
    >
      <title>Handwriting SVG</title>
      <motion.path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={strokeClassName}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay, duration, ease }}
      />
    </svg>
  );
}

export default HandwritingSvg;