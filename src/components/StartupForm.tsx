
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
import { useToast } from "@/hooks/use-toast";
import { addStartup, updateStartup } from "@/actions/startups";
import { startupSchema } from "@/lib/schemas";
import type { Startup } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface StartupFormProps {
  startup?: Startup | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export function StartupForm({ startup, onSuccess, onCancel }: StartupFormProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const isEditing = !!startup;

  const form = useForm<z.infer<typeof startupSchema>>({
    resolver: zodResolver(startupSchema),
    defaultValues: {
      id: startup?.id || undefined,
      appName: startup?.appName || "",
      description: startup?.description || "",
      logo: startup?.logo || "",
      aiHint: startup?.aiHint || "",
      link: startup?.link || "",
    },
  });

  function onSubmit(values: z.infer<typeof startupSchema>) {
    startTransition(async () => {
      const result = isEditing
        ? await updateStartup(values as Startup)
        : await addStartup(values);

      if (result.success) {
        toast({
          title: "Success!",
          description: `Startup has been ${isEditing ? 'updated' : 'added'}.`,
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
            <CardTitle>{isEditing ? "Edit Startup" : "Add New Startup"}</CardTitle>
        </CardHeader>
        <CardContent>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="appName"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>App Name</FormLabel>
                        <FormControl>
                        <Input placeholder="Startup Name" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                        <Textarea placeholder="Startup description..." {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="logo"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Logo URL</FormLabel>
                            <FormControl>
                            <Input placeholder="https://example.com/logo.png" {...field} />
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
                            <FormLabel>AI Hint for Logo</FormLabel>
                            <FormControl>
                            <Input placeholder="e.g. 'company logo'" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="link"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Website Link</FormLabel>
                        <FormControl>
                        <Input placeholder="https://example.com" {...field} />
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
                        {isEditing ? "Update" : "Create"} Startup
                    </Button>
                </div>
            </form>
            </Form>
        </CardContent>
    </Card>
  );
}
