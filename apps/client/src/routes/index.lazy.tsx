import { gql } from "@/__generated__"
import { EventItem } from "@/domains/event/event-item"
import { useQuery } from "@apollo/client"
import { createLazyFileRoute } from "@tanstack/react-router"

export const Route = createLazyFileRoute("/")({
  component: Index,
})

const GET_EVENTS = gql(`
  query GetEvents {
    events {
      id
      ...EventItem
    }
  }
`)

function Index() {
  const { data } = useQuery(GET_EVENTS)

  return (
    <>
      {data?.events && (
        <div className="flex flex-col gap-3">
          {data.events.map((event) => (
            <EventItem key={event.id} event={event} />
          ))}
        </div>
      )}
    </>
  )
}
