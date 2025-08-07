import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/lib/data";
import { ArrowRight } from "lucide-react";

export default function BlogPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="text-center">
        <h1 className="font-headline text-5xl md:text-6xl">Blog</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Insights, projects, and thoughts on industry-related topics.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogPosts.map((post) => (
          <Card key={post.slug} className="flex flex-col overflow-hidden group">
            <CardHeader className="p-0">
               <div className="relative aspect-video overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  data-ai-hint={post.aiHint}
                />
              </div>
            </CardHeader>
            <CardContent className="p-6 flex-grow">
              <p className="text-sm text-muted-foreground">{post.date}</p>
              <CardTitle className="mt-2 font-headline text-2xl tracking-wide">
                {post.title}
              </CardTitle>
              <CardDescription className="mt-2">
                {post.excerpt}
              </CardDescription>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button asChild variant="outline">
                <Link href={`/blog/${post.slug}`}>
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
