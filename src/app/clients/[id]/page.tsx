import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getClientById } from "@/api/clients";
import { getGithubReadme, getGithubContents } from "@/api/github";
import Image from "next/image";
import Link from "next/link";
import {
  ExternalLink,
  Star,
  GitFork,
  FileIcon,
  FolderIcon
} from "lucide-react";
import CustomMarkdown from "@/components/markdown/CustomMarkdown";

// GitHub 저장소 메타데이터 UI 컴포넌트
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
      <div>
        <Badge variant="outline" className="text-xs">
          Updated {new Date(client.updatedAt).toLocaleDateString()}
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

// 사용 예제 UI 컴포넌트
function UsageExamples({ examples }: { examples: string[] }) {
  return (
    <div className="space-y-4">
      {examples.map((example, index) => (
        <Card key={index} className="bg-zinc-900 border-zinc-800">
          <CardContent className="pt-6">
            <pre className="text-xs bg-zinc-950 p-4 rounded-md overflow-x-auto">
              <code>{example}</code>
            </pre>
          </CardContent>
        </Card>
      ))}
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

export default async function ClientDetailPage({ params }: { params: any }) {
  try {
    // params 객체를 비동기적으로 처리
    const resolvedParams = await params;
    const clientId = resolvedParams.id;

    // 클라이언트 데이터 가져오기
    const client = await getClientById(clientId);

    // GitHub 리포지토리 README 가져오기
    const readme = await getGithubReadme(client.owner, client.repo);
    const readmeContent = Buffer.from(readme.content, "base64").toString(
      "utf-8"
    );

    // GitHub 리포지토리 파일 목록 가져오기
    const contents = await getGithubContents(client.owner, client.repo);

    return (
      <div className="container py-10 px-4 md:px-6">
        <div className="space-y-6">
          {/* 헤더 섹션 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold text-white">{client.name}</h1>
              {client.isOfficial && (
                <Badge className="bg-purple">Official</Badge>
              )}
            </div>
            <p className="text-zinc-400">{client.description}</p>
            <div className="flex flex-wrap gap-3 mt-4">
              <Button asChild variant="outline">
                <Link
                  href={client.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  GitHub Repository
                </Link>
              </Button>
            </div>
          </div>

          {/* 메타데이터 및 태그 */}
          <RepositoryMeta client={client} />
          <TagList tags={client.tags} />

          {/* 탭 콘텐츠 */}
          <Tabs defaultValue="readme" className="w-full">
            <TabsList className="bg-zinc-800/50 text-zinc-400">
              <TabsTrigger value="readme">README</TabsTrigger>
              <TabsTrigger value="files">Files</TabsTrigger>
              <TabsTrigger value="usage">Usage</TabsTrigger>
              <TabsTrigger value="info">Info</TabsTrigger>
            </TabsList>

            <TabsContent value="readme" className="pt-4">
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardContent className="pt-6">
                  <CustomMarkdown colorScheme="darkPurple">
                    {readmeContent}
                  </CustomMarkdown>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="files" className="pt-4">
              <ContentExplorer contents={contents} />
            </TabsContent>

            <TabsContent value="usage" className="pt-4">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Installation</h3>
                  <pre className="bg-zinc-900 p-4 rounded-md">
                    <code>{client.installInstructions}</code>
                  </pre>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Usage Examples</h3>
                  <UsageExamples examples={client.usageExamples || []} />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="info" className="pt-4">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">
                    Supported Languages
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {client.supportedLanguages.map((lang: string) => (
                      <Badge key={lang} variant="outline">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Platforms</h3>
                  <div className="flex flex-wrap gap-2">
                    {client.platforms.map((platform: string) => (
                      <Badge key={platform} variant="outline">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Contributors</h3>
                  <Contributors contributors={client.contributors} />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching client:", error);
    notFound();
  }
}
