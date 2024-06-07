import { Inter } from "next/font/google";
import "./globals.css";
import ThemeRegistry from './ThemeRegistry';

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
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}