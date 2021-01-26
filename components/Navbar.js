import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { useDb } from "@/lib/db";
import MarkerForm from "@/components/MarkerForm";

const Navbar = () => {
  const auth = useAuth();
  const db = useDb();

  const handlePost = () => {
    db.createPost({
      userId: auth.user.uid,
      category: "Fauna",
      postTitle: "Cooper's Hawk Sighting!",
      postDescription: "It just caught a squirrel!",
      likes: 0,
    });
  };

  const handleMarker = () => {
    db.setAddMarker(!db.addMarker);
  };

  const handleSignout = () => {
    db.setAddMarker(false);
    auth.signout();
    db.setLatlng(null);
  };

  // console.log("!dbMarker in navbar", !db.addMarker, auth?.user);
  return (
    <div className="navbar">
      <div className="logo">🌲ourParks</div>
      {auth?.user ? (
        !db.addMarker ? (
          <div className="user">
            <button
              type="button"
              className="add-marker-button"
              onClick={handleMarker}
            >
              ADD MARKER
            </button>
          </div>
        ) : (
          <MarkerForm handleMarker={handleMarker} />
        )
      ) : null}
      <div className="user">
        {auth?.user ? (
          <button type="button" onClick={handleSignout}>
            SIGN OUT
          </button>
        ) : (
          <div>
            <button
              type="button"
              className="login"
              onClick={() => auth.signInWithGoogle()}
            >
              LOG IN
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
