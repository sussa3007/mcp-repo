import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Terminal } from "lucide-react";

export default function ClientsLoading() {
  return (
    <div className="container px-4 py-10 md:px-6">
      <div className="flex items-center gap-4 mb-8">
        <Terminal className="h-8 w-8 text-purple" />
        <Skeleton className="h-9 w-[200px]" />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Terminal className="h-6 w-6 text-purple" />
                <Skeleton className="h-6 w-[150px]" />
              </div>
              <Skeleton className="h-4 w-full mb-4" />
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
