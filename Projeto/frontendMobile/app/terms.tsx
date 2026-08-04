import { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Checkbox from "expo-checkbox";
import { router } from "expo-router";

import Colors from "@/constants/Colors";
import { acceptTerms } from "@/services/authService";

export default function TermsScreen() {
  const [accepted, setAccepted] = useState(false);

  async function handleContinue() {
    if (!accepted) {
      Alert.alert(
        "Termos de Uso",
        "Você precisa aceitar os Termos de Uso para utilizar o aplicativo."
      );
      return;
    }

    await acceptTerms();

    router.replace("/login");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>Reclama SL</Text>

      <Text style={styles.title}>Termos de Uso</Text>

      <ScrollView
        style={styles.box}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.text}>
          Ao utilizar o Reclama SL, você concorda em utilizar o aplicativo de forma responsável.

          {"\n\n"}

          Os relatos enviados devem conter informações verdadeiras.

          {"\n\n"}

          É proibido publicar conteúdo ofensivo, preconceituoso, falso ou ilegal.

          {"\n\n"}

          As informações fornecidas poderão ser utilizadas apenas para fins de melhoria dos serviços do aplicativo.

          {"\n\n"}

          Ao continuar você declara que leu e concorda com estes termos.
        </Text>
      </ScrollView>

      <View style={styles.checkbox}>
        <Checkbox
          value={accepted}
          onValueChange={setAccepted}
          color={accepted ? Colors.primary : undefined}
        />

        <Text style={styles.checkboxText}>
          Li e concordo com os Termos de Uso.
        </Text>
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          !accepted && { opacity: 0.5 },
        ]}
        disabled={!accepted}
        onPress={handleContinue}
      >
        <Text style={styles.buttonText}>
          CONTINUAR
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },

  logo: {
    fontSize: 36,
    fontWeight: "bold",
    color: Colors.primary,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },

  title: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  box: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 15,
    padding: 15,
  },

  text: {
    color: "#DDD",
    fontSize: 15,
    lineHeight: 24,
  },

  checkbox: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },

  checkboxText: {
    color: "#FFF",
    marginLeft: 10,
    flex: 1,
  },

  button: {
    height: 55,
    backgroundColor: Colors.primary,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  buttonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 17,
  },
});