import { ApiService } from "./api-service";
import config from "@/lib/config";
import { ApiResponse } from "@/types/api";

// Client type definition
export interface ClientSimple {
  id: number;
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
  tags: string[];
}

export interface ClientDetail extends ClientSimple {
  installInstructions: string;
  usageExamples: string[];
  supportedLanguages: string[];
  platforms: string[];
  contributors: {
    name: string;
    githubUrl: string;
    avatarUrl: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

class ClientService extends ApiService {
  constructor() {
    super("open/repository");
  }

  // Get all clients with pagination
  async getClients(
    page: number = 0,
    size: number = 9,
    keyword?: string
  ): Promise<{
    clients: ClientSimple[];
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
    let endpoint = `/clients?page=${page}&size=${size}`;

    if (keyword) {
      endpoint += `&keyword=${encodeURIComponent(keyword)}`;
    }

    const response = await this.get<ClientSimple[]>(endpoint);

    if (!response.data || !Array.isArray(response.data)) {
      return {
        clients: [],
        pageInfo: response.pageInfo || {
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
      clients: response.data,
      pageInfo: response.pageInfo || {
        totalElements: response.data.length,
        totalPages: 1,
        pageNumber: 0,
        pageSize: response.data.length,
        numberOfElements: response.data.length,
        first: true,
        last: true,
        empty: response.data.length === 0
      }
    };
  }

  // Get a specific client by ID
  async getClientById(id: string): Promise<ClientDetail | null> {
    const response = await this.get<ClientDetail>(`/clients/${id}`);
    return response.data;
  }
}

// Create service instance
const clientService = new ClientService();

// Export service methods
export const getClients = ({
  page = 0,
  size = 9,
  keyword
}: {
  page?: number;
  size?: number;
  keyword?: string;
}) => clientService.getClients(page, size, keyword);
export const getClientById = (id: string) => clientService.getClientById(id);
