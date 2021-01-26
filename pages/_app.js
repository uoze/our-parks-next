import { ProvideAuth } from "../lib/auth";
import { ProvideDb } from "../lib/db";
import "@/styles/stylesheet.css";

function MyApp({ Component, pageProps }) {
  return (
    <ProvideAuth>
      <ProvideDb>
        <Component {...pageProps} />
      </ProvideDb>
    </ProvideAuth>
  );
}

export default MyApp;
