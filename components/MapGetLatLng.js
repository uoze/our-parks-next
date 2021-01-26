import { useMapEvents, Marker } from "react-leaflet";
import { useDb } from "@/lib/db";

const MapGetLatLng = () => {
  const db = useDb();

  const map = useMapEvents({
    click: (e) => {
      const coords = [e.latlng.lat.toFixed(6), e.latlng.lng.toFixed(6)];

      db.setLatlng(coords);
    },
  });
  return null;
};

export default MapGetLatLng;
