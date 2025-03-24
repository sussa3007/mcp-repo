import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { getServers } from "@/api/servers";
import { StarIcon, GitForkIcon } from "lucide-react";

export default async function ServersPage() {
  // Get server list
  const servers = await getServers();

  return (
    <div className="container px-4 py-10 md:px-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            MCP Server Directory
          </h1>
          <p className="text-zinc-400">
            Built to work with a variety of{" "}
            <Link
              href="/clients"
              className="text-purple hover:text-purple-light"
            >
              MCP Clients
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
            placeholder="Search API, server name, provider name, etc."
            className="bg-zinc-700 border-zinc-600"
          />
          <Button variant="purple">Search</Button>
        </div>
      </div>

      <div className="inline-flex items-center rounded-md bg-zinc-800/60 px-3 py-1 text-sm font-medium text-zinc-200 ring-1 ring-inset ring-zinc-700/30">
        <span className="mr-1 h-2 w-2 rounded-full bg-purple"></span>
        LAST UPDATE: 18 HOURS AGO • {servers.length} SERVERS
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {servers.map((server) => (
          <Link key={server.id} href={`/servers/${server.id}`}>
            <Card className="bg-zinc-800/50 border-zinc-700 overflow-hidden hover:bg-zinc-800 transition-colors h-full">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-purple/10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-purple"
                    >
                      <path d="M19 6V4c0-1.1-.9-2-2-2H7C5.9 2 5 2.9 5 4v2"></path>
                      <path d="M5 14v4c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-4"></path>
                      <path d="M6 18h12"></path>
                      <path d="M6 6h12"></path>
                      <rect x="5" y="7" width="14" height="6" rx="1"></rect>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg text-white flex items-center gap-2">
                      {server.name}
                      {server.isOfficial && (
                        <Badge className="bg-purple text-white ml-2 text-xs">
                          Official
                        </Badge>
                      )}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-zinc-400 mb-4 min-h-[60px]">
                  {server.description}
                </CardDescription>
                <div className="flex flex-wrap gap-2 mb-4">
                  {server.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-zinc-700"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-zinc-500 text-xs">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3 text-yellow-500"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                      {server.stars}
                    </div>
                    <div className="text-xs text-zinc-500">
                      {server.language}
                    </div>
                  </div>
                  <div className="text-xs text-zinc-500">
                    {new Date(server.updatedAt).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
