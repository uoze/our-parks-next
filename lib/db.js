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
  const [posts, setPosts] = useState([]);
  const [addMarker, setAddMarker] = useState(false);

  const [latlng, setLatlng] = useState();

  console.log("POSTS IN DB", posts);
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
  // useEffect(() => {
  //   const init = async () => {
  //     if (!posts) {
  //       let docs = [];
  //       const res = await firestore.collection("posts").get();
  //       res.forEach((doc) => docs.push(doc.data()));
  //       setPosts(docs);
  //     } else {
  //       console.log("----inside the snapshot function");
  //       let newDocs = [];
  //       const res = await firestore
  //         .collection("posts")
  //         .onSnapshot((snapshot) => {
  //           snapshot.docs.forEach((docs) => newDocs.push(docs.data()));
  //         });
  //       setPosts(...posts, ...newDocs);
  //     }
  //   };
  //   init();
  // }, []);
  // const getInitPosts;

  const getRealtimePosts = async () => {
    await firestore.collection("posts").onSnapshot((snapshot) => {
      const items = [];

      snapshot.forEach((doc) => {
        console.log(doc.data());
        items.push(doc.data());
      });
      // if (!posts.length) {
      setPosts(items);
      // } else {
      //   setPosts(...posts, ...items);
      // }
    });
    return null;
  };

  const createPost = async (post) => {
    let newlatlng = post.latlng.split(",");
    let finallatlng = [Number(newlatlng[0]), Number(newlatlng[1])];

    post = {
      ...post,
      latlng: finallatlng,
      userId: auth.user.uid,
      // userName: auth.user.displayName CANT SEE TO HAVE THIS LOAD PROPERLY
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
    getRealtimePosts,
    latlng,
    setLatlng,
  };
}
