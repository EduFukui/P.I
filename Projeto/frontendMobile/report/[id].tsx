import { useLocalSearchParams, router } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import reports from "@/data/reports";
import Colors from "@/constants/Colors";

export default function ReportDetails() {
  const { id } = useLocalSearchParams();

  const report = reports.find((item) => item.id === id);

  if (!report) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFound}>
          Relato não encontrado.
        </Text>
      </View>
    );
  }

  const badgeColor =
    report.status === "Resolvido"
      ? Colors.success
      : report.status === "Em andamento"
      ? Colors.warning
      : Colors.danger;

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Image
        source={{ uri: report.image }}
        style={styles.image}
      />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color="#FFF"
        />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>
          {report.title}
        </Text>

        <View
          style={[
            styles.badge,
            {
              backgroundColor: badgeColor,
            },
          ]}
        >
          <Text style={styles.badgeText}>
            {report.status}
          </Text>
        </View>

        <View style={styles.info}>
          <Ionicons
            name="calendar-outline"
            size={18}
            color="#AAA"
          />

          <Text style={styles.infoText}>
            {report.date}
          </Text>
        </View>

        <View style={styles.info}>
          <Ionicons
            name="location-outline"
            size={18}
            color="#AAA"
          />

          <Text style={styles.infoText}>
            São Leopoldo - RS
          </Text>
        </View>

        <Text style={styles.section}>
          Descrição
        </Text>

        <Text style={styles.description}>
          {report.description}
        </Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            Atualizar Status
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },

  notFound: {
    color: "#FFF",
    fontSize: 18,
  },

  image: {
    width: "100%",
    height: 260,
  },

  backButton: {
    position: "absolute",
    top: 50,
    left: 20,

    width: 45,
    height: 45,

    borderRadius: 25,

    backgroundColor: "#00000088",

    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    padding: 22,
  },

  title: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 28,
  },

  badge: {
    alignSelf: "flex-start",
    marginTop: 15,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 30,
  },

  badgeText: {
    color: "#FFF",
    fontWeight: "bold",
  },

  info: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
  },

  infoText: {
    color: "#CCC",
    marginLeft: 10,
    fontSize: 15,
  },

  section: {
    marginTop: 30,
    color: Colors.primary,
    fontSize: 18,
    fontWeight: "bold",
  },

  description: {
    marginTop: 12,
    color: "#DDD",
    fontSize: 16,
    lineHeight: 26,
  },

  button: {
    marginTop: 35,
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});