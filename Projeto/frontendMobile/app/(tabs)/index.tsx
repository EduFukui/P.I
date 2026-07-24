import { SafeAreaView, StyleSheet, View } from "react-native";

import Header from "@/components/ui/Header";
import SearchBar from "@/components/ui/SearchBar";
import MapComponent from "@/components/ui/MapComponent";
import FloatingButton from "@/components/ui/FloatingButton";

import Colors from "@/constants/Colors";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <SearchBar />

      <View style={styles.mapContainer}>
        <MapComponent />
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