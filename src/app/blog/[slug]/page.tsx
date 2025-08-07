import { notFound } from "next/navigation";
import Image from "next/image";
import { blogPosts } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="py-16 md:py-24">
      <div className="container mx-auto max-w-3xl">
        <header className="text-center mb-12">
          <p className="text-muted-foreground mb-2">{post.date}</p>
          <h1 className="font-headline text-4xl md:text-6xl tracking-wide">
            {post.title}
          </h1>
        </header>

        <div className="relative aspect-video rounded-lg overflow-hidden mb-12">
          <Image src={post.image} alt={post.title} fill className="object-cover" data-ai-hint={post.aiHint} />
        </div>

        <div
          className="prose prose-lg dark:prose-invert mx-auto"
          dangerouslySetInnerHTML={{ __html: post.content.replace(/```javascript/g, '<pre><code class="language-javascript">').replace(/```/g, '</code></pre>') }}
        />
      </div>
    </article>
  );
}
