import { cn } from "@/lib/utils"

import Marquee from "./ui/marquee"

const reviews = [
  {
    name: "Debounce",
    hookname: "useDebounce",
    description: "Delay the execution of function or state update.",
  },
  {
    name: "Battery",
    hookname: "useBattery",
    description: "Track the battery status of a user’s device.",
  },
  {
    name: "Click Away",
    hookname: "useClickAway",
    description: "Detect clicks outside of specific component.",
  },
  {
    name: "Copy To Clipboard",
    hookname: "useCopyToClipboard",
    description: "Copy text to the clipboard.",
  },
  {
    name: "Counter",
    hookname: "useCounter",
    description: "Manage a counter value with minimum and maximum limits.",
  },
  {
    name: "Default",
    hookname: "useDefault",
    description: "Manage state with default values.",
  },
  {
    name: "Document Title",
    hookname: "useDocumentTitle",
    description: "Manage state with default values.",
  },
  {
    name: "Favicon",
    hookname: "useFavicon",
    description: "Dynamically update the favicon.",
  },
  {
    name: "Geolocation",
    hookname: "useGeolocation",
    description:
      "Access and monitor a user's geolocation (after they give permission).",
  },
  {
    name: "History State",
    hookname: "useHistoryState",
    description: "Add undo / redo functionality.",
  },
  {
    name: "Hover",
    hookname: "useHover",
    description: "Track whether an element is being hovered over.",
  },
  {
    name: "Idle",
    hookname: "useIdle",
    description: "Detect user inactivity.",
  },
  {
    name: "Intersection Observer",
    hookname: "useIntersectionObserver",
    description:
      "Track and manage the visibility of your DOM elements within the viewport.",
  },
  {
    name: "Is Client",
    hookname: "useIsClient",
    description:
      "Determine whether the code is running on the client-side or server-side.",
  },
  {
    name: "Is First Render",
    hookname: "useIsFirstRender",
    description: "Differentiate between the first and subsequent renders.",
  },
  {
    name: "List",
    hookname: "useList",
    description: "Manage and manipulate lists.",
  },
  {
    name: "Local Storage",
    hookname: "useLocalStorage",
    description:
      "Store, retrieve, and synchronize data from the browser’s localStorage API.",
  },
  {
    name: "Lock Body Scroll",
    hookname: "useLockBodyScroll",
    description: "Temporarily disable scrolling on the document body.",
  },
  {
    name: "Long Press",
    hookname: "useLongPress",
    description:
      "Enable precise control of long-press interactions for both touch and mouse events.",
  },
  {
    name: "Map",
    hookname: "useMap",
    description:
      "Synchronize and update state based on the Map data structure.",
  },
  {
    name: "Measure",
    hookname: "useMeasure",
    description: "Effortlessly measure and track your component’s dimensions.",
  },
  {
    name: "Media Query",
    hookname: "useMediaQuery",
    description: "Subscribe and respond to media query changes.",
  },
  {
    name: "Mouse",
    hookname: "useMouse",
    description: "Track and retrieve the position of the mouse cursor.",
  },
  {
    name: "Network State",
    hookname: "useNetworkState",
    description: "Monitor and adapt to network conditions seamlessly.",
  },
  {
    name: "Object State",
    hookname: "useObjectState",
    description: "Manage complex state objects.",
  },
  {
    name: "Orientation",
    hookname: "useOrientation",
    description: "Manage and respond to changes in device orientation.",
  },
  {
    name: "Preferred Language",
    hookname: "usePreferredLanguage",
    description: "Adapt to user language preferences dynamically.",
  },
  {
    name: "Previous",
    hookname: "usePrevious",
    description: "Track the previous value of a variable.",
  },
  {
    name: "Queue",
    hookname: "useQueue",
    description: "Add, remove, and clear element from a queue data structure.",
  },
  {
    name: "Render Count",
    hookname: "useRenderCount",
    description:
      "Identify unnecessary re-renders and monitor update frequency.",
  },
  {
    name: "Render Info",
    hookname: "useRenderInfo",
    description: "Debug renders and improve performance.",
  },
  {
    name: "Script",
    hookname: "useScript",
    description: "Load and manage external JavaScript scripts.",
  },
  {
    name: "Session Storage",
    hookname: "useSessionStorage",
    description:
      "Store, retrieve, and synchronize data from the browser’s session storage.",
  },
  {
    name: "Set",
    hookname: "useSet",
    description:
      "Synchronize and update state based on the Set data structure.",
  },
  {
    name: "Throttle",
    hookname: "useThrottle",
    description: "Throttle computationally expensive operations.",
  },
  {
    name: "Toggle",
    hookname: "useToggle",
    description: "A hook to toggle a boolean value.",
  },
  {
    name: "Visibility Change",
    hookname: "useVisibilityChange",
    description: "Track document visibility and respond to changes.",
  },
  {
    name: "Window Scroll",
    hookname: "useWindowScroll",
    description: "Track and manipulate the scroll position of a web page.",
  },
  {
    name: "Window Size",
    hookname: "useWindowSize",
    description: "Track the dimensions of the browser window.",
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
      <Marquee pauseOnHover className="[--duration:60s]">
        {firstRow.map((review) => (
          <HookCard key={review.hookname} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:60s]">
        {secondRow.map((review) => (
          <HookCard key={review.hookname} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  )
}
