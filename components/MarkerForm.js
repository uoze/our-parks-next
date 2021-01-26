import { useDb } from "@/lib/db";
import { useForm } from "react-hook-form";

const MarkerForm = ({ handleMarker }) => {
  const db = useDb();
  const { register, handleSubmit } = useForm();

  const handleClose = () => {
    handleMarker();
    db.setLocatorOn(false);
    db.setLatlng(false);
  };

  return (
    <div className="marker-form">
      <button type="button" className="close" onClick={handleClose}>
        X
      </button>
      <form>
        <label>Title</label>
        <br />
        <input
          type="text"
          name="title"
          autoComplete="off"
          ref={register({ required: true })}
        />
        <br />
        <label>Description</label>
        <br />
        <textarea
          type="text"
          name="description"
          autoComplete="off"
          ref={register({ required: true })}
        />
        <br />
        <label>Category</label>
        <br />
        <select name="category" ref={register({ required: true })}>
          <option>General</option>
          <option>Fauna</option>
          <option>Flora</option>
        </select>
        <br />
        <label>LatLng</label>
        <br />
        <input type="text" name="latlng" value={db.latlng} ref={register} />
        <br />
        {db.latlng && (
          <button type="submit" className="submit">
            submit
          </button>
        )}
      </form>
    </div>
  );
};

export default MarkerForm;
