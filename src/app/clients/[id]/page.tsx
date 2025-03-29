import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getClientById } from "@/api/clients";
import {
  getGithubReadme,
  getGithubContents,
  getFileContent,
  getDirectoryContents
} from "@/api/github";
import Image from "next/image";
import Link from "next/link";
import {
  ExternalLink,
  Star,
  GitFork,
  FileIcon,
  FolderIcon,
  Terminal,
  Users
} from "lucide-react";
import CustomMarkdown from "@/components/markdown/CustomMarkdown";
import ContentExplorer from "@/components/ContentExplorer";

// GitHub repository metadata UI component
function RepositoryMeta({ client }: { client: any }) {
  return (
    <div className="flex flex-wrap gap-6 py-6 border-b border-zinc-800">
      <div className="flex items-center gap-2">
        <Star className="h-4 w-4 text-yellow-400" />
        <span>{client.stars} stars</span>
      </div>
      <div className="flex items-center gap-2">
        <GitFork className="h-4 w-4 text-zinc-400" />
        <span>{client.forks} forks</span>
      </div>
      <div>
        <Badge variant="outline" className="text-xs">
          {client.language}
        </Badge>
      </div>
      {client.license && (
        <div>
          <Badge variant="outline" className="text-xs">
            {client.license}
          </Badge>
        </div>
      )}
      {client.updatedAt && (
        <div>
          <Badge variant="outline" className="text-xs">
            Updated {new Date(client.updatedAt).toLocaleDateString()}
          </Badge>
        </div>
      )}
    </div>
  );
}

// Tag list UI component
function TagList({ tags }: { tags: string[] }) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 my-4">
      {tags.map((tag, index) => (
        <Badge
          key={`tag-${tag}-${index}`}
          variant="secondary"
          className="bg-zinc-800"
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}

// Usage examples UI component
function UsageExamples({
  examples,
  error
}: {
  examples: string[];
  error?: string | null;
}) {
  if (error) {
    return (
      <div className="text-center py-8">
        <Terminal className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-zinc-400">
          Failed to load usage examples
        </h3>
        <p className="text-sm text-zinc-500 mt-2">{error}</p>
      </div>
    );
  }

  if (!examples || examples.length === 0) {
    return (
      <div className="text-center py-8">
        <Terminal className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-zinc-400">
          No usage examples available
        </h3>
        <p className="text-sm text-zinc-500 mt-2">
          This client has not provided any usage examples.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {examples.map((example, index) => (
        <div key={index} className="border border-zinc-800 rounded-lg p-4">
          <pre className="text-sm font-mono overflow-x-auto">{example}</pre>
        </div>
      ))}
    </div>
  );
}

// Contributors UI component
function Contributors({
  contributors,
  error
}: {
  contributors: any[];
  error?: string | null;
}) {
  if (error) {
    return (
      <div className="text-center py-8">
        <Users className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-zinc-400">
          Failed to load contributors
        </h3>
        <p className="text-sm text-zinc-500 mt-2">{error}</p>
      </div>
    );
  }

  if (!contributors || contributors.length === 0) {
    return (
      <div className="text-center py-8">
        <Users className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-zinc-400">
          No contributors found
        </h3>
        <p className="text-sm text-zinc-500 mt-2">
          This client has no contributors listed.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {contributors.map((contributor) => (
        <Link
          key={contributor.name}
          href={contributor.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3 rounded-lg border border-zinc-800 hover:bg-zinc-800/50 transition-colors"
        >
          <Image
            src={contributor.avatarUrl}
            alt={contributor.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <p className="text-sm font-medium">{contributor.name}</p>
            <p className="text-xs text-zinc-500">Contributor</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default async function ClientDetailPage({ params }: { params: any }) {
  try {
    // Process params object asynchronously
    const resolvedParams = await params;
    const clientId = resolvedParams.id;

    // Get client data
    const client = await getClientById(clientId);

    if (!client) {
      notFound();
    }

    // Get GitHub repository README and contents
    let readmeContent = "";
    let readmeError = null;
    let contents: any[] = [];
    let contentsError = null;

    if (client.owner && client.repo) {
      try {
        const readme = await getGithubReadme(client.owner, client.repo);
        if (readme && readme.content) {
          readmeContent = Buffer.from(readme.content, "base64").toString(
            "utf-8"
          );
        }
      } catch (error) {
        console.error("Error fetching README:", error);
        readmeError =
          error instanceof Error ? error.message : "Failed to load README";
      }

      try {
        contents = await getGithubContents(client.owner, client.repo);
      } catch (error) {
        console.error("Error fetching contents:", error);
        contentsError =
          error instanceof Error
            ? error.message
            : "Failed to load repository contents";
      }
    }

    return (
      <div className="container px-4 py-10 md:px-6">
        <div className="flex flex-col gap-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Terminal className="h-8 w-8 text-purple" />
              <h1 className="text-3xl font-bold text-white">{client.name}</h1>
              {client.isOfficial && (
                <Badge className="bg-purple text-white">Official</Badge>
              )}
              {client.githubUrl && (
                <Button
                  variant="outline"
                  className="ml-auto hover:bg-purple hover:text-white hover:border-purple transition-all gap-2"
                  asChild
                >
                  <Link
                    href={client.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                    GitHub Repo ({client.stars}k stars)
                  </Link>
                </Button>
              )}
            </div>
            <p className="text-zinc-400 max-w-3xl">{client.description}</p>
            <TagList tags={client.tags} />
          </div>

          <RepositoryMeta client={client} />

          <Tabs defaultValue="readme" className="w-full">
            <TabsList>
              <TabsTrigger value="readme">README</TabsTrigger>
              <TabsTrigger value="contents">Contents</TabsTrigger>
              <TabsTrigger value="usage">Usage</TabsTrigger>
              <TabsTrigger value="contributors">Contributors</TabsTrigger>
            </TabsList>

            <TabsContent value="readme" className="mt-4">
              {readmeError ? (
                <div className="text-center py-8">
                  <ExternalLink className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-zinc-400">
                    Failed to load README
                  </h3>
                  <p className="text-sm text-zinc-500 mt-2">{readmeError}</p>
                </div>
              ) : (
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardContent className="py-6 px-6">
                    <article className="prose prose-invert prose-zinc prose-sm max-w-none">
                      <CustomMarkdown>{readmeContent}</CustomMarkdown>
                    </article>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="contents" className="mt-4">
              <ContentExplorer
                owner={client.owner}
                repo={client.repo}
                error={contentsError || undefined}
              />
            </TabsContent>

            <TabsContent value="usage" className="mt-4">
              <UsageExamples
                examples={client.usageExamples || []}
                error={undefined}
              />
            </TabsContent>

            <TabsContent value="contributors" className="mt-4">
              <Contributors
                contributors={client.contributors || []}
                error={undefined}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in ClientDetailPage:", error);
    throw error; // Next.js will handle this and show the error page
  }
}
