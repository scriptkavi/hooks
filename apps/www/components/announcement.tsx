import Link from "next/link"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { Atom } from "lucide-react"

import { Separator } from "@/components/ui/separator"

export function Announcement() {
  return (
    <Link
      href="/docs/hooks"
      className="group mb-4 inline-flex items-center px-0.5 text-sm font-medium"
    >
      <Atom className="h-4 w-4" />{" "}
      <Separator className="mx-2 h-4" orientation="vertical" />{" "}
      <span className="underline-offset-4 group-hover:underline">
        Introducing 50+ React Hooks
      </span>
      <ArrowRightIcon className="ml-1 h-4 w-4" />
    </Link>
  )
}
