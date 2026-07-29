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

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  async function register() {
    try {
      if (
        name.trim() === "" ||
        email.trim() === "" ||
        password.trim() === "" ||
        confirmPassword.trim() === ""
      ) {
        Alert.alert(
          "Campos obrigatórios",
          "Preencha todos os campos."
        );
        return;
      }

      if (!email.includes("@")) {
        Alert.alert(
          "E-mail inválido",
          "Digite um e-mail válido."
        );
        return;
      }

      if (password.length < 6) {
        Alert.alert(
          "Senha fraca",
          "A senha deve possuir no mínimo 6 caracteres."
        );
        return;
      }

      if (password !== confirmPassword) {
        Alert.alert(
          "Erro",
          "As senhas não coincidem."
        );
        return;
      }

      const user = {
        name,
        email,
        password,
      };

      await AsyncStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      Alert.alert(
        "Sucesso",
        "Conta criada com sucesso!",
        [
          {
            text: "Entrar",
            onPress: () => router.replace("/login"),
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        "Erro",
        "Não foi possível criar a conta."
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
        Criar Conta
      </Text>

      <TextInput
        placeholder="Nome completo"
        placeholderTextColor="#777"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

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
          onPress={() =>
            setShowPassword(!showPassword)
          }
        >
          <Ionicons
            name={
              showPassword
                ? "eye-off"
                : "eye"
            }
            size={22}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Confirmar senha"
          placeholderTextColor="#777"
          secureTextEntry={!showConfirmPassword}
          autoCapitalize="none"
          autoCorrect={false}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.passwordInput}
        />

        <TouchableOpacity
          onPress={() =>
            setShowConfirmPassword(
              !showConfirmPassword
            )
          }
        >
          <Ionicons
            name={
              showConfirmPassword
                ? "eye-off"
                : "eye"
            }
            size={22}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={register}
      >
        <Text style={styles.buttonText}>
          CRIAR CONTA
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={() =>
          router.replace("/login")
        }
      >
        <Text style={styles.loginText}>
          Já possui uma conta? Entrar
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
    marginBottom: 18,
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
    marginTop: 10,
  },

  buttonText: {
    color: "#000",
    fontSize: 17,
    fontWeight: "bold",
  },

  loginButton: {
    marginTop: 25,
    alignItems: "center",
  },

  loginText: {
    color: Colors.primary,
    fontWeight: "600",
    fontSize: 15,
  },
});