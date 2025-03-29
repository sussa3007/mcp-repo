import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";

export default function LoginModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { token, isAuthenticated, checkAuthStatus } = useAuth();
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleGithubLogin = async () => {
    if (isGithubLoading) return;

    try {
      setIsGithubLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

      toast.loading("Connecting to GitHub...", {
        id: "github-login"
      });

      const response = await fetch(`${baseUrl}/api/v1/auth/github/url`, {
        credentials: "include",
        headers: token
          ? {
              Authorization: `Bearer ${token}`
            }
          : {}
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { data: loginUrl } = await response.json();

      toast.success("Redirecting to GitHub login page...", {
        id: "github-login"
      });

      // Add a small delay before redirect
      setTimeout(() => {
        window.location.href = baseUrl + loginUrl;
      }, 500);
    } catch (error) {
      console.error("Failed to fetch GitHub login URL:", error);
      toast.error("Failed to connect to GitHub. Please try again.", {
        id: "github-login"
      });
      setIsGithubLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (isGoogleLoading) return;

    try {
      setIsGoogleLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

      toast.loading("Connecting to Google...", {
        id: "google-login"
      });

      const response = await fetch(`${baseUrl}/api/v1/auth/google/url`, {
        credentials: "include",
        headers: token
          ? {
              Authorization: `Bearer ${token}`
            }
          : {}
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { data: loginUrl } = await response.json();

      toast.success("Redirecting to Google login page...", {
        id: "google-login"
      });

      // Add a small delay before redirect
      setTimeout(() => {
        window.location.href = baseUrl + loginUrl;
      }, 500);
    } catch (error) {
      console.error("Failed to fetch Google login URL:", error);
      toast.error("Failed to connect to Google. Please try again.", {
        id: "google-login"
      });
      setIsGoogleLoading(false);
    }
  };

  // Detect login status changes
  useEffect(() => {
    if (isAuthenticated) {
      setIsOpen(false);
      setIsGithubLoading(false);
      setIsGoogleLoading(false);
    }
  }, [isAuthenticated]);

  // Reset loading states on component unmount
  useEffect(() => {
    return () => {
      setIsGithubLoading(false);
      setIsGoogleLoading(false);
    };
  }, []);

  if (isAuthenticated) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-white hover:text-zinc-200">
          Sign In
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-zinc-900 border-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-white mb-6">
            Sign In
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 hover:bg-zinc-800"
            onClick={handleGithubLogin}
            disabled={isGithubLoading || isGoogleLoading}
          >
            {isGithubLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <GithubIcon className="w-5 h-5" />
            )}
            {isGithubLoading ? "Connecting..." : "Sign in with GitHub"}
          </Button>
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 hover:bg-zinc-800"
            onClick={handleGoogleLogin}
            disabled={isGithubLoading || isGoogleLoading}
          >
            {isGoogleLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <Image
                src="/google-icon.svg"
                alt="Google Icon"
                width={20}
                height={20}
              />
            )}
            {isGoogleLoading ? "Connecting..." : "Sign in with Google"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
