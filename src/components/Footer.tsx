
"use client"

import { Github, Linkedin, Instagram } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { AboutMeData } from "@/lib/data";
import { getAboutMeData } from "@/actions/about";

export function Footer() {
  const [data, setData] = useState<AboutMeData | null>(null);

  useEffect(() => {
    getAboutMeData().then(setData);
  }, []);

  return (
    <footer className="w-full mt-24 mb-8 hidden md:block">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} DEEPAK. All rights reserved.
        </p>
        {data?.socials && (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href={data.socials.instagram} target="_blank">
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href={data.socials.github} target="_blank">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href={data.socials.linkedin} target="_blank">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </Button>
          </div>
        )}
      </div>
    </footer>
  );
}
