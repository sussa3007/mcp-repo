import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { formatDate } from "@/lib/utils";
import {
  SubmissionService,
  Submission,
  getUserSubmissions,
  reanalyzeSubmission
} from "@/api/submissions";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  PlusCircle,
  ExternalLink,
  RefreshCw
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Pagination info interface
interface PageInfo {
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  numberOfElements: number; // Number of elements in current page
  first: boolean;
  last: boolean;
  empty: boolean; // Whether data is empty
}

export default function ProjectList() {
  const { isAuthenticated } = useAuth();
  const [projects, setProjects] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Submission | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserProjects(currentPage);
    }
  }, [isAuthenticated, currentPage]);

  const fetchUserProjects = async (page: number) => {
    try {
      setIsLoading(true);
      // Use Pageable object parameters that match Spring backend
      const response = await getUserSubmissions(page, 10);

      if (response.data) {
        // Check if response data is an array, otherwise initialize as empty array
        const submissionData = Array.isArray(response.data)
          ? response.data
          : [];
        setProjects(submissionData);

        if (response.pageInfo) {
          setPageInfo(response.pageInfo);
        }
      } else {
        // Set empty array if no data
        setProjects([]);
        console.warn("No response data found.");
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast.error("Failed to load the project list.");
      // Set empty array on error
      setProjects([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleProjectClick = (project: Submission) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
  };

  const handleViewDetails = () => {
    if (selectedProject && selectedProject.repositoryId) {
      const path =
        selectedProject.type.toLowerCase() === "server"
          ? `/servers/${selectedProject.repositoryId}`
          : `/clients/${selectedProject.repositoryId}`;

      router.push(path);
      setIsDialogOpen(false);
    }
  };

  const handleReanalyze = async (submissionId: number) => {
    try {
      await reanalyzeSubmission(submissionId);
      toast.success("Project reanalysis requested");

      // 프로젝트 목록 새로고침
      const response = await getUserSubmissions(currentPage, 10);
      if (response.data) {
        setProjects(response.data);
        if (response.pageInfo) {
          setPageInfo(response.pageInfo);
        }
      }

      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error requesting reanalysis:", error);
      toast.error("Failed to request reanalysis");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return (
          <Badge className="bg-green-600 hover:bg-green-700">Approved</Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-600 hover:bg-yellow-700">Analyzing</Badge>
        );
      case "rejected":
        return <Badge className="bg-red-600 hover:bg-red-700">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (isLoading) {
    return <ProjectListSkeleton />;
  }

  return (
    <>
      <Card className="bg-zinc-800/50 border-zinc-700">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl text-white">My Projects</CardTitle>
              <CardDescription className="text-zinc-400">
                Check your submitted projects and their status
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {projects.length > 0 && (
                <Link href="/submit">
                  <Button variant="purple" size="sm" className="h-8">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Submit Project
                  </Button>
                </Link>
              )}
              <Button
                variant="outline"
                size="icon"
                onClick={() => fetchUserProjects(currentPage)}
                className="h-8 w-8"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.isArray(projects) && projects.length > 0 ? (
            <>
              {projects.map((project) => (
                <div
                  key={project.submissionId}
                  className="p-4 border border-zinc-700 rounded-lg bg-zinc-900/50 hover:bg-zinc-900 transition-colors cursor-pointer"
                  onClick={() => handleProjectClick(project)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-white font-medium">{project.name}</h3>
                      <p className="text-zinc-400 text-sm mt-1 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {project.type === "SERVER" ? "Server" : "Client"}
                        </Badge>
                        {project.tags.slice(0, 2).map((tag, index) => (
                          <Badge
                            key={`${project.submissionId}-${tag}-${index}`}
                            variant="secondary"
                            className="bg-zinc-800 text-zinc-300 hover:bg-zinc-700 text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {project.tags.length > 2 && (
                          <Badge
                            variant="secondary"
                            className="bg-zinc-800 text-zinc-300 hover:bg-zinc-700 text-xs"
                          >
                            +{project.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {getStatusBadge(project.status)}
                      <span className="text-zinc-500 text-xs">
                        {formatDate(project.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {pageInfo && pageInfo.totalPages > 1 && (
                <div className="flex items-center justify-center space-x-2 py-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      !pageInfo.first &&
                      handlePageChange(pageInfo.pageNumber - 1)
                    }
                    disabled={pageInfo.first}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Previous Page</span>
                  </Button>

                  {Array.from({ length: pageInfo.totalPages }).map(
                    (_, index) => {
                      // Only show pages around current page
                      if (
                        index === 0 ||
                        index === pageInfo.totalPages - 1 ||
                        (index >= pageInfo.pageNumber - 1 &&
                          index <= pageInfo.pageNumber + 1)
                      ) {
                        return (
                          <Button
                            key={index}
                            variant={
                              index === pageInfo.pageNumber
                                ? "default"
                                : "outline"
                            }
                            size="sm"
                            onClick={() => handlePageChange(index)}
                          >
                            {index + 1}
                          </Button>
                        );
                      } else if (
                        (index === pageInfo.pageNumber - 2 &&
                          pageInfo.pageNumber > 2) ||
                        (index === pageInfo.pageNumber + 2 &&
                          pageInfo.pageNumber < pageInfo.totalPages - 3)
                      ) {
                        return (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            disabled
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        );
                      }
                      return null;
                    }
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      !pageInfo.last &&
                      handlePageChange(pageInfo.pageNumber + 1)
                    }
                    disabled={pageInfo.last}
                  >
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">Next Page</span>
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-6">
              <p className="text-zinc-400">No registered projects yet.</p>
              <p className="text-zinc-500 mt-2 mb-4">
                Register a new project using the button below.
              </p>
              <Link href="/submit">
                <Button variant="purple">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Submit Project
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Project detail modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] bg-zinc-900 border-zinc-800">
          {selectedProject && (
            <>
              <DialogHeader>
                <div className="flex justify-between items-start pr-8">
                  <DialogTitle className="text-xl text-white">
                    {selectedProject.name}
                  </DialogTitle>
                  {getStatusBadge(selectedProject.status)}
                </div>
                <DialogDescription className="text-zinc-400 mt-2">
                  {selectedProject.description}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 gap-2">
                  <span className="text-zinc-500 font-medium">Type</span>
                  <span className="text-white col-span-3">
                    {selectedProject.type === "SERVER" ? "Server" : "Client"}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  <span className="text-zinc-500 font-medium">Author</span>
                  <span className="text-white col-span-3">
                    {selectedProject.author}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  <span className="text-zinc-500 font-medium">Repository</span>
                  <a
                    href={selectedProject.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 col-span-3 truncate"
                  >
                    {selectedProject.repoUrl}
                  </a>
                </div>

                {selectedProject.websiteUrl && (
                  <div className="grid grid-cols-4 gap-2">
                    <span className="text-zinc-500 font-medium">Website</span>
                    <a
                      href={selectedProject.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 col-span-3 truncate"
                    >
                      {selectedProject.websiteUrl}
                    </a>
                  </div>
                )}

                {selectedProject.email && (
                  <div className="grid grid-cols-4 gap-2">
                    <span className="text-zinc-500 font-medium">Email</span>
                    <span className="text-white col-span-3">
                      {selectedProject.email}
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-4 gap-2">
                  <span className="text-zinc-500 font-medium">Tags</span>
                  <div className="col-span-3 flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag, index) => (
                      <Badge
                        key={`${selectedProject.submissionId}-${tag}-${index}`}
                        variant="secondary"
                        className="bg-zinc-800 text-zinc-300"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {selectedProject.message && (
                  <div className="grid grid-cols-4 gap-2">
                    <span className="text-zinc-500 font-medium">Message</span>
                    <span className="text-white col-span-3">
                      {selectedProject.message}
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-4 gap-2">
                  <span className="text-zinc-500 font-medium">
                    Submission Date
                  </span>
                  <span className="text-white col-span-3">
                    {new Date(selectedProject.createdAt).toLocaleDateString(
                      "en-US"
                    )}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  <span className="text-zinc-500 font-medium">Status</span>
                  <div className="col-span-3">
                    {selectedProject.status.toLowerCase() === "approved" && (
                      <span className="text-green-400">Approved</span>
                    )}
                    {selectedProject.status.toLowerCase() === "pending" && (
                      <span className="text-yellow-400">
                        Under review. Please wait a moment.
                      </span>
                    )}
                    {selectedProject.status.toLowerCase() === "rejected" && (
                      <span className="text-red-400">
                        Rejected. Contact your admin to dispute the results.
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  <span className="text-zinc-500 font-medium">
                    Repository Link
                  </span>
                  <div className="col-span-3">
                    {selectedProject.repositoryId &&
                    selectedProject.repositoryId !== 0 ? (
                      <Button
                        variant="purple"
                        onClick={handleViewDetails}
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Details
                      </Button>
                    ) : (
                      <span className="text-zinc-400">
                        No linked repository
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <DialogFooter>
                <div className="w-full flex justify-end">
                  {selectedProject.status.toLowerCase() === "pending" && (
                    <Button
                      variant="outline"
                      onClick={() =>
                        handleReanalyze(selectedProject.submissionId)
                      }
                      className="flex items-center gap-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Reanalyze
                    </Button>
                  )}
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function ProjectListSkeleton() {
  return (
    <Card className="bg-zinc-800/50 border-zinc-700">
      <CardHeader>
        <Skeleton className="h-7 w-32" />
        <Skeleton className="h-5 w-64 mt-1" />
      </CardHeader>
      <CardContent className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="p-4 border border-zinc-700 rounded-lg bg-zinc-900/50"
          >
            <div className="flex justify-between">
              <div className="space-y-2">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-64" />
                <div className="flex gap-2 mt-1">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-16" />
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
