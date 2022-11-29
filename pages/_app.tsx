import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import Nav from "../components/Nav";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Nav />
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
