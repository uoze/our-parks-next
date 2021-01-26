import firebase from "./firebase";
import { useState, useContext, createContext, useEffect } from "react";
import { useAuth } from "@/lib/auth";

const firestore = firebase.firestore();

export const createUser = (uid, data) => {
  return firestore
    .collection("users")
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
};

const dbContext = createContext();

export function ProvideDb({ children }) {
  const db = useProvideDb();
  return <dbContext.Provider value={db}>{children}</dbContext.Provider>;
}

export const useDb = () => {
  return useContext(dbContext);
};

function useProvideDb() {
  const auth = useAuth();
  const [posts, setPosts] = useState(null);
  const [addMarker, setAddMarker] = useState(false);

  const [latlng, setLatlng] = useState();

  // useEffect(() => {
  //   const unsubscribe = firestore.collection("posts").onSnapshot(
  //     (snapshot) => {
  //       counter++;
  //       const items = [];
  //       snapshot.forEach((doc) => {
  //         items.push(doc.data());
  //       });
  //       setPosts(items);
  //     },
  //     (err) => console.log("Error retrieving snapshot", err)
  //   );
  //   return () => {
  //     unsubscribe();
  //     console.log("Unsubscribed!!!");
  //   };
  // }, []);

  const createPost = async (post) => {
    let newlatlng = post.latlng.split(",");
    let finallatlng = [Number(newlatlng[0]), Number(newlatlng[1])];

    post = {
      ...post,
      latlng: finallatlng,
      userId: auth.user.uid,
      userName: auth.user.displayName,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      likes: 0,
    };

    console.log("POST IN DB", post);
    await firestore.collection("posts").add(post);
  };

  return {
    createPost,
    posts,
    addMarker,
    setAddMarker,

    latlng,
    setLatlng,
  };
}
