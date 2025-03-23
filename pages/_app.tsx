import "@/styles/globals.css";
import { Leva } from "leva";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className="w-screen">
      <Leva />
      <Component {...pageProps} />
    </main>
  );
}
