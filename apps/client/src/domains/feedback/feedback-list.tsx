import { NetworkStatus, useQuery } from "@apollo/client"
import { FeedbackItem } from "./feedback-item"
import { useEffect, useState } from "react"
import { gql } from "@/__generated__"
import { useInView } from "react-intersection-observer"
import {
  EmptyState,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@/components/empty-state"
import { Button } from "@/components/ui/button"
import { LoaderCircleIcon, MessageSquareIcon } from "lucide-react"
import { useEffectEvent } from "@/lib/react/use-effect-event"
import { FeedbackFilter } from "./feedback-filter"
import { Rating, RATINGS } from "./rating-input"

const GET_FEEDBACK = gql(`
  query GetEventFeedback($eventId: Int!, $cursor: String, $limit: Int, $ratings: [Int!]) {
    feedbacks(eventId: $eventId, cursor: $cursor, limit: $limit, ratings: $ratings) {
      cursor
      feedbacks {
        id
        ...FeedbackItem
      }
    }
  }
`)

const SUBSCRIPTION = gql(`
  subscription FeedbackCreated($eventId: Int!) {
    feedbackCreated(eventId: $eventId) {
      id
      rating
      ...FeedbackItem
    }
  }
`)

type Props = {
  eventId: number
  onAddFeedback: () => void
}

export function FeedbackList({ eventId, onAddFeedback }: Props) {
  const [ratingFilter, setRatingFilter] = useState<Set<Rating>>(new Set())
  const filtering = 0 < ratingFilter.size && ratingFilter.size < RATINGS.length

  const { data, subscribeToMore, fetchMore, networkStatus, loading, refetch } =
    useQuery(GET_FEEDBACK, {
      notifyOnNetworkStatusChange: true,
      variables: {
        eventId,
        limit: 3,
        ratings: filtering ? Array.from(ratingFilter.values()) : undefined,
      },
    })

  const stableRefetch = useEffectEvent(refetch)
  useEffect(() => {
    stableRefetch()
  }, [ratingFilter, stableRefetch])

  useEffect(
    () =>
      subscribeToMore({
        document: SUBSCRIPTION,
        variables: {
          eventId,
        },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev

          const { rating } = subscriptionData.data.feedbackCreated
          if (typeof rating !== "number") return prev

          if (filtering && !ratingFilter.has(rating as Rating)) return prev

          return {
            ...prev,
            feedbacks: {
              cursor: prev.feedbacks.cursor,
              feedbacks: [
                subscriptionData.data.feedbackCreated,
                ...prev.feedbacks.feedbacks,
              ],
            },
          } satisfies typeof prev
        },
      }),
    [eventId, ratingFilter, subscribeToMore],
  )

  const [inViewRef] = useInView({
    skip: !data?.feedbacks.cursor,
    onChange(inView) {
      if (!inView) return

      fetchMore({
        variables: {
          cursor: data?.feedbacks.cursor,
        },
      })
    },
  })

  const showEmptyState = !loading
    ? !data?.feedbacks.feedbacks.length
    : undefined

  return (
    <div className="flex flex-col gap-3">
      <div className="flex min-h-11 items-center gap-2">
        <h2 className="grow text-lg font-bold">Feedback</h2>

        <Button onClick={onAddFeedback}>Add Feedback</Button>
      </div>

      <FeedbackFilter value={ratingFilter} onValueChange={setRatingFilter} />

      {data?.feedbacks.feedbacks.map((feedback) => (
        <FeedbackItem key={feedback.id} feedback={feedback} />
      ))}

      <div key={data?.feedbacks.cursor} ref={inViewRef} className="h-1" />

      {(loading || networkStatus === NetworkStatus.fetchMore) && (
        <LoaderCircleIcon className="text-muted-foreground mx-auto animate-spin" />
      )}

      {!loading && !showEmptyState && !data?.feedbacks.cursor && (
        <span className="text-text text-muted-foreground mt-4 text-center">
          {!filtering && "No more feedback to load."}
          {filtering && "No more feedback to load with the selected ratings."}
        </span>
      )}

      {showEmptyState && (
        <EmptyState>
          <EmptyStateIcon>
            <MessageSquareIcon />
          </EmptyStateIcon>

          <EmptyStateTitle>
            {!filtering && (
              <>
                No feedback yet.{"\n"}Be the first to leave a feedback for this
                event.
              </>
            )}

            {filtering && <>No feedback with the selected ratings.</>}
          </EmptyStateTitle>
        </EmptyState>
      )}
    </div>
  )
}
