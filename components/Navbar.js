import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { createPost } from "@/lib/db";

const Navbar = () => {
  const auth = useAuth();

  const handlePost = () => {
    createPost({
      userId: auth.user.uid,
      category: "Fauna",
      postTitle: "Cooper's Hawk Sighting!",
      postDescription: "It just caught a squirrel!",
      likes: 0,
    });
  };

  return (
    <div className="navbar">
      <div className="logo">🌲ourParks</div>
      {auth?.user && (
        <button type="button" onClick={handlePost}>
          ADD MARKER
        </button>
      )}
      <div className="user">
        {auth?.user ? (
          <button type="button" onClick={() => auth.signout()}>
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
