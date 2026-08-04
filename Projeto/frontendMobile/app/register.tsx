// app/register.tsx

import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { router } from "expo-router";

import Colors from "@/constants/Colors";
import { registerUser } from "@/services/authService";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [acceptedTerms, setAcceptedTerms] =
    useState(false);

  const [loading, setLoading] = useState(false);

  function onlyNumbers(value: string) {
    return value.replace(/\D/g, "");
  }

  function formatCpf(value: string) {
    const numbers = onlyNumbers(value).slice(0, 11);

    return numbers
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }

  function formatPhone(value: string) {
    const numbers = onlyNumbers(value).slice(0, 11);

    if (numbers.length <= 10) {
      return numbers
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    }

    return numbers
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");
  }

  async function handleRegister() {
    if (
      !name.trim() ||
      !cpf.trim() ||
      !telefone.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert(
        "Campos obrigatórios",
        "Preencha todos os campos."
      );
      return;
    }

    if (!acceptedTerms) {
      Alert.alert(
        "Termos de Uso",
        "Você precisa concordar com os Termos de Uso para criar sua conta."
      );
      return;
    }

    const cleanCpf = onlyNumbers(cpf);
    const cleanTelefone = onlyNumbers(telefone);

    if (cleanCpf.length !== 11) {
      Alert.alert(
        "CPF inválido",
        "O CPF deve possuir 11 números."
      );
      return;
    }

    if (
      cleanTelefone.length < 10 ||
      cleanTelefone.length > 11
    ) {
      Alert.alert(
        "Telefone inválido",
        "Digite um telefone válido com DDD."
      );
      return;
    }

    if (
      !email.includes("@") ||
      !email.includes(".")
    ) {
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
        "Senhas diferentes",
        "As senhas não coincidem."
      );
      return;
    }

    try {
      setLoading(true);

      await registerUser({
        id: `${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 8)}`,
        name: name.trim(),
        cpf: cleanCpf,
        telefone: cleanTelefone,
        email: email.trim().toLowerCase(),
        password,
      });

      Alert.alert(
        "Conta criada",
        "Cadastro realizado com sucesso!",
        [
          {
            text: "Continuar",
            onPress: () =>
              router.replace("/(tabs)"),
          },
        ]
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Não foi possível criar a conta.";

      Alert.alert("Erro no cadastro", message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.logo}>
            Reclama SL
          </Text>

          <Text style={styles.title}>
            Criar conta
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Nome completo"
            placeholderTextColor="#777"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={styles.input}
            placeholder="CPF"
            placeholderTextColor="#777"
            keyboardType="number-pad"
            maxLength={14}
            value={cpf}
            onChangeText={(value) =>
              setCpf(formatCpf(value))
            }
          />

          <TextInput
            style={styles.input}
            placeholder="Telefone com DDD"
            placeholderTextColor="#777"
            keyboardType="phone-pad"
            maxLength={15}
            value={telefone}
            onChangeText={(value) =>
              setTelefone(formatPhone(value))
            }
          />

          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#777"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
          />

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Senha"
              placeholderTextColor="#777"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity
              onPress={() =>
                setShowPassword(
                  (current) => !current
                )
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

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Confirmar senha"
              placeholderTextColor="#777"
              secureTextEntry={
                !showConfirmPassword
              }
              autoCapitalize="none"
              autoCorrect={false}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            <TouchableOpacity
              onPress={() =>
                setShowConfirmPassword(
                  (current) => !current
                )
              }
            >
              <Ionicons
                name={
                  showConfirmPassword
                    ? "eye-off-outline"
                    : "eye-outline"
                }
                size={22}
                color="#999"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.termsContainer}>
            <Checkbox
              value={acceptedTerms}
              onValueChange={setAcceptedTerms}
              color={
                acceptedTerms
                  ? Colors.primary
                  : undefined
              }
            />

            <Text style={styles.termsText}>
              Li e concordo com os{" "}
              <Text
                style={styles.termsLink}
                onPress={() =>
                  router.push("/terms")
                }
              >
                Termos de Uso
              </Text>
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.button,
              (!acceptedTerms || loading) &&
                styles.disabledButton,
            ]}
            disabled={!acceptedTerms || loading}
            onPress={handleRegister}
          >
            <Text style={styles.buttonText}>
              {loading
                ? "CRIANDO CONTA..."
                : "CRIAR CONTA"}
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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  keyboard: {
    flex: 1,
  },

  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 35,
  },

  logo: {
    color: Colors.primary,
    fontSize: 38,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 27,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },

  input: {
    height: 56,
    backgroundColor: Colors.surface,
    borderRadius: 14,
    paddingHorizontal: 16,
    color: "#FFFFFF",
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
    marginBottom: 16,
  },

  passwordInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 16,
  },

  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 22,
  },

  termsText: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 10,
  },

  termsLink: {
    color: Colors.primary,
    fontWeight: "bold",
  },

  button: {
    height: 58,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  disabledButton: {
    opacity: 0.5,
  },

  buttonText: {
    color: "#000000",
    fontSize: 17,
    fontWeight: "bold",
  },

  loginButton: {
    alignItems: "center",
    paddingVertical: 22,
  },

  loginText: {
    color: Colors.primary,
    fontSize: 15,
    fontWeight: "600",
  },
});