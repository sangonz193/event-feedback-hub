import { FragmentType, getFragmentData, gql } from "@/__generated__"
import { ReadMore } from "@/components/read-more"
import { StarIcon, UserIcon } from "lucide-react"
import { RATINGS } from "./rating-input"

export function FeedbackItem(props: {
  feedback: FragmentType<typeof FeedbackItem.fragment>
}) {
  const feedback = getFragmentData(FeedbackItem.fragment, props.feedback)

  const formatter = new Intl.RelativeTimeFormat("en", {})
  const createdAtFormatterData = getFormatterData(feedback.createdAt)

  return (
    <div className="flex items-start gap-2 rounded-md border p-4">
      <div className="bg-secondary flex rounded-full p-2">
        <UserIcon className="size-5" />
      </div>

      <div className="flex grow basis-0 flex-col">
        <div className="mb-1 flex items-end gap-2">
          <div className="opacity-75">
            {RATINGS.map((rating) => {
              const filled = rating <= (feedback.rating ?? 0)

              return (
                <StarIcon
                  key={rating}
                  className="inline size-5"
                  fill={filled ? "yellow" : "none"}
                  stroke="orange"
                  opacity={filled ? 1 : 0.5}
                />
              )
            })}
          </div>

          <span className="text-muted-foreground text-xs">
            {feedback.rating} / 5 stars
          </span>
        </div>

        <span className="text-muted-foreground -mt-0.5 mb-1 text-sm">
          {formatter.format(
            createdAtFormatterData.value,
            createdAtFormatterData.unit,
          )}
        </span>

        {feedback.content && (
          <ReadMore id={feedback.id.toString()}>{feedback.content}</ReadMore>
        )}
      </div>
    </div>
  )
}

FeedbackItem.fragment = gql(`
  fragment FeedbackItem on Feedback {
    id
    content
    rating
    createdAt
  }
`)

function getFormatterData(date: number): {
  value: number
  unit: Intl.RelativeTimeFormatUnit
} {
  // TODO: to be replaced with date-fns or similar

  const now = Date.now()
  const diff = now - date

  const seconds = Math.floor(diff / 1000)
  if (seconds < 60) {
    return {
      value: -seconds,
      unit: "second",
    }
  }

  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) {
    return {
      value: -minutes,
      unit: "minute",
    }
  }

  const hours = Math.floor(minutes / 60)
  if (hours < 24) {
    return {
      value: -hours,
      unit: "hour",
    }
  }

  const days = Math.floor(hours / 24)
  if (days < 30) {
    return {
      value: -days,
      unit: "day",
    }
  }

  const months = Math.floor(days / 30)
  return {
    value: -months,
    unit: "month",
  }
}
