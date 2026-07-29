import { useEffect, useRef, useState } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Alert } from "react-native";

import reports from "@/data/reports";

export default function MapCard() {
  const mapRef = useRef<MapView>(null);

  const [location, setLocation] = useState({
    latitude: -29.754,
    longitude: -51.149,
  });

  useEffect(() => {
    async function getLocation() {
      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permissão negada",
          "É necessário permitir a localização."
        );
        return;
      }

      const current =
        await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

      const coords = {
        latitude: current.coords.latitude,
        longitude: current.coords.longitude,
      };

      setLocation(coords);

      mapRef.current?.animateToRegion(
        {
          ...coords,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000
      );
    }

    getLocation();
  }, []);

  return (
    <MapView
      ref={mapRef}
      style={{
        height: 220,
        borderRadius: 18,
      }}
      showsUserLocation
      showsMyLocationButton
      initialRegion={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      {/* Marcador da localização do usuário */}
      <Marker
        coordinate={location}
        title="Você está aqui"
        pinColor="blue"
      />

      {/* Marcadores dos relatos */}
      {reports.map((report) => (
        <Marker
          key={report.id}
          coordinate={{
            latitude: report.latitude,
            longitude: report.longitude,
          }}
          pinColor="#C6FF00"
        >
          <Callout>
            <>
              <Callout tooltip={false}>
                <>
                </>
              </Callout>
            </>
          </Callout>
        </Marker>
      ))}
    </MapView>
  );
}