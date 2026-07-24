import { useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

import ReportMarkerCard from "@/components/ui/ReportMakerCard";

const reports = [
  {
    id: 1,
    title: "Buraco na Rua Acácias",
    description: "Buraco grande causando risco para veículos.",
    latitude: -29.754,
    longitude: -51.148,
    status: "Em aberto",
  },
  {
    id: 2,
    title: "Poste sem iluminação",
    description: "A rua fica totalmente escura durante a noite.",
    latitude: -29.756,
    longitude: -51.150,
    status: "Em andamento",
  },
];

export default function MapComponent() {
  const [selected, setSelected] = useState<any>(null);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -29.754,
          longitude: -51.148,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
        }}
      >
        {reports.map((report) => (
          <Marker
            key={report.id}
            coordinate={{
              latitude: report.latitude,
              longitude: report.longitude,
            }}
            pinColor="#B7FF00"
            onPress={() => setSelected(report)}
          />
        ))}
      </MapView>

      {selected && (
        <ReportMarkerCard report={selected} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});