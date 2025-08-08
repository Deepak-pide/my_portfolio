
"use client"
import Link from "next/link";
import { Button } from "./ui/button";
import { Github, Linkedin, Instagram } from "lucide-react";
import { getAboutMeData } from "@/actions/about";
import { useEffect, useState } from "react";
import type { AboutMeData } from "@/lib/data";

export function HeroSection() {
  const [data, setData] = useState<AboutMeData | null>(null);

  useEffect(() => {
    getAboutMeData().then(setData);
  }, []);

  return (
    <section className="py-24 md:py-32 text-center">
      <div className="container mx-auto">
        <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl tracking-wider leading-tight">
          DEEPAK
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground">
          From embedded systems to full-stack development, I create solutions where hardware meets software. Explore my projects and let’s collaborate.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild>
            <a href="/#contact">Get in Touch</a>
          </Button>
          {data?.extraLinks?.map((link) => (
            <Button asChild key={link.url} variant="secondary">
                <a href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a>
            </Button>
          ))}
          {data?.socials && (
            <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" asChild>
                <Link href={data.socials.instagram} target="_blank">
                    <Instagram className="h-5 w-5" />
                    <span className="sr-only">Instagram</span>
                </Link>
                </Button>
                <Button variant="outline" size="icon" asChild>
                <Link href={data.socials.github} target="_blank">
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                </Link>
                </Button>
                <Button variant="outline" size="icon" asChild>
                <Link href={data.socials.linkedin} target="_blank">
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                </Link>
                </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
