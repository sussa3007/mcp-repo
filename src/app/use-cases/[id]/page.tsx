import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUseCaseById } from "@/api/use-cases";
import { ExternalLink, Calendar, User } from "lucide-react";
import CustomMarkdown from "@/components/markdown/CustomMarkdown";

// 관련 저장소 정보 타입 정의
type RepositoryItem = {
  id: string;
  name: string;
  description: string;
};

// 관련 서버/클라이언트 카드 컴포넌트
function RelatedRepositoryCard({
  item,
  type
}: {
  item: RepositoryItem;
  type: "server" | "client";
}) {
  return (
    <Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-all">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">
          <Link
            href={`/${type}s/${item.id}`}
            className="hover:text-purple transition-colors"
          >
            {item.name}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-zinc-400 line-clamp-2">{item.description}</p>
        <div className="mt-4">
          <Button asChild variant="outline" size="sm" className="text-xs h-8">
            <Link href={`/${type}s/${item.id}`}>View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
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

export default async function UseCaseDetailPage({ params }: { params: any }) {
  try {
    // params 객체를 비동기적으로 처리
    const resolvedParams = await params;
    const useCaseId = resolvedParams.id;

    // 사용 사례 데이터 가져오기
    const useCase = await getUseCaseById(useCaseId);

    return (
      <div className="container py-10 px-4 md:px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* 헤더 섹션 */}
          <div className="space-y-4">
            {useCase.imageUrl && (
              <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden">
                <Image
                  src={useCase.imageUrl}
                  alt={useCase.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-white">{useCase.title}</h1>

              <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(useCase.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{useCase.author.name}</span>
                </div>
              </div>

              <p className="text-lg text-zinc-300">{useCase.summary}</p>

              <TagList tags={useCase.tags} />
            </div>
          </div>

          {/* 메인 콘텐츠 */}
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardContent className="pt-6">
              <CustomMarkdown colorScheme="darkBlue">
                {useCase.content || ""}
              </CustomMarkdown>
            </CardContent>
          </Card>

          {/* 관련 서버 및 클라이언트 */}
          <div className="space-y-6">
            {useCase.servers && useCase.servers.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white">
                  관련 MCP 서버
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {useCase.servers.map((server: RepositoryItem) => (
                    <RelatedRepositoryCard
                      key={server.id}
                      item={server}
                      type="server"
                    />
                  ))}
                </div>
              </div>
            )}

            {useCase.clients && useCase.clients.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white">
                  관련 MCP 클라이언트
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {useCase.clients.map((client: RepositoryItem) => (
                    <RelatedRepositoryCard
                      key={client.id}
                      item={client}
                      type="client"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 공유 버튼 */}
          <div className="flex justify-center pt-4">
            <Button variant="outline" className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              Share This Use Case
            </Button>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching use case:", error);
    notFound();
  }
}
