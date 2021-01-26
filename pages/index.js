import { useState } from "react";
import Head from "next/head";
import { useAuth } from "../lib/auth";
import { useDb, ProvideDb } from "@/lib/db";

import Navbar from "../components/Navbar";
import dynamic from "next/dynamic";
import MarkerForm from "@/components/MarkerForm";

export default function Home() {
  const auth = useAuth();
  const DynamicComponentWithNoSSR = dynamic(() => import("../components/Map"), {
    ssr: false,
  });

  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
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
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
          crossorigin=""
        />
      </Head>

      <main>
        {/* <ProvideDb> */}
        <Navbar />
        {/* </ProvideDb> */}

        <DynamicComponentWithNoSSR />
        {/* <MarkerForm /> */}
      </main>
    </div>
  );
}
