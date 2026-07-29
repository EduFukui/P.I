import React, { useMemo, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";

import Header from "@/components/ui/Header";
import StatusFilter from "@/components/ui/StatusFilter";
import ReportCard from "@/components/ui/ReportCard";
import FloatingButton from "@/components/ui/FloatingButton";

import Colors from "@/constants/Colors";
import reports from "@/data/reports";

export default function ReportsScreen() {
  const [selectedStatus, setSelectedStatus] = useState("Todos");

  const filteredReports = useMemo(() => {
    if (selectedStatus === "Todos") {
      return reports;
    }

    return reports.filter(
      (report) => report.status === selectedStatus
    );
  }, [selectedStatus]);

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <View style={styles.headerArea}>
        <Text style={styles.title}>Relatos</Text>

        <Text style={styles.subtitle}>
          Acompanhe todos os relatos enviados.
        </Text>
      </View>

      <StatusFilter
        selected={selectedStatus}
        onSelect={setSelectedStatus}
      />

      <FlatList
        data={filteredReports}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ReportCard
            title={item.title}
            description={item.description}
            image={item.image}
            status={item.status}
            date={item.date}
            onPress={() =>
              router.push(`/report/${item.id}` as any)
            }
          />
        )}
      />

      <FloatingButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  headerArea: {
    paddingHorizontal: 20,
    marginTop: 15,
    marginBottom: 20,
  },

  title: {
    color: Colors.white,
    fontSize: 30,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#999",
    marginTop: 6,
    fontSize: 15,
  },

  list: {
    paddingBottom: 120,
  },
});