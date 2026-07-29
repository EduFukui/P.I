import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://ui-avatars.com/api/?name=Usuario&background=C6FF00&color=000",
          }}
          style={styles.avatar}
        />

        <Text style={styles.name}>Usuário</Text>
        <Text style={styles.email}>usuario@email.com</Text>
      </View>

      <TouchableOpacity style={styles.item}>
        <Ionicons name="document-text-outline" size={22} color={Colors.primary} />
        <Text style={styles.text}>Meus Relatos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Ionicons name="notifications-outline" size={22} color={Colors.primary} />
        <Text style={styles.text}>Notificações</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Ionicons name="settings-outline" size={22} color={Colors.primary} />
        <Text style={styles.text}>Configurações</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logout}>
        <Ionicons name="log-out-outline" size={22} color="#FFF" />
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },

  header: {
    alignItems: "center",
    marginVertical: 30,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 15,
  },

  name: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
  },

  email: {
    color: "#AAA",
    marginTop: 5,
  },

  item: {
    backgroundColor: Colors.surface,
    padding: 18,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  text: {
    color: "#FFF",
    marginLeft: 15,
    fontSize: 17,
  },

  logout: {
    marginTop: "auto",
    backgroundColor: "#E53935",
    padding: 18,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  logoutText: {
    color: "#FFF",
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
});