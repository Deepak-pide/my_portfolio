

import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export const projectSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, "Title must be at least 2 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  category: z.enum(["Software", "Hardware"]),
  image: z.string().url("Please enter a valid URL."),
  aiHint: z.string().optional(),
  liveUrl: z.string().url("Please enter a valid URL."),
  githubUrl: z.string().url("Please enter a valid URL."),
  tags: z.string().min(1, "Please enter at least one label."),
});

export const aboutMeSchema = z.object({
    photo: z.string().url("Please enter a valid URL."),
    tagline: z.string().min(10, "Tagline must be at least 10 characters."),
    skills: z.array(z.string()).min(1, "Please add at least one skill."),
});

export const startupSchema = z.object({
  id: z.string().optional(),
  logo: z.string().url("Please enter a valid URL for the logo."),
  appName: z.string().min(2, "App name must be at least 2 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  link: z.string().url("Please enter a valid URL for the link."),
  aiHint: z.string().optional(),
});
    
