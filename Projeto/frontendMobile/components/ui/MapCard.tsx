import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import MapView, {
  Callout,
  Marker,
  Region,
} from "react-native-maps";

import * as Location from "expo-location";
import { router, useFocusEffect } from "expo-router";

import Colors from "@/constants/Colors";
import { getReports } from "@/services/reportService";
import { Report } from "@/types/Report";

const DEFAULT_REGION: Region = {
  latitude: -29.754,
  longitude: -51.149,
  latitudeDelta: 0.03,
  longitudeDelta: 0.03,
};

export default function MapCard() {
  const mapRef = useRef<MapView>(null);

  const [region, setRegion] =
    useState<Region>(DEFAULT_REGION);

  const [reports, setReports] =
    useState<Report[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [locationGranted, setLocationGranted] =
    useState(false);

  useEffect(() => {
    loadCurrentLocation();
  }, []);

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
      console.log(
        "Erro ao carregar relatos:",
        error
      );
    }
  }

  async function loadCurrentLocation() {
    try {
      setLoading(true);

      const permission =
        await Location.requestForegroundPermissionsAsync();

      if (
        permission.status !==
        "granted"
      ) {
        setLocationGranted(false);
        setRegion(DEFAULT_REGION);

        Alert.alert(
          "Localização",
          "A localização não foi permitida. O mapa será aberto em São Leopoldo."
        );

        return;
      }

      setLocationGranted(true);

      const current =
        await Location.getCurrentPositionAsync({
          accuracy:
            Location.Accuracy.Balanced,
        });

      const newRegion: Region = {
        latitude:
          current.coords.latitude,

        longitude:
          current.coords.longitude,

        latitudeDelta: 0.02,

        longitudeDelta: 0.02,
      };

      setRegion(newRegion);

      mapRef.current?.animateToRegion(
        newRegion,
        800
      );
    } catch (error) {
      console.log(
        "Erro ao buscar localização:",
        error
      );

      setRegion(DEFAULT_REGION);
    } finally {
      setLoading(false);
    }
  }

  function getMarkerColor(
    status: Report["status"]
  ) {
    switch (status) {
      case "Resolvido":
        return Colors.success;

      case "Em andamento":
        return Colors.warning;

      case "Pendente":
      default:
        return Colors.danger;
    }
  }

  function openReport(id: string) {
    router.push(
      `/report/${id}` as any
    );
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color={Colors.primary}
        />

        <Text style={styles.loadingText}>
          Carregando mapa...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={region}
        showsUserLocation={locationGranted}
        showsMyLocationButton={false}
        showsCompass
        toolbarEnabled={false}
      >
        {reports.map((report) => (
          <Marker
            key={report.id}
            coordinate={{
              latitude: report.latitude,
              longitude: report.longitude,
            }}
            pinColor={getMarkerColor(
              report.status
            )}
          >
            <Callout
              onPress={() =>
                openReport(report.id)
              }
            >
              <View style={styles.callout}>
                <Text
                  style={styles.calloutTitle}
                  numberOfLines={1}
                >
                  {report.title}
                </Text>

                <Text style={styles.calloutCategory}>
                  {report.category}
                </Text>

                <Text
                  style={styles.calloutDescription}
                  numberOfLines={2}
                >
                  {report.description}
                </Text>

                <Text style={styles.calloutStatus}>
                  Status: {report.status}
                </Text>

                <Text style={styles.calloutLink}>
                  Toque para ver detalhes
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <TouchableOpacity
        style={styles.locationButton}
        activeOpacity={0.8}
        onPress={loadCurrentLocation}
      >
        <Text style={styles.locationIcon}>
          ◎
        </Text>
      </TouchableOpacity>

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View
            style={[
              styles.legendDot,
              {
                backgroundColor:
                  Colors.danger,
              },
            ]}
          />

          <Text style={styles.legendText}>
            Pendente
          </Text>
        </View>

        <View style={styles.legendItem}>
          <View
            style={[
              styles.legendDot,
              {
                backgroundColor:
                  Colors.warning,
              },
            ]}
          />

          <Text style={styles.legendText}>
            Em andamento
          </Text>
        </View>

        <View style={styles.legendItem}>
          <View
            style={[
              styles.legendDot,
              {
                backgroundColor:
                  Colors.success,
              },
            ]}
          />

          <Text style={styles.legendText}>
            Resolvido
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: Colors.surface,
  },

  map: {
    width: "100%",
    height: "100%",
  },

  loadingContainer: {
    flex: 1,
    minHeight: 300,
    borderRadius: 18,
    backgroundColor: Colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    color: "#AAAAAA",
    fontSize: 14,
    marginTop: 12,
  },

  locationButton: {
    position: "absolute",
    right: 14,
    top: 14,
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: Colors.surface,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
  },

  locationIcon: {
    color: Colors.primary,
    fontSize: 28,
    fontWeight: "bold",
  },

  legend: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 12,
    backgroundColor: "rgba(27,27,27,0.92)",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },

  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },

  legendText: {
    color: "#FFFFFF",
    fontSize: 12,
  },

  callout: {
    width: 220,
    padding: 6,
  },

  calloutTitle: {
    color: "#111111",
    fontSize: 16,
    fontWeight: "bold",
  },

  calloutCategory: {
    color: "#555555",
    fontSize: 13,
    fontWeight: "600",
    marginTop: 4,
  },

  calloutDescription: {
    color: "#333333",
    fontSize: 13,
    lineHeight: 18,
    marginTop: 6,
  },

  calloutStatus: {
    color: "#333333",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 8,
  },

  calloutLink: {
    color: "#4F7000",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 8,
  },
});