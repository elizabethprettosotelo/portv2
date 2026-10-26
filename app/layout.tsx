import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./components/providers";

const title = "Eli Pretto-Sotelo — UX Designer & Frontend Developer";
const description =
  "Eli Pretto-Sotelo is a UX designer and frontend developer crafting intuitive, accessible digital experiences at UCF's Center for Distributed Learning — blending research-driven design with clean, considered code.";

export const metadata: Metadata = {
  title: {
    default: title,
    template: "%s — Eli Pretto-Sotelo",
  },
  description,
  keywords: [
    "Eli Pretto-Sotelo",
    "UX Designer",
    "UI Designer",
    "Frontend Developer",
    "Product Design",
    "UCF Center for Distributed Learning",
    "Accessibility",
  ],
  authors: [{ name: "Eli Pretto-Sotelo" }],
  icons: {
    icon: "/thebaby.png",
  },
  openGraph: {
    title,
    description,
    siteName: "Eli Pretto-Sotelo",
    type: "website",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased overflow-x-clip">
      <head>
        <style>{`@media (pointer: fine) { html, html * { cursor: none !important; } }`}</style>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Figtree:wght@300..900&family=Fraunces:opsz,SOFT,wght@9..144,100,300..900&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col overflow-x-clip" suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
