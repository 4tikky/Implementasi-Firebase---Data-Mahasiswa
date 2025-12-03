// storage.ts

import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_KEY = "user";

export async function saveUser(user: any) {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
}

export async function getUser() {
  const json = await AsyncStorage.getItem(USER_KEY);
  return json ? JSON.parse(json) : null;
}

export async function clearUser() {
  await AsyncStorage.removeItem(USER_KEY);
}
