import Link from "next/link";
import { Home, Briefcase, User, MessageSquare } from "lucide-react";

export function MobileFooter() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t">
      <nav className="flex justify-around items-center h-16">
        <Link href="/" className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors">
          <Home className="h-6 w-6" />
          <span className="text-xs">Home</span>
        </Link>
        <Link href="/#portfolio" className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors">
          <Briefcase className="h-6 w-6" />
          <span className="text-xs">Portfolio</span>
        </Link>
        <Link href="/#about" className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors">
          <User className="h-6 w-6" />
          <span className="text-xs">About</span>
        </Link>
        <Link href="/#contact" className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors">
          <MessageSquare className="h-6 w-6" />
          <span className="text-xs">Contact</span>
        </Link>
      </nav>
    </footer>
  );
}
