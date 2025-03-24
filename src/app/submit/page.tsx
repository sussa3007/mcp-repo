import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SubmitPage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-10 md:px-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Submit to MCPRepo
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          Share your MCP server or client with the community. All submissions
          are reviewed before being added to the directory.
        </p>
      </div>

      <Card className="bg-zinc-800/50 border-zinc-700">
        <CardHeader>
          <CardTitle className="text-white">Submission Form</CardTitle>
          <CardDescription className="text-zinc-400">
            Fill out the details below to submit your MCP server or client.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-4">
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-zinc-300">
                    Project Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="e.g. My MCP Server"
                    className="bg-zinc-700 border-zinc-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="author" className="text-zinc-300">
                    Author / Organization
                  </Label>
                  <Input
                    id="author"
                    placeholder="e.g. Your Name or Company"
                    className="bg-zinc-700 border-zinc-600"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="type" className="text-zinc-300">
                  Type
                </Label>
                <select
                  id="type"
                  className="flex h-10 w-full rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-white ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select Type</option>
                  <option value="server">MCP Server</option>
                  <option value="client">MCP Client</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-zinc-300">
                  Description
                </Label>
                <textarea
                  id="description"
                  placeholder="Describe what your server/client does and its main features"
                  className="min-h-[120px] w-full rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-white placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="repo" className="text-zinc-300">
                  Repository URL
                </Label>
                <Input
                  id="repo"
                  placeholder="e.g. https://github.com/username/repository"
                  className="bg-zinc-700 border-zinc-600"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website" className="text-zinc-300">
                  Website URL (optional)
                </Label>
                <Input
                  id="website"
                  placeholder="e.g. https://yourwebsite.com"
                  className="bg-zinc-700 border-zinc-600"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags" className="text-zinc-300">
                  Tags (comma separated)
                </Label>
                <Input
                  id="tags"
                  placeholder="e.g. database, filesystem, search"
                  className="bg-zinc-700 border-zinc-600"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-300">
                  Contact Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="For verification and communication"
                  className="bg-zinc-700 border-zinc-600"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-purple hover:bg-purple-dark text-white"
            >
              Submit
            </Button>

            <p className="text-xs text-zinc-500 text-center mt-4">
              By submitting, you agree to our{" "}
              <a
                href="/terms-of-service"
                className="text-purple hover:text-purple-light"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="/privacy-policy"
                className="text-purple hover:text-purple-light"
              >
                Privacy Policy
              </a>
              .
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
