import {
  ApolloProvider as Provider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client"
import { GraphQLWsLink } from "@apollo/client/link/subscriptions"
import { createClient } from "graphql-ws"
import { PropsWithChildren } from "react"

const wsLink = new GraphQLWsLink(
  createClient({
    url: "/api/graphql",
  }),
)

const client = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          feedbacks: {
            keyArgs: ["eventId", "ratings"],
            merge(existing, incoming, { readField }) {
              const feedbacks = existing ? { ...existing.feedbacks } : {}
              incoming.feedbacks.forEach((feedback: never) => {
                feedbacks[readField("id", feedback) as keyof typeof feedbacks] =
                  feedback
              })

              return {
                cursor: incoming.cursor,
                feedbacks,
              }
            },

            read(existing) {
              if (existing) {
                return {
                  cursor: existing.cursor,
                  feedbacks: Object.values(existing.feedbacks).reverse(),
                }
              }
            },
          },
        },
      },
    },
  }),
  link: wsLink,
})

export function ApolloProvider({ children }: PropsWithChildren) {
  return <Provider client={client}>{children}</Provider>
}
