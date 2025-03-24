import Image from "next/image";
import Link from "next/link";
import screenMcp from "@/assets/images/screen_mcp.png";
import screenGitHub from "@/assets/images/screen_github.png";

export function TemplateSection() {
  return (
    <section className="py-12 bg-zinc-950">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center rounded-md bg-zinc-800/60 px-3 py-1 text-sm font-medium text-zinc-200 ring-1 ring-inset ring-zinc-700/30 mb-2">
            <span className="mr-1 h-2 w-2 rounded-full bg-purple"></span>
            FEATURED USE CASES
          </div>
          <h2 className="text-3xl font-bold text-white">See MCP in Action</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto mt-4">
            Explore how developers are using MCP to create powerful AI
            applications
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden">
            <div className="h-48 sm:h-64 overflow-hidden">
              <Image
                src={screenMcp}
                alt="MCP Connection Example"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    AI-Powered Data Analysis
                  </h3>
                  <p className="text-sm text-zinc-400 mt-1">
                    By OpenSource AI Lab
                  </p>
                </div>
                <div className="bg-purple/10 text-purple rounded-full px-3 py-1 text-xs font-medium">
                  Data Science
                </div>
              </div>
              <p className="text-zinc-400 mb-6">
                Connect Claude or GPT models to your database through MCP,
                enabling natural language queries that fetch, analyze, and
                visualize data instantly.
              </p>
              <Link
                href="/use-cases/ai-data-analysis"
                className="inline-flex items-center text-sm font-medium text-purple hover:text-purple-400"
              >
                View Case Study
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-1 h-4 w-4"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden">
            <div className="h-48 sm:h-64 overflow-hidden">
              <Image
                src={screenGitHub}
                alt="GitHub Integration"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    GitHub Code Assistant
                  </h3>
                  <p className="text-sm text-zinc-400 mt-1">By DevTools Inc.</p>
                </div>
                <div className="bg-purple/10 text-purple rounded-full px-3 py-1 text-xs font-medium">
                  Developer Tools
                </div>
              </div>
              <p className="text-zinc-400 mb-6">
                A custom MCP server that connects LLMs to GitHub APIs, enabling
                AI assistants to search repositories, create pull requests, and
                suggest code improvements.
              </p>
              <Link
                href="/use-cases/github-code-assistant"
                className="inline-flex items-center text-sm font-medium text-purple hover:text-purple-400"
              >
                View Case Study
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-1 h-4 w-4"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <Link
            href="/use-cases"
            className="inline-flex h-10 items-center justify-center rounded-md bg-purple px-6 py-2 text-sm font-medium text-white hover:bg-purple-700 transition-colors"
          >
            View All Use Cases
          </Link>
        </div>
      </div>
    </section>
  );
}
