# Portofolio Pribadi

Website portofolio statis (HTML + CSS + JavaScript vanilla) dengan tema **pink & putih**, responsif, dan punya dark mode.

## Struktur Folder

```
portfolio/
├── index.html        # Semua halaman (1 halaman)
├── css/
│   └── style.css     # Styling & dark mode
├── js/
│   └── script.js     # Interaksi (menu, tema, animasi, form)
└── assets/
    ├── img/          # Taruh foto & screenshot di sini
    └── icons/        # Ikon sosial media (opsional)
```

## Cara Menjalankan di Lokal

Buka `index.html` langsung di browser (klik 2x). Tidak perlu server.

## Yang Perlu Kamu Edit (Placeholder)

Cari dan ganti semua tulisan di dalam kurung siku `[...]`:

- **`index.html`**
  - `[Nama Kamu]` → di navbar, hero, dan footer
  - `[Nama Sekolah / Jurusan]`, `[Kota / Domisili]` pada section About
  - Daftar skills di section Skills bila perlu
  - Kartu Project (`[Judul Project 1]`, dst) + ganti link Demo/Source (`href="#"`)
  - Kartu Musik (`[Judul Lagu]`, `[Nama Artis]`) + ganti link "Dengar" dengan link Spotify/YouTube
  - Kartu Games (`[Nama Game]`, platform, genre) + link
  - `emailkamu@example.com` dan link GitHub/LinkedIn/Instagram di Contact
- **Gambar**: ganti file di `assets/img/` atau ubah `src` pada `<img>` (avatar, screenshot project, cover musik, poster game).

## Deploy Gratis

- **GitHub Pages**: push folder ini ke repo GitHub → repo Setting → Pages → pilih branch `main` → situs live.
- **Netlify**: buka netlify.com/drop, lalu drag-and-drop folder `portfolio/`.
- **Vercel**: import repo di vercel.com, atau pakai CLI `vercel`.

## Catatan Form Kontak

Form di section Contact murni statis — belum bisa benar-benar kirim pesan. Untuk mengaktifkannya, daftar gratis di [Formspree](https://formspree.io), lalu ganti tag `<form>` menjadi `action="https://formspree.io/f/xxxxxx"` dan hapus `novalidate` + blok validasi custom jika ingin aktifkan pengiriman.