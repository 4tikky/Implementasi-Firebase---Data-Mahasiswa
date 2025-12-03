import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme"; // [Baru]
import { useColorScheme } from "@/hooks/use-color-scheme"; // [Baru]
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

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { saveUser } from "../storage";

export default function RegisterScreen() {
  const [nama, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [prodi, setProdi] = useState("");
  const [angkatan, setAngkatan] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // [Baru] Logika Warna Dinamis
  const colorScheme = useColorScheme() ?? "light";
  const inputBgColor = colorScheme === "dark" ? "#2C2C2E" : "#f9f9f9";
  const inputBorderColor = colorScheme === "dark" ? "#444" : "#ddd";
  const textColor = Colors[colorScheme].text;
  const placeholderColor = "#aaa";
  const iconColor = colorScheme === "dark" ? "#aaa" : "#667eea";

  const handleRegister = async () => {
    if (!nama || !nim || !prodi || !angkatan || !email || !password) {
      Alert.alert("Validasi", "Semua field wajib diisi.");
      return;
    }

    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;

      // simpan profile mahasiswa di Firestore (doc id = uid)
      await setDoc(doc(db, "mahasiswa", user.uid), {
        nama,
        nim,
        prodi,
        angkatan: Number(angkatan),
        email: user.email,
      });

      // simpan info login di AsyncStorage
      await saveUser({ uid: user.uid, email: user.email });

      setLoading(false);
      // pindah ke tabs (home)
      router.replace("/(tabs)");
    } catch (err: any) {
      setLoading(false);
      console.log(err);
      Alert.alert("Pendaftaran gagal", err.message);
    }
  };

  const goToLogin = () => {
    router.replace("/login");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <ThemedView style={styles.container}>
          <LinearGradient
            colors={["#667eea", "#764ba2"]}
            style={styles.gradientCard}
          >
            {/* [Ubah] Ganti View jadi ThemedView agar background kartu otomatis */}
            <ThemedView style={styles.card}>
              <Ionicons
                name="person-add"
                size={60}
                color={iconColor}
                style={styles.icon}
              />
              <ThemedText type="title" style={styles.title}>
                Pendaftaran Mahasiswa Baru
              </ThemedText>

              <ThemedText style={styles.sectionTitle}>Data Mahasiswa</ThemedText>

              <View
                style={[
                  styles.inputContainer,
                  {
                    backgroundColor: inputBgColor,
                    borderColor: inputBorderColor,
                  },
                ]}
              >
                <Ionicons
                  name="person"
                  size={20}
                  color={placeholderColor}
                  style={styles.inputIcon}
                />
                <TextInput
                  placeholder="Nama"
                  placeholderTextColor={placeholderColor}
                  style={[styles.input, { color: textColor }]}
                  value={nama}
                  onChangeText={setNama}
                />
              </View>

              <View
                style={[
                  styles.inputContainer,
                  {
                    backgroundColor: inputBgColor,
                    borderColor: inputBorderColor,
                  },
                ]}
              >
                <Ionicons
                  name="card"
                  size={20}
                  color={placeholderColor}
                  style={styles.inputIcon}
                />
                <TextInput
                  placeholder="NIM"
                  placeholderTextColor={placeholderColor}
                  style={[styles.input, { color: textColor }]}
                  value={nim}
                  onChangeText={setNim}
                />
              </View>

              <View
                style={[
                  styles.inputContainer,
                  {
                    backgroundColor: inputBgColor,
                    borderColor: inputBorderColor,
                  },
                ]}
              >
                <Ionicons
                  name="school"
                  size={20}
                  color={placeholderColor}
                  style={styles.inputIcon}
                />
                <TextInput
                  placeholder="Prodi"
                  placeholderTextColor={placeholderColor}
                  style={[styles.input, { color: textColor }]}
                  value={prodi}
                  onChangeText={setProdi}
                />
              </View>

              <View
                style={[
                  styles.inputContainer,
                  {
                    backgroundColor: inputBgColor,
                    borderColor: inputBorderColor,
                  },
                ]}
              >
                <Ionicons
                  name="calendar"
                  size={20}
                  color={placeholderColor}
                  style={styles.inputIcon}
                />
                <TextInput
                  placeholder="Angkatan (contoh: 2023)"
                  placeholderTextColor={placeholderColor}
                  style={[styles.input, { color: textColor }]}
                  value={angkatan}
                  onChangeText={setAngkatan}
                  keyboardType="numeric"
                />
              </View>

              <ThemedText style={styles.sectionTitle}>Akun Login</ThemedText>

              <View
                style={[
                  styles.inputContainer,
                  {
                    backgroundColor: inputBgColor,
                    borderColor: inputBorderColor,
                  },
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
                  style={[styles.input, { color: textColor }]}
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>

              <View
                style={[
                  styles.inputContainer,
                  {
                    backgroundColor: inputBgColor,
                    borderColor: inputBorderColor,
                  },
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
                  style={[styles.input, { color: textColor }]}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

              <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleRegister}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <ThemedText style={styles.buttonText}>Daftar</ThemedText>
                )}
              </TouchableOpacity>

              <TouchableOpacity style={styles.loginButton} onPress={goToLogin}>
                <ThemedText style={styles.loginText}>
                  Sudah punya akun? Masuk
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
    padding: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  card: {
    // [Hapus] backgroundColor: "#fff",
    borderRadius: 18,
    padding: 24,
    alignItems: "center",
    gap: 12,
  },
  icon: {
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    // [Hapus] color: "#333",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#667eea",
    alignSelf: "flex-start",
    marginTop: 8,
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
  loginButton: {
    marginTop: 8,
  },
  loginText: {
    color: "#667eea",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});