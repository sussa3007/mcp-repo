"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getServers, ServerSimple } from "@/api/servers";
import { Input } from "@/components/ui/input";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useDebounce } from "@/hooks/useDebounce";
import { toast } from "sonner";

export default function ServersPage() {
  const [servers, setServers] = useState<ServerSimple[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState({ totalPages: 0 });
  const debouncedSearch = useDebounce(searchQuery, 300);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const { servers: newServers, pageInfo } = await getServers({
        page: currentPage,
        size: 15,
        keyword: debouncedSearch
      });

      setServers((prev) =>
        currentPage === 0 ? newServers : [...prev, ...newServers]
      );
      setHasMore(currentPage + 1 < pageInfo.totalPages);
      setCurrentPage((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to load servers:", error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, debouncedSearch, isLoading, hasMore]);

  const { observerRef } = useInfiniteScroll(loadMore);

  useEffect(() => {
    const fetchServers = async () => {
      try {
        const { servers: initialServers, pageInfo } = await getServers({
          page: 0,
          size: 15,
          keyword: ""
        });
        setServers(initialServers);
        setPageInfo(pageInfo);
      } catch (error) {
        console.error("Error fetching servers:", error);
        toast.error("Failed to load servers");
      }
    };

    fetchServers();
  }, []);

  return (
    <div className="container px-4 py-10 md:px-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">MCP Servers</h1>
          <p className="text-zinc-400 max-w-3xl">
            A collection of AI servers that implement the Model Context Protocol
            (MCP) for standardized AI interactions.
          </p>
        </div>
        <Button asChild variant="purple">
          <Link href="/submit">Submit</Link>
        </Button>
      </div>

      <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            name="search"
            placeholder="Search server name, language, feature, etc."
            className="bg-zinc-700 border-zinc-600"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {servers.length === 0 && !isLoading ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-zinc-800/60 p-4 mb-4">
            <Server className="h-6 w-6 text-zinc-400" />
          </div>
          <h3 className="text-xl font-semibold text-white">No servers found</h3>
          <p className="text-zinc-400 mt-2 max-w-md">
            {searchQuery
              ? `We couldn't find any servers matching "${searchQuery}". Try different keywords or browse all servers.`
              : "There are no servers available at the moment. Check back later or be the first to submit one!"}
          </p>
          {searchQuery && (
            <Button asChild variant="outline" className="mt-4">
              <Link href="/servers">View All Servers</Link>
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {servers.map((server) => (
            <Link key={server.id} href={`/servers/${server.id}`}>
              <Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-shrink-0">
                      <Server className="h-6 w-6 text-purple" />
                    </div>
                    <div className="min-w-0 flex items-center gap-2">
                      <h2
                        className={`text-lg font-semibold truncate flex-1 ${
                          server.name.length > 20 ? "truncate" : ""
                        }`}
                      >
                        {server.name}
                      </h2>
                      {server.isOfficial && (
                        <Badge variant="secondary" className="flex-shrink-0">
                          Official
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 mb-4 line-clamp-3">
                    {server.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {server.tags
                      ?.slice(0, 5)
                      .map((tag: string, index: number) => (
                        <Badge
                          key={`${server.id}-${tag}-${index}`}
                          variant="outline"
                        >
                          {tag}
                        </Badge>
                      ))}
                    {server.tags?.length > 5 && (
                      <Badge
                        variant="outline"
                        className="bg-zinc-800"
                        key={`${server.id}-more-tags`}
                      >
                        +{server.tags.length - 5}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-zinc-500">
                    <div className="flex items-center gap-1">
                      <span>⭐</span>
                      <span>{server.stars}</span>
                    </div>
                    <div>{server.language}</div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      <div
        ref={observerRef}
        className="w-full h-10 flex items-center justify-center"
      >
        {isLoading && (
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple"></div>
        )}
      </div>
    </div>
  );
}
