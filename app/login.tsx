import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme"; // [Baru] Import warna tema
import { useColorScheme } from "@/hooks/use-color-scheme"; // [Baru] Import hook tema
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { saveUser } from "../storage";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // [Baru] Logika Warna Dinamis
  const colorScheme = useColorScheme() ?? "light";
  const inputBgColor = colorScheme === "dark" ? "#2C2C2E" : "#f9f9f9";
  const inputBorderColor = colorScheme === "dark" ? "#444" : "#ddd";
  const textColor = Colors[colorScheme].text;
  const placeholderColor = "#aaa";
  const iconColor = colorScheme === "dark" ? "#aaa" : "#667eea"; // Ikon utama menyesuaikan

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Validasi", "Email dan password wajib diisi.");
      return;
    }

    setLoading(true);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const user = res.user;

      await saveUser({ uid: user.uid, email: user.email });

      setPassword("");
      setLoading(false);

      // langsung ke tabs (home data mahasiswa)
      router.replace("/(tabs)");
    } catch (err: any) {
      setLoading(false);
      console.log(err);
      Alert.alert("Login gagal", err.message);
    }
  };

  const goToRegister = () => {
    router.push("/register");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Container utama menggunakan ThemedView agar background belakang ikut gelap */}
        <ThemedView style={styles.container}>
          <LinearGradient
            colors={["#667eea", "#764ba2"]}
            style={styles.gradientCard}
          >
            {/* [Ubah] View biasa diganti ThemedView agar kartu jadi hitam di dark mode */}
            <ThemedView style={styles.card}>
              <Ionicons
                name="person-circle"
                size={80}
                color={iconColor}
                style={styles.icon}
              />
              
              {/* ThemedText otomatis putih di dark mode */}
              <ThemedText type="title" style={styles.title}>
                Login Mahasiswa
              </ThemedText>

              {/* Input Container dengan style dinamis */}
              <View
                style={[
                  styles.inputContainer,
                  { backgroundColor: inputBgColor, borderColor: inputBorderColor },
                ]}
              >
                <Ionicons
                  name="mail"
                  size={20}
                  color={placeholderColor}
                  style={styles.inputIcon}
                />
                <TextInput
                  placeholder="Email"
                  placeholderTextColor={placeholderColor}
                  style={[styles.input, { color: textColor }]} // Warna teks input dinamis
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>

              <View
                style={[
                  styles.inputContainer,
                  { backgroundColor: inputBgColor, borderColor: inputBorderColor },
                ]}
              >
                <Ionicons
                  name="lock-closed"
                  size={20}
                  color={placeholderColor}
                  style={styles.inputIcon}
                />
                <TextInput
                  placeholder="Password"
                  placeholderTextColor={placeholderColor}
                  style={[styles.input, { color: textColor }]} // Warna teks input dinamis
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

              <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <ThemedText style={styles.buttonText}>Masuk</ThemedText>
                )}
              </TouchableOpacity>

              <TouchableOpacity style={styles.registerButton} onPress={goToRegister}>
                <ThemedText style={styles.registerText}>
                  Belum punya akun? Daftar
                </ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </LinearGradient>
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  gradientCard: {
    borderRadius: 20,
    padding: 2, // Efek border gradien
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  card: {
    // [Hapus] backgroundColor: "#fff", -> Biarkan ThemedView yang mengatur warnanya
    borderRadius: 18,
    padding: 24,
    alignItems: "center",
    gap: 16,
  },
  icon: {
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    // [Hapus] color: "#333", -> ThemedText akan otomatis mengatur warna
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    // [Pindah ke inline style] borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    // [Pindah ke inline style] backgroundColor: "#f9f9f9",
    width: "100%",
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    // [Pindah ke inline style] color: "#333",
  },
  button: {
    backgroundColor: "#667eea",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerButton: {
    marginTop: 8,
  },
  registerText: {
    color: "#667eea",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});