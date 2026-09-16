import { useCallback, useRef, useState } from "react";
import {
  ArrowSquareOut,
  Pause,
  Play,
  SpinnerGap,
  Stop,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { searchTrack } from "@/lib/trackPreview";
import type { TrackPreview } from "@/lib/trackPreview";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";
import HoverRevealCards from "./HoverRevealCards";
import type { HoverRevealCardItem } from "./HoverRevealCards";

interface Song {
  title: string;
  artist: string;
}

const songs: Song[] = [
  { title: "Super Shy", artist: "NewJeans" },
  { title: "The Chase", artist: "" },
  { title: "Love Me Not", artist: "" },
  { title: "Lemon Tang", artist: "" },
  { title: "Magnolia", artist: "Laufey" },
  { title: "Earrings", artist: "Malcolm" },
  { title: "Don't Miss Me", artist: "Claire" },
  { title: "Tough Luck", artist: "Laufey" },
  { title: "Too Little Too Late", artist: "Laufey" },
  { title: "Fragile", artist: "Laufey" },
  { title: "Dreamer", artist: "Laufey" },
  { title: "Clockwork", artist: "Laufey" },
  { title: "Castle in Hollywood", artist: "Laufey" },
  { title: "Bored", artist: "Laufey" },
  { title: "From the Start", artist: "Laufey" },
  { title: "Madwoman", artist: "Laufey" },
  { title: "Forget-Me-Not", artist: "Laufey" },
  { title: "Second Best", artist: "Laufey" },
  { title: "Lover Girl", artist: "Laufey" },
  { title: "Apple Cider", artist: "beabadoobee" },
  { title: "Real Man", artist: "beabadoobee" },
  { title: "Ripples", artist: "beabadoobee" },
  { title: "I Wait I Wait I Wait", artist: "Laufey" },
  { title: "M.", artist: "Anıl Emre Daldal" },
  { title: "Who Are You?", artist: "Saga Faye" },
  { title: "If You Want To", artist: "beabadoobee" },
  { title: "Manusia Paling Bahagia", artist: "Ghea Indrawari" },
  { title: "1000×", artist: "Ghea Indrawari" },
  { title: "Best Friend", artist: "Rex Orange County" },
  { title: "Secret Door", artist: "Arctic Monkeys" },
  { title: "Tears", artist: "Sabrina Carpenter" },
  { title: "Please Please Please", artist: "Sabrina Carpenter" },
  { title: "When Did You Get Hot?", artist: "Sabrina Carpenter" },
  { title: "Sweet Boy", artist: "Malcolm" },
  { title: "Superpowers", artist: "Daniel" },
  { title: "Hello?", artist: "Clairo" },
  { title: "ASAP", artist: "" },
  { title: "Hurt", artist: "NewJeans" },
  { title: "Cookie", artist: "NewJeans" },
  { title: "Good Luck, Babe!", artist: "Chappell Roan" },
  { title: "Casual", artist: "Chappell Roan" },
  { title: "That's Hilarious", artist: "" },
];

const spotifySearch = (song: Song): string =>
  `https://open.spotify.com/search/${encodeURIComponent(
    `${song.title} ${song.artist}`.trim()
  )}`;

const tracksSeed: HoverRevealCardItem[] = songs.map((song, i) => ({
  id: i,
  title: song.title,
  subtitle: song.artist || "Single",
  imageUrl: `https://picsum.photos/seed/music-${i + 1}/600/720`,
  href: spotifySearch(song),
}));

export default function Music() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const cacheRef = useRef(new Map<number, TrackPreview | null>());

  const [tracks, setTracks] = useState<HoverRevealCardItem[]>(tracksSeed);
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [preview, setPreview] = useState<TrackPreview | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const stopPlayback = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
    }
    setPlayingId(null);
    setIsPlaying(false);
    setPreview(null);
    setCurrentTime(0);
    setDuration(0);
  }, []);

  const togglePlay = useCallback(
    async (index: number) => {
      const audio = audioRef.current;
      if (!audio) return;

      if (playingId === index) {
        if (audio.paused) {
          setIsPlaying(true);
          audio.play().catch(() => {});
        } else {
          setIsPlaying(false);
          audio.pause();
        }
        return;
      }

      let track = cacheRef.current.get(index);
      if (track === undefined) {
        setLoadingId(index);
        const song = songs[index] ?? { title: "", artist: "" };
        track = await searchTrack(song.title, song.artist);
        cacheRef.current.set(index, track ?? null);
        setLoadingId(null);
      }

      if (!track) {
        setPreview(null);
        setPlayingId(null);
        setIsPlaying(false);
        const href = spotifySearch(songs[index] ?? { title: "", artist: "" });
        window.open(href, "_blank", "noopener,noreferrer");
        return;
      }

      audio.src = track.previewUrl;
      setPreview(track);
      setPlayingId(index);
      setIsPlaying(true);
      setCurrentTime(0);
      setDuration(0);
      setTracks((prev) =>
        prev.map((t, i) =>
          i === index && track ? { ...t, imageUrl: track.artworkUrl } : t
        )
      );
      audio.play().catch(() => {});
    },
    [playingId]
  );

  const eqBars = (
    <span
      className="flex h-5 items-end gap-[3px]"
      aria-hidden="true"
    >
      {[0, 1, 2, 3].map((n) => (
        <span
          key={n}
          className="eq-bar block w-[3px] rounded-full bg-white"
          style={{ animationDelay: `${n * 0.15}s` }}
        />
      ))}
    </span>
  );

  const renderOverlay = (item: HoverRevealCardItem): React.ReactNode => {
    const index = Number(item.id);
    const active = playingId === index;
    const playing = active && isPlaying;
    const loaded = playingId === index && preview != null;
    const hasPreview = cacheRef.current.get(index) !== null;

    return (
      <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-2 p-5 pt-10">
        <span className="flex h-10 items-center">{playing && eqBars}</span>
        <span className="flex items-center gap-2">
          {loadingId === index ? (
            <span
              title="Mencari preview…"
              className="grid size-10 place-items-center rounded-full bg-white text-primary"
            >
              <SpinnerGap size={18} weight="bold" className="animate-spin" aria-hidden="true" />
            </span>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                void togglePlay(index);
              }}
              aria-label={playing ? `Jeda preview ${item.title}` : loaded ? `Lanjutkan ${item.title}` : `Putar preview ${item.title}`}
              aria-pressed={playing}
              title={hasPreview ? "Putar preview 30 detik" : "Memuat preview…"}
              className={cn(
                "grid size-10 cursor-pointer place-items-center rounded-full shadow-lg transition hover:scale-110 active:scale-95 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background",
                playing
                  ? "bg-primary text-white"
                  : "bg-white text-primary hover:bg-primary hover:text-white"
              )}
            >
              {playing ? (
                <Pause size={18} weight="fill" aria-hidden="true" />
              ) : (
                <Play size={18} weight="fill" aria-hidden="true" />
              )}
            </button>
          )}
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label={`Cari ${item.title} di Spotify`}
            title="Buka di Spotify"
            className="grid size-9 cursor-pointer place-items-center rounded-full bg-black/50 text-white transition hover:bg-black/70 focus-visible:ring-2 focus-visible:ring-white"
          >
            <ArrowSquareOut size={16} weight="bold" aria-hidden="true" />
          </a>
        </span>
      </div>
    );
  };

  const progressPct = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <section id="music" className="bg-secondary px-6 py-[4.5rem]">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          badge="Favorit"
          title="Musik Favorit"
          subtitle={`${songs.length} lagu yang menemani hari-hari saya. Klik kartu untuk memutar preview 30 detik — bila tidak tersedia, pencarian Spotify akan terbuka.`}
        />

        <ScrollReveal className="mt-14">
          <HoverRevealCards
            horizontal
            items={tracks}
            onCardClick={(item) => void togglePlay(Number(item.id))}
            renderOverlay={renderOverlay}
            pressedItemId={playingId}
          />
        </ScrollReveal>

        <audio
          ref={audioRef}
          className="hidden"
          preload="none"
          onTimeUpdate={() => {
            const a = audioRef.current;
            if (a) setCurrentTime(a.currentTime);
          }}
          onLoadedMetadata={() => {
            const a = audioRef.current;
            if (a) setDuration(a.duration);
          }}
          onEnded={stopPlayback}
          onError={() => {
            const a = audioRef.current;
            if (a) {
              a.pause();
              a.removeAttribute("src");
            }
            setPlayingId(null);
            setIsPlaying(false);
            setPreview(null);
            setCurrentTime(0);
            setDuration(0);
          }}
        />
      </div>

      {preview && playingId != null && (
        <div className="fixed bottom-4 left-1/2 z-50 w-[min(92vw,560px)] -translate-x-1/2 rounded-2xl border border-accent bg-white/95 p-3 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-3">
            <img
              src={preview.artworkUrl || tracks[playingId]?.imageUrl}
              alt=""
              className="size-12 shrink-0 rounded-lg object-cover"
            />
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold text-foreground">
                {preview.trackName || tracks[playingId]?.title}
              </div>
              <div className="truncate text-xs text-muted-foreground">
                {preview.artistName || tracks[playingId]?.subtitle}
                {preview.collectionName ? ` · ${preview.collectionName}` : ""}
                {" · Preview 30 detik"}
              </div>
              <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-[width] duration-200 ease-linear"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => void togglePlay(playingId)}
                aria-label={isPlaying ? "Jeda" : "Putar lagi"}
                className="grid size-9 cursor-pointer place-items-center rounded-full bg-primary text-white transition hover:scale-110 active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                {isPlaying ? (
                  <Pause size={16} weight="fill" aria-hidden="true" />
                ) : (
                  <Play size={16} weight="fill" aria-hidden="true" />
                )}
              </button>
              <button
                type="button"
                onClick={stopPlayback}
                aria-label="Hentikan preview"
                className="grid size-9 cursor-pointer place-items-center rounded-full bg-muted text-foreground transition hover:bg-foreground hover:text-background active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <Stop size={16} weight="fill" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}