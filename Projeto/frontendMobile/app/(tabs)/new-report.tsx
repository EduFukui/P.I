import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

import { Ionicons } from "@expo/vector-icons";

import Colors from "@/constants/Colors";

export default function NewReportScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [description, setDescription] = useState("");

  const [address, setAddress] = useState(
    "Toque para obter localização"
  );

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  async function getLocation() {
    const permission =
      await Location.requestForegroundPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permissão negada",
        "Autorize a localização."
      );
      return;
    }

    const location =
      await Location.getCurrentPositionAsync({});

    setAddress(
      `${location.coords.latitude.toFixed(5)}, ${location.coords.longitude.toFixed(5)}`
    );
  }

  function publish() {
    Alert.alert(
      "Sucesso",
      "Relato publicado!"
    );
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>
        Novo Relato
      </Text>

      <Text style={styles.label}>
        Evidência Visual
      </Text>

      <TouchableOpacity
        style={styles.imageBox}
        onPress={pickImage}
      >
        {image ? (
          <Image
            source={{ uri: image }}
            style={styles.image}
          />
        ) : (
          <>
            <Ionicons
              name="camera"
              size={45}
              color={Colors.primary}
            />

            <Text style={styles.imageText}>
              Adicionar Foto
            </Text>
          </>
        )}
      </TouchableOpacity>

      <Text style={styles.label}>
        Descrição
      </Text>

      <TextInput
        multiline
        value={description}
        onChangeText={setDescription}
        placeholder="Descreva o problema..."
        placeholderTextColor="#777"
        style={styles.textArea}
      />

      <View style={styles.locationHeader}>
        <Text style={styles.label}>
          Localização
        </Text>

        <TouchableOpacity onPress={getLocation}>
          <Text style={styles.update}>
            Atualizar
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.locationBox}>
        <Ionicons
          name="location"
          size={20}
          color={Colors.primary}
        />

        <Text style={styles.address}>
          {address}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={publish}
      >
        <Text style={styles.buttonText}>
          PUBLICAR RELATO
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 18,
  },

  title: {
    color: Colors.white,
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  label: {
    color: Colors.primary,
    marginBottom: 10,
    fontWeight: "600",
  },

  imageBox: {
    height: 180,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderStyle: "dashed",
    borderRadius: 15,

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 20,
  },

  image: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },

  imageText: {
    color: Colors.primary,
    marginTop: 10,
  },

  textArea: {
    backgroundColor: Colors.surface,
    borderRadius: 15,
    color: "white",
    height: 140,
    padding: 15,
    textAlignVertical: "top",
    marginBottom: 20,
  },

  locationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  update: {
    color: Colors.primary,
    fontWeight: "bold",
  },

  locationBox: {
    backgroundColor: Colors.surface,
    borderRadius: 15,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },

  address: {
    color: Colors.white,
    marginLeft: 10,
    flex: 1,
  },

  button: {
    backgroundColor: Colors.primary,
    height: 58,
    borderRadius: 14,

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 40,
  },

  buttonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});