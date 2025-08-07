import Link from "next/link";
import { Button } from "./ui/button";
import { Github, Linkedin, Twitter } from "lucide-react";

export function HeroSection() {
  return (
    <section className="py-24 md:py-32 text-center">
      <div className="container mx-auto">
        <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl tracking-wider leading-tight">
          LUMINOUS CANVAS
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground">
          A creative developer crafting elegant and modern web experiences.
          Explore my work and let&apos;s build something amazing together.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild>
            <a href="/#contact">Get in Touch</a>
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href="#">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <Link href="#">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <Link href="#">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
