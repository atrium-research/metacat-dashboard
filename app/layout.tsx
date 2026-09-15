import { ReactNode } from "react";
import type { Metadata } from "next";
import { Outfit, JetBrains_Mono, Inter } from "next/font/google";
import "@/styles/globals.css";
import Sidebar from "@/components/Layout/Sidebar";
import Navbar from "@/components/Layout/Navbar";
import Providers from "@/app/providers";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "MetaCat Dashboard",
  description: "MetaCat Dashboard App",
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

function RootLayout(props: RootLayoutProps) {
  const { children } = props;

  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} ${inter.variable} ${outfit.variable} h-full antialiased`}
      // info: Required by next-themes: modifies <html> attributes on the client to prevent FOUC, which triggers React hydration mismatch warnings
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-beige-400">
        <Providers>
          <div className="flex flex-1">
            <Sidebar />
            <div className="flex flex-col w-full min-w-0">
              <Navbar />
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}

export default RootLayout;
