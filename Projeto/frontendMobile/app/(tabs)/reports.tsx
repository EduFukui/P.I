import { useMemo, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
} from "react-native";

import Header from "@/components/ui/Header";
import StatusFilter from "@/components/ui/StatusFilter";
import ReportCard from "@/components/ui/ReportCard";
import FloatingButton from "@/components/ui/FloatingButton";

import Colors from "@/constants/Colors";

const reports = [
  {
    id: "1",
    title: "Buraco na Rua Principal",
    description:
      "Grande buraco dificultando a passagem de veículos.",
    status: "Em aberto",
  },
  {
    id: "2",
    title: "Poste sem iluminação",
    description:
      "Rua escura durante a noite.",
    status: "Em andamento",
  },
  {
    id: "3",
    title: "Lixo acumulado",
    description:
      "Muito lixo na praça central.",
    status: "Resolvido",
  },
];

export default function ReportsScreen() {
  const [selected, setSelected] =
    useState("Todos");

  const filtered = useMemo(() => {
    if (selected === "Todos") {
      return reports;
    }

    return reports.filter(
      (item) => item.status === selected
    );
  }, [selected]);

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <StatusFilter
        selected={selected}
        onSelect={setSelected}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ReportCard
            title={item.title}
            description={item.description}
            status={item.status}
          />
        )}
        showsVerticalScrollIndicator={false}
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
});