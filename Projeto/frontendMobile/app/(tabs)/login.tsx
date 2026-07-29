import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import Colors from "@/constants/Colors";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  async function login() {
    try {
      const user = await AsyncStorage.getItem("user");

      if (!user) {
        Alert.alert(
          "Erro",
          "Nenhum usuário cadastrado. Crie uma conta primeiro."
        );
        return;
      }

      const data = JSON.parse(user);

      if (email.trim() === "" || password.trim() === "") {
        Alert.alert(
          "Campos obrigatórios",
          "Preencha o e-mail e a senha."
        );
        return;
      }

      if (
        email.toLowerCase() === data.email.toLowerCase() &&
        password === data.password
      ) {
        Alert.alert("Sucesso", "Login realizado!");

        router.replace("/(tabs)");
      } else {
        Alert.alert(
          "Erro",
          "E-mail ou senha incorretos."
        );
      }
    } catch (error) {
      Alert.alert(
        "Erro",
        "Não foi possível realizar o login."
      );
      console.log(error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>
        Reclama SL
      </Text>

      <Text style={styles.title}>
        Entrar
      </Text>

      <TextInput
        placeholder="E-mail"
        placeholderTextColor="#777"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Senha"
          placeholderTextColor="#777"
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          autoCorrect={false}
          value={password}
          onChangeText={setPassword}
          style={styles.passwordInput}
        />

        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
        >
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={22}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={login}
      >
        <Text style={styles.buttonText}>
          ENTRAR
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => router.push("/register")}
      >
        <Text style={styles.registerText}>
          Não possui conta? Cadastre-se
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    paddingHorizontal: 25,
  },

  logo: {
    color: Colors.primary,
    fontSize: 38,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 35,
  },

  input: {
    backgroundColor: Colors.surface,
    height: 56,
    borderRadius: 14,
    paddingHorizontal: 16,
    color: "#FFF",
    marginBottom: 18,
    fontSize: 16,
  },

  passwordContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    height: 56,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  passwordInput: {
    flex: 1,
    color: "#FFF",
    fontSize: 16,
  },

  button: {
    height: 58,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#000",
    fontSize: 17,
    fontWeight: "bold",
  },

  registerButton: {
    marginTop: 25,
    alignItems: "center",
  },

  registerText: {
    color: Colors.primary,
    fontWeight: "600",
    fontSize: 15,
  },
});