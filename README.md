# Portofolio Pribadi Yuan/Mhyow

Portfolio pribadi React + Vite + TypeScript + Tailwind CSS dengan tema **pink & putih**, navbar variable-font-hover, dan animasi handwriting SVG.

## Struktur

```
temp_repo/
├── src/
│   ├── components/          # Hero, About, Skills, Projects, Music, Games, Contact, Footer
│   │   ├── ui/              # Navbar variable-font-hover, Button, HandwritingSvg
│   │   └── ScrollReveal.tsx
│   ├── hooks/               # useMousePositionRef
│   ├── lib/                 # utils (cn helper)
│   └── index.css            # Tema pink & putih + keyframe animations
├── public/fonts/            # Font handwriting untuk nama
├── index.html
├── package.json
└── vite.config.ts
```

## Cara Menjalankan

```bash
npm install
npm run dev        # development → http://localhost:5173
npm run build      # build produksi ke dist/
npm run preview    # preview hasil build → http://localhost:4173
```

## Yang Perlu Kamu Edit (Placeholder)

Cari dan ganti tulisan dalam kurung siku `[...]` di `src/components/`:

- **Hero** → avatar placeholder, nama
- **About** → nama sekolah, kota, topik belajar
- **Projects** → judul, deskripsi, tags, link demo/source
- **Music** → judul lagu, artis
- **Games** → nama game, platform
- **Contact** → email, link GitHub/LinkedIn/Instagram

Ganti emoji placeholder (`👤`, `🖼️`, `🎵`, `🎮`) dengan gambar asli dari `src/assets/img/` atau `public/`.

## Deploy Gratis

- **Vercel**: import repo → build command: `npm run build`, output: `dist`
- **Netlify**: build command: `npm run build`, publish: `dist`
- **GitHub Pages**: build lalu deploy folder `dist`
