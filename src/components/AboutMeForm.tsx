
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import type { z } from "zod";
import { useEffect, useTransition } from "react";
import { Loader2, X, Plus } from "lucide-react";

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
import { useToast } from "@/hooks/use-toast";
import { getAboutMeData, updateAboutMeData } from "@/actions/about";
import { aboutMeSchema } from "@/lib/schemas";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

interface AboutMeFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function AboutMeForm({ onSuccess, onCancel }: AboutMeFormProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof aboutMeSchema>>({
    resolver: zodResolver(aboutMeSchema),
    defaultValues: {
      photo: "",
      tagline: "",
      skills: [],
      socials: {
          instagram: "",
          github: "",
          linkedin: ""
      },
      extraLinks: [],
    },
  });
  
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "extraLinks",
  });
  
  const skills = form.watch("skills");

  useEffect(() => {
    async function loadData() {
      const data = await getAboutMeData();
      form.reset({
          ...data,
          skills: data.skills || [],
          extraLinks: data.extraLinks || []
      });
    }
    loadData();
  }, [form]);
  
  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        const skillInput = e.currentTarget;
        const newSkill = skillInput.value.trim();
        if (newSkill && !skills.includes(newSkill)) {
            form.setValue('skills', [...skills, newSkill]);
            skillInput.value = '';
        }
    }
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    form.setValue('skills', skills.filter(skill => skill !== skillToRemove));
  }


  function onSubmit(values: z.infer<typeof aboutMeSchema>) {
    startTransition(async () => {
      const result = await updateAboutMeData(values);

      if (result.success) {
        toast({
          title: "Success!",
          description: "About Me section has been updated.",
        });
        onSuccess();
      } else {
        toast({
          title: "Error",
          description: "An unexpected error occurred.",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <Card className="mb-8">
        <CardHeader>
            <CardTitle>Edit About Me</CardTitle>
        </CardHeader>
        <CardContent>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="photo"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Photo URL</FormLabel>
                        <FormControl>
                        <Input placeholder="https://example.com/photo.png" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="tagline"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Tagline</FormLabel>
                        <FormControl>
                        <Input placeholder="Your professional tagline" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                 <FormItem>
                    <FormLabel>Skills</FormLabel>
                    <div className="flex flex-wrap gap-2">
                        {skills.map(skill => (
                            <Badge key={skill} variant="secondary" className="text-base px-3 py-1">
                                {skill}
                                <button type="button" onClick={() => handleRemoveSkill(skill)} className="ml-2 rounded-full hover:bg-destructive/80 p-0.5">
                                    <X className="h-3 w-3" />
                                </button>
                            </Badge>
                        ))}
                    </div>
                    <FormControl>
                       <Input placeholder="Add a skill and press Enter" onKeyDown={handleAddSkill} />
                    </FormControl>
                    <FormMessage />
                </FormItem>

                <Separator />
                <h3 className="text-lg font-medium">Social Links</h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <FormField
                        control={form.control}
                        name="socials.instagram"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Instagram URL</FormLabel>
                            <FormControl>
                            <Input placeholder="https://instagram.com/..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="socials.github"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>GitHub URL</FormLabel>
                            <FormControl>
                            <Input placeholder="https://github.com/..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="socials.linkedin"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>LinkedIn URL</FormLabel>
                            <FormControl>
                            <Input placeholder="https://linkedin.com/in/..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
                
                <Separator />
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Extra Links / Buttons</h3>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => append({ label: "", url: "" })}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Link
                    </Button>
                </div>

                <div className="space-y-4">
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex gap-4 items-end p-4 border rounded-lg">
                             <FormField
                                control={form.control}
                                name={`extraLinks.${index}.label`}
                                render={({ field }) => (
                                <FormItem className="flex-grow">
                                    <FormLabel>Button Label</FormLabel>
                                    <FormControl>
                                    <Input placeholder="e.g. My Blog" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name={`extraLinks.${index}.url`}
                                render={({ field }) => (
                                <FormItem className="flex-grow">
                                    <FormLabel>Button URL</FormLabel>
                                    <FormControl>
                                    <Input placeholder="https://example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>


                <div className="flex justify-end gap-2 pt-4">
                    <Button type="button" variant="outline" onClick={onCancel} disabled={isPending}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isPending}>
                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Update
                    </Button>
                </div>
            </form>
            </Form>
        </CardContent>
    </Card>
  );
}
