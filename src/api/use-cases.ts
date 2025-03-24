import { ApiService } from "./api-service";
import config from "@/lib/config";

// 사용 사례 타입 정의
export interface UseCase {
  id: string;
  title: string;
  summary: string;
  content?: string;
  imageUrl: string;
  tags: string[];
  updatedAt: string;
  author: {
    name: string;
    avatarUrl: string;
  };
  servers?: {
    id: string;
    name: string;
    description: string;
  }[];
  clients?: {
    id: string;
    name: string;
    description: string;
  }[];
}

class UseCaseService extends ApiService {
  constructor() {
    super("use-cases");
  }

  // 모든 사용 사례 조회
  async getUseCases(): Promise<UseCase[]> {
    // 실제 API 연동 시 아래 주석 해제
    // return await this.get<UseCase[]>();

    // 현재는 목업 데이터 반환
    const useCasesData: UseCase[] = [];

    const titles = [
      "Real-time Collaboration Platform",
      "IoT Device Control System",
      "In-Game Communication Tool",
      "Distributed Logging System",
      "Online Education Platform",
      "AI Training Data Collection System"
    ];

    for (let i = 1; i <= 6; i++) {
      useCasesData.push({
        id: i.toString(),
        title: `MCP Use Case ${i}: ${titles[i - 1]}`,
        summary: `Technical insights and implementation details for building ${
          titles[i - 1]
        } with MCP`,
        imageUrl: `https://images.unsplash.com/photo-${
          1570000000000 + i * 10000
        }`,
        tags: ["mcp", "case-study", i % 2 === 0 ? "enterprise" : "open-source"],
        updatedAt: new Date(2023, 8 + i, i * 3).toISOString(),
        author: {
          name: `Developer ${i}`,
          avatarUrl: `https://i.pravatar.cc/100?u=dev${i}`
        }
      });
    }

    return useCasesData;
  }

  // 특정 ID의 사용 사례 조회
  async getUseCaseById(id: string): Promise<UseCase> {
    // 실제 API 연동 시 아래 주석 해제
    // return await this.get<UseCase>(id);

    // 현재는 목업 데이터 반환
    return {
      id,
      title: `MCP Use Case ${id}: Real-time Collaboration Platform`,
      summary:
        "Technical insights and implementation details for building a real-time collaboration platform with MCP",
      content: `# Building a Real-time Collaboration Platform with MCP

## Project Background

Our team wanted to build a platform that allows developers and designers to collaborate in real-time. We adopted MCP to overcome the limitations of existing tools and support seamless communication.

## Technology Stack

- **Backend**: MCP Server + Node.js
- **Frontend**: React + MCP Client
- **Database**: PostgreSQL
- **Deployment**: Docker, Kubernetes

## Implementation Process

1. **Requirements Analysis**: Analyzing collaboration patterns among developers and designers
2. **Architecture Design**: Designing a message delivery system centered around MCP
3. **Prototype Development**: Implementing a prototype with core functionalities
4. **Testing and Feedback**: Collecting feedback from internal teams
5. **Optimization and Extension**: Performance optimization and additional feature implementation

## Results

- **Message Delivery Latency Reduction**: Reduced from 300ms to 50ms
- **Concurrent User Support**: Supporting up to 500 simultaneous connections
- **Development Productivity**: 30% increase in team collaboration efficiency

## Lessons Learned

- MCP's scalability and stability are suitable for large-scale real-time collaboration
- Performance considerations in the initial design phase are crucial
- Continuous improvement based on user feedback is necessary

## Next Steps

- Adding voice and video call features
- Integrating AI-based code suggestion systems
- Enhancing mobile environment support`,
      imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
      updatedAt: "2023-11-10",
      author: {
        name: "John Developer",
        avatarUrl: "https://i.pravatar.cc/100?u=johndeveloper"
      },
      tags: ["real-time", "collaboration", "WebSocket", "React", "Node.js"],
      servers: [
        {
          id: "1",
          name: "MCP Server 1",
          description:
            "Official MCP server implementation providing stable and scalable architecture"
        },
        {
          id: "2",
          name: "MCP Server 2",
          description:
            "High-performance MCP server optimized for large-scale concurrent connections"
        }
      ],
      clients: [
        {
          id: "1",
          name: "MCP Client 1",
          description:
            "Official MCP client library supporting various platforms"
        },
        {
          id: "3",
          name: "MCP Client 3",
          description:
            "Lightweight MCP client optimized for mobile environments"
        }
      ]
    };
  }
}

// 서비스 인스턴스 생성
const useCaseService = new UseCaseService();

// 기존 함수명을 유지하면서 서비스 메서드 export
export const getUseCases = () => useCaseService.getUseCases();
export const getUseCaseById = (id: string) => useCaseService.getUseCaseById(id);
