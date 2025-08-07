
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Download, Menu, Cpu, LogIn, LogOut } from "lucide-react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";

const navLinks = [
  { href: "/#portfolio", label: "Portfolio" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
];

export function Header() {
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsAdmin(!!user);
    });
    return () => unsubscribe();
  }, []);

  const closeSheet = () => setSheetOpen(false);

  const handleLogout = async () => {
    await signOut(auth);
    sessionStorage.removeItem("isAdmin");
    closeSheet();
    router.push("/");
    toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2" passHref>
            <Cpu className="h-6 w-6" />
            <span className="font-headline text-xl font-semibold">
              DEEPAK
            </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {link.label}
            </Link>
          ))}
           {isAdmin && (
            <Link href="/admin/dashboard" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Dashboard
            </Link>
          )}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button asChild variant="outline" size="sm">
            <a href="/resume.pdf" download="resume.pdf">
              <Download className="mr-2 h-4 w-4" />
              Resume
            </a>
          </Button>
           {isAdmin ? (
            <Button onClick={handleLogout} size="sm">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
           ) : (
            <Button asChild size="sm">
              <Link href="/admin/login">
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Link>
            </Button>
           )}
        </div>

        <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col gap-6 p-6">
              <Link href="/" className="flex items-center gap-2" onClick={closeSheet} passHref>
                  <Cpu className="h-6 w-6" />
                  <span className="font-headline text-xl font-semibold">
                    DEEPAK
                  </span>
              </Link>
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeSheet}
                    className="font-medium text-lg"
                  >
                    {link.label}
                  </Link>
                ))}
                 {isAdmin && (
                  <Link href="/admin/dashboard" onClick={closeSheet} className="font-medium text-lg">
                    Dashboard
                  </Link>
                )}
              </nav>
               <div className="flex flex-col gap-4 mt-auto">
                <Button asChild variant="outline">
                  <a href="/resume.pdf" download="resume.pdf">
                    <Download className="mr-2 h-4 w-4" />
                    Download Resume
                  </a>
                </Button>
                 {isAdmin ? (
                    <Button onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  ) : (
                    <Button asChild>
                      <Link href="/admin/login" onClick={closeSheet}>
                        <LogIn className="mr-2 h-4 w-4" />
                        Login
                      </Link>
                    </Button>
                  )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
