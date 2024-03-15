import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "KoinY",
  description: "KoinY is the only tool you need for crypto trading.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <link rel="icon" href="/favicon.png" sizes="any" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"></link>
    </html>
  );
}
