import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { HoverProvider } from "./contexts/HoverContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eli Pretto-Sotelo",
  description: "UI/UX Designer & Frontend Developer",
  icons: {
    icon: '/thebaby.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased overflow-x-hidden`}
    >
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/jdu6nlf.css" />
      </head>
      <body className="min-h-full flex flex-col overflow-x-hidden" suppressHydrationWarning>
        <HoverProvider>{children}</HoverProvider>
      </body>
    </html>
  );
}
