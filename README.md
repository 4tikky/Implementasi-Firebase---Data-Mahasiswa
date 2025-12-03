# Implementasi Firebase - Data Mahasiswa (Tugas PBP)
Project ini adalah aplikasi mobile berbasis **React Native (Expo)** yang dibuat untuk memenuhi tugas **Pemrograman Berbasis Platform (PBP)**. Aplikasi ini bertujuan untuk mengimplementasikan integrasi **Firebase** dalam pengelolaan data mahasiswa (CRUD).

## 📱 Teknologi yang Digunakan
* **Framework**: [React Native](https://reactnative.dev/)
* **Platform**: [Expo](https://expo.dev/)
* **Bahasa Pemrograman**: [TypeScript](https://www.typescriptlang.org/)
* **Routing/Navigasi**: [Expo Router](https://docs.expo.dev/router/introduction/)
* **Backend/Database**: Firebase (Akan diimplementasikan)

## 🚀 Fitur Utama
* **Sistem Navigasi**: Menggunakan navigasi berbasis file (*File-based routing*) dengan Tab Bar.
* **Dark/Light Mode**: Mendukung tema gelap dan terang secara otomatis mengikuti pengaturan perangkat.
* **Manajemen Data Mahasiswa**: (Rencana implementasi) Fitur untuk Menambah, Membaca, Mengubah, dan Menghapus data mahasiswa yang terhubung ke Firebase.

## 🛠️ Cara Menjalankan Project
Ikuti langkah-langkah berikut untuk menjalankan project di lokal:
1.  **Clone Repository** (jika belum):
    ```bash
    git clone [https://github.com/username-kamu/nama-repo.git](https://github.com/username-kamu/nama-repo.git)
    cd nama-folder-project
    ```
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Jalankan Aplikasi**:
    ```bash
    npx expo start
    ```
4.  **Scan QR Code**:
    * Gunakan aplikasi **Expo Go** di Android/iOS untuk scan QR code yang muncul di terminal.
    * Atau tekan `w` untuk membuka di browser, `a` untuk Android Emulator, `i` untuk iOS Simulator.

## 📝 Catatan
* Project ini saat ini masih berupa *starter template* menggunakan Expo Router.
* Library Firebase belum terinstall di `package.json`. Untuk melanjutkan implementasi, perlu dilakukan instalasi firebase:
    ```bash
    npx expo install firebase
    ```
