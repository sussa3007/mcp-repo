import Image from "next/image";
import Link from "next/link";
import tsIcon from "@/assets/images/ts-icon.svg";
import koIcon from "@/assets/images/ko-icon.svg";
import javaIcon from "@/assets/images/java-icon.svg";
import pythonIcon from "@/assets/images/py-icon.svg";

// SDK item type definition
interface SdkItem {
  name: string;
  description: string;
  link: string;
  icon: any;
}

const sdksItems: SdkItem[] = [
  {
    name: "MCP TypeScript SDK",
    description: "Type-safe MCP client implementation for TypeScript",
    link: "https://github.com/modelcontextprotocol/typescript-sdk",
    icon: tsIcon
  },
  {
    name: "MCP Kotlin SDK",
    description: "Kotlin implementation of the MCP protocol",
    link: "https://github.com/modelcontextprotocol/kotlin-sdk",
    icon: koIcon
  },
  {
    name: "MCP Java SDK",
    description: "Java implementation of the MCP protocol",
    link: "https://github.com/modelcontextprotocol/java-sdk",
    icon: javaIcon
  },
  {
    name: "MCP Python SDK",
    description: "Python implementation of the MCP protocol",
    link: "https://github.com/modelcontextprotocol/python-sdk",
    icon: pythonIcon
  }
];

export function AIToolsSection() {
  return (
    <section className="py-12 bg-zinc-950">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <div className="inline-flex items-center rounded-md bg-zinc-800/60 px-3 py-1 text-sm font-medium text-zinc-200 ring-1 ring-inset ring-zinc-700/30 mb-2">
              <span className="mr-1 h-2 w-2 rounded-full bg-purple"></span>
              ECOSYSTEM TOOLS
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              MCP SDKs & Libraries
            </h2>
            <p className="text-zinc-400 mt-2">
              Build your own MCP tools with our official and community SDKs
            </p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Link
              href="https://github.com/modelcontextprotocol"
              className="inline-flex h-10 items-center justify-center rounded-md border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Organization
            </Link>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sdksItems.map((sdk, i) => (
            <Link
              key={i}
              href={sdk.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="h-full bg-zinc-800/50 border border-zinc-700 rounded-lg p-6 hover:bg-zinc-800 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-10 w-10 overflow-hidden rounded-md bg-white p-1">
                    <Image
                      src={sdk.icon}
                      alt={sdk.name}
                      width={32}
                      height={32}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-purple transition-colors">
                    {sdk.name}
                  </h3>
                </div>
                <p className="text-zinc-400">{sdk.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
