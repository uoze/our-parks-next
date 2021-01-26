import firebase from "./firebase";
import { useState, useContext, createContext, useEffect } from "react";

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
  const [posts, setPosts] = useState(null);
  const [addMarker, setAddMarker] = useState(false);
  console.log(addMarker);

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
    post = {
      ...post,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    await firestore.collection("posts").add(post);
  };

  return {
    createPost,
    posts,
    addMarker,
    setAddMarker,
  };
}
