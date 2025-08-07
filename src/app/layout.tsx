import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";
import { cn } from "@/lib/utils";
import { MobileFooter } from "@/components/MobileFooter";

export const metadata: Metadata = {
  title: "DEEPAK",
  description:
    "A visually appealing portfolio showcasing projects, skills, and experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
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
