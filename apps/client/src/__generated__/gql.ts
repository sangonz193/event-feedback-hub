/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation CreateEvent($input: EventCreateInput!) {\n    createEvent(input: $input) {\n      id\n      name\n    }\n  }\n": types.CreateEventDocument,
    "\n  fragment EventItem on Event {\n    id\n    name\n  }\n": types.EventItemFragmentDoc,
    "\n  mutation CreateFeedback($input: FeedbackCreateInput!) {\n    createFeedback(input: $input) {\n      id\n      content\n    }\n  }\n": types.CreateFeedbackDocument,
    "\n  fragment FeedbackItem on Feedback {\n    id\n    content\n    rating\n    createdAt\n  }\n": types.FeedbackItemFragmentDoc,
    "\n  query GetEventFeedback($eventId: Int!, $cursor: String, $limit: Int, $ratings: [Int!]) {\n    feedbacks(eventId: $eventId, cursor: $cursor, limit: $limit, ratings: $ratings) {\n      cursor\n      feedbacks {\n        id\n        ...FeedbackItem\n      }\n    }\n  }\n": types.GetEventFeedbackDocument,
    "\n  subscription FeedbackCreated($eventId: Int!) {\n    feedbackCreated(eventId: $eventId) {\n      id\n      rating\n      ...FeedbackItem\n    }\n  }\n": types.FeedbackCreatedDocument,
    "\n  query GetEvent($input: EventUniqueInput!) {\n    event(input: $input) {\n      id\n      name\n    }\n  }\n": types.GetEventDocument,
    "\n  query GetEvents {\n    events {\n      id\n      ...EventItem\n    }\n  }\n": types.GetEventsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateEvent($input: EventCreateInput!) {\n    createEvent(input: $input) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation CreateEvent($input: EventCreateInput!) {\n    createEvent(input: $input) {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment EventItem on Event {\n    id\n    name\n  }\n"): (typeof documents)["\n  fragment EventItem on Event {\n    id\n    name\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateFeedback($input: FeedbackCreateInput!) {\n    createFeedback(input: $input) {\n      id\n      content\n    }\n  }\n"): (typeof documents)["\n  mutation CreateFeedback($input: FeedbackCreateInput!) {\n    createFeedback(input: $input) {\n      id\n      content\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment FeedbackItem on Feedback {\n    id\n    content\n    rating\n    createdAt\n  }\n"): (typeof documents)["\n  fragment FeedbackItem on Feedback {\n    id\n    content\n    rating\n    createdAt\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetEventFeedback($eventId: Int!, $cursor: String, $limit: Int, $ratings: [Int!]) {\n    feedbacks(eventId: $eventId, cursor: $cursor, limit: $limit, ratings: $ratings) {\n      cursor\n      feedbacks {\n        id\n        ...FeedbackItem\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetEventFeedback($eventId: Int!, $cursor: String, $limit: Int, $ratings: [Int!]) {\n    feedbacks(eventId: $eventId, cursor: $cursor, limit: $limit, ratings: $ratings) {\n      cursor\n      feedbacks {\n        id\n        ...FeedbackItem\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription FeedbackCreated($eventId: Int!) {\n    feedbackCreated(eventId: $eventId) {\n      id\n      rating\n      ...FeedbackItem\n    }\n  }\n"): (typeof documents)["\n  subscription FeedbackCreated($eventId: Int!) {\n    feedbackCreated(eventId: $eventId) {\n      id\n      rating\n      ...FeedbackItem\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetEvent($input: EventUniqueInput!) {\n    event(input: $input) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query GetEvent($input: EventUniqueInput!) {\n    event(input: $input) {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetEvents {\n    events {\n      id\n      ...EventItem\n    }\n  }\n"): (typeof documents)["\n  query GetEvents {\n    events {\n      id\n      ...EventItem\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;