# Portfolio Website — IDNX

Membuat website portfolio pribadi yang modern, profesional, dan memukau secara visual. Website akan ditempatkan di `d:\WebApps\idnx` sebagai static site (HTML + CSS + JS) tanpa framework — ringan, cepat, dan mudah di-deploy ke hosting mana pun.

---

## User Review Required

> [!IMPORTANT]
> **Data Pribadi yang Dibutuhkan**
> Gw butuh info berikut dari lu untuk mengisi konten portfolio. Jawab langsung di chat ya:
>
> 1. **Nama lengkap** (atau nama yang mau ditampilkan di portfolio)
> 2. **Title/Role** — misalnya "Full-Stack Developer", "Web Developer & System Architect", dll.
> 3. **Foto profil** — ada file foto yang bisa gw pakai? Atau mau gw generate avatar?
> 4. **Bio singkat** — 2-3 kalimat tentang diri lu, passion, dan keahlian utama
> 5. **Skill/Tech Stack** yang mau di-highlight (misalnya: Laravel, Filament, PHP, MySQL, JavaScript, Tailwind CSS, Alpine.js, PWA, dll.)
> 6. **Sosial media / link kontak** — GitHub, LinkedIn, Email, WhatsApp, Instagram, dll.
> 7. **Pengalaman kerja** — apakah mau ditampilkan? Kalau iya, kasih detail (nama perusahaan, role, tahun)
> 8. **Pendidikan** — mau ditampilkan atau skip?
> 9. **Testimonial** — ada testimoni dari klien yang mau ditampilkan?
> 10. **Domain/URL** — sudah punya domain? (untuk SEO meta tags)

> [!IMPORTANT]
> **Project Tambahan**
> Lu bilang masih ada project lain selain yang ada di workspace. Nanti bisa lu kasih tahu satu per satu dan gw tambahkan ke portfolio.

---

## Hasil Research: Project yang Ditemukan

Dari eksplorasi workspace `d:\WebApps`, gw identifikasi **10 project** lu:

| # | Project | Tipe | Deskripsi | Tech Stack |
|---|---------|------|-----------|------------|
| 1 | **Sistem Presensi GPS & Selfie** (`absen`) | Web App (PWA) | Aplikasi absensi karyawan dengan foto selfie & validasi GPS/Geofencing. Multi-location, shift management, helpdesk tiket, export Excel/PDF. | Laravel 11, Filament v3, Tailwind, PWA, MySQL |
| 2 | **AI Job Search** (`ai-job-search`) | AI Tool/Framework | Framework pencarian kerja otomatis berbasis AI. Auto-generate CV & cover letter, evaluasi fit, multi-portal scraping. | Python, Claude Code, LaTeX, Bun |
| 3 | **ARTIC Company Profile** (`artic`) | Static Website | Website company profile untuk Transwater Robery Indonesia (ARTIC) — brand air minum. | HTML5, Tailwind CSS, JavaScript |
| 4 | **SaaS Undangan Digital** (`invit`) | SaaS Platform | Platform undangan pernikahan digital multi-tenant. Klien self-service, template dinamis, panel admin & client terpisah. | Laravel 13, Filament v5, Tailwind, MySQL |
| 5 | **Landing Page Kavling Sukamakmur** (`nanang`) | Landing Page | Landing page penjualan tanah kavling dengan CTA WhatsApp. Bento grid, glassmorphism, nature theme. | HTML5, Tailwind CSS, JavaScript |
| 6 | **Mbok Dewor Puding** (`pudding`) | Web App + Landing Page | Website bisnis F&B puding — landing page + admin panel untuk manajemen produk & order. | Laravel 13, Filament 3, Tailwind, Alpine.js, Swiper |
| 7 | **PT. Santi Wijaya Meat — Under Construction** (`swm500`) | Static Page | Halaman under construction kreatif untuk perusahaan daging wholesale, dengan maskot sapi animasi. | HTML5, Tailwind CSS, CSS Animations |
| 8 | **Wijaya Meat ERP** (`swmrf`) | Enterprise System (ERP) | Sistem ERP full-scale untuk perusahaan daging: pembelian, penjualan, barcode, stok, keuangan. Migrasi dari legacy PHP. | Laravel 11, Filament v3, MySQL, OpenSpout |
| 9 | **Warganet Management** (`warganet`) | Web App (PWA) | Sistem manajemen langganan internet: billing, pembayaran, pengeluaran, penarikan dividen. Wrapped sebagai Android app. | Laravel, MoonShine v3, Tailwind, MySQL, PWA/Android |
| 10 | **Wijaya Meat Hotspot Login** (`wijayahs`) | MikroTik Captive Portal | Custom login page untuk hotspot MikroTik dengan branding Wijaya Meat. MD5 CHAP authentication. | HTML, CSS, JavaScript, MikroTik |

