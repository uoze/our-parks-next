import { useState } from "react";
import { MapContainer, Marker, TileLayer, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapGetLatLng from "./MapGetLatLng.js";

const Map = () => {
  const position = [40.781172, -73.966654];
  const maxBounds = [
    [40.459048, -74.296457], //Southwest
    [40.898345, -73.718474], //Northeast
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
      {/* <Marker /> */}
    </MapContainer>
  );
};

export default Map;
