import Image from "next/image"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import DotPattern from "@/components/ui/dot-pattern"
import WordRotate from "@/components/ui/word-rotate"
import { Announcement } from "@/components/announcement"
import { Icons } from "@/components/icons"
import {
  PageActions,
  PageFrameworks,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { PageMarquee } from "@/components/page-marquee"
import {
  PageSection,
  PageSectionActions,
  PageSectionDescription,
  PageSectionHeading,
  PageSectionList,
} from "@/components/page-section"

export default function IndexPage() {
  return (
    <div className="container relative">
      <PageHeader className="flex flex-col-reverse items-center md:flex-row">
        <div className="flex-1">
          <Announcement />
          <PageHeaderHeading className="py-4">
            Hook up your project
          </PageHeaderHeading>
          <PageHeaderDescription className="mb-4">
            Empower your react project with accessible and customizable hooks.
            Copy paste the modern hooks and use them in your React or NextJS
            applications
          </PageHeaderDescription>
          <PageActions>
            <Button asChild size="sm">
              <Link href="/docs">Get Started</Link>
            </Button>
            <Button asChild size="sm" variant="ghost">
              <Link
                target="_blank"
                rel="noreferrer"
                href={siteConfig.links.github}
              >
                Star on GitHub
              </Link>
            </Button>
            <Link
              href="https://www.buymeacoffee.com/scriptkavi"
              target="_blank"
            >
              <Button variant="ghost" className="flex items-center space-x-2">
                <Image
                  src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
                  alt="Buy me a chai"
                  width={15}
                  height={15}
                />
                <span>Buy me a chai</span>
              </Button>
            </Link>
          </PageActions>
          <PageFrameworks>
            <div className="flex items-center space-x-2">
              <Icons.nextjs className="h-6 w-6" />
              <span className="font-semibold">Next.js</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icons.react className="h-6 w-6" />
              <span className="font-semibold">React</span>
            </div>
          </PageFrameworks>
        </div>
        <div className="relative flex h-[100px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:h-[250px] md:w-[400px]">
          <WordRotate
            className="text-4xl font-bold text-primary "
            words={[
              "useDebounce",
              "useWindowSize",
              "usePrevious",
              "useMediaQuery",
              "useFetch",
              "useScript",
              "useRenderInfo",
              "useQueue",
              "useIsClient",
              "useHover",
            ]}
          />
          <DotPattern
            className={cn(
              "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
            )}
          />
        </div>
      </PageHeader>
      <PageSection>
        <PageSectionHeading>
          Simplify Your Development Workflow
        </PageSectionHeading>
        <PageSectionDescription>
          We provide a comprehensive collection of modern React hooks designed
          to enhance your development experience. Our hooks are built to
          streamline your code, improve performance, and simplify complex state
          management.
        </PageSectionDescription>
      </PageSection>
      <PageMarquee />
      <PageSection>
        <PageSectionHeading>Why Use scriptkavi/hooks?</PageSectionHeading>
        <PageSectionList>
          <ul className="space-y-4">
            <li>
              <span className="font-semibold">Efficiency:</span>{" "}
              <span>
                Reduce boilerplate code and optimize performance with our
                carefully crafted hooks.
              </span>
            </li>
            <li>
              <span className="font-semibold">Simplicity:</span>{" "}
              <span>
                Easy-to-use APIs that seamlessly integrate into your existing
                projects.
              </span>
            </li>
            <li>
              <span className="font-semibold">Flexibility:</span>{" "}
              <span>
                Hooks for a wide range of use cases, from basic state management
                to advanced data fetching.
              </span>
            </li>
          </ul>
        </PageSectionList>
      </PageSection>
      <PageSection>
        <PageSectionHeading>Join the Community</PageSectionHeading>
        <PageSectionDescription>
          Become a part of our growing community of developers. Share your
          experiences, ask questions, and contribute to the evolution of
          scriptkavi/hooks.
        </PageSectionDescription>
        <PageSectionActions>
          <Button asChild size="sm" variant="ghost">
            <Link
              target="_blank"
              rel="noreferrer"
              href={siteConfig.links.github}
            >
              GitHub
            </Link>
          </Button>
          <Button asChild size="sm" variant="ghost">
            <Link
              target="_blank"
              rel="noreferrer"
              href={siteConfig.links.twitter}
            >
              Twitter
            </Link>
          </Button>
        </PageSectionActions>
      </PageSection>
    </div>
  )
}
