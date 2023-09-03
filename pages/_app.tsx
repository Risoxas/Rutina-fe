import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify/dist/components";
import { UserProvider } from "../contexts/UserContext";

function MyApp({ Component, pageProps }: AppProps) {
  const Layout =
    (Component as any).Layout || ((children: any) => <>{children}</>);
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer />
      </Layout>
    </UserProvider>
  );
}

export default MyApp;
