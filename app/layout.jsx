import { Provider } from "react-redux";
import "./globals.css";
import { Inter } from "next/font/google";

import { ReduxProvider } from "../store/provider";
import AuthProvider from "../components/authProvider/AuthProvider";

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
          <AuthProvider>{children} </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
