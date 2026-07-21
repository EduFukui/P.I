import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

export default function Header() {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Ionicons name="menu" size={26} color={Colors.primary} />
      </TouchableOpacity>

      <View style={styles.logo}>
        <Text style={styles.logoText}>MAPA</Text>
      </View>

      <TouchableOpacity>
        <Ionicons
          name="person-circle"
          size={32}
          color={Colors.primary}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 65,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logo: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 8,
  },

  logoText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 15,
  },
});