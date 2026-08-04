import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { router, useLocalSearchParams } from "expo-router";

import Colors from "@/constants/Colors";
import {
  deleteReport,
  getReportById,
} from "@/services/reportService";
import { Report } from "@/types/Report";

export default function ReportDetails() {
  const { id } = useLocalSearchParams<{ id?: string }>();

  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReport();
  }, [id]);

  async function loadReport() {
    try {
      setLoading(true);

      if (!id) {
        Alert.alert("Erro", "ID do relato não encontrado.");
        router.back();
        return;
      }

      const data = await getReportById(id);

      if (!data) {
        Alert.alert("Erro", "Relato não encontrado.");
        router.back();
        return;
      }

      setReport(data);
    } catch (error) {
      console.log("Erro ao carregar relato:", error);

      Alert.alert(
        "Erro",
        "Não foi possível carregar o relato."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleEdit() {
    if (!report) {
      return;
    }

    router.push(
      `/report/edit?id=${encodeURIComponent(report.id)}` as any
    );
  }

  function handleDelete() {
    if (!report) {
      return;
    }

    Alert.alert(
      "Excluir relato",
      "Deseja realmente excluir este relato?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteReport(report.id);

              Alert.alert(
                "Sucesso",
                "Relato excluído com sucesso.",
                [
                  {
                    text: "OK",
                    onPress: () =>
                      router.replace("/(tabs)/reports"),
                  },
                ]
              );
            } catch (error) {
              console.log("Erro ao excluir relato:", error);

              Alert.alert(
                "Erro",
                "Não foi possível excluir o relato."
              );
            }
          },
        },
      ]
    );
  }

  function getStatusColor() {
    if (!report) {
      return Colors.danger;
    }

    switch (report.status) {
      case "Resolvido":
        return Colors.success;

      case "Em andamento":
        return Colors.warning;

      case "Pendente":
      default:
        return Colors.danger;
    }
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color={Colors.primary}
        />

        <Text style={styles.loadingText}>
          Carregando relato...
        </Text>
      </View>
    );
  }

  if (!report) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {report.image ? (
          <Image
            source={{ uri: report.image }}
            style={styles.image}
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>
              Sem imagem
            </Text>
          </View>
        )}

        <Text style={styles.title}>
          {report.title}
        </Text>

        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor: getStatusColor(),
            },
          ]}
        >
          <Text style={styles.statusText}>
            {report.status}
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.label}>
            Categoria
          </Text>

          <Text style={styles.value}>
            {report.category}
          </Text>

          <Text style={styles.label}>
            Descrição
          </Text>

          <Text style={styles.value}>
            {report.description}
          </Text>

          <Text style={styles.label}>
            Endereço
          </Text>

          <Text style={styles.value}>
            {report.address}
          </Text>

          <Text style={styles.label}>
            Criado em
          </Text>

          <Text style={styles.value}>
            {report.createdAt}
          </Text>

          <Text style={styles.label}>
            Autor
          </Text>

          <Text style={styles.value}>
            {report.userName}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.editButton}
          activeOpacity={0.8}
          onPress={handleEdit}
        >
          <Text style={styles.editButtonText}>
            EDITAR RELATO
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          activeOpacity={0.8}
          onPress={handleDelete}
        >
          <Text style={styles.deleteButtonText}>
            EXCLUIR RELATO
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
  },

  content: {
    paddingBottom: 40,
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    color: "#AAAAAA",
    fontSize: 15,
    marginTop: 12,
  },

  image: {
    width: "100%",
    height: 250,
  },

  imagePlaceholder: {
    width: "100%",
    height: 250,
    backgroundColor: Colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },

  imagePlaceholderText: {
    color: "#888888",
    fontSize: 16,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginTop: 20,
  },

  statusBadge: {
    alignSelf: "flex-start",
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 12,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },

  statusText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },

  infoCard: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    marginHorizontal: 20,
    marginTop: 22,
    padding: 18,
  },

  label: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 16,
  },

  value: {
    color: "#FFFFFF",
    fontSize: 17,
    lineHeight: 24,
    marginTop: 6,
  },

  editButton: {
    backgroundColor: Colors.primary,
    height: 55,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 30,
  },

  editButtonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },

  deleteButton: {
    backgroundColor: "#E53935",
    height: 55,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 15,
  },

  deleteButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});