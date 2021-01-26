import firebase from "./firebase";
import { useState, useContext, createContext } from "react";

const firestore = firebase.firestore();

export const createUser = (uid, data) => {
  return firestore
    .collection("users")
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
};

export const createPost = async (post) => {
  post = {
    ...post,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  };
  console.log("POST IN DB", post);
  await firestore.collection("posts").add(post);
};
