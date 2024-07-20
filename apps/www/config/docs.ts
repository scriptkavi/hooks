import { MainNavItem, SidebarNavItem } from "types/nav"

export interface DocsConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
          items: [],
        },
        {
          title: "Installation",
          href: "/docs/installation",
          items: [],
        },
        {
          title: "hooks.json",
          href: "/docs/hooks-json",
          items: [],
        },
        {
          title: "CLI",
          href: "/docs/cli",
          items: [],
        },
        {
          title: "Changelog",
          href: "/docs/changelog",
          items: [],
        },
      ]
    },
    {
      title: "General Hooks",
      items: [
        {
          title: "Battery",
          href: "/docs/hooks/battery",
          items: [],
        },
        {
          title: "Click Away",
          href: "/docs/hooks/click-away",
          items: [],
        },
        {
          title: "Copy to Clipboard",
          href: "/docs/hooks/copy-to-clipboard",
          items: [],
        },
        {
          title: "Counter",
          href: "/docs/hooks/counter",
          items: [],
        },
        {
          title: "Debounce",
          href: "/docs/hooks/debounce",
          items: [],
        },
        {
          title: "Default",
          href: "/docs/hooks/default",
          items: [],
        },
        {
          title: "Document Title",
          href: "/docs/hooks/document-title",
          items: [],
        },
        {
          title: "Favicon",
          href: "/docs/hooks/favicon",
          items: [],
        },
        {
          title: "Geolocation",
          href: "/docs/hooks/geolocation",
          items: [],
        },
        {
          title: "History State",
          href: "/docs/hooks/history-state",
          items: [],
        },
        {
          title: "Hover",
          href: "/docs/hooks/hover",
          items: [],
        },
        {
          title: "Idle",
          href: "/docs/hooks/idle",
          items: [],
        },
        {
          title: "Intersection Observer",
          href: "/docs/hooks/intersection-observer",
          items: [],
        },
        {
          title: "Is Client",
          href: "/docs/hooks/is-client",
          items: [],
        },
        {
          title: "Is First Render",
          href: "/docs/hooks/is-first-render",
          items: [],
        },
        {
          title: "List",
          href: "/docs/hooks/list",
          items: [],
        },
        {
          title: "LocalStorage",
          href: "/docs/hooks/local-storage",
          items: [],
        },
        {
          title: "Lock Body Scroll",
          href: "/docs/hooks/lock-body-scroll",
          items: [],
        },
        {
          title: "Long Press",
          href: "/docs/hooks/long-press",
          items: [],
        },
        {
          title: "Map",
          href: "/docs/hooks/map",
          items: [],
        },
        {
          title: "Measure",
          href: "/docs/hooks/measure",
          items: [],
        },
        {
          title: "Media Query",
          href: "/docs/hooks/media-query",
          items: [],
        },
        {
          title: "Mouse",
          href: "/docs/hooks/mouse",
          items: [],
        },
        {
          title: "Network State",
          href: "/docs/hooks/network-state",
          items: [],
        },
        {
          title: "Object State",
          href: "/docs/hooks/object-state",
          items: [],
        },
        {
          title: "Orientation",
          href: "/docs/hooks/orientation",
          items: [],
        },
        {
          title: "Preferred Language",
          href: "/docs/hooks/preferred-language",
          items: [],
        },
        {
          title: "Previous",
          href: "/docs/hooks/previous",
          items: [],
        },
        {
          title: "Queue",
          href: "/docs/hooks/queue",
          items: [],
        },
        {
          title: "Render Count",
          href: "/docs/hooks/render-count",
          items: [],
        },
        {
          title: "Render Info",
          href: "/docs/hooks/render-info",
          items: [],
        },
        {
          title: "Script",
          href: "/docs/hooks/script",
          items: [],
        },
        {
          title: "SessionStorage",
          href: "/docs/hooks/session-storage",
          items: [],
        },
        {
          title: "Set",
          href: "/docs/hooks/set",
          items: [],
        },
        {
          title: "Throttle",
          href: "/docs/hooks/throttle",
          items: [],
        },
        {
          title: "Toggle",
          href: "/docs/hooks/toggle",
          items: [],
        },
        {
          title: "Visibility Change",
          href: "/docs/hooks/visibility-change",
          items: [],
        },
        {
          title: "Window Scroll",
          href: "/docs/hooks/window-scroll",
          items: [],
        },
        {
          title: "Window Size",
          href: "/docs/hooks/window-size",
          items: [],
        },
        
      ]
    }
  ]
}