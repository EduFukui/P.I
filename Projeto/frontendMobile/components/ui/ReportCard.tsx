import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

type Props = {
  title: string;
  description: string;
  status: "Em aberto" | "Em andamento" | "Resolvido";
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
  const getStatusColor = () => {
    switch (status) {
      case "Resolvido":
        return Colors.success;
      case "Em andamento":
        return Colors.warning;
      default:
        return Colors.danger;
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
      onPress={onPress}
    >
      <Image source={{ uri: image }} style={styles.image} />

      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={styles.title}>{title}</Text>

          <View
            style={[
              styles.badge,
              {
                backgroundColor: getStatusColor(),
              },
            ]}
          >
            <Text style={styles.badgeText}>{status}</Text>
          </View>
        </View>

        <Text numberOfLines={2} style={styles.description}>
          {description}
        </Text>

        <View style={styles.footer}>
          <View style={styles.dateContainer}>
            <Ionicons
              name="calendar-outline"
              size={15}
              color="#999"
            />

            <Text style={styles.date}>{date}</Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={20}
            color={Colors.primary}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    marginHorizontal: 16,
    marginBottom: 18,
    borderRadius: 18,
    overflow: "hidden",
    elevation: 4,
  },

  image: {
    width: "100%",
    height: 190,
  },

  content: {
    padding: 16,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    flex: 1,
    color: Colors.white,
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },

  badge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },

  badgeText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 12,
  },

  description: {
    marginTop: 10,
    color: "#BBBBBB",
    lineHeight: 21,
  },

  footer: {
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  date: {
    color: "#999",
    marginLeft: 6,
    fontSize: 13,
  },
});