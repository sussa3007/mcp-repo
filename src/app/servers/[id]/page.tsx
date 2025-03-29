import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getServerById } from "@/api/servers";
import { getGithubReadme, getGithubContents } from "@/api/github";
import Image from "next/image";
import Link from "next/link";
import {
  ExternalLink,
  Star,
  GitFork,
  FileIcon,
  FolderIcon,
  Server,
  Settings,
  Terminal,
  Database,
  Wrench
} from "lucide-react";
import CustomMarkdown from "@/components/markdown/CustomMarkdown";
import ContentExplorer from "@/components/ContentExplorer";

// GitHub repository metadata UI component
function RepositoryMeta({ server }: { server: any }) {
  return (
    <div className="flex flex-wrap gap-6 py-6 border-b border-zinc-800">
      <div className="flex items-center gap-2">
        <Star className="h-4 w-4 text-yellow-400" />
        <span>{server.stars} stars</span>
      </div>
      <div className="flex items-center gap-2">
        <GitFork className="h-4 w-4 text-zinc-400" />
        <span>{server.forks} forks</span>
      </div>
      <div>
        <Badge variant="outline" className="text-xs">
          {server.language}
        </Badge>
      </div>
      {server.license && (
        <div>
          <Badge variant="outline" className="text-xs">
            {server.license}
          </Badge>
        </div>
      )}
      {server.updatedAt && (
        <div>
          <Badge variant="outline" className="text-xs">
            Updated {new Date(server.updatedAt).toLocaleDateString()}
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

// MCP Tools component
function McpTools({ tools }: { tools: any[] }) {
  if (!tools || tools.length === 0) {
    return (
      <div className="text-center py-8">
        <Wrench className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-zinc-400">
          No tools available
        </h3>
        <p className="text-sm text-zinc-500 mt-2">
          This server has not specified any MCP tools.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tools.map((tool, index) => (
        <Card key={index} className="bg-zinc-900 border-zinc-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Wrench className="h-4 w-4 text-purple" />
              <span>{tool.name}</span>
              {tool.isRequired && (
                <Badge className="bg-purple text-white ml-2 text-xs">
                  Required
                </Badge>
              )}
              {tool.version && (
                <Badge variant="outline" className="text-xs ml-auto">
                  v{tool.version}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-zinc-400 mb-3">{tool.description}</p>
            {tool.usageInfo && (
              <div className="mb-3">
                <p className="text-xs text-zinc-500 mb-1">Usage:</p>
                <pre className="text-xs bg-zinc-950 p-3 rounded-md overflow-x-auto">
                  <code>{tool.usageInfo}</code>
                </pre>
              </div>
            )}
            {tool.documentation && (
              <div className="mt-2">
                <Link
                  href={tool.documentation}
                  target="_blank"
                  className="text-xs text-purple hover:text-purple-light flex items-center gap-1"
                >
                  <ExternalLink className="h-3 w-3" />
                  Documentation
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Environment variables UI component
function EnvironmentVariables({ envVars }: { envVars: any[] }) {
  if (!envVars || envVars.length === 0) {
    return (
      <div className="text-center py-8">
        <Settings className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-zinc-400">
          No environment variables
        </h3>
        <p className="text-sm text-zinc-500 mt-2">
          This server has not defined any environment variables.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-zinc-800 overflow-hidden">
      <div className="bg-zinc-900 p-3 border-b border-zinc-800">
        <h3 className="text-sm font-medium">Environment Variables</h3>
      </div>
      <div className="divide-y divide-zinc-800">
        {envVars.map((env) => (
          <div key={env.name} className="p-3 hover:bg-zinc-800/50">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <code className="text-sm font-semibold">{env.name}</code>
              {env.required && (
                <Badge variant="destructive" className="text-xs">
                  Required
                </Badge>
              )}
              {env.type && (
                <Badge variant="outline" className="text-xs">
                  {env.type}
                </Badge>
              )}
            </div>
            <p className="text-sm text-zinc-400">{env.description}</p>
            {env.defaultValue && (
              <p className="text-xs text-zinc-500 mt-1">
                Default: <code>{env.defaultValue}</code>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Contributors list UI component
function Contributors({ contributors }: { contributors: any[] }) {
  if (!contributors || contributors.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-4 mt-4">
      {contributors.map((contributor) => (
        <a
          key={contributor.name}
          href={contributor.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-2"
        >
          <Image
            src={contributor.avatarUrl}
            alt={contributor.name}
            width={50}
            height={50}
            className="rounded-full"
          />
          <span className="text-xs">{contributor.name}</span>
        </a>
      ))}
    </div>
  );
}

// Server commands UI component
function ServerCommands({ commands }: { commands: any[] }) {
  if (!commands || commands.length === 0) {
    return (
      <div className="text-center py-8">
        <Terminal className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-zinc-400">
          No commands available
        </h3>
        <p className="text-sm text-zinc-500 mt-2">
          This server has not defined any commands.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {commands.map((command, index) => (
        <div key={index} className="space-y-2">
          <h4 className="text-sm font-medium">{command.name}</h4>
          <p className="text-sm text-zinc-400">{command.description}</p>
          <pre className="text-xs bg-zinc-950 p-3 rounded-md overflow-x-auto">
            <code>{command.command}</code>
          </pre>
        </div>
      ))}
    </div>
  );
}

// Database information component
function DatabaseInfo({ database }: { database: any }) {
  if (!database) {
    return (
      <div className="text-center py-8">
        <Database className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-zinc-400">
          No database information
        </h3>
        <p className="text-sm text-zinc-500 mt-2">
          This server has not provided any database information.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Database className="h-5 w-5 text-zinc-400" />
        <h3 className="text-lg font-medium">{database.type}</h3>
      </div>
      <p className="text-sm text-zinc-400">{database.description}</p>
      {database.descriptionSchema && (
        <pre className="text-xs bg-zinc-950 p-3 rounded-md overflow-x-auto">
          <code>{database.descriptionSchema}</code>
        </pre>
      )}
    </div>
  );
}

// System requirements UI component
function SystemRequirements({
  requirements,
  error
}: {
  requirements: any;
  error?: string | null;
}) {
  if (error) {
    return (
      <div className="text-center py-8">
        <Settings className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-zinc-400">
          Failed to load system requirements
        </h3>
        <p className="text-sm text-zinc-500 mt-2">{error}</p>
      </div>
    );
  }

  if (!requirements) {
    return (
      <div className="text-center py-8">
        <Settings className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-zinc-400">
          No system requirements specified
        </h3>
        <p className="text-sm text-zinc-500 mt-2">
          This server has not specified any system requirements.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {requirements.hardware && (
        <div>
          <h3 className="text-sm font-medium mb-2">Hardware Requirements</h3>
          <ul className="list-disc pl-5 space-y-1">
            {requirements.hardware.map((req: string, index: number) => (
              <li key={index} className="text-sm text-zinc-400">
                {req}
              </li>
            ))}
          </ul>
        </div>
      )}
      {requirements.software && (
        <div>
          <h3 className="text-sm font-medium mb-2">Software Requirements</h3>
          <ul className="list-disc pl-5 space-y-1">
            {requirements.software.map((req: string, index: number) => (
              <li key={index} className="text-sm text-zinc-400">
                {req}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default async function ServerDetailPage({ params }: { params: any }) {
  try {
    // Process params object asynchronously
    const resolvedParams = await params;
    const serverId = resolvedParams.id;

    // Get server data
    const server = await getServerById(serverId);

    if (!server) {
      notFound();
    }

    // Transform system requirements data if it exists
    const systemRequirements = server.systemRequirements
      ? {
          hardware:
            typeof server.systemRequirements.hardware === "string"
              ? [server.systemRequirements.hardware]
              : server.systemRequirements.hardware || [],
          software:
            typeof server.systemRequirements.software === "string"
              ? [server.systemRequirements.software]
              : server.systemRequirements.software || []
        }
      : undefined;

    // Get GitHub repository README and contents
    let readmeContent = "";
    let readmeError = null;
    let contents: any[] = [];
    let contentsError = null;

    if (server.owner && server.repo) {
      try {
        const readme = await getGithubReadme(server.owner, server.repo);
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
        contents = await getGithubContents(server.owner, server.repo);
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
              <Server className="h-8 w-8 text-purple" />
              <h1 className="text-3xl font-bold text-white">{server.name}</h1>
              {server.isOfficial && (
                <Badge className="bg-purple text-white">Official</Badge>
              )}
              {server.githubUrl && (
                <Button
                  variant="outline"
                  className="ml-auto hover:bg-purple hover:text-white hover:border-purple transition-all gap-2"
                  asChild
                >
                  <Link
                    href={server.githubUrl}
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
                    GitHub Repo ({server.stars}k stars)
                  </Link>
                </Button>
              )}
            </div>
            <p className="text-zinc-400 max-w-3xl">{server.description}</p>
            <TagList tags={server.tags} />
          </div>

          <RepositoryMeta server={server} />

          <Tabs defaultValue="readme" className="w-full">
            <TabsList>
              <TabsTrigger value="readme">README</TabsTrigger>
              <TabsTrigger value="contents">Contents</TabsTrigger>
              <TabsTrigger value="tools">Tools</TabsTrigger>
              <TabsTrigger value="env">Environment</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
              <TabsTrigger value="commands">Commands</TabsTrigger>
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
                owner={server.owner}
                repo={server.repo}
                error={contentsError || undefined}
              />
            </TabsContent>

            <TabsContent value="tools" className="mt-4">
              <McpTools tools={server.mcpTools || []} />
            </TabsContent>

            <TabsContent value="env" className="mt-4">
              <EnvironmentVariables
                envVars={server.environmentVariables || []}
              />
            </TabsContent>

            <TabsContent value="system" className="mt-4">
              <div className="grid gap-6">
                {server.database && (
                  <div>
                    <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                      <Database className="h-5 w-5 text-purple" />
                      Database Information
                    </h3>
                    <Card className="bg-zinc-900 border-zinc-800">
                      <CardContent className="pt-6">
                        <DatabaseInfo database={server.database} />
                      </CardContent>
                    </Card>
                  </div>
                )}

                <SystemRequirements requirements={systemRequirements} />
              </div>
            </TabsContent>

            <TabsContent value="commands" className="mt-4">
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-purple" />
                  Server Commands
                </h3>
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardContent className="pt-6">
                    <ServerCommands commands={server.commands || []} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="contributors" className="mt-4">
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-purple"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  Contributors
                </h3>
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardContent className="pt-6">
                    <Contributors contributors={server.contributors || []} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in ServerDetailPage:", error);
    throw error; // Next.js will handle this and show the error page
  }
}
