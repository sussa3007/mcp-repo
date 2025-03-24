import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import tsIcon from "@/assets/images/ts-icon.svg";
import koIcon from "@/assets/images/ko-icon.svg";
import javaIcon from "@/assets/images/java-icon.svg";
import pythonIcon from "@/assets/images/py-icon.svg";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { AIToolsSection } from "@/components/AIToolsSection";
import { AdvancedAISection } from "@/components/AdvancedAISection";
import { TemplateSection } from "@/components/TemplateSection";
import { CTASection } from "@/components/CTASection";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";

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

// SDK item type definition
interface SdkItem {
  name: string;
  description: string;
  link: string;
  icon: StaticImageData | string;
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
