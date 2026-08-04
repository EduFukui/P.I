import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { useLocalSearchParams, router } from "expo-router";

import * as ImagePicker from "expo-image-picker";

import Colors from "@/constants/Colors";

import {
  getReportById,
  updateReport,
} from "@/services/reportService";

import { Report } from "@/types/Report";

export default function EditReport() {
  const { id } = useLocalSearchParams();

  const [report, setReport] =
    useState<Report | null>(null);

  const [title, setTitle] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [image, setImage] =
    useState("");

  useEffect(() => {
    loadReport();
  }, []);

  async function loadReport() {
    const data = await getReportById(
      String(id)
    );

    if (!data) {
      Alert.alert(
        "Erro",
        "Relato não encontrado."
      );

      router.back();

      return;
    }

    setReport(data);

    setTitle(data.title);

    setCategory(data.category);

    setDescription(data.description);

    setImage(data.image);
  }

  async function pickImage() {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) return;

    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes:
          ImagePicker.MediaTypeOptions.Images,

        quality: 0.8,
      });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }  async function handleSave() {
    if (
      title.trim() === "" ||
      category.trim() === "" ||
      description.trim() === ""
    ) {
      Alert.alert(
        "Erro",
        "Preencha todos os campos."
      );
      return;
    }

    if (!report) return;

    const updatedReport: Report = {
      ...report,
      title,
      category,
      description,
      image,
    };

    await updateReport(updatedReport);

    Alert.alert(
      "Sucesso",
      "Relato atualizado com sucesso!",
      [
        {
          text: "OK",
          onPress: () =>
            router.replace(
              `/report/${report.id}`
            ),
        },
      ]
    );
  }

  if (!report) return null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>
          Editar Relato
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Título"
          placeholderTextColor="#777"
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={styles.input}
          placeholder="Categoria"
          placeholderTextColor="#777"
          value={category}
          onChangeText={setCategory}
        />

        <TextInput
          style={[
            styles.input,
            {
              height: 140,
            },
          ]}
          multiline
          textAlignVertical="top"
          placeholder="Descrição"
          placeholderTextColor="#777"
          value={description}
          onChangeText={setDescription}
        />

        <TouchableOpacity
          style={styles.imageButton}
          onPress={pickImage}
        >
          <Text style={styles.imageButtonText}>
            Alterar Foto
          </Text>
        </TouchableOpacity>

        {image !== "" && (
          <Image
            source={{ uri: image }}
            style={styles.image}
          />
        )}

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.saveText}>
            SALVAR ALTERAÇÕES
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.background,
      padding: 20,
    },
  
    title: {
      color: "#FFF",
      fontSize: 30,
      fontWeight: "bold",
      marginBottom: 25,
    },
  
    input: {
      backgroundColor: Colors.surface,
      color: "#FFF",
      borderRadius: 14,
      paddingHorizontal: 16,
      paddingVertical: 16,
      fontSize: 16,
      marginBottom: 18,
    },
  
    imageButton: {
      backgroundColor: Colors.primary,
      height: 55,
      borderRadius: 14,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20,
    },
  
    imageButtonText: {
      color: "#000",
      fontWeight: "bold",
      fontSize: 16,
    },
  
    image: {
      width: "100%",
      height: 220,
      borderRadius: 16,
      marginBottom: 20,
    },
  
    saveButton: {
      backgroundColor: Colors.primary,
      height: 58,
      borderRadius: 14,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 40,
    },
  
    saveText: {
      color: "#000",
      fontWeight: "bold",
      fontSize: 16,
    },
  });