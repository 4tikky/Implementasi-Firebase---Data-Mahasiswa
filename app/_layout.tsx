// app/_layout.tsx

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // State untuk melacak 2 hal:
  // 1. Apakah pengecekan auth sudah selesai?
  const [isReady, setIsReady] = useState(false);
  // 2. Apakah pengguna terautentikasi?
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuthAndLoad() {
      try {
        const userJSON = await AsyncStorage.getItem('user');

        if (userJSON) {
          setIsAuthenticated(true);
        }

      } catch (e) {
        console.error('Gagal memuat auth state:', e);
      } finally {
        setIsReady(true);
        SplashScreen.hideAsync();
      }
    }

    checkAuthAndLoad();
  }, []); // [] = Hanya jalankan sekali saat app dibuka

  useEffect(() => {
    if (!isReady) {
      return; // Belum siap, jangan lakukan apa-apa
    }

    if (isAuthenticated) {
      // Pengguna sudah login, paksa pindah ke halaman utama (tabs)
      router.replace('/(tabs)');
    } else {
      // Pengguna belum login, paksa pindah ke halaman login
      router.replace('/login');
    }
  }, [isReady, isAuthenticated]); // Jalankan ulang jika 'isReady' atau 'isAuthenticated' berubah

  // Selama pengecekan, tampilkan 'null' (splash screen akan terlihat)
  if (!isReady) {
    return null;
  }

  // Ini adalah navigator utama. Tampilkan jika 'isReady' = true
  return (
      <Stack>
        {/* 1. Halaman utama (tabs). Sembunyikan header. */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* 2. Halaman login. Sembunyikan header. */}
        <Stack.Screen name="login" options={{ headerShown: false }} />

        {/* 3. (Opsional) Halaman modal dari template */}
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
  );
}