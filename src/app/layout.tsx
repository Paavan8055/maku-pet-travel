import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MAKU - Pet-Friendly Travel with Real-Time Inventory",
  description: "Discover pet-friendly hotels, flights, and experiences with real-time availability and pricing powered by advanced booking technology.",
  keywords: "pet-friendly travel, hotels, real-time inventory, Amadeus API, pet travel",
  authors: [{ name: "MAKU Travel" }]
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ec4899"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
