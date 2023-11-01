import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppContext from "../contexts/AppContext";

function MyApp({ Component, pageProps }: AppProps) {
  const Layout =
    (Component as any).Layout || (({ children }: any) => <>{children}</>);
  return (
    <AppContext>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer />
      </Layout>
    </AppContext>
  );
}

export default MyApp;
