import Image from "next/image"
import Link from "next/link"
import scriptkavilogo from "@/public/android-chrome-192x192.png"

import { siteConfig } from "@/config/site"

export function SiteFooter() {
  return (
    <footer className="py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="text-balance flex items-center space-x-2 text-center text-sm leading-loose text-muted-foreground md:text-left">
          <Image src={scriptkavilogo} height={20} alt="ScriptKavi" />
          <div>
            Crafted by{" "}
            <Link
              href={siteConfig.links.twitter}
              className="border-b-2 border-muted-foreground"
              target="_blank"
            >
              ScriptKavi.
            </Link>
          </div>
          <div>
            Hosted on{" "}
            <Link
              href="https://www.netlify.com"
              className="border-b-2 border-muted-foreground"
              target="_blank"
            >
              Netlify.
            </Link>
          </div>
          <div>
            The source code is available on{" "}
            <Link
              href={siteConfig.links.github}
              className="border-b-2 border-muted-foreground"
              target="_blank"
            >
              Github.
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
