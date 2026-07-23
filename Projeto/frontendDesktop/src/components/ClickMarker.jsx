import { Marker, useMapEvents } from "react-leaflet";

function ClickMarker({ newReport, markerPosition, setMarkerPosition }) {
  useMapEvents({
    click(e) {
      if (newReport) {
        setMarkerPosition([e.latlng.lat, e.latlng.lng]);
      }
    },
  });

  return markerPosition ? <Marker position={markerPosition} /> : null;
}

export default ClickMarker;