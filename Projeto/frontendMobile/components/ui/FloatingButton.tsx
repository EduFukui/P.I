import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, Href } from "expo-router";

import Colors from "@/constants/Colors";

export default function FloatingButton() {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => router.push("/(tabs)/new-report" as Href)}
    >
      <Ionicons
        name="add"
        size={30}
        color="#000"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",

    right: 25,
    bottom: 25,

    width: 65,
    height: 65,

    borderRadius: 32.5,

    backgroundColor: Colors.primary,

    justifyContent: "center",
    alignItems: "center",

    elevation: 10,
  },
});