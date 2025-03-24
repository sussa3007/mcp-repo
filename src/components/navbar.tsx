"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const NavLinks = [
  {
    label: "MCP",
    hasDropdown: true,
    dropdownItems: [
      { href: "/servers", label: "Servers" },
      { href: "/clients", label: "Clients" }
    ]
  },
  { href: "/posts", label: "Posts" },
  { href: "/use-cases", label: "Use Cases" }
];
import logo from "@/assets/images/logo.svg";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-9 h-9 mr-1 overflow-hidden">
              <Image
                src={logo}
                width={36}
                height={36}
                alt="MCPRepo Logo"
                className="transition-all duration-300 group-hover:scale-110"
                priority
              />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-[#8c52ff] to-[#a87fff] text-transparent bg-clip-text transition-all duration-300 group-hover:from-[#a87fff] group-hover:to-[#8c52ff]">
              MCPRepo
            </span>
          </Link>
        </div>
        <nav className="hidden md:flex md:gap-6">
          {NavLinks.map((link, index) =>
            link.hasDropdown ? (
              <DropdownMenu key={index}>
                <DropdownMenuTrigger className="flex items-center text-sm font-medium text-zinc-300 transition-colors hover:text-white">
                  {link.label}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="bg-zinc-900 border-zinc-800"
                >
                  {link.dropdownItems?.map((item, i) => (
                    <DropdownMenuItem
                      key={i}
                      asChild
                      className="focus:bg-zinc-800"
                    >
                      <Link
                        href={item.href}
                        className="text-sm font-medium text-zinc-300 transition-colors hover:text-white w-full"
                      >
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={index}
                href={link.href!}
                className="text-sm font-medium text-zinc-300 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>
        <div className="hidden md:block">
          <Button variant="purple">
            <Link href="/use-cases">Use Cases</Link>
          </Button>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-zinc-900 border-zinc-800">
            <nav className="flex flex-col gap-4 mt-8">
              {NavLinks.map((link, index) =>
                link.hasDropdown ? (
                  <div key={index} className="flex flex-col space-y-2">
                    <span className="text-lg font-medium text-zinc-200">
                      {link.label}
                    </span>
                    <div className="flex flex-col space-y-2 pl-4">
                      {link.dropdownItems?.map((item, i) => (
                        <Link
                          key={i}
                          href={item.href}
                          className="text-lg font-medium text-zinc-300 hover:text-white"
                          onClick={() => setOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={index}
                    href={link.href!}
                    className="text-lg font-medium text-zinc-200 hover:text-white"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <Button variant="purple" className="mt-4 w-full">
                <Link href="/use-cases">Use Cases</Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
