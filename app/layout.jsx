import { Provider } from "react-redux";
import "./globals.css";
import { Inter } from "next/font/google";

import { ReduxProvider } from "../store/provider";
import AuthProvider from "../components/authProvider/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sudzar",
  description: "Ecommerce store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
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
            theme="dark"
          />
          <AuthProvider>{children} </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
