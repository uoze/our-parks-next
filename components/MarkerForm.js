import { useDb } from "@/lib/db";
import { useForm } from "react-hook-form";

const MarkerForm = ({ handleMarker }) => {
  const db = useDb();
  const { register, handleSubmit, errors, reset } = useForm();

  const handleClose = () => {
    handleMarker();
    db.setLatlng(false);
  };

  const onSubmit = (values, e) => {
    // console.log("VALUES IN FORM-----", values);
    db.createPost(values);
    e.target.reset({
      title: "",
      description: "",
      category: "General",
      latlng: "false",
    });
  };

  return (
    <div className="marker-form">
      <button type="button" className="close" onClick={handleClose}>
        X
      </button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Title *</label>
        <br />
        <input
          type="text"
          name="title"
          autoComplete="off"
          ref={register({ required: "Please enter a title" })}
        />
        {errors.title ? (
          <div style={{ color: "red" }}>{errors.title.message}</div>
        ) : (
          <br />
        )}

        <label>Description *</label>
        <br />
        <textarea
          type="text"
          name="description"
          autoComplete="off"
          ref={register({ required: "Please enter a description" })}
        />
        {errors.description ? (
          <div style={{ color: "red" }}>{errors.description.message}</div>
        ) : (
          <br />
        )}

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
