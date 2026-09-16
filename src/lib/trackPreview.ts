export interface TrackPreview {
  trackName: string;
  artistName: string;
  collectionName: string;
  previewUrl: string;
  artworkUrl: string;
}

const trackCache = new Map<string, TrackPreview | null>();

const isCover = (value: string): boolean =>
  /instrumental|piano version|karaoke|\bcover\b|tribute/i.test(value);

export async function searchTrack(
  title: string,
  artist: string
): Promise<TrackPreview | null> {
  const query = `${title} ${artist}`.trim();
  const key = query.toLowerCase();
  const cached = trackCache.get(key);
  if (cached !== undefined) return cached;

  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(
    query
  )}&entity=song&limit=8`;

  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const json: unknown = await res.json();
    const results: Array<Record<string, unknown>> =
      (json as { results?: Array<Record<string, unknown>> }).results ?? [];

    if (!results.length) {
      trackCache.set(key, null);
      return null;
    }

    const scored = results
      .map((r, i) => {
        const track = String(r.trackName ?? "");
        const trackArtist = String(r.artistName ?? "");
        const collection = String(r.collectionName ?? "");
        let score = 0;
        if (isCover(`${track}|${collection}`)) score -= 6;
        if (artist && trackArtist.toLowerCase().includes(artist.toLowerCase())) score += 4;
        if (track.toLowerCase().includes(title.toLowerCase())) score += 2;
        return { r, i, score };
      })
      .sort((a, b) => b.score - a.score || a.i - b.i);

    const best = scored[0].r;
    const previewUrl = String(best.previewUrl ?? "");
    if (!previewUrl) {
      trackCache.set(key, null);
      return null;
    }

    const artworkUrl = String(best.artworkUrl100 ?? "").replace(
      "100x100bb",
      "600x600bb"
    );

    const preview: TrackPreview = {
      trackName: String(best.trackName ?? title),
      artistName: String(best.artistName ?? artist),
      collectionName: String(best.collectionName ?? ""),
      previewUrl,
      artworkUrl,
    };
    trackCache.set(key, preview);
    return preview;
  } catch {
    trackCache.set(key, null);
    return null;
  }
}