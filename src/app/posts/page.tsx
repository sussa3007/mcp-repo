import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getPosts } from "@/api/posts";
import { Calendar, Clock, User } from "lucide-react";

export default async function PostsPage() {
  // 포스트 목록 가져오기
  const posts = await getPosts();

  return (
    <div className="container px-4 py-10 md:px-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">MCP Blog Posts</h1>
          <p className="text-zinc-400">
            News, updates, and in-depth discussions about the Model Context
            Protocol ecosystem.
          </p>
        </div>
        <Button asChild variant="purple">
          <Link href="/">Subscribe</Link>
        </Button>
      </div>

      <div className="grid gap-8">
        {posts.map((post) => (
          <Link key={post.id} href={`/posts/${post.id}`}>
            <Card className="bg-zinc-800/50 border-zinc-700 overflow-hidden hover:bg-zinc-800 transition-colors">
              <div className="md:flex">
                {post.imageUrl && (
                  <div className="relative h-48 md:h-auto md:w-64 md:flex-shrink-0">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      className="object-cover h-full w-full"
                      width={300}
                      height={200}
                    />
                  </div>
                )}
                <div className="flex-1">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex items-center gap-1 text-zinc-500 text-xs">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <span className="h-1 w-1 rounded-full bg-zinc-500"></span>
                      <div className="flex items-center gap-1 text-zinc-500 text-xs">
                        <Badge className="bg-purple/20 text-purple border-purple-dark">
                          {post.category}
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className="text-xl text-white hover:text-purple-light">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-zinc-400 mb-3 line-clamp-2">
                      {post.summary}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 mt-2">
                        {post.author.avatarUrl && (
                          <div className="h-6 w-6 relative overflow-hidden rounded-full">
                            <Image
                              src={post.author.avatarUrl}
                              alt={post.author.name}
                              className="object-cover"
                              width={24}
                              height={24}
                            />
                          </div>
                        )}
                        <span className="text-sm text-zinc-400">
                          {post.author.name}
                        </span>
                      </div>
                      <div className="text-zinc-500 text-xs">
                        {/* 읽는 시간 계산: 내용이 약 200 단어당 1분으로 가정 */}
                        약{" "}
                        {Math.max(
                          1,
                          Math.ceil(post.summary.split(" ").length / 200)
                        )}
                        분 소요
                      </div>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
