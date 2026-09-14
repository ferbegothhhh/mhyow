# Portofolio Pribadi (React + Vite)

Portfolio pribadi Yuan/Mhyow dengan tema **pink & putih**, responsif, dan memakai
navbar **variable-font-hover** (animasi per karakter) dari `react-nav`.

## Struktur Folder

```
temp_repo/
├── react-nav/          # Portfolio utama (React 19 + Vite + TypeScript + Tailwind)
│   ├── src/
│   │   ├── components/ # Hero, About, Skills, Projects, Music, Games, Contact, Footer
│   │   │   └── ui/     # VariableFontHover nav (animasi variabel font)
│   │   ├── hooks/      # useTypewriter, useMousePositionRef
│   │   └── index.css   # Tema pink & putih + keyframe animations
│   └── package.json
├── css/                # (Legacy) CSS vanilla — sudah digantikan React
├── js/                 # (Legacy) JS vanilla — sudah digantikan React
├── index.html          # (Legacy) HTML vanilla — sudah digantikan React
└── assets/             # (Legacy) gambar placeholder
```

## Cara Menjalankan

```bash
cd react-nav
npm install
npm run dev        # development
npm run build      # build produksi ke dist/
npm run preview    # preview hasil build
```

## Yang Perlu Kamu Edit (Placeholder)

Cari dan ganti semua tulisan di dalam kurung siku `[...]` di
`react-nav/src/components/`:

- **Hero, About, Contact, Footer** → nama, sekolah, kota, email, dan link sosial media
- **Projects.tsx** → judul project, deskripsi, dan link Demo/Source
- **Music.tsx** → judul lagu, nama artis, dan link "Dengar"
- **Games.tsx** → nama game, platform, genre, dan link

Ganti emoji placeholder (`👤`, `🖼️`, `🎵`, `🎮`) pada kartu dengan gambar nyata
di `react-nav/src/assets/img/`.

## Deploy Gratis

- **Vercel**: import repo di vercel.com → root folder `react-nav`
- **Netlify**: build command `npm run build` di folder `react-nav`, publish `dist`
- **GitHub Pages**: build lalu deploy folder `react-nav/dist`

## Catatan Form Kontak

Form di Contact murni statis — belum benar-benar kirim pesan. Untuk mengaktifkannya,
daftar gratis di [Formspree](https://formspree.io), lalu pakai `action`
Formspree di form Contact.tsx.