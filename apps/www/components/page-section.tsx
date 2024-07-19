import { cn } from "@/lib/utils"

function PageSection({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <section
      className={cn(
        "mx-auto flex flex-col justify-center gap-2 px-4 py-8 md:items-center md:py-12 md:pb-8 lg:py-12 lg:pb-10",
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
}

function PageSectionHeading({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        "py-4 text-2xl font-bold leading-tight tracking-tighter md:text-2xl lg:leading-[1.1]",
        className
      )}
      {...props}
    />
  )
}

function PageSectionDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-balance max-w-2xl text-lg font-light text-foreground md:text-center",
        className
      )}
      {...props}
    />
  )
}

function PageSectionList({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <div
      className={cn(
        "text-balance max-w-3xl text-start text-lg font-light text-foreground",
        className
      )}
      {...props}
    />
  )
}

function PageSectionActions({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex w-full gap-2 py-4 md:items-center md:justify-center",
        className
      )}
      {...props}
    />
  )
}

export {
  PageSectionActions,
  PageSection,
  PageSectionDescription,
  PageSectionHeading,
  PageSectionList,
}
