import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import React from 'react';
import { cn } from '@/src/lib/utils'
import { ThemeProvider } from "@/src/components/theme-provider"
import { Toaster } from "@/src/components/ui/toaster"
import { AuthProvider } from "./context";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: "HMS",
  description: "A Hospital Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <React.StrictMode>
    <AuthProvider>
      <html lang="en">
        <body className={cn('min-h-screen bg-dark-300 font-sans antialiased', fontSans.variable)}>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
            <Toaster />
          </body>
      </html>
    </AuthProvider>
    </React.StrictMode>
  );
}
