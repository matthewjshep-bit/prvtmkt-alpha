import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "PRVT MKT | Digital Tombstone Platform",
  description: "High-end SaaS platform for Commercial Real Estate firms to manage and showcase digital deal tombstones.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-brand-dark text-foreground`}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
