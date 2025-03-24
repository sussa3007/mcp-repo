import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getClients } from "@/api/clients";

export default async function ClientsPage() {
  // 클라이언트 목록 가져오기
  const clients = await getClients();

  // 공식 클라이언트와 그 외 클라이언트 분리
  const featuredClients = clients.filter((client) => client.isOfficial);
  const additionalClients = clients.filter((client) => !client.isOfficial);

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

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Featured</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featuredClients.map((client) => (
          <Link key={client.id} href={`/clients/${client.id}`}>
            <Card className="bg-zinc-800/50 border-zinc-700 overflow-hidden hover:bg-zinc-800 transition-colors h-full">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-zinc-700">
                    <div className="h-6 w-6 bg-purple rounded-sm flex items-center justify-center text-white font-bold">
                      {client.name.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <CardTitle className="text-lg text-white flex items-center gap-2">
                      {client.name}
                      <Badge className="bg-purple text-white ml-2 text-xs">
                        Official
                      </Badge>
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-400 mb-4 min-h-[60px]">
                  {client.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {client.tags.map((tag) => (
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
                      {client.stars}
                    </div>
                    <div className="text-xs text-zinc-500">
                      {client.language}
                    </div>
                  </div>
                  <div className="text-xs text-zinc-500">
                    {new Date(client.updatedAt).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <h2 className="text-xl font-semibold text-white mt-12 mb-4">
        Additional
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {additionalClients.map((client) => (
          <Link key={client.id} href={`/clients/${client.id}`}>
            <Card className="bg-zinc-800/50 border-zinc-700 overflow-hidden hover:bg-zinc-800 transition-colors h-full">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-zinc-700">
                    <div className="h-6 w-6 bg-purple rounded-sm flex items-center justify-center text-white font-bold">
                      {client.name.charAt(0)}
                    </div>
                  </div>
                  <CardTitle className="text-lg text-white">
                    {client.name}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-400 mb-4 min-h-[60px]">
                  {client.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {client.tags.map((tag) => (
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
                      {client.stars}
                    </div>
                    <div className="text-xs text-zinc-500">
                      {client.language}
                    </div>
                  </div>
                  <div className="text-xs text-zinc-500">
                    {new Date(client.updatedAt).toLocaleDateString()}
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
