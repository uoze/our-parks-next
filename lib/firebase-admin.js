import admin from "firebase/firebase-admin";
import "firebase/auth";
import "firebase/firestore";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: process.env.FIREBASE_SERVICE_ACCOUNT,
  });
}

export default admin.firestore;
