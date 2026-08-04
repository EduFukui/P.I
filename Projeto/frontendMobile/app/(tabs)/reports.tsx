import { useCallback, useMemo, useState } from "react";
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";

import Header from "@/components/ui/Header";
import ReportCard from "@/components/ui/ReportCard";

import Colors from "@/constants/Colors";

import { getReports } from "@/services/reportService";
import { Report, ReportStatus } from "@/types/Report";

type FilterOption = "Todos" | ReportStatus;

const FILTERS: FilterOption[] = [
  "Todos",
  "Pendente",
  "Em andamento",
  "Resolvido",
];

export default function ReportsScreen() {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedStatus, setSelectedStatus] =
    useState<FilterOption>("Todos");

  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadReports();
    }, [])
  );

  async function loadReports() {
    try {
      const data = await getReports();
      setReports(data);
    } catch (error) {
      console.log("Erro ao carregar relatos:", error);
    }
  }

  async function handleRefresh() {
    try {
      setRefreshing(true);
      await loadReports();
    } finally {
      setRefreshing(false);
    }
  }

  const filteredReports = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return reports.filter((report) => {
      const matchesStatus =
        selectedStatus === "Todos" ||
        report.status === selectedStatus;

      const matchesSearch =
        normalizedSearch === "" ||
        report.title
          .toLowerCase()
          .includes(normalizedSearch) ||
        report.category
          .toLowerCase()
          .includes(normalizedSearch) ||
        report.description
          .toLowerCase()
          .includes(normalizedSearch) ||
        report.address
          .toLowerCase()
          .includes(normalizedSearch);

      return matchesStatus && matchesSearch;
    });
  }, [reports, search, selectedStatus]);

  function openReport(id: string) {
    router.push(`/report/${id}` as any);
  }

  function openNewReport() {
    router.push("/(tabs)/new-report");
  }

  function getFilterCount(filter: FilterOption) {
    if (filter === "Todos") {
      return reports.length;
    }

    return reports.filter(
      (report) => report.status === filter
    ).length;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="RELATOS" />

      <View style={styles.content}>
        <View style={styles.topArea}>
          <View>
            <Text style={styles.title}>
              Relatos da cidade
            </Text>

            <Text style={styles.subtitle}>
              Acompanhe os problemas enviados pela comunidade.
            </Text>
          </View>

          <View style={styles.totalBadge}>
            <Text style={styles.totalNumber}>
              {reports.length}
            </Text>

            <Text style={styles.totalLabel}>
              relatos
            </Text>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={21}
            color="#777"
          />

          <TextInput
            style={styles.searchInput}
            placeholder="Buscar relato..."
            placeholderTextColor="#666"
            value={search}
            onChangeText={setSearch}
            autoCorrect={false}
          />

          {search.length > 0 && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => setSearch("")}
            >
              <Ionicons
                name="close-circle"
                size={21}
                color="#777"
              />
            </TouchableOpacity>
          )}
        </View>

        <FlatList
          horizontal
          data={FILTERS}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filters}
          renderItem={({ item }) => {
            const selected = selectedStatus === item;

            return (
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  selected &&
                    styles.filterButtonSelected,
                ]}
                activeOpacity={0.8}
                onPress={() =>
                  setSelectedStatus(item)
                }
              >
                <Text
                  style={[
                    styles.filterText,
                    selected &&
                      styles.filterTextSelected,
                  ]}
                >
                  {item}
                </Text>

                <View
                  style={[
                    styles.filterCount,
                    selected &&
                      styles.filterCountSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.filterCountText,
                      selected &&
                        styles.filterCountTextSelected,
                    ]}
                  >
                    {getFilterCount(item)}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />

        <FlatList
          data={filteredReports}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.list,
            filteredReports.length === 0 &&
              styles.emptyList,
          ]}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={Colors.primary}
              colors={[Colors.primary]}
              progressBackgroundColor={Colors.surface}
            />
          }
          renderItem={({ item }) => (
            <ReportCard
              title={item.title}
              description={item.description}
              image={item.image}
              status={item.status}
              date={item.createdAt}
              onPress={() => openReport(item.id)}
            />
          )}
          ListHeaderComponent={
            filteredReports.length > 0 ? (
              <View style={styles.listHeader}>
                <Text style={styles.listHeaderText}>
                  {filteredReports.length}{" "}
                  {filteredReports.length === 1
                    ? "resultado"
                    : "resultados"}
                </Text>

                <Ionicons
                  name="options-outline"
                  size={19}
                  color="#777"
                />
              </View>
            ) : null
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIcon}>
                <Ionicons
                  name="document-text-outline"
                  size={42}
                  color={Colors.primary}
                />
              </View>

              <Text style={styles.emptyTitle}>
                Nenhum relato encontrado
              </Text>

              <Text style={styles.emptyText}>
                {search || selectedStatus !== "Todos"
                  ? "Tente alterar a busca ou selecionar outro filtro."
                  : "Ainda não existem relatos cadastrados."}
              </Text>

              {!search &&
                selectedStatus === "Todos" && (
                  <TouchableOpacity
                    style={styles.emptyButton}
                    activeOpacity={0.8}
                    onPress={openNewReport}
                  >
                    <Ionicons
                      name="add"
                      size={21}
                      color="#000"
                    />

                    <Text style={styles.emptyButtonText}>
                      CRIAR PRIMEIRO RELATO
                    </Text>
                  </TouchableOpacity>
                )}
            </View>
          }
        />
      </View>

      <TouchableOpacity
        style={styles.floatingButton}
        activeOpacity={0.85}
        onPress={openNewReport}
      >
        <Ionicons
          name="add"
          size={31}
          color="#000"
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    flex: 1,
  },

  topArea: {
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    color: "#FFFFFF",
    fontSize: 27,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#888",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 5,
    maxWidth: 260,
  },

  totalBadge: {
    minWidth: 63,
    height: 63,
    borderRadius: 18,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: "#292929",
    alignItems: "center",
    justifyContent: "center",
  },

  totalNumber: {
    color: Colors.primary,
    fontSize: 21,
    fontWeight: "bold",
  },

  totalLabel: {
    color: "#777",
    fontSize: 11,
    marginTop: 1,
  },

  searchContainer: {
    height: 56,
    marginHorizontal: 18,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#292929",
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
  },

  searchInput: {
    flex: 1,
    height: 56,
    color: "#FFF",
    fontSize: 16,
    marginLeft: 10,
  },

  clearButton: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
  },

  filters: {
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 17,
    gap: 9,
  },

  filterButton: {
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: "#2E2E2E",
    paddingLeft: 15,
    paddingRight: 8,
    flexDirection: "row",
    alignItems: "center",
  },

  filterButtonSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },

  filterText: {
    color: "#AAA",
    fontSize: 13,
    fontWeight: "600",
  },

  filterTextSelected: {
    color: "#000",
  },

  filterCount: {
    minWidth: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: "#292929",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
    paddingHorizontal: 6,
  },

  filterCountSelected: {
    backgroundColor: "rgba(0,0,0,0.14)",
  },

  filterCountText: {
    color: "#AAA",
    fontSize: 11,
    fontWeight: "bold",
  },

  filterCountTextSelected: {
    color: "#000",
  },

  list: {
    paddingBottom: 120,
  },

  emptyList: {
    flexGrow: 1,
  },

  listHeader: {
    paddingHorizontal: 18,
    paddingBottom: 13,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  listHeaderText: {
    color: "#777",
    fontSize: 13,
    fontWeight: "600",
  },

  emptyContainer: {
    flex: 1,
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 80,
  },

  emptyIcon: {
    width: 86,
    height: 86,
    borderRadius: 27,
    backgroundColor: "rgba(198,255,0,0.08)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  emptyTitle: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  emptyText: {
    color: "#888",
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
    marginTop: 8,
    maxWidth: 290,
  },

  emptyButton: {
    height: 52,
    borderRadius: 15,
    backgroundColor: Colors.primary,
    paddingHorizontal: 19,
    marginTop: 23,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },

  emptyButtonText: {
    color: "#000",
    fontSize: 13,
    fontWeight: "bold",
  },

  floatingButton: {
    position: "absolute",
    right: 21,
    bottom: 88,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
});