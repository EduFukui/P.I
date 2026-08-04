import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import Colors from "@/constants/Colors";
import { ReportStatus } from "@/types/Report";

type Props = {
  title: string;
  description: string;
  status: ReportStatus;
  image: string;
  date: string;
  onPress?: () => void;
};

export default function ReportCard({
  title,
  description,
  status,
  image,
  date,
  onPress,
}: Props) {
  function getStatusColor() {
    switch (status) {
      case "Resolvido":
        return Colors.success;

      case "Em andamento":
        return Colors.warning;

      case "Pendente":
      default:
        return Colors.danger;
    }
  }

  function getStatusIcon():
    | "checkmark-circle"
    | "time"
    | "alert-circle" {
    switch (status) {
      case "Resolvido":
        return "checkmark-circle";

      case "Em andamento":
        return "time";

      case "Pendente":
      default:
        return "alert-circle";
    }
  }

  return (
    <TouchableOpacity
      activeOpacity={0.88}
      style={styles.card}
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={styles.image}
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Ionicons
              name="image-outline"
              size={39}
              color="#666"
            />

            <Text style={styles.placeholderText}>
              Sem imagem
            </Text>
          </View>
        )}

        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor: getStatusColor(),
            },
          ]}
        >
          <Ionicons
            name={getStatusIcon()}
            size={14}
            color="#FFF"
          />

          <Text style={styles.statusText}>
            {status}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text
            style={styles.title}
            numberOfLines={1}
          >
            {title}
          </Text>

          <Ionicons
            name="chevron-forward"
            size={22}
            color={Colors.primary}
          />
        </View>

        <Text
          numberOfLines={2}
          style={styles.description}
        >
          {description}
        </Text>

        <View style={styles.footer}>
          <View style={styles.infoItem}>
            <Ionicons
              name="calendar-outline"
              size={16}
              color="#777"
            />

            <Text style={styles.infoText}>
              {date}
            </Text>
          </View>

          <View style={styles.openTextBox}>
            <Text style={styles.openText}>
              Ver detalhes
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    marginHorizontal: 18,
    marginBottom: 17,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#292929",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.16,
    shadowRadius: 5,
  },

  imageContainer: {
    height: 178,
    position: "relative",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  imagePlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#242424",
    alignItems: "center",
    justifyContent: "center",
  },

  placeholderText: {
    color: "#666",
    fontSize: 13,
    marginTop: 8,
  },

  statusBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    minHeight: 32,
    borderRadius: 16,
    paddingHorizontal: 11,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    elevation: 3,
  },

  statusText: {
    color: "#FFF",
    fontSize: 11,
    fontWeight: "bold",
  },

  content: {
    padding: 16,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    flex: 1,
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 8,
  },

  description: {
    color: "#A5A5A5",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 9,
  },

  footer: {
    marginTop: 17,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: "#292929",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  infoItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  infoText: {
    color: "#777",
    fontSize: 12,
    marginLeft: 6,
  },

  openTextBox: {
    backgroundColor: "rgba(198,255,0,0.08)",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  openText: {
    color: Colors.primary,
    fontSize: 11,
    fontWeight: "bold",
  },
});