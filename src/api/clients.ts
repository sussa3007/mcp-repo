import { ApiService } from "./api-service";
import config from "@/lib/config";

// 클라이언트 타입 정의
export interface Client {
  id: string;
  name: string;
  description: string;
  owner: string;
  repo: string;
  githubUrl: string;
  isOfficial: boolean;
  language: string;
  stars: number;
  forks: number;
  license: string;
  updatedAt: string;
  tags: string[];
  installInstructions: string;
  usageExamples: string[];
  supportedLanguages: string[];
  platforms: string[];
  contributors: {
    name: string;
    githubUrl: string;
    avatarUrl: string;
  }[];
}

class ClientService extends ApiService {
  constructor() {
    super("clients");
  }

  // 모든 클라이언트 조회
  async getClients(): Promise<Client[]> {
    // 실제 API 연동 시 아래 주석 해제
    // return await this.get<Client[]>();

    // 현재는 목업 데이터 반환
    const clientsData: Partial<Client>[] = [];

    for (let i = 1; i <= 6; i++) {
      clientsData.push({
        id: i.toString(),
        name: `MCP Client ${i}`,
        description:
          i % 2 === 0
            ? "A lightweight MCP client implementation focused on performance and reliability"
            : "A feature-rich MCP client with cross-platform support and extensible plugin system",
        language: i % 3 === 0 ? "JavaScript" : "TypeScript",
        stars: 800 + i * 100,
        tags: ["mcp", "client", i % 2 === 0 ? "lightweight" : "feature-rich"],
        updatedAt: new Date(2023, 9 + (i % 3), 10 + i).toISOString(),
        isOfficial: i === 1
      });
    }

    return clientsData as Client[];
  }

  // 특정 ID의 클라이언트 조회
  async getClientById(id: string): Promise<Client> {
    // 실제 API 연동 시 아래 주석 해제
    // return await this.get<Client>(id);

    // 현재는 목업 데이터 반환
    const client: Client = {
      id,
      name: `MCP Client ${id}`,
      description:
        "A powerful MCP client implementation with extensive features and cross-platform support.",
      owner: "mcp-organization",
      repo: "mcp-client",
      githubUrl: `https://github.com/mcp-organization/mcp-client-${id}`,
      isOfficial: id === "1",
      language: "TypeScript",
      stars: 1200,
      forks: 350,
      license: "MIT",
      updatedAt: "2023-10-15",
      tags: ["mcp", "client", "typescript", "cross-platform"],
      installInstructions: "npm install mcp-client",
      usageExamples: [
        `import { MCPClient } from 'mcp-client';

const client = new MCPClient({
  serverUrl: 'wss://mcp-server.example.com',
  apiKey: 'your-api-key'
});

client.connect();`,
        `// Event handling
client.on('message', (message) => {
  console.log('Received message:', message);
});

client.on('error', (error) => {
  console.error('Connection error:', error);
});`
      ],
      supportedLanguages: ["JavaScript", "TypeScript", "Python", "Java", "Go"],
      platforms: ["Node.js", "Browser", "Mobile", "Desktop"],
      contributors: [
        {
          name: "John Doe",
          githubUrl: "https://github.com/johndoe",
          avatarUrl: "https://i.pravatar.cc/100?u=johndoe"
        },
        {
          name: "Jane Smith",
          githubUrl: "https://github.com/janesmith",
          avatarUrl: "https://i.pravatar.cc/100?u=janesmith"
        },
        {
          name: "Alex Johnson",
          githubUrl: "https://github.com/alexjohnson",
          avatarUrl: "https://i.pravatar.cc/100?u=alexjohnson"
        }
      ]
    };

    return client;
  }
}

// 서비스 인스턴스 생성
const clientService = new ClientService();

// 기존 함수명을 유지하면서 서비스 메서드 export
export const getClients = () => clientService.getClients();
export const getClientById = (id: string) => clientService.getClientById(id);
