import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/images/logo-text.svg";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-900">
      <div className="container px-4 py-8 md:px-6">
        <div className="flex flex-col items-start md:flex-row md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center">
              <Image
                src={logo}
                alt="MCP Repo Logo"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="ml-2 text-sm text-zinc-300">
                Stay up to date with all things MCP.
              </span>
            </Link>
            <p className="mt-4 text-xs text-zinc-500">
              © Copyright 2025, All Rights Reserved
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4">
            <div className="mb-4">
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/use-cases"
                    className="text-zinc-400 hover:text-white"
                  >
                    Browse use cases
                  </Link>
                </li>
                <li>
                  <Link
                    href="/use-cases/submit"
                    className="text-zinc-400 hover:text-white"
                  >
                    Submit use case
                  </Link>
                </li>
                <li>
                  <Link
                    href="/servers"
                    className="text-zinc-400 hover:text-white"
                  >
                    Browse servers
                  </Link>
                </li>
              </ul>
            </div>
            <div className="mb-4">
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/clients"
                    className="text-zinc-400 hover:text-white"
                  >
                    Browse clients
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-zinc-400 hover:text-white"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/submit"
                    className="text-zinc-400 hover:text-white"
                  >
                    Submit server/client
                  </Link>
                </li>
              </ul>
            </div>
            <div className="mb-4">
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/#about-us"
                    className="text-zinc-400 hover:text-white"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/posts"
                    className="text-zinc-400 hover:text-white"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/api" className="text-zinc-400 hover:text-white">
                    API
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-service"
                    className="text-zinc-400 hover:text-white"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
