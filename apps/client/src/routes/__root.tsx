import { createRootRoute, Outlet } from "@tanstack/react-router"

const Component = () => {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col px-4">
      <Outlet />

      <div className="h-40" />
    </div>
  )
}

export const Route = createRootRoute({
  component: Component,
})
