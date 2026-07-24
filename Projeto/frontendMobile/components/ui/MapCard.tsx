import { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function MapCard() {
  const [location, setLocation] = useState({
    latitude: -29.754,
    longitude: -51.149,
  });

  useEffect(() => {
    async function getLocation() {
      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") return;

      const current =
        await Location.getCurrentPositionAsync({});

      setLocation({
        latitude: current.coords.latitude,
        longitude: current.coords.longitude,
      });
    }

    getLocation();
  }, []);

  return (
    <MapView
      style={{
        height: 220,
        borderRadius: 18,
      }}
      initialRegion={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      <Marker coordinate={location} />
    </MapView>
  );
}