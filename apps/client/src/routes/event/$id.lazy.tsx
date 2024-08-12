import { gql } from "@/__generated__"
import { useLayoutOptions } from "@/components/layout/use-layout-options"
import { FeedbackFormDialog } from "@/domains/feedback/feedback-form-dialog"
import { FeedbackList } from "@/domains/feedback/feedback-list"
import { useQuery } from "@apollo/client"
import { createLazyFileRoute, useParams } from "@tanstack/react-router"
import { useMemo, useState } from "react"

export const Route = createLazyFileRoute("/event/$id")({
  component: () => <Event />,
})

const GET_EVENT = gql(`
  query GetEvent($input: EventUniqueInput!) {
    event(input: $input) {
      id
      name
    }
  }
`)

function Event() {
  const params = useParams({
    from: "/event/$id",
  })
  const id = parseInt(params.id)

  const { data } = useQuery(GET_EVENT, {
    skip: isNaN(id),
    variables: {
      input: {
        id,
      },
    },
  })

  const eventName = data?.event?.name
  useLayoutOptions(
    useMemo(
      () => ({
        secondBreadcrumbPageName: eventName || " ",
      }),
      [eventName],
    ),
  )

  const [open, setOpen] = useState(false)

  return (
    <>
      {data?.event && (
        <FeedbackList
          eventId={data.event.id}
          onAddFeedback={() => setOpen(true)}
        />
      )}

      {data?.event && (
        <FeedbackFormDialog
          eventId={data?.event?.id}
          open={open}
          onOpenChange={setOpen}
        />
      )}
    </>
  )
}
