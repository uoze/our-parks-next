import { useDb } from "@/lib/db";

const MarkerForm = () => {
  const db = useDb();

  return db.addMarker && <div className="marker-form">Hello!</div>;
};

export default MarkerForm;
