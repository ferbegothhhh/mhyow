import { useCallback, useEffect, useRef, useState } from "react";
import ScrollReveal from "./ScrollReveal";
import SectionHeading from "./SectionHeading";
import { Play, Pause, Music as MusicIcon } from "lucide-react";
import { gsap } from "gsap";

interface Song {
  title: string;
  artist: string;
  previewUrl: string;
}

const songs: Song[] = [
  { title: "[Judul Lagu 1]", artist: "[Artis 1]", previewUrl: "" },
  { title: "[Judul Lagu 2]", artist: "[Artis 2]", previewUrl: "" },
  { title: "[Judul Lagu 3]", artist: "[Artis 3]", previewUrl: "" },
  { title: "[Judul Lagu 4]", artist: "[Artis 4]", previewUrl: "" },
];

const gradients = [
  "from-accent via-accent/70 to-primary/20",
  "from-primary/30 via-accent to-accent/50",
  "from-accent/80 via-primary/20 to-primary/30",
  "from-primary/20 via-accent/60 to-primary/10",
];

const formatTime = (sec: number) => {
  if (!sec || !isFinite(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

function EqBars({ playing }: { playing: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const bars = container.querySelectorAll(".eq-bar");

    if (reduced) {
      gsap.set(bars, { scaleY: 0.5, transformOrigin: "50% 100%" });
      return;
    }

    gsap.set(bars, { scaleY: 0.3, transformOrigin: "50% 100%" });

    const tl = gsap.timeline({ repeat: -1, paused: true, defaults: { ease: "sine.inOut" } });
    tl.fromTo(bars[0], { scaleY: 0.3 }, { scaleY: 1, duration: 0.5, yoyo: true, repeat: 1 })
      .fromTo(bars[1], { scaleY: 0.3 }, { scaleY: 1, duration: 0.38, yoyo: true, repeat: 1 }, 0)
      .fromTo(bars[2], { scaleY: 0.3 }, { scaleY: 1, duration: 0.6, yoyo: true, repeat: 1 }, 0.12)
      .fromTo(bars[3], { scaleY: 0.3 }, { scaleY: 1, duration: 0.44, yoyo: true, repeat: 1 }, 0.06);
    tlRef.current = tl;

    return () => {
      tl.kill();
      tlRef.current = null;
    };
  }, []);

  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;
    if (playing) tl.play();
    else tl.pause();
  }, [playing]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute bottom-3 left-1/2 flex h-5 -translate-x-1/2 items-end gap-1"
    >
      <span className="eq-bar h-1.5 w-0.5 rounded-full bg-primary" />
      <span className="eq-bar h-1.5 w-0.5 rounded-full bg-primary" />
      <span className="eq-bar h-1.5 w-0.5 rounded-full bg-accent-foreground" />
      <span className="eq-bar h-1.5 w-0.5 rounded-full bg-primary" />
    </div>
  );
}

export default function Music() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const playSong = useCallback(
    (index: number) => {
      const audio = audioRef.current;
      if (!audio) return;
      const song = songs[index];
      if (!song.previewUrl) return;

      if (activeIndex === index) {
        if (audio.paused) {
          audio.play().then(() => setIsPlaying(true)).catch(() => {});
        } else {
          audio.pause();
          setIsPlaying(false);
        }
      } else {
        audio.src = song.previewUrl;
        audio.load();
        audio
          .play()
          .then(() => {
            setActiveIndex(index);
            setIsPlaying(true);
            setCurrentTime(0);
            setDuration(0);
          })
          .catch(() => {});
      }
    },
    [activeIndex]
  );

  const handleTimeUpdate = useCallback(() => {
    const audio = audioRef.current;
    if (audio && isFinite(audio.currentTime)) {
      setCurrentTime(audio.currentTime);
    }
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    const audio = audioRef.current;
    if (audio && isFinite(audio.duration)) {
      setDuration(audio.duration);
    }
  }, []);

  const handleEnded = useCallback(() => {
    const next = (activeIndex ?? -1) + 1;
    if (next < songs.length && songs[next].previewUrl) {
      playSong(next);
    } else {
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
    }
  }, [activeIndex, playSong]);

  const handleError = useCallback(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  }, []);

  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const time = parseFloat(e.target.value);
    if (isFinite(time)) {
      audio.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  return (
    <section id="music" className="bg-secondary px-6 py-[4.5rem]">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          badge="Favorit"
          title="Musik Favorit"
          subtitle="Beberapa lagu yang sering saya dengar saat belajar atau nugas."
        />

        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
          onError={handleError}
          preload="metadata"
          className="hidden"
        />

        <ScrollReveal stagger={0.08} className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {songs.map((song, i) => {
            const isActive = activeIndex === i;
            const canPlay = Boolean(song.previewUrl);

            return (
              <article
                key={i}
                aria-label={`${song.title} oleh ${song.artist}`}
                className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isActive
                    ? "border-primary bg-background shadow-[0_0_24px_rgba(236,72,153,0.18)]"
                    : "border-accent bg-background hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(236,72,153,0.1)] active:scale-[0.98]"
                }`}
              >
                <div
                  className={`relative flex aspect-square items-center justify-center overflow-hidden bg-gradient-to-br ${gradients[i % gradients.length]}`}
                >
                  <MusicIcon
                    className="size-10 text-primary/50 transition duration-500 group-hover:scale-110"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  {isActive && <EqBars playing={isPlaying} />}
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <h3 className="mb-0.5 truncate text-sm font-bold leading-tight md:text-base">
                    {song.title}
                  </h3>
                  <p className="mb-3 truncate text-xs text-muted-foreground">{song.artist}</p>

                  <div className="mt-auto flex flex-col gap-2">
                    {isActive && canPlay && (
                      <div className="flex items-center gap-2 text-[0.65rem] text-muted-foreground">
                        <span className="w-8 text-right tabular-nums" aria-hidden="true">
                          {formatTime(currentTime)}
                        </span>
                        <input
                          type="range"
                          min={0}
                          max={duration || 0}
                          step={0.1}
                          value={currentTime}
                          onChange={handleSeek}
                          aria-label={`Progres ${song.title}`}
                          aria-valuetext={`${formatTime(currentTime)} dari ${formatTime(duration)}`}
                          className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-accent accent-primary [&::-webkit-slider-thumb]:size-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-sm"
                        />
                        <span className="w-8 tabular-nums" aria-hidden="true">
                          {formatTime(duration)}
                        </span>
                      </div>
                    )}

                    <button
                      type="button"
                      disabled={!canPlay}
                      onClick={() => playSong(i)}
                      title={!canPlay ? "Preview belum tersedia" : undefined}
                      aria-label={isActive && isPlaying ? `Jeda ${song.title}` : `Putar ${song.title}`}
                      aria-pressed={isActive && isPlaying}
                      className={`inline-flex items-center justify-center gap-1.5 self-start rounded-full px-3.5 py-1.5 text-xs font-semibold transition active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 ${
                        isActive && isPlaying
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : canPlay
                            ? "bg-accent text-accent-foreground hover:bg-accent/80"
                            : "bg-accent/50 text-muted-foreground"
                      }`}
                    >
                      {isActive && isPlaying ? (
                        <Pause className="size-3" fill="currentColor" aria-hidden="true" />
                      ) : (
                        <Play className="size-3" fill="currentColor" aria-hidden="true" />
                      )}
                      {canPlay ? (isActive && isPlaying ? "Jeda" : "Putar") : "Preview"}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </ScrollReveal>
      </div>
    </section>
  );
}