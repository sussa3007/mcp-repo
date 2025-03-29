"use client";

import React, { useState } from "react";
import { ChevronRight, ChevronDown, File, Folder } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileItem {
  name: string;
  path: string;
  type: "file" | "dir";
  size?: number;
  content?: string;
  children?: FileItem[];
}

interface FileExplorerProps {
  items: FileItem[];
  basePath: string;
  onFileClick: (path: string) => void;
  onFolderClick: (path: string) => Promise<FileItem[]>;
  className?: string;
}

interface FileNodeProps extends FileItem {
  level: number;
  onFileClick: (path: string) => void;
  onFolderClick: (path: string) => Promise<FileItem[]>;
  expanded: boolean;
  onToggle: () => void;
  children?: FileItem[];
}

const FileNode: React.FC<FileNodeProps> = ({
  name,
  path,
  type,
  level,
  onFileClick,
  onFolderClick,
  expanded,
  onToggle,
  children = []
}) => {
  const [subItems, setSubItems] = useState<FileItem[]>(children);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    if (type === "file") {
      onFileClick(path);
    } else {
      onToggle();
      if (!expanded && subItems.length === 0) {
        setIsLoading(true);
        setError(null);
        try {
          const items = await onFolderClick(path);
          setSubItems(items);
        } catch (err) {
          setError("Failed to load folder contents");
        }
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-1 py-1 px-2 hover:bg-zinc-800/50 rounded cursor-pointer select-none",
          type === "file" ? "text-zinc-300" : "text-zinc-100"
        )}
        style={{ paddingLeft: `${level * 16}px` }}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleClick()}
      >
        {type === "dir" &&
          (expanded ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          ))}
        {type === "dir" ? (
          <Folder className="w-4 h-4 text-blue-400" />
        ) : (
          <File className="w-4 h-4 text-zinc-400" />
        )}
        <span className="text-sm">{name}</span>
      </div>

      {expanded && type === "dir" && (
        <div>
          {isLoading && (
            <div className="text-sm text-zinc-500 pl-8">Loading...</div>
          )}
          {error && <div className="text-sm text-red-400 pl-8">{error}</div>}
          {subItems.map((item) => (
            <FileNode
              key={item.path}
              {...item}
              level={level + 1}
              onFileClick={onFileClick}
              onFolderClick={onFolderClick}
              expanded={false}
              onToggle={() => {}}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const FileExplorer: React.FC<FileExplorerProps> = ({
  items,
  basePath,
  onFileClick,
  onFolderClick,
  className
}) => {
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set());

  const toggleExpanded = (path: string) => {
    const newExpanded = new Set(expandedPaths);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedPaths(newExpanded);
  };

  return (
    <div
      className={cn(
        "rounded-lg border border-zinc-800 bg-zinc-900/50",
        className
      )}
    >
      {items.map((item) => (
        <FileNode
          key={item.path}
          {...item}
          level={1}
          onFileClick={onFileClick}
          onFolderClick={onFolderClick}
          expanded={expandedPaths.has(item.path)}
          onToggle={() => toggleExpanded(item.path)}
        />
      ))}
    </div>
  );
};

export type { FileItem };
export default FileExplorer;
