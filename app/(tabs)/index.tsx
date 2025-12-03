import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

// Komponen tema dari template Expo
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useColorScheme } from "@/hooks/use-color-scheme"; // [Baru] Import hook

// Firestore & Auth
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase";

// Logout & routing
import { router } from "expo-router";
import { signOut } from "firebase/auth";
import { clearUser, getUser } from "../../storage";

// Tambahan untuk UI
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

interface Mahasiswa {
  id: string;
  nama: string;
  nim: string;
  prodi: string;
  angkatan: number;
  email?: string;
}

export default function HomeScreen() {
  const [mahasiswa, setMahasiswa] = useState<Mahasiswa[]>([]);
  const [loading, setLoading] = useState(false);

  // [Baru] Logika Warna Dinamis
  const colorScheme = useColorScheme() ?? "light";
  const itemBgColor = colorScheme === "dark" ? "#2C2C2E" : "#f9f9f9";
  const itemBorderColor = colorScheme === "dark" ? "#444" : "#eee";
  const iconColor = colorScheme === "dark" ? "#a5b4fc" : "#667eea"; // Ungu terang untuk dark mode

  // Ambil data mahasiswa dari Firestore
  const fetchMahasiswa = async () => {
    setLoading(true);
    setMahasiswa([]);

    try {
      const snapshot = await getDocs(collection(db, "mahasiswa"));
      const data: Mahasiswa[] = snapshot.docs.map((docSnap) => {
        const data = docSnap.data() as any;
        return {
          id: docSnap.id,
          nama: data.nama || "N/A",
          nim: data.nim || "N/A",
          prodi: data.prodi || "N/A",
          angkatan: data.angkatan || 0,
          email: data.email,
        };
      });

      setMahasiswa(data);
    } catch (err: any) {
      console.log(err);
      Alert.alert("Error", "Gagal mengambil data mahasiswa: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Cek login dari AsyncStorage
  useEffect(() => {
    const checkLoginAndFetch = async () => {
      const u = await getUser();

      if (!u) {
        router.replace("/login");
        return;
      }

      await fetchMahasiswa();
    };

    checkLoginAndFetch();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await clearUser();
      router.replace("/login");
    } catch (err: any) {
      Alert.alert("Logout gagal", err.message);
    }
  };

  const renderItem = ({ item }: { item: Mahasiswa }) => (
    // [Ubah] View biasa diganti style dinamis untuk item list
    <View
      style={[
        styles.itemContainer,
        { backgroundColor: itemBgColor, borderColor: itemBorderColor },
      ]}
    >
      <Ionicons
        name="person-circle"
        size={40}
        color={iconColor}
        style={styles.itemIcon}
      />
      <View style={styles.itemTextContainer}>
        {/* Hapus style color manual agar ThemedText bekerja */}
        <ThemedText style={styles.itemText}>Nama: {item.nama}</ThemedText>
        <ThemedText style={styles.itemText}>NIM: {item.nim}</ThemedText>
        <ThemedText style={styles.itemText}>Prodi: {item.prodi}</ThemedText>
        <ThemedText style={styles.itemText}>
          Angkatan: {item.angkatan}
        </ThemedText>
        {item.email && (
          <ThemedText style={styles.itemText}>Email: {item.email}</ThemedText>
        )}
      </View>
    </View>
  );

  return (
    <ThemedView style={styles.safeArea}>
      <LinearGradient
        colors={["#667eea", "#764ba2"]}
        style={styles.gradientBackground}
      >
        {/* [Ubah] View biasa diganti ThemedView agar background card otomatis */}
        <ThemedView style={styles.card}>
          <View style={styles.header}>
            <Ionicons
              name="list"
              size={60}
              color={iconColor}
              style={styles.headerIcon}
            />
            <ThemedText type="title" style={styles.title}>
              Data Mahasiswa
            </ThemedText>
            <ThemedText style={styles.subtitle}>
              Berikut adalah daftar mahasiswa yang terdaftar di sistem.
            </ThemedText>
          </View>

          <View style={styles.contentWrapper}>
            {loading && (
              <ActivityIndicator
                size="large"
                color={iconColor}
                style={styles.loader}
              />
            )}

            <FlatList
              data={mahasiswa}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              ListEmptyComponent={() =>
                !loading && mahasiswa.length === 0 ? (
                  <ThemedText style={styles.emptyText}>
                    Belum ada data mahasiswa yang tersimpan.
                  </ThemedText>
                ) : null
              }
              contentContainerStyle={{ paddingBottom: 16 }}
              showsVerticalScrollIndicator={false}
            />
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons
              name="log-out"
              size={20}
              color="#fff"
              style={styles.logoutIcon}
            />
            <ThemedText style={styles.logoutText}>Logout</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </LinearGradient>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
    padding: 2,
  },
  card: {
    flex: 1,
    // [Hapus] backgroundColor: "#fff", -> Biarkan ThemedView handle
    borderRadius: 18,
    margin: 10,
    padding: 20,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerIcon: {
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    // [Hapus] color: "#333",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    // [Hapus] color: "#666",
    textAlign: "center",
    marginTop: 4,
  },
  contentWrapper: {
    flex: 1,
    width: "100%",
  },
  loader: {
    marginVertical: 20,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    // [Hapus] backgroundColor: "#f9f9f9", -> Pindah ke inline style
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    // [Hapus] borderColor: "#eee", -> Pindah ke inline style
  },
  itemIcon: {
    marginRight: 12,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    // [Hapus] color: "#333",
    marginBottom: 2,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontStyle: "italic",
    // [Hapus] color: "gray",
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#dc3545", // Merah tetap merah
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    color: "#fff", // Teks tombol logout tetap putih
    fontSize: 16,
    fontWeight: "bold",
  },
});