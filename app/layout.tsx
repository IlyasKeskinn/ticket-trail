import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ticket Trail",
  description:
    "Ticket Trail is a modern platform where you can easily discover, purchase, and manage event tickets. With its user-friendly interface and a wide range of events, it allows you to quickly find and buy tickets for music, theater, sports, and more.",
  generator: "fidelio",
  creator: "fidelio",
  publisher: "fidelio",
  applicationName: "ticket_trail",
  referrer: "origin-when-cross-origin",
  authors: [{ name: "fidelio" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
