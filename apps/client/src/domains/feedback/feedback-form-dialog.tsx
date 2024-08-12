import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { FeedbackForm, FeedbackFormFields } from "./feedback-form"
import { gql } from "@/__generated__"
import { useMutation } from "@apollo/client"

type Props = {
  open: boolean
  eventId: number
  onOpenChange: (open: boolean) => void
}

const CREATE_FEEDBACK = gql(`
  mutation CreateFeedback($input: FeedbackCreateInput!) {
    createFeedback(input: $input) {
      id
      content
    }
  }
`)

export function FeedbackFormDialog({ open, eventId, onOpenChange }: Props) {
  const [mutate, { loading }] = useMutation(CREATE_FEEDBACK, {
    onCompleted: () => {
      onOpenChange(false)
    },
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Feedback</DialogTitle>
          <DialogDescription>
            Leave a feedback for this event.
          </DialogDescription>
        </DialogHeader>

        <FeedbackForm
          onSubmit={(values) =>
            mutate({
              variables: {
                input: {
                  rating: values.stars,
                  content: values.content,
                  eventId,
                },
              },
            })
          }
          className="flex flex-col gap-4"
        >
          <FeedbackFormFields />

          <DialogFooter className="mt-6">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              Submit
            </Button>
          </DialogFooter>
        </FeedbackForm>
      </DialogContent>
    </Dialog>
  )
}
