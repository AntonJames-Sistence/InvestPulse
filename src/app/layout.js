import { Inter } from "next/font/google";
import "./globals.css";
import ThemeRegistry from './ThemeRegistry';
import { AuthProvider } from "./components/Auth/AuthContext";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "KoinY",
  description: "KoinY is the only tool you need for crypto tracking",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeRegistry>
            <NavBar />
            {children}
            <Footer />
          </ThemeRegistry>
        </AuthProvider>
      </body>
    </html>
  );
}