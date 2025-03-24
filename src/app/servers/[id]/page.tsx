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
  Database
} from "lucide-react";
import CustomMarkdown from "@/components/markdown/CustomMarkdown";

// GitHub 저장소 메타데이터 UI 컴포넌트
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
      <div>
        <Badge variant="outline" className="text-xs">
          Updated {new Date(server.updatedAt).toLocaleDateString()}
        </Badge>
      </div>
    </div>
  );
}

// 파일/폴더 목록 UI 컴포넌트
function ContentExplorer({ contents }: { contents: any[] }) {
  return (
    <div className="rounded-md border border-zinc-800 overflow-hidden">
      <div className="bg-zinc-900 p-3 border-b border-zinc-800">
        <h3 className="text-sm font-medium">Repository Contents</h3>
      </div>
      <div className="divide-y divide-zinc-800">
        {contents.map((item) => (
          <div
            key={item.path}
            className="flex items-center gap-2 p-3 hover:bg-zinc-800/50"
          >
            {item.type === "dir" ? (
              <FolderIcon className="h-4 w-4 text-zinc-400" />
            ) : (
              <FileIcon className="h-4 w-4 text-zinc-400" />
            )}
            <span className="text-sm">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 태그 목록 UI 컴포넌트
function TagList({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 my-4">
      {tags.map((tag) => (
        <Badge key={tag} variant="secondary" className="bg-zinc-800">
          {tag}
        </Badge>
      ))}
    </div>
  );
}

// API 엔드포인트 UI 컴포넌트
function ApiEndpoints({ endpoints }: { endpoints: any[] }) {
  return (
    <div className="space-y-4">
      {endpoints.map((endpoint, index) => (
        <Card key={index} className="bg-zinc-900 border-zinc-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Badge
                variant={
                  endpoint.method === "GET"
                    ? "default"
                    : endpoint.method === "POST"
                    ? "destructive"
                    : "secondary"
                }
                className="text-xs"
              >
                {endpoint.method}
              </Badge>
              <code className="text-sm">{endpoint.path}</code>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-zinc-400 mb-3">{endpoint.description}</p>
            {endpoint.requestExample && (
              <div className="mb-3">
                <p className="text-xs text-zinc-500 mb-1">Request Example:</p>
                <pre className="text-xs bg-zinc-950 p-3 rounded-md overflow-x-auto">
                  <code>{endpoint.requestExample}</code>
                </pre>
              </div>
            )}
            {endpoint.responseExample && (
              <div>
                <p className="text-xs text-zinc-500 mb-1">Response Example:</p>
                <pre className="text-xs bg-zinc-950 p-3 rounded-md overflow-x-auto">
                  <code>{endpoint.responseExample}</code>
                </pre>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// 서버 환경 변수 UI 컴포넌트
function EnvironmentVariables({ envVars }: { envVars: any[] }) {
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

// 기여자 목록 UI 컴포넌트
function Contributors({ contributors }: { contributors: any[] }) {
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

// 서버 명령어 UI 컴포넌트
function ServerCommands({ commands }: { commands: any[] }) {
  return (
    <div className="space-y-4">
      {commands.map((command, index) => (
        <div key={index} className="space-y-2">
          <h4 className="text-sm font-medium">{command.name}</h4>
          <p className="text-sm text-zinc-400">{command.description}</p>
          <pre className="text-xs bg-zinc-950 p-3 rounded-md overflow-x-auto">
            <code>{command.example}</code>
          </pre>
        </div>
      ))}
    </div>
  );
}

export default async function ServerDetailPage({ params }: { params: any }) {
  try {
    // params 객체를 비동기적으로 처리
    const resolvedParams = await params;
    const serverId = resolvedParams.id;

    // 서버 데이터 가져오기
    const server = await getServerById(serverId);

    // GitHub 리포지토리 README 가져오기
    const readme = await getGithubReadme(server.owner, server.repo);
    const readmeContent = Buffer.from(readme.content, "base64").toString(
      "utf-8"
    );

    // GitHub 리포지토리 파일 목록 가져오기
    const contents = await getGithubContents(server.owner, server.repo);

    return (
      <div className="container py-10 px-4 md:px-6">
        <div className="space-y-6">
          {/* 헤더 섹션 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold text-white">{server.name}</h1>
              {server.isOfficial && (
                <Badge className="bg-purple">Official</Badge>
              )}
            </div>
            <p className="text-zinc-400">{server.description}</p>
            <div className="flex flex-wrap gap-3 mt-4">
              <Button asChild variant="outline">
                <Link
                  href={server.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  GitHub Repository
                </Link>
              </Button>
              {server.demoUrl && (
                <Button asChild variant="outline">
                  <Link
                    href={server.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Server className="h-4 w-4" />
                    Live Demo
                  </Link>
                </Button>
              )}
            </div>
          </div>

          {/* 메타데이터 및 태그 */}
          <RepositoryMeta server={server} />
          <TagList tags={server.tags} />

          {/* 탭 콘텐츠 */}
          <Tabs defaultValue="readme" className="w-full">
            <TabsList className="bg-zinc-800/50 text-zinc-400">
              <TabsTrigger value="readme">README</TabsTrigger>
              <TabsTrigger value="files">Files</TabsTrigger>
              <TabsTrigger value="api">API</TabsTrigger>
              <TabsTrigger value="config">Configuration</TabsTrigger>
              <TabsTrigger value="deployment">Deployment</TabsTrigger>
            </TabsList>

            <TabsContent value="readme" className="pt-4">
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardContent className="pt-6">
                  <CustomMarkdown colorScheme="darkGreen">
                    {readmeContent}
                  </CustomMarkdown>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="files" className="pt-4">
              <ContentExplorer contents={contents} />
            </TabsContent>

            <TabsContent value="api" className="pt-4">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">API Endpoints</h3>
                  <ApiEndpoints endpoints={server.apiEndpoints || []} />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="config" className="pt-4">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">
                    Environment Variables
                  </h3>
                  <EnvironmentVariables
                    envVars={server.environmentVariables || []}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">
                    Database Configuration
                  </h3>
                  <Card className="bg-zinc-900 border-zinc-800">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <Database className="h-5 w-5 text-zinc-400 mt-0.5" />
                        <div>
                          <h4 className="text-base font-medium">
                            {server.database?.type || "N/A"}
                          </h4>
                          <p className="text-sm text-zinc-400 mt-1">
                            {server.database?.description ||
                              "No database information available."}
                          </p>
                          {server.database?.schema && (
                            <pre className="text-xs bg-zinc-950 p-3 rounded-md mt-3 overflow-x-auto">
                              <code>{server.database.schema}</code>
                            </pre>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="deployment" className="pt-4">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">
                    System Requirements
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-zinc-900 border-zinc-800">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Settings className="h-4 w-4" />
                          Hardware
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          {server.systemRequirements?.hardware.map(
                            (req: string, index: number) => (
                              <li key={index}>{req}</li>
                            )
                          )}
                        </ul>
                      </CardContent>
                    </Card>
                    <Card className="bg-zinc-900 border-zinc-800">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Settings className="h-4 w-4" />
                          Software
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          {server.systemRequirements?.software.map(
                            (req: string, index: number) => (
                              <li key={index}>{req}</li>
                            )
                          )}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Server Commands</h3>
                  <ServerCommands commands={server.commands || []} />
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">
                    Deployment Options
                  </h3>
                  <div className="space-y-4">
                    {server.deploymentOptions?.map(
                      (option: any, index: number) => (
                        <Card
                          key={index}
                          className="bg-zinc-900 border-zinc-800"
                        >
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">
                              {option.name}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-zinc-400 mb-3">
                              {option.description}
                            </p>
                            <pre className="text-xs bg-zinc-950 p-3 rounded-md overflow-x-auto">
                              <code>{option.example}</code>
                            </pre>
                          </CardContent>
                        </Card>
                      )
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching server:", error);
    notFound();
  }
}
