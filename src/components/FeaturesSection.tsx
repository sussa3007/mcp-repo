export function FeaturesSection() {
  return (
    <section className="py-12 bg-zinc-900">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-4">
            Why Choose MCP?
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            The Model Context Protocol provides a standardized way for AI
            systems to interact with tools, making AI integration simpler and
            more powerful.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-6 hover:bg-zinc-800 transition-colors">
            <div className="h-12 w-12 rounded-full bg-purple/10 flex items-center justify-center mb-4">
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
                className="text-purple"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M7 7h.01" />
                <path d="M10 7h7" />
                <path d="M7 12h.01" />
                <path d="M10 12h7" />
                <path d="M7 17h.01" />
                <path d="M10 17h7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Standardized Protocol
            </h3>
            <p className="text-zinc-400">
              A unified approach to integrating AI models with external tools
              and services.
            </p>
          </div>

          <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-6 hover:bg-zinc-800 transition-colors">
            <div className="h-12 w-12 rounded-full bg-purple/10 flex items-center justify-center mb-4">
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
                className="text-purple"
              >
                <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
                <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                <path d="M12 2v2" />
                <path d="M12 22v-2" />
                <path d="m17 20.66-1-1.73" />
                <path d="M11 10.27 7 3.34" />
                <path d="m20.66 17-1.73-1" />
                <path d="m3.34 7 1.73 1" />
                <path d="M14 12h8" />
                <path d="M2 12h2" />
                <path d="m20.66 7-1.73 1" />
                <path d="m3.34 17 1.73-1" />
                <path d="m17 3.34-1 1.73" />
                <path d="m7 20.66 1-1.73" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Extensible Architecture
            </h3>
            <p className="text-zinc-400">
              Easily extend AI capabilities with new tools and services without
              changing model architecture.
            </p>
          </div>

          <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-6 hover:bg-zinc-800 transition-colors">
            <div className="h-12 w-12 rounded-full bg-purple/10 flex items-center justify-center mb-4">
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
                className="text-purple"
              >
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Cross-Platform
            </h3>
            <p className="text-zinc-400">
              Works across different AI models, frameworks, and programming
              languages with consistent behavior.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
