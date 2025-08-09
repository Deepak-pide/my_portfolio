
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";
import { cn } from "@/lib/utils";
import { MobileFooter } from "@/components/MobileFooter";

export const metadata: Metadata = {
  title: "DEEPAK",
  description: "",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path d='M30,10 L70,10 L70,20 L80,20 L80,30 L90,30 L90,70 L80,70 L80,80 L70,80 L70,90 L30,90 L30,80 L20,80 L20,70 L10,70 L10,30 L20,30 L20,20 L30,20 Z M40,30 L60,30 L60,40 L70,40 L70,60 L60,60 L60,70 L40,70 L40,60 L30,60 L30,40 L40,40 Z' fill='white' stroke='black' stroke-width='2.5'/></svg>" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          "font-body antialiased min-h-screen flex flex-col"
        )}
      >
        <Header />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 pb-24 md:pb-0">
          {children}
        </main>
        <Footer />
        <MobileFooter />
        <Toaster />
      </body>
    </html>
  );
}
