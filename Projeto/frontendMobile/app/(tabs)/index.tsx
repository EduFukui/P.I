import {
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";

import Header from "@/components/ui/Header";
import SearchBar from "@/components/ui/SearchBar";
import MapCard from "@/components/ui/MapCard";
import FloatingButton from "@/components/ui/FloatingButton";

import Colors from "@/constants/Colors";

export default function MapScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="MAPA" />

      <SearchBar />

      <View style={styles.mapContainer}>
        <MapCard />
      </View>

      <FloatingButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  mapContainer: {
    flex: 1,
    marginHorizontal: 18,
    marginBottom: 18,
    borderRadius: 20,
    overflow: "hidden",
  },
});