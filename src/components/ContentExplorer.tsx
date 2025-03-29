"use client";

import React, { useState, useEffect } from "react";
import FileExplorer, { FileItem } from "./FileExplorer";
import { getFileContent, getDirectoryContents } from "@/api/github";

interface ContentExplorerProps {
  owner: string;
  repo: string;
  error?: string;
}

const ContentExplorer: React.FC<ContentExplorerProps> = ({
  owner,
  repo,
  error
}) => {
  const [items, setItems] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const loadInitialContents = async () => {
      if (error) return;

      try {
        const initialContents = await getDirectoryContents(owner, repo);
        const mappedItems: FileItem[] = initialContents.map((item) => ({
          name: item.name,
          path: item.path,
          type: item.type === "dir" ? "dir" : "file",
          size: item.size
        }));
        setItems(mappedItems);
      } catch (err) {
        console.error("Failed to load repository contents:", err);
        setLoadError("Failed to load repository contents");
      } finally {
        setLoading(false);
      }
    };

    loadInitialContents();
  }, [owner, repo, error]);

  if (error) {
    return <div className="text-sm text-red-400">{error}</div>;
  }

  if (loading) {
    return <div className="text-sm text-zinc-500">Loading...</div>;
  }

  if (loadError) {
    return <div className="text-sm text-red-400">{loadError}</div>;
  }

  return (
    <div className="space-y-4">
      <FileExplorer
        items={items}
        basePath={`${owner}/${repo}`}
        onFileClick={async (path: string) => {
          try {
            const content = await getFileContent(owner, repo, path);
            if (content.html_url) {
              window.open(content.html_url, "_blank");
            }
          } catch (error) {
            console.error("Failed to load file content:", error);
          }
        }}
        onFolderClick={async (path: string): Promise<FileItem[]> => {
          try {
            const contents = await getDirectoryContents(owner, repo, path);
            return contents.map((item) => ({
              name: item.name,
              path: item.path,
              type: item.type === "dir" ? "dir" : ("file" as const),
              size: item.size
            }));
          } catch (error) {
            console.error("Failed to load folder contents:", error);
            return [];
          }
        }}
        className="min-h-[200px]"
      />
    </div>
  );
};

export default ContentExplorer;
