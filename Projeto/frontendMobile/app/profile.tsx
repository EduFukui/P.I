import { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { router } from "expo-router";

import Colors from "@/constants/Colors";

import {
  getLoggedUser,
  logoutUser,
} from "@/services/authService";

import { User } from "@/types/User";

export default function ProfileScreen() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    const logged = await getLoggedUser();

    if (!logged) {
      router.replace("/login");
      return;
    }

    setUser(logged);
  }

  async function handleLogout() {
    Alert.alert(
      "Sair",
      "Deseja realmente sair da conta?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sair",
          style: "destructive",
          onPress: async () => {
            await logoutUser();

            router.replace("/login");
          },
        },
      ]
    );
  }

  if (!user) return null;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Meu Perfil
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nome</Text>

        <Text style={styles.value}>
          {user.name}
        </Text>

        <Text style={styles.label}>CPF</Text>

        <Text style={styles.value}>
          {user.cpf}
        </Text>

        <Text style={styles.label}>
          Telefone
        </Text>

        <Text style={styles.value}>
          {user.telefone}
        </Text>

        <Text style={styles.label}>
          E-mail
        </Text>

        <Text style={styles.value}>
          {user.email}
        </Text>        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>
            SAIR DA CONTA
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },

  title: {
    color: "#FFF",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 25,
  },

  card: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    padding: 20,
  },

  label: {
    color: "#888",
    fontSize: 14,
    marginTop: 15,
  },

  value: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 4,
  },

  logoutButton: {
    backgroundColor: "#ff3b30",
    height: 55,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 35,
  },

  logoutText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});