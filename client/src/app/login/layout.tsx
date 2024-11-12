import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import LoginWrapper from "./loginWrapper";
import StoreProvider from "../redux";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Farmaco-pedidos",
  description: "Inventory and POS-like app for medicaments with predictive elements",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <StoreProvider>
          <LoginWrapper>{children}</LoginWrapper>
        </StoreProvider>
      </body>
    </html>
  );
}
