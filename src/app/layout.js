'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { AuthProvider } from './components/Auth/AuthContext';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { Provider } from 'react-redux';
import { store } from '../lib/store';
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ['latin'] });

// export const metadata = {
//   title: "KoinY",
//   description: "KoinY is the only tool you need for crypto tracking",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`bg-gray-200 ${inter.className}`}>
        <AppRouterCacheProvider>
          <AuthProvider>
            <Provider store={store}>
              <ThemeProvider theme={theme}>
                <NavBar />
                {children}
                <Footer />
              </ThemeProvider>
            </Provider>
          </AuthProvider>
        </AppRouterCacheProvider>
        <GoogleAnalytics gaId="G-W46SFCSN20" />
      </body>
    </html>
  );
}
