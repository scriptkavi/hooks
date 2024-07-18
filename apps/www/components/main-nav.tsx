"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-4 flex items-center space-x-2 lg:mr-6">
        <Icons.logo className="h-6 w-6 fill-primary" />
        <span className="hidden font-bold text-primary lg:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        <Link
          href="/docs"
          className={cn(
            "transition-colors hover:text-primary/80 hover:underline",
            pathname === "/docs" ? "text-primary" : "text-foreground/60"
          )}
        >
          Docs
        </Link>
        <Link
          href="/docs/hooks"
          className={cn(
            "transition-colors hover:text-primary/80 hover:underline",
            pathname?.startsWith("/docs/hooks")
              ? "text-primary"
              : "text-foreground/60"
          )}
        >
          Hooks
        </Link>
      </nav>
    </div>
  )
}
