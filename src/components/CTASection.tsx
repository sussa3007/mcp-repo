import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-16 bg-zinc-900">
      <div className="container px-4 md:px-6">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple/20 to-purple-700/20 border border-zinc-700 p-8 md:p-12">
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-purple/30 blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-purple/30 blur-3xl"></div>

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What does MCP Repo do?
            </h2>
            <p className="text-lg text-zinc-300 mb-8">
              MCPRepo believes in the potential of the Model Context Protocol
              (MCP). We created the MCP Repo with the goal of accelerating the
              growth of the ecosystem and envisioning a much more universal use
              of MCP than it is today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="https://github.com/modelcontextprotocol"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-md bg-zinc-800 px-8 font-medium text-white border border-zinc-700 hover:bg-zinc-700 transition-colors"
              >
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
                  className="mr-2 h-5 w-5"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
                GitHub Repos
              </Link>
              <Link
                href="/submit"
                className="inline-flex h-12 items-center justify-center rounded-md bg-purple px-8 font-medium text-white hover:bg-purple-700 transition-colors"
              >
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
                  className="mr-2 h-5 w-5"
                >
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                Submit Your Project
              </Link>
            </div>

            <div className="mt-8 text-sm text-zinc-400">
              Have questions about MCP? Join our{" "}
              <Link
                href="https://discord.gg/mcp"
                className="text-purple hover:text-purple-400"
              >
                Discord community
              </Link>{" "}
              for support and discussions.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
