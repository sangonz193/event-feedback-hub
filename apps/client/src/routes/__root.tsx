import { AppBreadcrumb } from "@/components/layout/app-breadcrumb"
import { LayoutContext, LayoutProvider } from "@/components/layout/context"
import { withWrappers } from "@/lib/react/with-wrappers"
import { createRootRoute, Outlet } from "@tanstack/react-router"
import { useContext } from "react"

const Component = withWrappers(
  [({ children }) => <LayoutProvider>{children}</LayoutProvider>],
  () => {
    const { options } = useContext(LayoutContext)

    return (
      <div className="mx-auto flex w-full max-w-2xl flex-col px-4">
        <div className="flex min-h-16 flex-row items-center">
          <AppBreadcrumb className="grow basis-0" />

          {options?.headerRight}
        </div>

        <Outlet />

        <div className="h-40" />
      </div>
    )
  },
)

export const Route = createRootRoute({
  component: Component,
})
