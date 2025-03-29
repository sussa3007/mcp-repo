"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { handleAuthCallback, removeToken } from "@/lib/auth";

export default function OAuthRedirectPage() {
  const router = useRouter();
  const { checkAuthStatus } = useAuth();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        const token = searchParams.get("token");

        if (!token) {
          console.error("No token found in URL");
          router.push("/?error=no_token");
          return;
        }

        const success = await handleAuthCallback();

        if (success) {
          checkAuthStatus();
          router.push("/");
        } else {
          console.error("Login processing failed");
          removeToken();
          router.push("/?error=auth_failed");
        }
      } catch (error) {
        console.error("Error during login process:", error);
        removeToken();
        router.push("/?error=auth_error");
      }
    };

    handleRedirect();
  }, [router, checkAuthStatus, searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white mb-4">
          Processing Sign In...
        </h1>
        <p className="text-zinc-400">Please wait a moment.</p>
      </div>
    </div>
  );
}
