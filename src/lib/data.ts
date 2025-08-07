export const projects = [
  {
    category: "Software",
    title: "AI Portfolio Generator",
    description: "A portfolio website that uses generative AI to tailor content to visitors.",
    image: "https://placehold.co/600x400.png",
    tags: ["Next.js", "Genkit", "Tailwind CSS", "Firebase"],
    liveUrl: "#",
    githubUrl: "#",
    aiHint: "AI portfolio"
  },
  {
    category: "Software",
    title: "E-Commerce Analytics Dashboard",
    description: "A comprehensive dashboard for visualizing sales data and customer behavior for an online store.",
    image: "https://placehold.co/600x400.png",
    tags: ["React", "D3.js", "Node.js", "Express"],
    liveUrl: "#",
    githubUrl: "#",
    aiHint: "analytics dashboard"
  },
  {
    category: "Software",
    title: "Task Management App",
    description: "A cross-platform application for managing tasks and improving productivity.",
    image: "https://placehold.co/600x400.png",
    tags: ["Flutter", "Firebase", "Dart"],
    liveUrl: "#",
    githubUrl: "#",
    aiHint: "task management"
  },
  {
    category: "Hardware",
    title: "IoT Smart Home Hub",
    description: "A central hub to control and monitor various smart devices in a home environment.",
    image: "https://placehold.co/600x400.png",
    tags: ["Raspberry Pi", "Python", "MQTT", "Node-RED"],
    liveUrl: "#",
    githubUrl: "#",
    aiHint: "smart home"
  },
  {
    category: "Hardware",
    title: "Automated Plant Watering System",
    description: "A system that automatically waters plants based on soil moisture levels, with remote monitoring.",
    image: "https://placehold.co/600x400.png",
    tags: ["Arduino", "C++", "Sensors", "Blynk"],
    liveUrl: "#",
    githubUrl: "#",
    aiHint: "plant watering"
  },
  {
    category: "Hardware",
    title: "Portable Weather Station",
    description: "A compact, battery-powered weather station that measures temperature, humidity, and pressure.",
    image: "https://placehold.co/600x400.png",
    tags: ["ESP32", "Micropython", "Sensors"],
    liveUrl: "#",
    githubUrl: "#",
    aiHint: "weather station"
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
  "GraphQL", "REST APIs", "PostgreSQL", "MongoDB", "Docker", "Git",
  "Raspberry Pi", "Arduino", "IoT", "Embedded Systems"
];
