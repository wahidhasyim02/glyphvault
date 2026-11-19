# Iconix — SVG Icon Studio (Nuxt 3 + Tailwind CSS)

Studio browser dan kustomisasi ikon SVG interaktif dengan 4 varian gaya (*Linear*, *Solid*, *Dualtone*, *Dualtone Linear*), live stroke, opacity slider, color pickers, zoom control, serta ekspor instan SVG / PNG / Vue / React component.

Dibangun menggunakan **Nuxt 3**, **Tailwind CSS**, dan **Lucide Vue**.

---

## 🚀 Menjalankan di Local (Development)

Pastikan Node.js (v18 ke atas) telah terpasang di komputer Anda.

1. **Install dependensi:**
   ```bash
   npm install
   ```

2. **Jalankan development server:**
   ```bash
   npm run dev
   ```

3. Buka browser di [http://localhost:3000](http://localhost:3000).

---

## 📦 Build & Uji Produksi di Local

Untuk menguji performa build sebelum deploy online:

```bash
# 1. Build aplikasi Nitro & Client
npm run build

# 2. Preview server produksi di local
npm run preview
# atau: node .output/server/index.mjs
```

---

## 🌐 Panduan Deploy Online

Proyek ini sudah dikonfigurasi agar fleksibel dan siap dideploy ke berbagai platform hosting:

### 1. Vercel
- Hubungkan repository GitHub Anda ke Vercel.
- Vercel akan otomatis mengenali framework sebagai **Nuxt**.
- Build command: `npm run build`
- Output directory: otomatis terkonfigurasi.

### 2. Netlify
- Build command: `npm run build`
- Publish directory: `.output/public`

### 3. Static Hosting (Cloudflare Pages, GitHub Pages, Firebase)
Jika ingin mendeploy sebagai Static Site (tanpa server runtime Node.js):
```bash
npm run generate
```
Folder hasil generate berada di `.output/public`. Folder inilah yang diunggah ke penyedia static hosting Anda.

### 4. VPS / Docker / Cloud Run (Node.js Server)
Untuk deployment server container atau VPS:
```bash
npm install
npm run build
node .output/server/index.mjs
```
Server akan mendengarkan di port `3000` (atau nilai variable environment `PORT`).

---

## 📁 Struktur Direktori Proyek

```text
iconix/
├── assets/
│   └── css/
│       └── main.css             # Tailwind CSS & custom styling (sliders, dots, checkerboards)
├── components/
│   ├── CategorySidebar.vue      # Sidebar kategori & filter ikon
│   ├── IconGrid.vue             # Grid ikon interaktif & zoom display
│   ├── InspectorPanel.vue       # Panel detail, live preview, export SVG/PNG/Code
│   ├── JsonStudioModal.vue      # Modal import, add custom icon, & web component usage
│   ├── StudioToolbar.vue        # Search bar, style switcher, color pickers, sliders
│   ├── StyleGuideView.vue       # Panduan 4 varian style ikon
│   ├── SvgIconix.vue             # Komponen renderer SVG live
│   └── TopBar.vue               # Navigasi utama & brand header
├── public/
│   └── icons.json               # Database koleksi ikon SVG
├── types/
│   └── icon.ts                  # Type definitions TypeScript
├── utils/
│   └── svgEngine.ts             # Engine pemrosesan SVG, masker cutout, rasterizer PNG
├── app.vue                      # Root Vue application
├── nuxt.config.ts               # Konfigurasi Nuxt 3 & Tailwind
├── tailwind.config.ts           # Konfigurasi tema Tailwind CSS
└── package.json                 # Skrip & dependensi proyek
```
