import { useState, useEffect, useContext, createContext } from "react";
import { createUser } from "./db";
import firebase from "./firebase";

const authContext = createContext();

// Provider component that wraps your app and makes auth object available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);

  console.log("USER", user);

  const handleUser = (rawUser) => {
    if (rawUser) {
      const user = formatUser(rawUser);

      createUser(user.uid, user);
      setUser(user);
      return user;
    } else {
      setUser(false);
      return false;
    }
  };
  // Wrap any Firebase methods we want to use making sure to save the user to state.
  // const signin = (email, password) => {
  //   return firebase
  //     .auth()
  //     .signInWithEmailAndPassword(email, password)
  //     .then((response) => {
  //       setUser(response.user);
  //       return response.user;
  //     });
  // };

  const signInWithGoogle = async () => {
    try {
      const res = await firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider());
      handleUser(res.user);
    } catch (error) {
      console.log("Error in lib/auth", error.message);
    }
  };

  const signin = async (email, password) => {
    try {
      const res = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      setUser(res.user);
      return res.user;
    } catch (error) {
      console.log("Error in lib/auth", error.message);
    }
  };

  // const signup = (email, password) => {
  //   return firebase
  //     .auth()
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((response) => {
  //       setUser(response.user);
  //       return response.user;
  //     });
  // };

  const signup = async (email, password) => {
    try {
      const res = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      setUser(res.user);
      return res.user;
    } catch (error) {
      console.log("Error in lib/auth", error.message);
    }
  };

  // const signout = () => {
  //   return firebase
  //     .auth()
  //     .signOut()
  //     .then(() => {
  //       setUser(false);
  //     });
  // };

  const signout = async () => {
    try {
      const res = await firebase.auth().signOut();
      handleUser(false);
    } catch (error) {
      console.log("Error in lib/auth", error.message);
    }
  };

  // const sendPasswordResetEmail = (email) => {
  //   return firebase
  //     .auth()
  //     .sendPasswordResetEmail(email)
  //     .then(() => {
  //       return true;
  //     });
  // };

  const sendPasswordResetEmail = async (email) => {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      return true;
    } catch (error) {
      console.log("Error in lib/auth", error.message);
    }
  };

  // const confirmPasswordReset = (code, password) => {
  //   return firebase
  //     .auth()
  //     .confirmPasswordReset(code, password)
  //     .then(() => {
  //       return true;
  //     });
  // };

  const confirmPasswordReset = async (code, password) => {
    try {
      await firebase.auth().confirmPasswordReset(code, password);
      return true;
    } catch (error) {
      console.log("Error in lib/auth", error.message);
    }
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any component that utilizes this hook to re-render with the latest auth object.
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Return the user object and auth methods
  return {
    user,
    signInWithGoogle,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
}

const formatUser = (user) => ({
  uid: user.uid,
  email: user.email,
  name: user.displayName,
});
