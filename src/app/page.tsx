import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { AIToolsSection } from "@/components/AIToolsSection";
import { AdvancedAISection } from "@/components/AdvancedAISection";
import { TemplateSection } from "@/components/TemplateSection";
import { CTASection } from "@/components/CTASection";

// Mock data definition
const serverCards = [
  {
    title: "Kagi MCP Server",
    description:
      "Web search capabilities for Claude AI through Kagi Search API",
    downloads: "12.3k",
    stars: "489"
  },
  {
    title: "Groq Inference Server",
    description: "High-performance LLM inference server with MCP integration",
    downloads: "8.7k",
    stars: "367"
  },
  {
    title: "SerpAPI MCP Server",
    description: "Real-time search results from Google for MCP clients",
    downloads: "6.2k",
    stars: "302"
  },
  {
    title: "MongoDB MCP Service",
    description: "Connect LLMs to MongoDB databases through MCP protocol",
    downloads: "5.9k",
    stars: "278"
  }
];



export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-zinc-950 to-zinc-900">
      <main>
        <HeroSection />
        <FeaturesSection />
        <AIToolsSection />
        <AdvancedAISection />
        <TemplateSection />
        <CTASection />
      </main>
    </div>
  );
}

const teamMembers = [
  {
    name: "Tadas",
    image: "https://ext.same-assets.com/1248950208/1212506303.png",
    github: "https://github.com/tadasant",
    linkedin: "https://www.linkedin.com/in/antanavicius/"
  },
  {
    name: "Ravina",
    image: "https://ext.same-assets.com/1248950208/3876338850.png",
    github: "",
    linkedin: "https://www.linkedin.com/in/patel-ravina/"
  },
  {
    name: "Mike",
    image: "https://ext.same-assets.com/1248950208/2583483803.png",
    github: "https://github.com/macoughl",
    linkedin: "https://www.linkedin.com/in/mike-coughlin-ggg/"
  }
];
