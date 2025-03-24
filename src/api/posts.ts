import { ApiService } from "./api-service";
import config from "@/lib/config";

// 포스트 타입 정의
export interface Post {
  id: string;
  title: string;
  summary: string;
  content?: string;
  imageUrl: string;
  category: string;
  publishedAt: string;
  author: {
    name: string;
    avatarUrl: string;
  };
  tags?: string[];
  relatedPosts?: {
    id: string;
    title: string;
  }[];
}

class PostService extends ApiService {
  constructor() {
    super("posts");
  }

  // 모든 포스트 조회
  async getPosts(): Promise<Post[]> {
    // 실제 API 연동 시 아래 주석 해제
    // return await this.get<Post[]>();

    // 현재는 목업 데이터 반환
    const postsData: Post[] = [];

    const titles = [
      "MCP Protocol 1.0 Release Announcement",
      "Building Scalable Real-time Applications with MCP",
      "MCP Client Performance Optimization Techniques",
      "MCP Server Clustering Guide",
      "Differences Between MCP and WebSocket",
      "Future Outlook of MCP Protocol"
    ];

    for (let i = 1; i <= 6; i++) {
      postsData.push({
        id: i.toString(),
        title: titles[i - 1],
        summary: `Detailed explanation and technical insights about ${
          titles[i - 1]
        }.`,
        imageUrl: `https://images.unsplash.com/photo-${
          1580000000000 + i * 10000
        }`,
        category: i % 3 === 0 ? "Tutorial" : i % 2 === 0 ? "News" : "Technical",
        publishedAt: new Date(2023, 10 + (i % 2), i * 4).toISOString(),
        author: {
          name: `Author ${i}`,
          avatarUrl: `https://i.pravatar.cc/100?u=author${i}`
        }
      });
    }

    return postsData;
  }

  // 특정 ID의 포스트 조회
  async getPostById(id: string): Promise<Post> {
    // 실제 API 연동 시 아래 주석 해제
    // return await this.get<Post>(id);

    // 현재는 목업 데이터 반환
    const titles = [
      "MCP Protocol 1.0 Release Announcement",
      "Building Scalable Real-time Applications with MCP",
      "MCP Client Performance Optimization Techniques",
      "MCP Server Clustering Guide",
      "Differences Between MCP and WebSocket",
      "Future Outlook of MCP Protocol"
    ];

    const idx = parseInt(id) - 1;
    const title = idx >= 0 && idx < titles.length ? titles[idx] : `Post ${id}`;

    return {
      id,
      title,
      content: `# ${title}

## Introduction

MCP (Model Context Protocol) is an innovative protocol for real-time communication. In this article, we'll explore the key features and implementation methods of MCP.

## Key Features

- **Fast Performance**: 25% lower latency than WebSocket
- **Reliability**: Automatic reconnection and message queuing system
- **Scalability**: Support for thousands of concurrent connections
- **Flexibility**: Support for various data formats

## Implementation Example

\`\`\`typescript
import { MCPClient } from 'mcp-client';

const client = new MCPClient({
  serverUrl: 'wss://example.com/mcp',
  reconnect: true,
  timeout: 5000
});

client.connect()
  .then(() => {
    console.log('Connected to MCP server');
    client.send('hello', { message: 'Hello, MCP!' });
  })
  .catch(err => {
    console.error('Connection failed:', err);
  });

client.on('message', (data) => {
  console.log('Received:', data);
});
\`\`\`

## Performance Comparison

| Protocol | Latency (ms) | Throughput (msg/s) | CPU Usage (%) |
|---------|--------------|--------------|-------------|
| MCP     | 45           | 15,000       | 12          |
| WebSocket | 60           | 12,000       | 18          |
| HTTP    | 120          | 5,000        | 22          |

## Conclusion

MCP provides excellent performance and stability for real-time application development. It is expected to demonstrate its value especially in fields such as gaming, collaboration tools, and IoT.`,
      summary: `Detailed explanation and technical insights about ${title}.`,
      imageUrl: "https://images.unsplash.com/photo-1580136579312-94651dfd596d",
      category:
        parseInt(id) % 3 === 0
          ? "Tutorial"
          : parseInt(id) % 2 === 0
          ? "News"
          : "Technical",
      publishedAt: new Date(2023, 10, parseInt(id) * 4).toISOString(),
      author: {
        name: "MCP Development Team",
        avatarUrl: "https://i.pravatar.cc/100?u=mcpteam"
      },
      tags: ["MCP", "Protocol", "Real-time", "Communication", "WebSocket"],
      relatedPosts: [
        {
          id: ((parseInt(id) % 6) + 1).toString(),
          title: titles[parseInt(id) % 6]
        },
        {
          id: (((parseInt(id) + 1) % 6) + 1).toString(),
          title: titles[(parseInt(id) + 1) % 6]
        }
      ]
    };
  }
}

// 서비스 인스턴스 생성
const postService = new PostService();

// 기존 함수명을 유지하면서 서비스 메서드 export
export const getPosts = () => postService.getPosts();
export const getPostById = (id: string) => postService.getPostById(id);
