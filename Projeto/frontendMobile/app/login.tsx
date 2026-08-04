import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import Colors from "@/constants/Colors";
import { loginUser } from "@/services/authService";

export default function LoginScreen() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!login.trim() || !password) {
      Alert.alert(
        "Campos obrigatórios",
        "Informe seu e-mail, CPF ou telefone e a senha."
      );
      return;
    }

    try {
      setLoading(true);

      const user = await loginUser(
        login.trim(),
        password
      );

      if (!user) {
        Alert.alert(
          "Login inválido",
          "Usuário ou senha incorretos."
        );
        return;
      }

      // loginUser já salva o usuário como logado.
      router.replace("/(tabs)");
    } catch (error) {
      console.log("Erro no login:", error);

      Alert.alert(
        "Erro",
        "Não foi possível fazer login."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={
          Platform.OS === "ios" ? "padding" : undefined
        }
      >
        <Text style={styles.logo}>Reclama SL</Text>

        <Text style={styles.title}>Entrar</Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail, CPF ou telefone"
          placeholderTextColor="#777"
          autoCapitalize="none"
          autoCorrect={false}
          value={login}
          onChangeText={setLogin}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Senha"
            placeholderTextColor="#777"
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
            onSubmitEditing={handleLogin}
          />

          <TouchableOpacity
            onPress={() =>
              setShowPassword((current) => !current)
            }
          >
            <Ionicons
              name={
                showPassword
                  ? "eye-off-outline"
                  : "eye-outline"
              }
              size={22}
              color="#999"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            loading && styles.disabledButton,
          ]}
          disabled={loading}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>
            {loading ? "ENTRANDO..." : "ENTRAR"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => router.push("/register")}
        >
          <Text style={styles.linkText}>
            Não possui uma conta? Cadastre-se
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  logo: {
    color: Colors.primary,
    fontSize: 38,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  title: {
    color: "#FFF",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 32,
  },

  input: {
    height: 56,
    backgroundColor: Colors.surface,
    borderRadius: 14,
    paddingHorizontal: 16,
    color: "#FFF",
    fontSize: 16,
    marginBottom: 16,
  },

  passwordContainer: {
    height: 56,
    backgroundColor: Colors.surface,
    borderRadius: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
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

  disabledButton: {
    opacity: 0.6,
  },

  buttonText: {
    color: "#000",
    fontSize: 17,
    fontWeight: "bold",
  },

  linkButton: {
    alignItems: "center",
    paddingVertical: 24,
  },

  linkText: {
    color: Colors.primary,
    fontSize: 15,
    fontWeight: "600",
  },
});