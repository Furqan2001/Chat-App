import "../../styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { ChatProvider } from "../contexts/ChatContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Chat App</title>
      </Head>
      <ChatProvider>
        <Component {...pageProps} />
      </ChatProvider>
    </>
  );
}

export default MyApp;
