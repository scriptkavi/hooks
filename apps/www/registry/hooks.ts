import { Registry } from "@/registry/schema"

export const hooks: Registry = [
  {
    name: "debounce",
    type: "hooks:hook",
    dependencies: [],
    files: ["hook/debounce.ts"],
  },
  {
    name: "battery",
    type: "hooks:hook",
    dependencies: [],
    files: ["hook/battery.ts"],
  },
  {
    name: "click-away",
    type: "hooks:hook",
    dependencies: [],
    files: ["hook/click-away.ts"],
  },
  {
    name: "cookies",
    type: "hooks:hook",
    dependencies: ["js-cookie"],
    devDependencies: ["@types/js-cookie"],
    files: ["hook/cookies.ts", "hook/memoized-fn.ts"],
  },
  {
    name: "copy-to-clipboard",
    type: "hooks:hook",
    dependencies: [],
    files: ["hook/copy-to-clipboard.ts"],
  },
  {
    name: "counter",
    type: "hooks:hook",
    dependencies: [],
    files: ["hook/counter.ts"],
  },
  {
    name: "default",
    type: "hooks:hook",
    dependencies: [],
    files: ["hook/default.ts"],
  },
  {
    name: "document-title",
    type: "hooks:hook",
    dependencies: [],
    files: ["hook/document-title.ts"],
  },
  {
    name: "favicon",
    type: "hooks:hook",
    dependencies: [],
    files: ["hook/favicon.ts"],
  },
  {
    name: "geolocation",
    type: "hooks:hook",
    dependencies: [],
    files: ["hook/geolocation.ts"],
  },
  {
    name: "history-state",
    type: "hooks:hook",
    dependencies: [],
    files: ["hook/history-state.ts"],
  },
  {
    name: "hover",
    type: "hooks:hook",
    dependencies: [],
    files: ["hook/hover.ts"],
  },
  {
    name: "idle",
    type: "hooks:hook",
    dependencies: [],
    files: ["hook/idle.ts"],
  },
  {
    name: "intersection-observer",
    type: "hooks:hook",
    dependencies: [],
    files: ["hook/intersection-observer.ts"],
  },
  {
    name: "is-client",
    type: "hooks:hook",
    dependencies: [],
    files: ["hook/is-client.ts"],
  },
  {
    name: "is-first-render",
    type: "hooks:hook",
    dependencies: [],
    files: ["hook/is-first-render.ts"],
  },
  {
    name: "latest",
    type: "hooks:hook",
    dependencies: [],
    files: ["hook/latest.ts"],
  },
  {
    name: "list",
    type: "hooks:hook",
    dependencies: [],
    files: ["hook/list.ts"],
  },
  {
    name: "local-storage",
    type: "hooks:hook",
    dependencies: [],
    files: ["hook/local-storage.ts"],
  },
  {
    name: "lock-body-scroll",
    type: "hooks:hook",
    dependencies: [],
    files: ["hook/lock-body-scroll.ts"],
  },
  {
    name: "long-press",
    type: "hooks:hook",
    dependencies: [],
    files: ["hook/long-press.ts"],
  },
  {
    name: "map",
    type: "hooks:hook",
    dependencies: [],
    files: ["hook/map.ts"],
  },
  {
    name: "measure",
    type: "hooks:hook",
    dependencies: [],
    files: ["hook/measure.ts"],
  },
  {
    name: "media-query",
    type: "hooks:hook",
    dependencies: [],
    files: ["hook/media-query.ts"],
  },
  {
    name: "mouse",
    type: "hooks:hook",
    dependencies: [],
    files: ["hook/mouse.ts"],
  },
  {
    name: "network-state",
    type: "hooks:hook",
    dependencies: [],
    files: ["hook/network-state.ts"],
  },
  {
    name: "object-state",
    type: "hooks:hook",
    dependencies: [],
    files: ["hook/object-state.ts"],
  },
  {
    name: "orientation",
    type: "hooks:hook",
    dependencies: [],
    files: ["hook/orientation.ts"],
  },
  {
    name: "preferred-language",
    type: "hooks:hook",
    dependencies: [],
    files: ["hook/preferred-language.ts"],
  },
  {
    name: "previous",
    type: "hooks:hook",
    dependencies: [],
    files: ["hook/previous.ts"],
  },
  {
    name: "queue",
    type: "hooks:hook",
    dependencies: [],
    files: ["hook/queue.ts"],
  },
  {
    name: "render-count",
    type: "hooks:hook",
    dependencies: [],
    files: ["hook/render-count.ts"],
  },
  {
    name: "render-info",
    type: "hooks:hook",
    dependencies: [],
    files: ["hook/render-info.ts"],
  },
  {
    name: "script",
    type: "hooks:hook",
    dependencies: [],
    files: ["hook/script.ts"],
  },
  {
    name: "session-storage",
    type: "hooks:hook",
    dependencies: [],
    files: ["hook/session-storage.ts"],
  },
  {
    name: "set",
    type: "hooks:hook",
    dependencies: [],
    files: ["hook/set.ts"],
  },
  {
    name: "throttle",
    type: "hooks:hook",
    dependencies: [],
    files: ["hook/throttle.ts"],
  },
  {
    name: "toggle",
    type: "hooks:hook",
    dependencies: [],
    files: ["hook/toggle.ts"],
  },
  {
    name: "unmount",
    type: "hooks:hook",
    dependencies: [],
    files: ["hook/unmount.ts", "hook/latest.ts"],
  },
  {
    name: "visibility-change",
    type: "hooks:hook",
    dependencies: [],
    files: ["hook/visibility-change.ts"],
  },
  {
    name: "web-socket",
    type: "hooks:hook",
    dependencies: [],
    files: [
      "hook/web-socket.ts",
      "hook/latest.ts",
      "hook/memoized-fn.ts",
      "hook/unmount.ts",
    ],
  },
  {
    name: "window-scroll",
    type: "hooks:hook",
    dependencies: [],
    files: ["hook/window-scroll.ts"],
  },
  {
    name: "window-size",
    type: "hooks:hook",
    dependencies: [],
    files: ["hook/window-size.ts"],
  },
]
