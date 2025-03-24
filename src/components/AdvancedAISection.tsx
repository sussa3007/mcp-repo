import Image from "next/image";
import mcpLogo from "@/assets/images/mcp-logo.svg";

export function AdvancedAISection() {
  return (
    <section className="py-16 bg-zinc-900">
      <div className="container px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center rounded-md bg-zinc-800/60 px-3 py-1 text-sm font-medium text-zinc-200 ring-1 ring-inset ring-zinc-700/30 mb-2">
              <span className="mr-1 h-2 w-2 rounded-full bg-purple"></span>
              MCP OVERVIEW
            </div>
            <h2 className="text-3xl font-bold text-white">
              How Model Context Protocol Works
            </h2>
            <div className="space-y-6 text-zinc-400">
              <p>
                Model Context Protocol (MCP) is a standardized communication
                protocol that enables AI language models to seamlessly interact
                with external tools and services.
              </p>

              <div className="pl-4 border-l-2 border-purple">
                <h3 className="text-white font-medium mb-1">
                  1. Client Request
                </h3>
                <p className="text-sm">
                  An MCP client formats user requests and context into a
                  standardized protocol format that any MCP-compatible model can
                  understand.
                </p>
              </div>

              <div className="pl-4 border-l-2 border-purple">
                <h3 className="text-white font-medium mb-1">
                  2. Model Processing
                </h3>
                <p className="text-sm">
                  The AI model processes the request and may decide to use
                  external tools to fulfill the user's needs, signaling this via
                  MCP function calls.
                </p>
              </div>

              <div className="pl-4 border-l-2 border-purple">
                <h3 className="text-white font-medium mb-1">
                  3. Server Response
                </h3>
                <p className="text-sm">
                  MCP servers execute the requested functions and return results
                  in a standardized format that the model can incorporate into
                  its response.
                </p>
              </div>

              <div className="pl-4 border-l-2 border-purple">
                <h3 className="text-white font-medium mb-1">
                  4. Enhanced Output
                </h3>
                <p className="text-sm">
                  The model synthesizes information from the tools with its own
                  knowledge to provide comprehensive, contextually relevant
                  responses.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-purple/20 rounded-full blur-3xl opacity-30"></div>
              <div className="relative bg-zinc-800/60 border border-zinc-700 rounded-xl p-8 shadow-xl">
                <div className="flex justify-center mb-8">
                  <Image
                    src={mcpLogo}
                    alt="MCP Logo"
                    width={120}
                    height={120}
                    className="h-24 w-auto"
                  />
                </div>

                <div className="space-y-6">
                  <div className="bg-zinc-900 rounded-lg p-4 border border-zinc-700">
                    <h4 className="text-sm font-medium text-purple mb-2">
                      Client Request
                    </h4>
                    <code className="text-xs text-zinc-400 block overflow-x-auto">
                      {`{
  "messages": [...],
  "metadata": { "client": "mcp-web" },
  "available_functions": [
    { "name": "search_web", ... }
  ]
}`}
                    </code>
                  </div>

                  <div className="bg-zinc-900 rounded-lg p-4 border border-zinc-700">
                    <h4 className="text-sm font-medium text-purple mb-2">
                      Function Call
                    </h4>
                    <code className="text-xs text-zinc-400 block overflow-x-auto">
                      {`{
  "function_calls": [
    { 
      "name": "search_web",
      "arguments": { "query": "latest MCP news" }
    }
  ]
}`}
                    </code>
                  </div>

                  <div className="bg-zinc-900 rounded-lg p-4 border border-zinc-700">
                    <h4 className="text-sm font-medium text-purple mb-2">
                      Model Response
                    </h4>
                    <code className="text-xs text-zinc-400 block overflow-x-auto">
                      {`{
  "content": "Based on recent news...",
  "metadata": {
    "used_functions": ["search_web"]
  }
}`}
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
