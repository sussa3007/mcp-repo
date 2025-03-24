import { ApiService } from "./api-service";
import config from "@/lib/config";

// 서버 타입 정의
export interface Server {
  id: string;
  name: string;
  description: string;
  owner: string;
  repo: string;
  githubUrl: string;
  demoUrl?: string;
  isOfficial: boolean;
  language: string;
  stars: number;
  forks: number;
  license: string;
  updatedAt: string;
  tags: string[];
  apiEndpoints: {
    method: string;
    path: string;
    description: string;
    requestExample?: string;
    responseExample?: string;
  }[];
  environmentVariables: {
    name: string;
    description: string;
    required: boolean;
    defaultValue?: string;
  }[];
  database?: {
    type: string;
    description: string;
    schema?: string;
  };
  systemRequirements?: {
    hardware: string[];
    software: string[];
  };
  commands: {
    name: string;
    description: string;
    example: string;
  }[];
  deploymentOptions?: {
    name: string;
    description: string;
    example: string;
  }[];
}

class ServerService extends ApiService {
  constructor() {
    super("servers");
  }

  // 모든 서버 조회
  async getServers(): Promise<Server[]> {
    // 실제 API 연동 시 아래 주석 해제
    // return await this.get<Server[]>();

    // 현재는 목업 데이터 반환
    const serversData: Partial<Server>[] = [];

    for (let i = 1; i <= 6; i++) {
      serversData.push({
        id: i.toString(),
        name: `MCP Server ${i}`,
        description:
          i % 2 === 0
            ? "고성능 MCP 서버 구현체로, 확장성과 신뢰성에 중점을 둠"
            : "다양한 기능을 갖춘 MCP 서버로, 플러그인 시스템과 다중 프로토콜 지원",
        language: i % 3 === 0 ? "Java" : i % 3 === 1 ? "Go" : "Python",
        stars: 1000 + i * 200,
        tags: [
          "mcp",
          "server",
          i % 2 === 0 ? "high-performance" : "feature-rich"
        ],
        updatedAt: new Date(2023, 9 + (i % 3), 10 + i).toISOString(),
        isOfficial: i === 1
      });
    }

    return serversData as Server[];
  }

  // 특정 ID의 서버 조회
  async getServerById(id: string): Promise<Server> {
    // 실제 API 연동 시 아래 주석 해제
    // return await this.get<Server>(id);

    // 현재는 목업 데이터 반환
    const server: Server = {
      id,
      name: `MCP Server ${id}`,
      description:
        "A powerful MCP server implementation with extensive features and excellent performance.",
      owner: "mcp-organization",
      repo: "mcp-server",
      githubUrl: `https://github.com/mcp-organization/mcp-server-${id}`,
      demoUrl: "https://demo.mcpserver.org",
      isOfficial: id === "1",
      language: "Go",
      stars: 1800,
      forks: 450,
      license: "Apache-2.0",
      updatedAt: "2023-11-20",
      tags: ["mcp", "server", "go", "high-performance"],
      apiEndpoints: [
        {
          method: "GET",
          path: "/v1/models",
          description: "List all available models",
          responseExample: `{
  "models": [
    {
      "id": "mcp-1",
      "name": "MCP Model 1",
      "version": "1.0"
    },
    {
      "id": "mcp-2",
      "name": "MCP Model 2",
      "version": "1.0"
    }
  ]
}`
        },
        {
          method: "POST",
          path: "/v1/completions",
          description: "Generate a completion",
          requestExample: `{
  "model": "mcp-1",
  "prompt": "Hello, world!",
  "max_tokens": 100
}`,
          responseExample: `{
  "id": "cmpl-1",
  "object": "completion",
  "created": 1589478378,
  "model": "mcp-1",
  "choices": [
    {
      "text": "Hello! How can I assist you today?",
      "finish_reason": "length"
    }
  ]
}`
        }
      ],
      environmentVariables: [
        {
          name: "MCP_API_KEY",
          description: "API key for authentication",
          required: true
        },
        {
          name: "MCP_HOST",
          description: "Host address for the server",
          required: true,
          defaultValue: "0.0.0.0"
        },
        {
          name: "MCP_PORT",
          description: "Port for the server to listen on",
          required: false,
          defaultValue: "8080"
        }
      ],
      database: {
        type: "PostgreSQL",
        description: "Used for storing model metadata and usage statistics",
        schema: `CREATE TABLE models (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  version VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`
      },
      systemRequirements: {
        hardware: ["4+ CPU cores", "16+ GB RAM", "100+ GB disk space"],
        software: ["Go 1.18+", "PostgreSQL 13+", "Docker (optional)"]
      },
      commands: [
        {
          name: "Start Server",
          description: "Start the MCP server in development mode",
          example: "go run cmd/server/main.go"
        },
        {
          name: "Build Server",
          description: "Build the MCP server binary",
          example: "go build -o mcp-server cmd/server/main.go"
        },
        {
          name: "Run Tests",
          description: "Run all tests",
          example: "go test ./..."
        }
      ],
      deploymentOptions: [
        {
          name: "Docker",
          description: "Deploy using Docker",
          example: "docker run -p 8080:8080 mcp-organization/mcp-server:latest"
        },
        {
          name: "Kubernetes",
          description: "Deploy on Kubernetes",
          example: "kubectl apply -f kubernetes/mcp-server.yaml"
        }
      ]
    };

    return server;
  }
}

// 서비스 인스턴스 생성
const serverService = new ServerService();

// 기존 함수명을 유지하면서 서비스 메서드 export
export const getServers = () => serverService.getServers();
export const getServerById = (id: string) => serverService.getServerById(id);
