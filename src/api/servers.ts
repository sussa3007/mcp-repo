import { ApiService } from "./api-service";
import config from "@/lib/config";
import { ApiResponse } from "@/types/api";

// Server type definition
export interface ServerSimple {
  id: number;
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
  tags: string[];
}

export interface ServerDetail extends ServerSimple {
  database?: {
    type: string;
    description: string;
    descriptionSchema?: string;
  };
  systemRequirements?: {
    hardware: string;
    software: string;
  };
  mcpTools: {
    name: string;
    description: string;
    version: string;
    usageInfo: string;
    documentation: string;
    isRequired: boolean;
  }[];
  environmentVariables: {
    name: string;
    description: string;
    required: boolean;
    defaultValue?: string;
    type?: string;
  }[];
  commands: {
    name: string;
    command: string;
    description: string;
    type: string;
    platform: string;
  }[];
  deploymentOptions: {
    name: string;
    description: string;
  }[];
  contributors: {
    name: string;
    githubUrl: string;
    avatarUrl: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface GetServersResponse {
  content: ServerSimple[];
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

class ServerService extends ApiService {
  constructor() {
    super("open/repository");
  }

  // Get all servers with pagination
  async getServers(
    page: number = 0,
    size: number = 9,
    keyword?: string
  ): Promise<{
    servers: ServerSimple[];
    pageInfo: {
      totalElements: number;
      totalPages: number;
      pageNumber: number;
      pageSize: number;
      numberOfElements: number;
      first: boolean;
      last: boolean;
      empty: boolean;
    };
  }> {
    let endpoint = `/servers?page=${page}&size=${size}`;

    if (keyword) {
      endpoint += `&keyword=${encodeURIComponent(keyword)}`;
    }

    const response = await this.get<GetServersResponse>(endpoint);

    if (!response.data) {
      return {
        servers: [],
        pageInfo: {
          totalElements: 0,
          totalPages: 0,
          pageNumber: 0,
          pageSize: 0,
          numberOfElements: 0,
          first: true,
          last: true,
          empty: true
        }
      };
    }

    return {
      servers: response.data.content,
      pageInfo: {
        totalElements: response.data.totalElements,
        totalPages: response.data.totalPages,
        pageNumber: response.data.pageNumber,
        pageSize: response.data.pageSize,
        numberOfElements: response.data.numberOfElements,
        first: response.data.first,
        last: response.data.last,
        empty: response.data.empty
      }
    };
  }

  // Get a specific server by ID
  async getServerById(id: string): Promise<ServerDetail | null> {
    const response = await this.get<ServerDetail>(`/servers/${id}`);
    return response.data;
  }
}

// Create service instance
const serverService = new ServerService();

// Export service methods
export const getServers = ({
  page = 0,
  size = 9,
  keyword
}: {
  page?: number;
  size?: number;
  keyword?: string;
}) => serverService.getServers(page, size, keyword);
export const getServerById = (id: string) => serverService.getServerById(id);
