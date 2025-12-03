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
