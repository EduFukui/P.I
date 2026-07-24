import { Image, StyleSheet, Text, View } from "react-native";
import Colors from "@/constants/Colors";

type Props = {
  title: string;
  description: string;
  status: string;
  image?: string;
};

export default function ReportCard({
  title,
  description,
  status,
  image,
}: Props) {
  const badgeColor =
    status === "Resolvido"
      ? Colors.success
      : status === "Em andamento"
      ? Colors.warning
      : Colors.danger;

  return (
    <View style={styles.card}>
      <Image
        source={{
          uri:
            image ||
            "https://picsum.photos/400/200",
        }}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.title}>
          {title}
        </Text>

        <Text style={styles.description}>
          {description}
        </Text>

        <View style={styles.footer}>
          <View
            style={[
              styles.badge,
              { backgroundColor: badgeColor },
            ]}
          >
            <Text style={styles.badgeText}>
              {status}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    marginHorizontal: 16,
    marginBottom: 18,
    borderRadius: 18,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: 170,
  },

  content: {
    padding: 16,
  },

  title: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 18,
  },

  description: {
    color: "#AAA",
    marginTop: 8,
    lineHeight: 20,
  },

  footer: {
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  badge: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 30,
  },

  badgeText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});