---

## Proposed Changes

### Design Concept: **Dark Premium Glassmorphism**

Konsep visual yang gw usulkan:
- **Dark theme** dengan aksen warna **electric blue → cyan gradient** (#0ea5e9 → #06b6d4)
- **Glassmorphism cards** dengan backdrop-blur dan border transparan
- **Animated gradient mesh background** — latar belakang yang hidup dan bergerak halus
- **Smooth scroll animations** — elemen muncul dengan animasi saat di-scroll (intersection observer)
- **Particle/constellation effect** di hero section untuk kesan tech/futuristik
- **Typography**: Google Font **"Inter"** (clean, professional) + **"JetBrains Mono"** untuk code-style accent
- **Micro-interactions**: hover glow, card tilt effect, magnetic cursor pada elemen tertentu

### Struktur Halaman (Single Page, Multi-Section)

```
┌─────────────────────────────────────────┐
│  🔝 NAVBAR (sticky, glassmorphism)      │
│  Logo • About • Skills • Projects •     │
│  Experience • Contact                   │
├─────────────────────────────────────────┤
│  🦸 HERO SECTION                        │
│  Animated intro, nama, title, tagline   │
│  Particle background, CTA buttons       │
│  "View Projects" + "Contact Me"         │
├─────────────────────────────────────────┤
│  👤 ABOUT ME                            │
│  Foto profil + bio + quick stats        │
│  (X+ Projects, Y+ Years, Z Tech Stack)  │
├─────────────────────────────────────────┤
│  ⚡ SKILLS & TECH STACK                 │
│  Animated skill bars / icon grid        │
│  Grouped: Frontend, Backend, Tools      │
├─────────────────────────────────────────┤
│  🚀 PROJECTS SHOWCASE                   │
│  Filterable project cards (All/Web App/ │
│  Landing/Enterprise)                    │
│  Each card: screenshot, title, desc,    │
│  tech tags, live/github link            │
├─────────────────────────────────────────┤
│  💼 EXPERIENCE (opsional)               │
│  Timeline vertikal, animated            │
├─────────────────────────────────────────┤
│  📬 CONTACT                             │
│  Glassmorphism contact form +           │
│  Social media icons                     │
├─────────────────────────────────────────┤
│  🔻 FOOTER                             │
│  Copyright, social links, back to top   │
└─────────────────────────────────────────┘
```

### File Structure

#### [NEW] `d:\WebApps\idnx\index.html`
Main HTML file — single page portfolio dengan semua section di atas. Semantic HTML5, SEO-ready dengan meta tags lengkap.

#### [NEW] `d:\WebApps\idnx\css\style.css`
Custom CSS — design system, glassmorphism utilities, animations, responsive breakpoints. Pure vanilla CSS (no framework).

#### [NEW] `d:\WebApps\idnx\js\main.js`
JavaScript — navbar scroll behavior, smooth scroll, intersection observer animations, project filter, particle effect, form handling.

#### [NEW] `d:\WebApps\idnx\assets\images\`
Folder untuk project screenshots dan foto profil. Screenshots akan di-generate menggunakan image generation tool.

#### [NEW] `d:\WebApps\idnx\assets\icons\`
SVG icons untuk skills dan social media.

---

## Open Questions

> [!IMPORTANT]
> 1. **Bahasa website**: Mau full English, full Bahasa Indonesia, atau campuran? (Rekomendasi: English untuk kesan profesional internasional)
> 2. **Contact form**: Mau pakai form yang ngirim email beneran (perlu backend/service seperti Formspree) atau cukup link langsung ke WhatsApp/Email?
> 3. **Project screenshots**: Gw bisa generate mockup/screenshot untuk setiap project. Mau gw buatkan semua, atau lu punya screenshot sendiri?
> 4. **Animasi level**: Mau animasi yang *subtle & smooth* atau *bold & eye-catching*? (Rekomendasi: subtle & smooth untuk kesan profesional)
> 5. **Dark/Light mode toggle**: Mau ada tombol switch dark/light mode, atau fixed dark theme aja?

---

## Verification Plan

### Manual Verification
- Buka `index.html` di browser dan verifikasi semua section tampil dengan benar
- Test responsive di berbagai viewport (mobile 375px, tablet 768px, desktop 1440px)
- Verifikasi semua animasi dan interaksi berjalan smooth
- Cek SEO meta tags dan heading structure
- Validasi semua link dan navigasi
- Test performa (Lighthouse audit)
