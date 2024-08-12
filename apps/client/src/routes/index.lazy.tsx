import { gql } from "@/__generated__"
import {
  EmptyState,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@/components/empty-state"
import { useLayoutOptions } from "@/components/layout/use-layout-options"
import { EventFormDialog } from "@/domains/event/event-form-dialog"
import { EventItem } from "@/domains/event/event-item"
import { cn } from "@/lib/utils"
import { useQuery } from "@apollo/client"
import { createLazyFileRoute } from "@tanstack/react-router"
import { CalendarIcon } from "lucide-react"
import { useMemo, useState } from "react"
import { createHtmlPortalNode, OutPortal } from "react-reverse-portal"

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
  const [buttonPortalNode] = useState(() =>
    createHtmlPortalNode({ attributes: { class: cn("flex") } }),
  )

  const { data, loading } = useQuery(GET_EVENTS)
  const showEmptyState = !loading && !data?.events?.length

  const [open, setOpen] = useState(false)

  useLayoutOptions(
    useMemo(
      () => ({
        headerRight: <OutPortal node={buttonPortalNode} />,
      }),
      [],
    ),
  )

  return (
    <>
      {data?.events && (
        <div className="flex flex-col gap-3">
          {data.events.map((event) => (
            <EventItem key={event.id} event={event} />
          ))}
        </div>
      )}

      {showEmptyState && (
        <EmptyState>
          <EmptyStateIcon>
            <CalendarIcon />
          </EmptyStateIcon>

          <EmptyStateTitle>There are no events to show</EmptyStateTitle>
        </EmptyState>
      )}

      <EventFormDialog
        open={open}
        buttonPortalNode={buttonPortalNode}
        onOpenChange={setOpen}
      />
    </>
  )
}
