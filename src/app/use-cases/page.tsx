import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getUseCases } from "@/api/use-cases";
import { Calendar, User } from "lucide-react";

export default async function UseCasesPage() {
  // 사용 사례 목록 가져오기
  const useCases = await getUseCases();

  return (
    <div className="container px-4 py-10 md:px-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">MCP Use Cases</h1>
          <p className="text-zinc-400 max-w-3xl">
            Explore real-world applications and implementation strategies for
            the Model Context Protocol.
          </p>
        </div>
        <Button asChild variant="purple">
          <Link href="/use-cases/submit">Submit Use Case</Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {useCases.map((useCase) => (
          <Link key={useCase.id} href={`/use-cases/${useCase.id}`}>
            <Card className="bg-zinc-800/50 border-zinc-700 overflow-hidden hover:bg-zinc-800 transition-colors h-full">
              <div className="relative w-full h-40 overflow-hidden">
                {useCase.imageUrl && (
                  <Image
                    src={useCase.imageUrl}
                    alt={useCase.title}
                    className="object-cover"
                    fill
                  />
                )}
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-lg text-white line-clamp-2">
                    {useCase.title}
                  </CardTitle>
                </div>
                <div className="flex items-center gap-2 text-zinc-400 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(useCase.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-400 mb-4 line-clamp-3">
                  {useCase.summary}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {useCase.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-zinc-700"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-2 mt-4">
                  {useCase.author.avatarUrl && (
                    <div className="h-6 w-6 relative overflow-hidden rounded-full">
                      <Image
                        src={useCase.author.avatarUrl}
                        alt={useCase.author.name}
                        className="object-cover"
                        fill
                      />
                    </div>
                  )}
                  <span className="text-sm text-zinc-400">
                    {useCase.author.name}
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
