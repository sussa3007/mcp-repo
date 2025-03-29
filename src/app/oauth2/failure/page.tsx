"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft } from "lucide-react";
import LoginModal from "@/components/auth/login-modal";

export default function OAuthFailurePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const provider = searchParams.get("message");

  const getErrorMessage = () => {
    if (error === "E409-005") {
      if (provider === "GITHUB") {
        return {
          title: "Email Already Exists",
          description:
            "This email is already registered with a GitHub account. Please sign in with GitHub.",
          action: "Sign in with GitHub"
        };
      }
      if (provider === "GOOGLE") {
        return {
          title: "Email Already Exists",
          description:
            "This email is already registered with a Google account. Please sign in with Google.",
          action: "Sign in with Google"
        };
      }
    }
    return {
      title: "Login Failed",
      description: "An error occurred during login. Please try again.",
      action: "Try Again"
    };
  };

  const errorInfo = getErrorMessage();

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <Card className="w-full max-w-md bg-zinc-800/50 border-zinc-700">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <AlertCircle className="h-12 w-12 text-red-500 mb-2" />
          <CardTitle className="text-2xl text-white">
            {errorInfo.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-zinc-400">{errorInfo.description}</p>
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push("/")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
