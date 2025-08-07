
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { addProject, updateProject } from "@/actions/projects";
import { projectSchema } from "@/lib/schemas";
import type { Project } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface ProjectFormProps {
  project?: Project | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export function ProjectForm({ project, onSuccess, onCancel }: ProjectFormProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const isEditing = !!project;

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      id: project?.id || undefined,
      title: project?.title || "",
      description: project?.description || "",
      category: project?.category || "Software",
      image: project?.image || "",
      aiHint: project?.aiHint || "",
      liveUrl: project?.liveUrl || "",
      githubUrl: project?.githubUrl || "",
      tags: project?.tags.join(", ") || "",
    },
  });

  function onSubmit(values: z.infer<typeof projectSchema>) {
    startTransition(async () => {
        const projectData = {
            ...values,
            tags: values.tags.split(",").map(tag => tag.trim()),
        };

      const result = isEditing
        ? await updateProject(projectData as Project)
        : await addProject(projectData);

      if (result.success) {
        toast({
          title: "Success!",
          description: `Project has been ${isEditing ? 'updated' : 'added'}.`,
        });
        onSuccess();
      } else {
        toast({
          title: "Error",
          description: (result as any).message || "An unexpected error occurred.",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <Card className="mb-8">
        <CardHeader>
            <CardTitle>{isEditing ? "Edit Project" : "Add New Project"}</CardTitle>
        </CardHeader>
        <CardContent>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                        <Input placeholder="Project Title" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            <SelectItem value="Software">Software</SelectItem>
                            <SelectItem value="Hardware">Hardware</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Small Description</FormLabel>
                        <FormControl>
                        <Textarea placeholder="Project description..." {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Thumbnail Photo URL</FormLabel>
                            <FormControl>
                            <Input placeholder="https://example.com/image.png" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="aiHint"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>AI Hint</FormLabel>
                            <FormControl>
                            <Input placeholder="e.g. 'project image'" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="liveUrl"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Visit Link</FormLabel>
                            <FormControl>
                            <Input placeholder="https://example.com/live" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="githubUrl"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>More Details Link</FormLabel>
                            <FormControl>
                            <Input placeholder="https://github.com/user/repo" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
                 <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Labels (comma-separated)</FormLabel>
                        <FormControl>
                        <Input placeholder="React, Next.js, Tailwind CSS" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={onCancel} disabled={isPending}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isPending}>
                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isEditing ? "Update" : "Create"} Project
                    </Button>
                </div>
            </form>
            </Form>
        </CardContent>
    </Card>
  );
}
