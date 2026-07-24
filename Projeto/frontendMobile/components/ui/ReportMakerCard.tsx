import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "@/constants/Colors";

type Props = {
  report: {
    title: string;
    description: string;
    status: string;
  };
};

export default function ReportMarkerCard({ report }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{report.title}</Text>

      <Text style={styles.description}>
        {report.description}
      </Text>

      <View style={styles.footer}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {report.status}
          </Text>
        </View>

        <TouchableOpacity>
          <Text style={styles.link}>
            Ver detalhes
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 15,
    right: 15,
    bottom: 20,

    backgroundColor: Colors.surface,

    borderRadius: 18,

    padding: 18,

    elevation: 8,
  },

  title: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 18,
  },

  description: {
    color: "#BBB",
    marginTop: 8,
    lineHeight: 20,
  },

  footer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  badge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },

  badgeText: {
    color: "#000",
    fontWeight: "bold",
  },

  link: {
    color: Colors.primary,
    fontWeight: "600",
  },
});