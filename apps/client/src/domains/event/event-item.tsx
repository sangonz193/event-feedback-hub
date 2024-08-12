import { FragmentType, getFragmentData, gql } from "@/__generated__"
import { Button } from "@/components/ui/button"
import { Link } from "@tanstack/react-router"
import { ChevronRightIcon } from "lucide-react"

export function EventItem(props: {
  event: FragmentType<typeof EventItem.fragment>
}) {
  const event = getFragmentData(EventItem.fragment, props.event)

  return (
    <Button asChild variant="outline" className="min-h-16">
      <Link key={event.id} to="/event/$id" params={{ id: event.id.toString() }}>
        <span className="font-bold">{event.name}</span>
        <ChevronRightIcon className="ml-auto" />
      </Link>
    </Button>
  )
}

EventItem.fragment = gql(`
  fragment EventItem on Event {
    id
    name
  }
`)
