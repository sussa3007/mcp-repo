"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/images/hero-image.svg";

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const scrollToTerminal = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = 99999; // Scroll to the bottom
      setHasScrolled(true);
    }
  };

  // Setup scroll event listener
  useEffect(() => {
    const chatContainer = chatContainerRef.current;

    const handleScroll = () => {
      if (chatContainer && !hasScrolled) {
        setHasScrolled(true);
      }
    };

    if (chatContainer) {
      chatContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (chatContainer) {
        chatContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [hasScrolled]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-b from-zinc-950 to-zinc-900 py-12 md:py-20"
      id="hero-section"
    >
      {/* Background patterns - optimized for performance */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-20 left-10 h-40 w-40 rounded-full bg-purple blur-3xl"></div>
        <div className="absolute bottom-10 right-10 h-60 w-60 rounded-full bg-purple-600 blur-3xl"></div>
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ opacity }}
            >
              <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl xl:text-6xl/none">
                Browse and discover MCP use cases, servers, clients, and news
              </h1>
              <motion.p
                className="text-zinc-400 md:text-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                The Model Context Protocol (MCP) ecosystem evolves daily. Stay
                current here.
              </motion.p>
            </motion.div>
            <motion.div
              className="flex flex-col gap-2 min-[400px]:flex-row"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="w-full md:w-2/3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="h-12 w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 text-white"
                />
              </div>
              <button className="h-12 rounded-md bg-purple px-4 sm:px-6 md:px-8 font-medium text-white hover:bg-purple-700">
                <span className="text-xs xs:text-sm sm:text-base whitespace-nowrap">
                  Weekly MCPRepo
                </span>
              </button>
            </motion.div>
            <motion.p
              className="text-xs text-zinc-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              Check out last week's edition:{" "}
              <Link
                href="/posts/newsletter-gemini-canvas-claude-search-stateless-mcp"
                className="text-purple hover:text-purple-light"
              >
                Gemini Canvas, Claude Web Search, Stateless Remote MCP
              </Link>
              .
            </motion.p>
          </motion.div>

          {/* New right section - Interactive UI */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            style={{ y, opacity }}
          >
            <div className="relative h-64 w-full md:h-96">
              <div className="absolute inset-0 rounded-lg bg-zinc-800/30 backdrop-blur-sm"></div>
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.8 }}
                ref={terminalRef}
              >
                <div
                  className="relative w-full rounded-lg bg-zinc-900 p-4 shadow-xl max-h-full overflow-y-auto"
                  ref={chatContainerRef}
                >
                  {/* Scroll down indicator - Top overlay */}
                  {!hasScrolled && (
                    <motion.div
                      className="absolute top-12 left-0 right-0 z-10 flex flex-col items-center justify-center cursor-pointer bg-gradient-to-b from-zinc-900 via-zinc-900/90 to-transparent py-4"
                      onClick={scrollToTerminal}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, y: [0, 5, 0] }}
                      transition={{
                        delay: 3.2,
                        duration: 1.2,
                        repeat: Infinity
                      }}
                    >
                      <span className="text-zinc-400 text-xs mb-1">
                        Scroll Down
                      </span>
                      <ChevronDown className="h-4 w-4 text-purple" />
                    </motion.div>
                  )}

                  <div className="flex items-center space-x-2 border-b border-zinc-700 pb-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <div className="ml-2 text-xs text-zinc-400">
                      MCP Use Case Example
                    </div>
                  </div>
                  <div className="mt-4 space-y-3">
                    <motion.div
                      className="flex items-start space-x-4"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 1.0 }}
                    >
                      <div className="h-8 w-8 shrink-0 rounded-full bg-purple flex items-center justify-center text-white text-xs">
                        AI
                      </div>
                      <div className="flex-1 rounded-lg bg-purple/10 p-3">
                        <p className="text-xs text-zinc-300">
                          I can help analyze your data and provide insights
                          using the Model Context Protocol.
                        </p>
                      </div>
                    </motion.div>
                    <motion.div
                      className="flex items-start space-x-4"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 1.3 }}
                    >
                      <div className="h-8 w-8 shrink-0 rounded-full bg-zinc-600 flex items-center justify-center text-white text-xs">
                        U
                      </div>
                      <div className="flex-1 rounded-lg bg-zinc-800 p-3">
                        <p className="text-xs text-zinc-300">
                          Can you fetch the latest AI research papers on
                          reinforcement learning?
                        </p>
                      </div>
                    </motion.div>
                    <motion.div
                      className="flex items-start space-x-4"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 1.6 }}
                    >
                      <div className="h-8 w-8 shrink-0 rounded-full bg-purple flex items-center justify-center text-white text-xs">
                        AI
                      </div>
                      <div className="flex-1 rounded-lg bg-purple/10 p-3">
                        <p className="text-xs text-zinc-300">
                          Found 42 papers from the past month. The most cited
                          one is "Reinforcement Learning with Human Feedback"
                          with 128 citations.
                        </p>
                      </div>
                    </motion.div>
                    <motion.div
                      className="flex items-start space-x-4"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 1.9 }}
                    >
                      <div className="h-8 w-8 shrink-0 rounded-full bg-zinc-600 flex items-center justify-center text-white text-xs">
                        U
                      </div>
                      <div className="flex-1 rounded-lg bg-zinc-800 p-3">
                        <p className="text-xs text-zinc-300">
                          Great! Can you also query the GitHub API for top MCP
                          server repositories?
                        </p>
                      </div>
                    </motion.div>
                    <motion.div
                      className="flex items-start space-x-4"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 2.2 }}
                    >
                      <div className="h-8 w-8 shrink-0 rounded-full bg-purple flex items-center justify-center text-white text-xs">
                        AI
                      </div>
                      <div className="flex-1 rounded-lg bg-purple/10 p-3">
                        <p className="text-xs text-zinc-300">
                          <span className="text-zinc-400 font-mono text-[10px]">
                            github_search_repositories(query="mcp server",
                            sort="stars")
                          </span>
                        </p>
                        <div className="mt-2 border-t border-zinc-700 pt-2">
                          <p className="text-xs text-zinc-300">
                            Top 3 repositories:
                          </p>
                          <ul className="mt-1 text-xs text-zinc-400 space-y-1">
                            <li>• modelcontextprotocol/mcp-server (★ 1.2k)</li>
                            <li>• ai-community/search-mcp (★ 845)</li>
                            <li>• openai-labs/mcp-integration (★ 712)</li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                    <motion.div
                      className="flex items-start space-x-4"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 2.5 }}
                    >
                      <div className="h-8 w-8 shrink-0 rounded-full bg-zinc-600 flex items-center justify-center text-white text-xs">
                        U
                      </div>
                      <div className="flex-1 rounded-lg bg-zinc-800 p-3">
                        <p className="text-xs text-zinc-300">
                          Can you generate a code snippet for connecting to an
                          MCP server?
                        </p>
                      </div>
                    </motion.div>
                    <motion.div
                      className="flex items-start space-x-4"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 2.8 }}
                    >
                      <div className="h-8 w-8 shrink-0 rounded-full bg-purple flex items-center justify-center text-white text-xs">
                        AI
                      </div>
                      <div className="flex-1 rounded-lg bg-purple/10 p-3">
                        <p className="text-xs text-zinc-300 mb-2">
                          Here's a TypeScript example using the MCP client SDK:
                        </p>
                        <div className="bg-zinc-800 rounded p-2 font-mono text-[10px] text-zinc-300 overflow-x-auto">
                          <pre>{`import { MCPClient } from "@mcp/typescript-sdk";

const client = new MCPClient({
  serverUrl: "https://api.example.com/mcp",
  apiKey: process.env.MCP_API_KEY
});

async function main() {
  const response = await client.query({
    messages: [{ role: "user", content: "Hello" }],
    functions: [
      { name: "search_web", ... }
    ]
  });
  
  console.log(response);
}`}</pre>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
