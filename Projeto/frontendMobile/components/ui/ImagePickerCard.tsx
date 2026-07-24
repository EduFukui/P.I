import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import COLORS from "@/constants/Colors";

export default function ImagePickerCard() {
  const [image, setImage] = useState("");

  async function pickImage() {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={pickImage}
    >
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <Text style={styles.text}>
          Clique para adicionar uma foto
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 220,
    backgroundColor: COLORS.card,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 20,
  },

  text: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: "600",
  },

  image: {
    width: "100%",
    height: "100%",
  },
});