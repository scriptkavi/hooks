import { cn } from "@/lib/utils"

import Marquee from "./ui/marquee"

const reviews = [
  {
    name: "Battery",
    hookname: "useBattery",
    description: "Delay the execution of function or state update.",
  },
  {
    name: "Click Away",
    hookname: "useClickAway",
    description: "Delay the execution of function or state update.",
  },
  {
    name: "Copy to Clipboard",
    hookname: "useCopyToClipboard",
    description: "Delay the execution of function or state update.",
  },
  {
    name: "Counter",
    hookname: "useCounter",
    description: "Delay the execution of function or state update.",
  },
  {
    name: "Debounce",
    hookname: "useDebounce",
    description: "Delay the execution of function or state update.",
  },
  {
    name: "Default",
    hookname: "useDefault",
    description: "Delay the execution of function or state update.",
  },
  {
    name: "Document Title",
    hookname: "useDocumentTitle",
    description: "Delay the execution of function or state update.",
  },
  {
    name: "Event Listenter",
    hookname: "useEventListener",
    description: "Delay the execution of function or state update.",
  },
  {
    name: "Favicon",
    hookname: "useFavicon",
    description: "Delay the execution of function or state update.",
  },
]

const firstRow = reviews.slice(0, reviews.length / 2)
const secondRow = reviews.slice(reviews.length / 2)

const HookCard = ({
  name,
  hookname,
  description,
}: {
  name: string
  hookname: string
  description: string
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-white/[.01] hover:bg-white/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{hookname}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{description}</blockquote>
    </figure>
  )
}

export function PageMarquee() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <HookCard key={review.hookname} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <HookCard key={review.hookname} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  )
}
