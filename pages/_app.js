import Head from "next/head";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Preloader from "../components/Preloader";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    document.body.classList.add("services-page-colors");
    return () => {
      document.body.classList.remove("services-page-colors");
    };
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      </Head>

      <Preloader />
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
