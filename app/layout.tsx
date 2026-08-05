import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./components/providers";

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
    <html lang="en" className="h-full antialiased overflow-x-clip">
      <body className="min-h-full flex flex-col overflow-x-clip" suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
