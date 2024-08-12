import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { HtmlPortalNode, InPortal } from "react-reverse-portal"
import { EventForm, EventFormFields } from "./event-form"
import { gql } from "@/__generated__"
import { useMutation } from "@apollo/client"

type Props = {
  open: boolean
  buttonPortalNode: HtmlPortalNode
  onOpenChange: (open: boolean) => void
}

const CREATE_EVENT = gql(`
  mutation CreateEvent($input: EventCreateInput!) {
    createEvent(input: $input) {
      id
      name
    }
  }
`)

export function EventFormDialog({
  open,
  buttonPortalNode,
  onOpenChange,
}: Props) {
  const [mutate, { loading }] = useMutation(CREATE_EVENT, {
    onCompleted: () => {
      onOpenChange(false)
    },
    update: (cache) => {
      cache.evict({ fieldName: "events" })
    },
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <InPortal node={buttonPortalNode}>
        <DialogTrigger asChild>
          <Button variant="default">New Event</Button>
        </DialogTrigger>
      </InPortal>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Event</DialogTitle>
          <DialogDescription>Create a new event.</DialogDescription>
        </DialogHeader>

        <EventForm
          onSubmit={({ name }) => mutate({ variables: { input: { name } } })}
        >
          <EventFormFields />

          <DialogFooter className="mt-6">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={loading}>
              Create Event
            </Button>
          </DialogFooter>
        </EventForm>
      </DialogContent>
    </Dialog>
  )
}
