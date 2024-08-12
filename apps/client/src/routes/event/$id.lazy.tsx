import { createLazyFileRoute, useParams } from "@tanstack/react-router"

export const Route = createLazyFileRoute("/event/$id")({
  component: () => <Event />,
})

function Event() {
  const params = useParams({
    from: "/event/$id",
  })
  const id = parseInt(params.id)

  return <>Event {id}</>
}
