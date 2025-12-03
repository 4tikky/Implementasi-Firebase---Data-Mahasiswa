# Implementasi Firebase - Data Mahasiswa (Tugas PBP)
Project ini adalah aplikasi mobile berbasis **React Native (Expo)** yang dibuat untuk memenuhi tugas **Pemrograman Berbasis Platform (PBP)**. Aplikasi ini bertujuan untuk mengimplementasikan integrasi **Firebase** dalam pengelolaan data mahasiswa (CRUD).

## 📱 Teknologi yang Digunakan
* **Framework**: [React Native](https://reactnative.dev/)
* **Platform**: [Expo](https://expo.dev/)
* **Bahasa Pemrograman**: [TypeScript](https://www.typescriptlang.org/)
* **Routing/Navigasi**: [Expo Router](https://docs.expo.dev/router/introduction/)
* **Backend/Database**: Firebase (Authentication & Firestore)

## 🚀 Fitur Utama
* **Sistem Login & Register**: Integrasi dengan Firebase Authentication.
* **Manajemen Data Mahasiswa**: Menampilkan daftar mahasiswa dari Firestore.
* **Dark/Light Mode Support**: Tampilan aplikasi otomatis menyesuaikan dengan tema perangkat (Gelap/Terang).
* **Navigasi Tab**: Menggunakan struktur navigasi modern berbasis file (*File-based routing*).

## 🛠️ Cara Menjalankan Project
Ikuti langkah-langkah berikut untuk menjalankan project di lokal:
1.  **Clone Repository**:
    ```bash
    git clone https://github.com/4tikky/Implementasi-Firebase---Data-Mahasiswa.git
    cd nama-folder-project
    ```
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Setup Firebase**:
    * Pastikan file `firebase.ts` sudah dikonfigurasi dengan API Key dari Firebase Console kamu.
4.  **Jalankan Aplikasi**:
    ```bash
    npx expo start
    ```
5.  **Scan QR Code**:
    * Gunakan aplikasi **Expo Go** di Android/iOS untuk scan QR code yang muncul di terminal.
    * Atau tekan `w` untuk membuka di browser, `a` untuk Android Emulator.

## 📝 Catatan
* **Instalasi Tambahan**: Jika baru pertama kali clone, pastikan library berikut terinstall:
    ```bash
    npx expo install firebase @react-native-async-storage/async-storage expo-linear-gradient
    ```
    
## 📂 Struktur Folder
Berikut adalah struktur  dari kode program ini:
/
├── .expo/               # Folder cache & konfigurasi internal Expo
├── .vscode/             # Konfigurasi editor VS Code
├── app/                 # Folder utama untuk Routing/Screen (Expo Router)
│   ├── (tabs)/          # Screen yang menggunakan Bottom Tab Navigation
│   │   ├── _layout.tsx  # Konfigurasi Tab Bar
│   │   ├── index.tsx    # Halaman Utama (Data Mahasiswa)
│   │   └── explore.tsx  # Halaman Explore
│   ├── _layout.tsx      # Konfigurasi Layout & Navigasi Utama (Stack)
│   ├── login.tsx        # Halaman Login
│   ├── register.tsx     # Halaman Registrasi
│   └── modal.tsx        # Contoh halaman Modal
├── assets/              # Aset statis (Gambar, Icon, Font)
├── components/          # Komponen UI reusable (ThemedText, ThemedView, dll)
├── constants/           # Konstanta global (Colors, Theme)
├── hooks/               # Custom React Hooks (useColorScheme, dll)
├── node_modules/        # Folder dependency library (jangan diubah manual)
├── scripts/             # Script utilitas (misal: reset-project)
├── .gitignore           # Daftar file yang tidak di-upload ke Git
├── app.json             # Konfigurasi global Expo (Nama App, Icon, Splash Screen)
├── eslint.config.js     # Konfigurasi ESLint (Pengecekan kode)
├── expo-env.d.ts        # Definisi tipe TypeScript untuk lingkungan Expo
├── firebase.js          # Konfigurasi & inisialisasi koneksi Firebase
├── package.json         # Daftar library/dependency & script project
├── package-lock.json    # Kunci versi dependency agar konsisten
├── README.md            # Dokumentasi proyek ini
├── storage.ts           # Helper untuk menyimpan sesi login (AsyncStorage)
└── tsconfig.json        # Konfigurasi TypeScript compiler
