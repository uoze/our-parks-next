import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, ZoomControl } from "react-leaflet";
import MapGetLatLng from "./MapGetLatLng.js";
import { useDb } from "@/lib/db";

const Map = () => {
  const db = useDb();
  const position = [40.781172, -73.966654];
  const maxBounds = [
    [40.459048, -74.296457], //SouthwestNYC
    [40.898345, -73.718474], //NortheastNYC
  ];

  return (
    <MapContainer
      className="map"
      center={position}
      zoom={15}
      zoomControl={false}
      maxBounds={maxBounds}
      minZoom={12}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="topright" />
      {/* <MapGetLatLng /> */}

      {db.addMarker && <MapGetLatLng />}
      {db.latlng && <Marker position={db.latlng} />}
    </MapContainer>
  );
};

export default Map;
