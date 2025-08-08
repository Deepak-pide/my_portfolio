
"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import type { Startup } from '@/lib/data';
import { cn } from '@/lib/utils';

interface StartupCardProps {
  startup: Startup;
}

export function StartupCard({ startup }: StartupCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="perspective-1000" onClick={() => setIsFlipped(!isFlipped)}>
        <Card className={cn(
            "relative w-full h-64 transform-style-preserve-3d transition-transform duration-700 cursor-pointer",
            isFlipped ? 'rotate-y-180' : ''
        )}>
            {/* Front of the card */}
            <div className="absolute w-full h-full backface-hidden flex flex-col items-center justify-center p-6 text-center">
                <div className="relative w-24 h-24 mb-4 rounded-lg overflow-hidden">
                    <Image
                        src={startup.logo}
                        alt={`${startup.appName} Logo`}
                        fill
                        className="object-contain"
                        data-ai-hint={startup.aiHint}
                    />
                </div>
                <CardTitle className="font-headline text-2xl tracking-wide">{startup.appName}</CardTitle>
            </div>

            {/* Back of the card */}
            <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-card flex flex-col p-6">
                 <CardHeader>
                    <CardTitle className="font-headline text-2xl tracking-wide">{startup.appName}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                    <CardDescription>{startup.description}</CardDescription>
                </CardContent>
                <CardFooter>
                    <Button asChild className="w-full">
                        <Link href={startup.link} target="_blank" onClick={(e) => e.stopPropagation()}>
                            Visit <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </CardFooter>
            </div>
        </Card>
    </div>
  );
}

// Add this to your globals.css or a style tag
/*
.perspective-1000 {
  perspective: 1000px;
}
.transform-style-preserve-3d {
  transform-style: preserve-3d;
}
.rotate-y-180 {
  transform: rotateY(180deg);
}
.backface-hidden {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
*/
