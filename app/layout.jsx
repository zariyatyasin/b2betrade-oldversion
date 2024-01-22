import { Provider } from "react-redux";
import "./globals.css";
import { Inter } from "next/font/google";

import { ReduxProvider } from "../store/provider";
import AuthProvider from "../components/provider/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QueryProvider from "../components/provider/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "B2BeTrade",
  description: "Ecommerce store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <QueryProvider>
          <ReduxProvider>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <AuthProvider>{children} </AuthProvider>
          </ReduxProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
