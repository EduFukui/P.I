import { useEffect } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  View,
} from "react-native";

import { router } from "expo-router";

import Colors from "@/constants/Colors";
import {
  hasAcceptedTerms,
  isLogged,
} from "@/services/authService";

export default function StartScreen() {
  useEffect(() => {
    checkAccess();
  }, []);

  async function checkAccess() {
    try {
      const accepted = await hasAcceptedTerms();

      if (!accepted) {
        router.replace("/terms");
        return;
      }

      const logged = await isLogged();

      if (logged) {
        router.replace("/(tabs)");
        return;
      }

      router.replace("/login");
    } catch (error) {
      console.log("Erro ao verificar acesso:", error);
      router.replace("/login");
    }
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color={Colors.primary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
});