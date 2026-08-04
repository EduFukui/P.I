import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

import Header from "@/components/ui/Header";
import Colors from "@/constants/Colors";

import { getLoggedUser } from "@/services/authService";
import { saveReport } from "@/services/reportService";

import { Report } from "@/types/Report";

import generateId from "@/utils/generateId";
import getCurrentDate from "@/utils/getCurrentDate";

const CATEGORIES = [
  "Buraco",
  "Iluminação",
  "Lixo",
  "Trânsito",
  "Calçada",
  "Outro",
];

export default function NewReportScreen() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const [image, setImage] = useState("");
  const [address, setAddress] = useState(
    "Localização ainda não capturada"
  );

  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const [loadingLocation, setLoadingLocation] = useState(false);
  const [publishing, setPublishing] = useState(false);

  function chooseImageSource() {
    Alert.alert(
      "Adicionar foto",
      "Escolha de onde deseja adicionar a imagem.",
      [
        {
          text: "Câmera",
          onPress: takePhoto,
        },
        {
          text: "Galeria",
          onPress: pickImage,
        },
        {
          text: "Cancelar",
          style: "cancel",
        },
      ]
    );
  }

  async function takePhoto() {
    try {
      const permission =
        await ImagePicker.requestCameraPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Permissão necessária",
          "Permita o acesso à câmera para tirar uma foto."
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        quality: 0.8,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log("Erro ao abrir câmera:", error);

      Alert.alert(
        "Erro",
        "Não foi possível abrir a câmera."
      );
    }
  }

  async function pickImage() {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Permissão necessária",
          "Permita o acesso à galeria para escolher uma foto."
        );
        return;
      }

      const result =
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ["images"],
          allowsEditing: true,
          quality: 0.8,
        });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log("Erro ao abrir galeria:", error);

      Alert.alert(
        "Erro",
        "Não foi possível abrir a galeria."
      );
    }
  }

  async function getLocation() {
    try {
      setLoadingLocation(true);

      const permission =
        await Location.requestForegroundPermissionsAsync();

      if (permission.status !== "granted") {
        Alert.alert(
          "Permissão necessária",
          "Permita o acesso à localização para registrar o local do problema."
        );
        return;
      }

      const current =
        await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

      const currentLatitude = current.coords.latitude;
      const currentLongitude = current.coords.longitude;

      setLatitude(currentLatitude);
      setLongitude(currentLongitude);

      const addresses =
        await Location.reverseGeocodeAsync({
          latitude: currentLatitude,
          longitude: currentLongitude,
        });

      if (addresses.length > 0) {
        const place = addresses[0];

        const formattedAddress = [
          place.street,
          place.streetNumber,
          place.district,
          place.city,
          place.region,
        ]
          .filter(Boolean)
          .join(", ");

        setAddress(
          formattedAddress || "Localização atual capturada"
        );
      } else {
        setAddress("Localização atual capturada");
      }
    } catch (error) {
      console.log("Erro ao buscar localização:", error);

      Alert.alert(
        "Erro",
        "Não foi possível capturar sua localização."
      );
    } finally {
      setLoadingLocation(false);
    }
  }

  async function createReport() {
    if (!title.trim()) {
      Alert.alert(
        "Título obrigatório",
        "Digite um título para o relato."
      );
      return;
    }

    if (!category) {
      Alert.alert(
        "Categoria obrigatória",
        "Escolha uma categoria."
      );
      return;
    }

    if (!description.trim()) {
      Alert.alert(
        "Descrição obrigatória",
        "Descreva o problema encontrado."
      );
      return;
    }

    if (!image) {
      Alert.alert(
        "Foto obrigatória",
        "Adicione uma foto do problema."
      );
      return;
    }

    if (latitude === null || longitude === null) {
      Alert.alert(
        "Localização obrigatória",
        "Capture a localização do problema antes de publicar."
      );
      return;
    }

    try {
      setPublishing(true);

      const user = await getLoggedUser();

      if (!user) {
        Alert.alert(
          "Sessão encerrada",
          "Faça login novamente para enviar um relato."
        );

        router.replace("/login");
        return;
      }

      const report: Report = {
        id: generateId(),
        title: title.trim(),
        category,
        description: description.trim(),
        image,
        latitude,
        longitude,
        address,
        status: "Pendente",
        createdAt: getCurrentDate(),
        userId: user.id,
        userName: user.name,
      };

      await saveReport(report);

      setTitle("");
      setCategory("");
      setDescription("");
      setImage("");
      setAddress("Localização ainda não capturada");
      setLatitude(null);
      setLongitude(null);

      Alert.alert(
        "Relato publicado",
        "Seu relato foi enviado com sucesso.",
        [
          {
            text: "Ver relatos",
            onPress: () =>
              router.replace("/(tabs)/reports"),
          },
        ]
      );
    } catch (error) {
      console.log("Erro ao publicar relato:", error);

      Alert.alert(
        "Erro",
        "Não foi possível publicar o relato."
      );
    } finally {
      setPublishing(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="NOVO RELATO" />

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.intro}>
          <View style={styles.introIcon}>
            <Ionicons
              name="megaphone-outline"
              size={26}
              color="#000"
            />
          </View>

          <View style={styles.introTextBox}>
            <Text style={styles.introTitle}>
              Encontrou um problema?
            </Text>

            <Text style={styles.introText}>
              Envie as informações abaixo para registrar o relato.
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>
          Informações do problema
        </Text>

        <Text style={styles.label}>Título</Text>

        <View style={styles.inputContainer}>
          <Ionicons
            name="create-outline"
            size={21}
            color="#777"
          />

          <TextInput
            style={styles.input}
            placeholder="Ex.: Buraco grande na rua"
            placeholderTextColor="#666"
            value={title}
            onChangeText={setTitle}
            maxLength={70}
          />
        </View>

        <Text style={styles.counter}>
          {title.length}/70
        </Text>

        <Text style={styles.label}>Categoria</Text>

        <View style={styles.categories}>
          {CATEGORIES.map((item) => {
            const selected = category === item;

            return (
              <TouchableOpacity
                key={item}
                activeOpacity={0.8}
                style={[
                  styles.categoryButton,
                  selected && styles.categoryButtonSelected,
                ]}
                onPress={() => setCategory(item)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selected && styles.categoryTextSelected,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.label}>Descrição</Text>

        <View style={styles.descriptionContainer}>
          <TextInput
            style={styles.descriptionInput}
            placeholder="Explique onde está o problema e quais riscos ele causa..."
            placeholderTextColor="#666"
            multiline
            textAlignVertical="top"
            maxLength={500}
            value={description}
            onChangeText={setDescription}
          />

          <Text style={styles.descriptionCounter}>
            {description.length}/500
          </Text>
        </View>

        <Text style={styles.sectionTitle}>
          Evidência visual
        </Text>

        {image ? (
          <View style={styles.imagePreviewContainer}>
            <Image
              source={{ uri: image }}
              style={styles.imagePreview}
            />

            <View style={styles.imageActions}>
              <TouchableOpacity
                style={styles.changeImageButton}
                onPress={chooseImageSource}
              >
                <Ionicons
                  name="camera-outline"
                  size={20}
                  color="#000"
                />

                <Text style={styles.changeImageText}>
                  Alterar foto
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.removeImageButton}
                onPress={() => setImage("")}
              >
                <Ionicons
                  name="trash-outline"
                  size={21}
                  color="#FFF"
                />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.photoBox}
            activeOpacity={0.8}
            onPress={chooseImageSource}
          >
            <View style={styles.photoIcon}>
              <Ionicons
                name="camera-outline"
                size={31}
                color={Colors.primary}
              />
            </View>

            <Text style={styles.photoTitle}>
              Adicionar uma foto
            </Text>

            <Text style={styles.photoDescription}>
              Tire uma foto ou escolha uma imagem da galeria
            </Text>
          </TouchableOpacity>
        )}

        <Text style={styles.sectionTitle}>
          Localização
        </Text>

        <View style={styles.locationCard}>
          <View style={styles.locationIcon}>
            <Ionicons
              name={
                latitude !== null
                  ? "location"
                  : "location-outline"
              }
              size={25}
              color={Colors.primary}
            />
          </View>

          <View style={styles.locationTextBox}>
            <Text style={styles.locationTitle}>
              {latitude !== null
                ? "Localização capturada"
                : "Localização necessária"}
            </Text>

            <Text style={styles.locationAddress}>
              {address}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.locationButton}
          activeOpacity={0.8}
          disabled={loadingLocation}
          onPress={getLocation}
        >
          {loadingLocation ? (
            <ActivityIndicator color="#000" />
          ) : (
            <>
              <Ionicons
                name="locate-outline"
                size={21}
                color="#000"
              />

              <Text style={styles.locationButtonText}>
                {latitude !== null
                  ? "ATUALIZAR LOCALIZAÇÃO"
                  : "USAR MINHA LOCALIZAÇÃO"}
              </Text>
            </>
          )}
        </TouchableOpacity>

        <View style={styles.warningBox}>
          <Ionicons
            name="information-circle-outline"
            size={22}
            color={Colors.primary}
          />

          <Text style={styles.warningText}>
            Verifique se as informações estão corretas antes de
            publicar.
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.publishButton,
            publishing && styles.disabledButton,
          ]}
          disabled={publishing}
          activeOpacity={0.8}
          onPress={createReport}
        >
          {publishing ? (
            <ActivityIndicator color="#000" />
          ) : (
            <>
              <Ionicons
                name="send"
                size={20}
                color="#000"
              />

              <Text style={styles.publishButtonText}>
                PUBLICAR RELATO
              </Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    paddingHorizontal: 18,
    paddingBottom: 50,
  },

  intro: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 28,
  },

  introIcon: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  introTextBox: {
    flex: 1,
    marginLeft: 14,
  },

  introTitle: {
    color: "#FFF",
    fontSize: 17,
    fontWeight: "bold",
  },

  introText: {
    color: "#999",
    fontSize: 13,
    lineHeight: 19,
    marginTop: 4,
  },

  sectionTitle: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 5,
  },

  label: {
    color: "#BBB",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 9,
  },

  inputContainer: {
    minHeight: 58,
    backgroundColor: Colors.surface,
    borderRadius: 15,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#292929",
  },

  input: {
    flex: 1,
    height: 58,
    color: "#FFF",
    fontSize: 16,
    marginLeft: 10,
  },

  counter: {
    color: "#666",
    textAlign: "right",
    fontSize: 12,
    marginTop: 6,
    marginBottom: 20,
  },

  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 9,
    marginBottom: 23,
  },

  categoryButton: {
    backgroundColor: Colors.surface,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#303030",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },

  categoryButtonSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },

  categoryText: {
    color: "#AAA",
    fontSize: 14,
    fontWeight: "600",
  },

  categoryTextSelected: {
    color: "#000",
  },

  descriptionContainer: {
    minHeight: 155,
    backgroundColor: Colors.surface,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#292929",
    padding: 15,
    marginBottom: 28,
  },

  descriptionInput: {
    minHeight: 112,
    color: "#FFF",
    fontSize: 16,
    lineHeight: 23,
  },

  descriptionCounter: {
    color: "#666",
    textAlign: "right",
    fontSize: 12,
    marginTop: 5,
  },

  photoBox: {
    height: 190,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: "#4A4A4A",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.surface,
    marginBottom: 28,
  },

  photoIcon: {
    width: 62,
    height: 62,
    borderRadius: 20,
    backgroundColor: "rgba(198,255,0,0.09)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  photoTitle: {
    color: "#FFF",
    fontSize: 17,
    fontWeight: "bold",
  },

  photoDescription: {
    color: "#777",
    fontSize: 13,
    marginTop: 6,
    textAlign: "center",
  },

  imagePreviewContainer: {
    marginBottom: 28,
  },

  imagePreview: {
    width: "100%",
    height: 225,
    borderRadius: 18,
  },

  imageActions: {
    flexDirection: "row",
    marginTop: 11,
    gap: 10,
  },

  changeImageButton: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  changeImageText: {
    color: "#000",
    fontWeight: "bold",
  },

  removeImageButton: {
    width: 50,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#E53935",
    alignItems: "center",
    justifyContent: "center",
  },

  locationCard: {
    minHeight: 88,
    backgroundColor: Colors.surface,
    borderRadius: 17,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#292929",
  },

  locationIcon: {
    width: 49,
    height: 49,
    borderRadius: 15,
    backgroundColor: "rgba(198,255,0,0.09)",
    alignItems: "center",
    justifyContent: "center",
  },

  locationTextBox: {
    flex: 1,
    marginLeft: 13,
  },

  locationTitle: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "bold",
  },

  locationAddress: {
    color: "#888",
    fontSize: 13,
    lineHeight: 19,
    marginTop: 4,
  },

  locationButton: {
    height: 54,
    borderRadius: 15,
    marginTop: 12,
    marginBottom: 26,
    backgroundColor: Colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  locationButtonText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "bold",
  },

  warningBox: {
    padding: 14,
    borderRadius: 15,
    backgroundColor: "rgba(198,255,0,0.07)",
    borderWidth: 1,
    borderColor: "rgba(198,255,0,0.18)",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  warningText: {
    flex: 1,
    color: "#AAA",
    fontSize: 13,
    lineHeight: 19,
    marginLeft: 10,
  },

  publishButton: {
    height: 60,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
  },

  publishButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },

  disabledButton: {
    opacity: 0.55,
  },
});