import { Fragment, ReactNode, useContext } from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb"
import { Link } from "@tanstack/react-router"
import { LayoutContext } from "./context"

export function AppBreadcrumb({ className }: { className?: string }) {
  const { options } = useContext(LayoutContext)

  const items: { name: string; href?: string }[] = [
    { name: "Events", href: "/" },
  ]

  if (options?.secondBreadcrumbPageName) {
    items.push({ name: options.secondBreadcrumbPageName })
  }

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList className="flex-nowrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          let content: ReactNode
          if (isLast || !item.href) {
            content = (
              <BreadcrumbItem className="shrink" title={item.name}>
                <BreadcrumbPage className="max-w-full overflow-hidden truncate text-xl">
                  {item.name ?? " "}
                </BreadcrumbPage>
              </BreadcrumbItem>
            )
          } else {
            content = (
              <BreadcrumbItem>
                <BreadcrumbLink asChild className="text-xl">
                  <Link to={item.href}>{item.name}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            )
          }

          return (
            <Fragment key={item.name}>
              {content}

              {!isLast && <BreadcrumbSeparator />}
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
