import { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import Colors from "@/constants/Colors";
import {
  getLoggedUser,
  logoutUser,
  User,
} from "@/services/authService";

type HeaderProps = {
  title?: string;
};

type MenuItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  danger?: boolean;
};

function MenuItem({
  icon,
  label,
  onPress,
  danger = false,
}: MenuItemProps) {
  return (
    <TouchableOpacity
      style={styles.menuItem}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View
        style={[
          styles.menuIconBox,
          danger && styles.dangerIconBox,
        ]}
      >
        <Ionicons
          name={icon}
          size={22}
          color={danger ? "#FF5252" : Colors.primary}
        />
      </View>

      <Text
        style={[
          styles.menuItemText,
          danger && styles.dangerText,
        ]}
      >
        {label}
      </Text>

      {!danger && (
        <Ionicons
          name="chevron-forward"
          size={19}
          color="#666"
        />
      )}
    </TouchableOpacity>
  );
}

export default function Header({
  title = "RECLAMA SL",
}: HeaderProps) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    const loggedUser = await getLoggedUser();
    setUser(loggedUser);
  }

  function closeAndNavigate(path: string) {
    setMenuVisible(false);

    setTimeout(() => {
      router.push(path as never);
    }, 150);
  }

  function handleLogout() {
    Alert.alert(
      "Sair da conta",
      "Deseja realmente sair da sua conta?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sair",
          style: "destructive",
          onPress: async () => {
            await logoutUser();
            setMenuVisible(false);
            router.replace("/login");
          },
        },
      ]
    );
  }

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            activeOpacity={0.7}
            onPress={() => setMenuVisible(true)}
          >
            <Ionicons
              name="menu"
              size={32}
              color={Colors.primary}
            />
          </TouchableOpacity>

          <View style={styles.titleContainer}>
            <Text numberOfLines={1} style={styles.headerTitle}>
              {title}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.headerButton}
            activeOpacity={0.7}
            onPress={() => router.push("/profile")}
          >
            <Ionicons
              name="person-circle-outline"
              size={35}
              color={Colors.primary}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setMenuVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Pressable
            style={styles.overlay}
            onPress={() => setMenuVisible(false)}
          />

          <SafeAreaView style={styles.drawer}>
            <View style={styles.drawerHeader}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setMenuVisible(false)}
              >
                <Ionicons
                  name="close"
                  size={27}
                  color="#FFF"
                />
              </TouchableOpacity>

              <View style={styles.avatar}>
                <Ionicons
                  name="person"
                  size={34}
                  color="#000"
                />
              </View>

              <Text style={styles.userName}>
                {user?.name || "Usuário"}
              </Text>

              <Text style={styles.userEmail}>
                {user?.email || "Conta não identificada"}
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.menuContent}>
              <MenuItem
                icon="map-outline"
                label="Mapa"
                onPress={() =>
                  closeAndNavigate("/(tabs)")
                }
              />

              <MenuItem
                icon="document-text-outline"
                label="Relatos"
                onPress={() =>
                  closeAndNavigate("/(tabs)/reports")
                }
              />

              <MenuItem
                icon="add-circle-outline"
                label="Novo Relato"
                onPress={() =>
                  closeAndNavigate("/(tabs)/new-report")
                }
              />

              <MenuItem
                icon="person-outline"
                label="Perfil"
                onPress={() =>
                  closeAndNavigate("/profile")
                }
              />

              <MenuItem
                icon="document-lock-outline"
                label="Termos de Uso"
                onPress={() =>
                  closeAndNavigate("/terms")
                }
              />

              <MenuItem
                icon="information-circle-outline"
                label="Sobre"
                onPress={() =>
                  Alert.alert(
                    "Reclama SL",
                    "Aplicativo para registrar e acompanhar problemas urbanos de São Leopoldo."
                  )
                }
              />
            </View>

            <View style={styles.logoutArea}>
              <MenuItem
                icon="log-out-outline"
                label="Sair"
                danger
                onPress={handleLogout}
              />
            </View>

            <Text style={styles.version}>
              Reclama SL • Versão 1.0
            </Text>
          </SafeAreaView>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.background,
  },

  header: {
    height: 72,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.background,
  },

  headerButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  titleContainer: {
    minWidth: 150,
    minHeight: 44,
    paddingHorizontal: 22,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
  },

  headerTitle: {
    color: "#000",
    fontSize: 18,
    fontWeight: "800",
  },

  modalContainer: {
    flex: 1,
    flexDirection: "row",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.62)",
  },

  drawer: {
    width: "82%",
    maxWidth: 340,
    height: "100%",
    backgroundColor: "#171717",
    elevation: 20,
  },

  drawerHeader: {
    paddingHorizontal: 22,
    paddingTop: 16,
    paddingBottom: 22,
  },

  closeButton: {
    alignSelf: "flex-end",
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
  },

  avatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 14,
  },

  userName: {
    color: "#FFF",
    fontSize: 21,
    fontWeight: "bold",
  },

  userEmail: {
    color: "#888",
    fontSize: 14,
    marginTop: 5,
  },

  divider: {
    height: 1,
    backgroundColor: "#2A2A2A",
  },

  menuContent: {
    paddingTop: 12,
    paddingHorizontal: 12,
  },

  menuItem: {
    minHeight: 58,
    paddingHorizontal: 10,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },

  menuIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(198,255,0,0.09)",
    alignItems: "center",
    justifyContent: "center",
  },

  dangerIconBox: {
    backgroundColor: "rgba(255,82,82,0.10)",
  },

  menuItemText: {
    flex: 1,
    color: "#F4F4F4",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 14,
  },

  dangerText: {
    color: "#FF5252",
  },

  logoutArea: {
    marginTop: "auto",
    marginHorizontal: 12,
    borderTopWidth: 1,
    borderTopColor: "#292929",
    paddingTop: 10,
  },

  version: {
    color: "#555",
    textAlign: "center",
    fontSize: 12,
    marginVertical: 16,
  },
});