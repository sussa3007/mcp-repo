import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getPostById } from "@/api/posts";
import CustomMarkdown from "@/components/markdown/CustomMarkdown";
import { Calendar, Share, User } from "lucide-react";

export default async function PostDetailPage({ params }: { params: any }) {
  try {
    // params 객체를 비동기적으로 처리
    const resolvedParams = await params;
    const postId = resolvedParams.id;

    // 포스트 데이터 가져오기
    const post = await getPostById(postId);

    return (
      <div className="container py-10 px-4 md:px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* 헤더 섹션 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge className="bg-purple/20 text-purple border-purple-dark">
                {post.category}
              </Badge>
              <div className="flex items-center gap-1 text-zinc-400 text-sm">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
              </div>
            </div>

            <h1 className="text-4xl font-bold text-white">{post.title}</h1>

            <p className="text-xl text-zinc-300">{post.summary}</p>

            <div className="flex items-center gap-3 pt-2 border-t border-zinc-800">
              <div className="flex items-center gap-2">
                {post.author.avatarUrl && (
                  <div className="h-10 w-10 relative overflow-hidden rounded-full">
                    <Image
                      src={post.author.avatarUrl}
                      alt={post.author.name}
                      className="object-cover"
                      width={40}
                      height={40}
                    />
                  </div>
                )}
                <div>
                  <div className="text-sm font-medium text-white">
                    {post.author.name}
                  </div>
                  <div className="text-xs text-zinc-400">
                    MCP 커뮤니티 기여자
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 이미지 섹션 */}
          {post.imageUrl && (
            <div className="relative w-full h-80 md:h-96 rounded-xl overflow-hidden">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* 본문 콘텐츠 */}
          <CustomMarkdown colorScheme="darkIndigo">
            {post.content || ""}
          </CustomMarkdown>

          {/* 태그 섹션 */}
          <div className="flex flex-wrap gap-2 pt-6 border-t border-zinc-800">
            {post.tags?.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-zinc-800">
                {tag}
              </Badge>
            ))}
          </div>

          {/* 관련 포스트 */}
          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-zinc-800">
              <h2 className="text-xl font-semibold text-white">관련 포스트</h2>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                {post.relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} href={`/posts/${relatedPost.id}`}>
                    <Card className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-all">
                      <CardContent className="p-4">
                        <h3 className="font-medium text-white mb-2">
                          {relatedPost.title}
                        </h3>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* 공유 버튼 */}
          <div className="flex justify-center pt-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Share className="h-4 w-4" />
              Share This Post
            </Button>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching post:", error);
    notFound();
  }
}
