"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TagInput } from "@/components/ui/tag-input";
import { submitProject } from "@/api/submissions";
import { useRouter } from "next/navigation";
import { ApiError } from "@/api/api-service";

// 폼 유효성 검증 스키마
const formSchema = z.object({
  name: z
    .string()
    .min(1, "Project name is required")
    .max(50, "Project name must be less than 50 characters"),
  author: z
    .string()
    .min(1, "Author name is required")
    .max(50, "Author name must be less than 50 characters"),
  type: z.enum(["server", "client"]),
  description: z.string().min(1, "Description is required"),
  repoUrl: z
    .string()
    .min(1, "Repository URL is required")
    .url("Please enter a valid URL"),
  websiteUrl: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  tags: z.array(
    z
      .string()
      .min(1, "Tag cannot be empty")
      .max(20, "Tag must be less than 20 characters")
  ),
  email: z
    .string()
    .email("Please enter a valid email")
    .optional()
    .or(z.literal(""))
});

type SubmitFormData = z.infer<typeof formSchema>;

export default function SubmitPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SubmitFormData>({
    resolver: zodResolver(formSchema)
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues
  } = form;

  const onSubmit = async (data: SubmitFormData) => {
    try {
      setIsSubmitting(true);

      // Convert empty strings to null for optional fields
      const websiteUrl = data.websiteUrl?.trim() || null;
      const email = data.email?.trim() || null;

      const response = await submitProject({
        name: data.name,
        author: data.author,
        type: data.type,
        description: data.description,
        repoUrl: data.repoUrl,
        websiteUrl,
        tags: data.tags,
        email
      });

      if (response.status === "SUCCESS") {
        toast.success("Project submitted successfully!");
        router.push("/");
      } else {
        toast.error(response.message || "Failed to submit project");
      }
    } catch (error) {
      console.error("Submit error:", error);
      if (error instanceof ApiError && error.statusCode === 403) {
        toast.error("Please sign in to continue");
      } else {
        toast.error("Failed to submit project. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const input = e.currentTarget;
      const value = input.value.trim();

      if (value && value.length <= 20) {
        if (!getValues("tags").includes(value)) {
          setValue("tags", [...getValues("tags"), value]);
          input.value = "";
        }
      } else if (value.length > 20) {
        toast.error("Tag must be less than 20 characters");
      }
    }
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-10 md:px-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Submit to MCPRepo
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          Share your MCP server or client with the community. All submissions
          are reviewed before being added to the directory.
        </p>
      </div>

      <Card className="bg-zinc-800/50 border-zinc-700">
        <CardHeader>
          <CardTitle className="text-white">Submission Form</CardTitle>
          <CardDescription className="text-zinc-400">
            Fill out the details below to submit your MCP server or client.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-zinc-300">
                    Project Name
                  </Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="e.g. My MCP Server"
                    className="bg-zinc-700 border-zinc-600"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="author" className="text-zinc-300">
                    Author / Organization
                  </Label>
                  <Input
                    id="author"
                    {...register("author")}
                    placeholder="e.g. Your Name or Company"
                    className="bg-zinc-700 border-zinc-600"
                  />
                  {errors.author && (
                    <p className="text-red-500 text-sm">
                      {errors.author.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="type" className="text-zinc-300">
                  Type
                </Label>
                <select
                  id="type"
                  {...register("type")}
                  className="flex h-10 w-full rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-white ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select Type</option>
                  <option value="server">MCP Server</option>
                  <option value="client">MCP Client</option>
                </select>
                {errors.type && (
                  <p className="text-red-500 text-sm">{errors.type.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-zinc-300">
                  Description
                </Label>
                <textarea
                  id="description"
                  {...register("description")}
                  placeholder="Describe what your server/client does and its main features"
                  className="min-h-[120px] w-full rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-white placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="repoUrl" className="text-zinc-300">
                  Repository URL
                </Label>
                <Input
                  id="repoUrl"
                  {...register("repoUrl")}
                  placeholder="e.g. https://github.com/username/repository"
                  className="bg-zinc-700 border-zinc-600"
                />
                {errors.repoUrl && (
                  <p className="text-red-500 text-sm">
                    {errors.repoUrl.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="websiteUrl" className="text-zinc-300">
                  Website URL (optional)
                </Label>
                <Input
                  id="websiteUrl"
                  {...register("websiteUrl")}
                  placeholder="e.g. https://yourwebsite.com"
                  className="bg-zinc-700 border-zinc-600"
                />
                {errors.websiteUrl && (
                  <p className="text-red-500 text-sm">
                    {errors.websiteUrl.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags" className="text-zinc-300">
                  Tags (comma separated, max 10)
                </Label>
                <Controller
                  name="tags"
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => (
                    <TagInput
                      id="tags"
                      value={field.value}
                      onValueChange={(newTags) => {
                        // Limit to 10 tags
                        if (newTags.length <= 10) {
                          field.onChange(newTags);
                        } else {
                          // Keep only the first 10 tags
                          field.onChange(newTags.slice(0, 10));
                          toast.error("Maximum 10 tags allowed");
                        }
                      }}
                      placeholder="Enter tags and press comma or enter"
                      error={errors.tags?.message}
                    />
                  )}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-300">
                  Contact Email (optional)
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="For verification and communication"
                  className="bg-zinc-700 border-zinc-600"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-purple hover:bg-purple-dark text-white"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>

            <p className="text-xs text-zinc-500 text-center mt-4">
              By submitting, you agree to our{" "}
              <a
                href="/terms-of-service"
                className="text-purple hover:text-purple-light"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="/privacy-policy"
                className="text-purple hover:text-purple-light"
              >
                Privacy Policy
              </a>
              .
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
