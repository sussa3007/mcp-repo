// submissions.ts - API client for handling project submissions
import { ApiService } from "./api-service";
import { ApiResponse } from "@/types/api";

export interface SubmissionRequest {
  name: string;
  author: string;
  type: "server" | "client";
  description: string;
  repoUrl: string;
  websiteUrl?: string | null;
  tags: string[];
  email?: string | null;
}

export interface SubmissionStatus {
  id: number;
  status: "PENDING" | "APPROVED" | "REJECTED";
  message?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Submission {
  submissionId: number;
  name: string;
  author: string;
  repositoryId?: number;
  type: string;
  description: string;
  repoUrl: string;
  websiteUrl?: string | null;
  email?: string | null;
  status: string;
  message?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

/**
 * API service for project submissions
 */
export class SubmissionService extends ApiService {
  constructor() {
    super("submissions");
  }

  /**
   * Submit a project
   */
  async submitProject(
    request: SubmissionRequest
  ): Promise<ApiResponse<SubmissionStatus>> {
    return this.post<SubmissionStatus, SubmissionRequest>("", request);
  }

  /**
   * Check submission status
   */
  async checkSubmissionStatus(
    submissionId: number
  ): Promise<ApiResponse<SubmissionStatus>> {
    return this.get<SubmissionStatus>(`/${submissionId}/status`);
  }

  /**
   * Get user's submissions list
   * @param page Page number (starts from 0)
   * @param size Page size
   * @param sort Sorting option (default: createdAt,desc)
   */
  async getUserSubmissions(
    page: number = 0,
    size: number = 10,
    sort: string = "createdAt,desc"
  ): Promise<ApiResponse<Submission[]>> {
    // Configure query parameters to match Java's Pageable format
    const response = await this.get<any>(
      `?page=${page}&size=${size}&sort=${sort}`
    );

    // Spring Boot's Page object includes actual data list in the content field
    // Check and transform response structure
    if (
      response &&
      response.data &&
      response.data.content &&
      Array.isArray(response.data.content)
    ) {
      // If it's a Page object (with content field containing data array)
      const pageData = response.data as {
        content: Submission[];
        totalElements: number;
        totalPages: number;
        number: number; // Current page number
        size: number; // Page size
        numberOfElements: number; // Number of elements in current page
        first: boolean; // Whether it's first page
        last: boolean; // Whether it's last page
        empty: boolean; // Whether data is empty
      };

      // Create pageInfo
      const pageInfo = {
        totalElements: pageData.totalElements,
        totalPages: pageData.totalPages,
        pageNumber: pageData.number,
        pageSize: pageData.size,
        numberOfElements: pageData.numberOfElements,
        first: pageData.first,
        last: pageData.last,
        empty: pageData.empty
      };

      // Reconstruct response
      return {
        ...response,
        data: pageData.content,
        pageInfo: pageInfo
      } as ApiResponse<Submission[]>;
    }

    // Return as is if already in correct structure
    return response as ApiResponse<Submission[]>;
  }

  /**
   * Request reanalysis of a submission
   */
  async reanalyzeSubmission(submissionId: number): Promise<ApiResponse<void>> {
    return this.post<void, Record<string, never>>(
      `/reanalyze/${submissionId}`,
      {}
    );
  }
}

// Create service instance
const submissionService = new SubmissionService();

// Export service methods while maintaining original function names
export const submitProject = (data: SubmissionRequest) =>
  submissionService.submitProject(data);

export const checkSubmissionStatus = (submissionId: number) =>
  submissionService.checkSubmissionStatus(submissionId);

export const getUserSubmissions = (
  page: number = 0,
  size: number = 10,
  sort: string = "createdAt,desc"
) => submissionService.getUserSubmissions(page, size, sort);

export const reanalyzeSubmission = (submissionId: number) =>
  submissionService.reanalyzeSubmission(submissionId);
