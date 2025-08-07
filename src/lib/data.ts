export const projects = [
  {
    title: "Project Alpha",
    description: "A web application for project management, designed to streamline team collaboration and task tracking.",
    image: "https://placehold.co/600x400.png",
    tags: ["React", "Node.js", "PostgreSQL", "Tailwind CSS"],
    liveUrl: "#",
    githubUrl: "#",
    aiHint: "project management"
  },
  {
    title: "Project Beta",
    description: "An e-commerce platform with a modern design, focusing on user experience and performance.",
    image: "https://placehold.co/600x400.png",
    tags: ["Next.js", "Stripe", "GraphQL", "TypeScript"],
    liveUrl: "#",
    githubUrl: "#",
    aiHint: "ecommerce platform"
  },
  {
    title: "Project Gamma",
    description: "A mobile-first social media app that connects people through shared interests and events.",
    image: "https://placehold.co/600x400.png",
    tags: ["React Native", "Firebase", "Redux"],
    liveUrl: "#",
    githubUrl: "#",
    aiHint: "social media"
  },
];

export const blogPosts = [
  {
    slug: "mastering-react-hooks",
    title: "Mastering React Hooks: A Deep Dive",
    date: "2024-05-15",
    image: "https://placehold.co/800x400.png",
    aiHint: "react code",
    excerpt: "Explore the full potential of React Hooks and learn how to write cleaner, more efficient component logic.",
    content: `
React Hooks have revolutionized how we write components. In this post, we'll go beyond \`useState\` and \`useEffect\`.

### The Power of Custom Hooks

One of the most powerful features is the ability to create your own hooks. This allows you to extract component logic into reusable functions.

\`\`\`javascript
function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}
\`\`\`

### Advanced Hooks: \`useReducer\` and \`useCallback\`

For complex state management, \`useReducer\` is often a better choice than \`useState\`. It provides a more predictable state transition model. \`useCallback\` and \`useMemo\` are crucial for optimizing performance by preventing unnecessary re-renders. We'll explore practical examples of where and how to use them effectively.
`
  },
  {
    slug: "the-rise-of-server-components",
    title: "The Rise of Server Components",
    date: "2024-04-22",
    image: "https://placehold.co/800x400.png",
    aiHint: "server components",
    excerpt: "Server Components are changing the game in web development. Let's look at what they are and why they matter.",
    content: `
Next.js and the React team have been pushing the boundaries with Server Components. They allow us to write UI that renders on the server, reducing the amount of JavaScript shipped to the client.

### Key Benefits

- **Zero-Bundle-Size Components**: Server Components don't end up in the client-side JavaScript bundle.
- **Direct Backend Access**: You can access databases, file systems, or internal services directly from your components.
- **Improved Performance**: Less JavaScript means faster page loads and a better user experience, especially on slower networks or devices.

This shift represents a major step forward in building fast, scalable web applications.
`
  }
];

export const skills = [
  "TypeScript", "JavaScript", "React", "Next.js", "Node.js", "Python",
  "GraphQL", "REST APIs", "PostgreSQL", "MongoDB", "Docker", "Git"
];
