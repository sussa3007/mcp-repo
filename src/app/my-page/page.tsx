"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/my-page/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import UserProfile from "@/components/my-page/user-profile";
import ProjectList from "@/components/my-page/project-list";

export default function MyPage() {
  const { isAuthenticated, userInfo, isLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    // Redirect unauthenticated users to the homepage
    if (!isLoading && !isAuthenticated) {
      toast.error("Login required");
      router.push("/");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (!isAuthenticated || !userInfo) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-10 md:px-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">My Page</h1>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          Manage your profile information and submitted projects
        </p>
      </div>

      <Tabs
        defaultValue="profile"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="profile">My Profile</TabsTrigger>
          <TabsTrigger value="projects">My Projects</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <UserProfile userInfo={userInfo} />
        </TabsContent>

        <TabsContent value="projects">
          <ProjectList />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function PageSkeleton() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-10 md:px-6">
      <div className="text-center mb-8">
        <Skeleton className="h-9 w-48 mx-auto mb-2" />
        <Skeleton className="h-6 w-80 mx-auto" />
      </div>

      <Skeleton className="h-12 w-full mb-8" />

      <Card className="bg-zinc-800/50 border-zinc-700">
        <CardHeader>
          <Skeleton className="h-7 w-48 mb-2" />
          <Skeleton className="h-5 w-80" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </CardContent>
      </Card>
    </div>
  );
}
