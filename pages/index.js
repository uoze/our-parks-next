import { useState } from "react";
import Head from "next/head";
import { useAuth } from "../lib/auth";
import styles from "../styles/Home.module.css";

export default function Home() {
  const auth = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  console.log(form);

  return (
    <div className={styles.container}>
      <Head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title>Next.js PWA Example</title>

        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name="theme-color" content="#317EFB" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className="title">ourParks </h1>
        <button onClick={() => auth.signInWithGoogle()}>
          {" "}
          SIGN IN WITH GOOGLE
        </button>

        <div>{auth?.user?.email}</div>
        {auth?.user && (
          <button onClick={(e) => auth.signout()}> SIGN OUT </button>
        )}
      </main>
    </div>
  );
}
