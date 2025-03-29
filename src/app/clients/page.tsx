"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getClients, ClientSimple } from "@/api/clients";
import { Input } from "@/components/ui/input";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useDebounce } from "@/hooks/useDebounce";
import { toast } from "sonner";

export default function ClientsPage() {
  const [clients, setClients] = useState<ClientSimple[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState({ totalPages: 0 });
  const debouncedSearch = useDebounce(searchQuery, 300);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const { clients: initialClients, pageInfo } = await getClients({
          page: 0,
          size: 15,
          keyword: ""
        });
        setClients(initialClients);
        setPageInfo(pageInfo);
      } catch (error) {
        console.error("Error fetching clients:", error);
        toast.error("Failed to load clients");
      }
    };

    fetchClients();
  }, []);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const { clients: newClients, pageInfo } = await getClients({
        page: currentPage,
        size: 15,
        keyword: debouncedSearch
      });

      setClients((prev) =>
        currentPage === 0 ? newClients : [...prev, ...newClients]
      );
      setHasMore(currentPage + 1 < pageInfo.totalPages);
      setCurrentPage((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to load clients:", error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, debouncedSearch, isLoading, hasMore]);

  const { observerRef } = useInfiniteScroll(loadMore);

  return (
    <div className="container px-4 py-10 md:px-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">MCP Clients</h1>
          <p className="text-zinc-400 max-w-3xl">
            A collection of AI apps and tools that are capable of functioning as
            MCP clients to interact with the growing list of{" "}
            <Link
              href="/servers"
              className="text-purple hover:text-purple-light"
            >
              MCP servers
            </Link>
            .
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
            placeholder="Search client name, language, feature, etc."
            className="bg-zinc-700 border-zinc-600"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {clients.length === 0 && !isLoading ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-zinc-800/60 p-4 mb-4">
            <Terminal className="h-6 w-6 text-zinc-400" />
          </div>
          <h3 className="text-xl font-semibold text-white">No clients found</h3>
          <p className="text-zinc-400 mt-2 max-w-md">
            {searchQuery
              ? `We couldn't find any clients matching "${searchQuery}". Try different keywords or browse all clients.`
              : "There are no clients available at the moment. Check back later or be the first to submit one!"}
          </p>
          {searchQuery && (
            <Button asChild variant="outline" className="mt-4">
              <Link href="/clients">View All Clients</Link>
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {clients.map((client) => (
            <Link key={client.id} href={`/clients/${client.id}`}>
              <Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-shrink-0">
                      <Terminal className="h-6 w-6 text-purple" />
                    </div>
                    <div className="min-w-0 flex items-center gap-2">
                      <h2
                        className={`text-lg font-semibold truncate flex-1 ${
                          client.name.length > 20 ? "truncate" : ""
                        }`}
                      >
                        {client.name}
                      </h2>
                      {client.isOfficial && (
                        <Badge variant="secondary" className="flex-shrink-0">
                          Official
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 mb-4 line-clamp-3">
                    {client.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {client.tags
                      ?.slice(0, 5)
                      .map((tag: string, index: number) => (
                        <Badge
                          key={`${client.id}-${tag}-${index}`}
                          variant="outline"
                        >
                          {tag}
                        </Badge>
                      ))}
                    {client.tags?.length > 5 && (
                      <Badge
                        variant="outline"
                        className="bg-zinc-800"
                        key={`${client.id}-more-tags`}
                      >
                        +{client.tags.length - 5}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-zinc-500">
                    <div className="flex items-center gap-1">
                      <span>⭐</span>
                      <span>{client.stars}</span>
                    </div>
                    <div>{client.language}</div>
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
