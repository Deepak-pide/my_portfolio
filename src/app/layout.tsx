
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
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect width='16' height='16' x='4' y='4' rx='2'/><rect width='6' height='6' x='9' y='9' rx='1'/><path d='M15 2v2M15 20v2M9 2v2M9 20v2M2 9h2M2 15h2M20 9h2M20 15h2'/></svg>" />
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
