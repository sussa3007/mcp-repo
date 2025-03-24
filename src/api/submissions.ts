// submissions.ts - API client for handling project submissions
import { ApiService } from "./api-service";
import config from "@/lib/config";

export interface SubmissionData {
  name: string;
  author: string;
  type: "server" | "client";
  description: string;
  repoUrl: string;
  websiteUrl?: string;
  tags: string[];
  email: string;
}

export interface SubmissionResponse {
  id: string;
  status: "pending" | "approved" | "rejected";
  message?: string;
  createdAt: string;
}

class SubmissionService extends ApiService {
  constructor() {
    super("submissions");
  }

  /**
   * Submit a new MCP server or client project
   *
   * @param data The submission data
   * @returns Submission response with ID and status
   */
  async submitProject(data: SubmissionData): Promise<SubmissionResponse> {
    try {
      // 실제 API 연동 시 아래 주석 해제
      // return await this.post<SubmissionResponse, SubmissionData>("", data);

      // 목업 응답 (실제 API 구현 시 제거)
      console.log(`[POST] ${this.getUrl()} - 프로젝트 제출 요청`, data);
      return {
        id: `submission-${Date.now()}`,
        status: "pending",
        message: "Your submission is being reviewed by our team.",
        createdAt: new Date().toISOString()
      };
    } catch (error) {
      console.error("Error submitting project:", error);
      throw error;
    }
  }

  /**
   * Check the status of a project submission
   *
   * @param submissionId The ID of the submission to check
   * @returns Current status of the submission
   */
  async checkSubmissionStatus(
    submissionId: string
  ): Promise<SubmissionResponse> {
    try {
      // 실제 API 연동 시 아래 주석 해제
      // return await this.get<SubmissionResponse>(submissionId);

      // 목업 응답 (실제 API 구현 시 제거)
      console.log(`[GET] ${this.getUrl(submissionId)} - 제출 상태 확인`);
      return {
        id: submissionId,
        status: "pending",
        message: "Your submission is still being reviewed.",
        createdAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
      };
    } catch (error) {
      console.error("Error checking submission status:", error);
      throw error;
    }
  }
}

// 서비스 인스턴스 생성
const submissionService = new SubmissionService();

// 기존 함수명을 유지하면서 서비스 메서드 export
export const submitProject = (data: SubmissionData) =>
  submissionService.submitProject(data);

export const checkSubmissionStatus = (submissionId: string) =>
  submissionService.checkSubmissionStatus(submissionId);
