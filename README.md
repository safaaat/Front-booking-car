# 🏎️ Booking Car

Frontend website untuk sistem pemesanan mobil, dibuat dengan **React.js + TypeScript + Vite + Sass + Chakra UI**.  
Website ini memungkinkan pengguna untuk booking mobil **tanpa login** dan **tanpa pembayaran online**. Konfirmasi dilakukan manual oleh admin melalui telepon.

---

## 🚀 Features

### 👥 User Features

- 🚗 **Book** mobil tanpa login
- 📝 **Isi data diri**: nama, email, nomor HP
- ❌ **Cegah duplikat booking** dengan nama & mobil yang sama
- 🏠 **Halaman utama** menampilkan:
  - Daftar mobil yang **tersedia**
  - Daftar mobil yang **sudah dibooking (confirmed)**

---

### 🔧 Admin Features

- ✅ **Konfirmasi** atau ❌ **tolak** booking secara manual
- 📞 Hubungi user secara langsung via telepon
- 🔁 **Batalkan otomatis** booking lain jika 1 sudah dikonfirmasi
- 🗑️ **Hapus mobil** dari katalog
- 🔍 Lihat detail booking:
  - Nama
  - Email
  - Nomor telepon

---

## 🛠️ Tech Stack

- ⚛️ React.js + TypeScript  
- ⚡ Vite 
- 🎨 SASS (SCSS)  
- 💠 Chakra UI  
- 📦 Redux Toolkit (State Management)  
- 🔃 React Router DOM
- 🌐 Axios (untuk HTTP request)
- ☁️ Vercel (untuk deployment)

---

## 🧱 Struktur Proyek

```bash
src/
├── app/           # State global (jika pakai Redux, Context, dsb)
├── assets/        # Gambar, ikon, dll.
├── components/    # Komponen UI reusable
├── pages/         # Halaman utama aplikasi
├── router/        # Routing (React Router)
├── services/      # API call / handler
├── styles/        # File SASS global dan partials
├── utils/         # Fungsi utilitas/helper
├── App.tsx        # Root component
├── main.tsx       # Entry point aplikasi
└── vite-env.d.ts  # Tipe deklarasi Vite
```

---

## 📦 Instalasi

```bash
npm install
npm run dev
```

---

Kalau kamu juga butuh bagian untuk **deployment (Vercel)**, tinggal bilang aja.
