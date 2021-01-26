import { useEffect } from "react";
import { useDb } from "@/lib/db";
import { Marker, Popup } from "react-leaflet";

const MarkerLoader = () => {
  const db = useDb();
  let markers;

  if (db.posts.length) {
    markers = db.posts.map((post) => {
      return (
        <Marker position={post.latlng}>
          <Popup>
            {post.title}
            {post.description}
          </Popup>
        </Marker>
      );
    });
  }

  return markers ? markers : null;
};

export default MarkerLoader;
