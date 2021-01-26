import { useDb } from "@/lib/db";
import { useForm } from "react-hook-form";

const MarkerForm = ({ handleMarker }) => {
  const db = useDb();
  const { register, handleSubmit } = useForm();

  const handleClose = () => {
    handleMarker();
    db.setLocatorOn(false);
  };

  return (
    <div className="marker-form">
      <button type="button" className="close" onClick={handleClose}>
        X
      </button>
      <form>
        <label>Title</label>
        <br />
        <input type="text" name="title" autoComplete="off" ref={register} />
        <br />
        <label>Description</label>
        <br />
        <textarea
          type="text"
          name="description"
          autoComplete="off"
          ref={register}
        />
        <br />
        <label>Category</label>
        <br />
        <select name="category" ref={register}>
          <option>General</option>
          <option>Fauna</option>
          <option>Flora</option>
        </select>
        <br />
        <label>LatLng</label>
        <br />
        <input type="text" />
        <br />
        {!db.locatorOn ? (
          <button type="button" onClick={() => db.setLocatorOn(!db.locatorOn)}>
            Choose Location
          </button>
        ) : (
          <button type="button">submit</button>
        )}
      </form>
    </div>
  );
};

export default MarkerForm;
