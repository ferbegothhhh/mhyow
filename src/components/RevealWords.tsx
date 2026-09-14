import { Fragment } from "react";

type RevealWordsProps = {
  text: string;
  className?: string;
  baseDelay?: number;
  step?: number;
};

export default function RevealWords({
  text,
  className = "",
  baseDelay = 0,
  step = 0.05,
}: RevealWordsProps) {
  const words = text.split(" ");

  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="word-mask">
            <span
              className="animate-hero-word"
              style={{ animationDelay: `${baseDelay + i * step}s` }}
            >
              {word}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}