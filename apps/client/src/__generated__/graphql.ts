/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** `Date` type as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: { input: any; output: any; }
};

export type Event = {
  __typename?: 'Event';
  feedback?: Maybe<Array<Feedback>>;
  feedbacks: Feedback;
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type EventCreateInput = {
  name: Scalars['String']['input'];
};

export type EventUniqueInput = {
  id: Scalars['Int']['input'];
};

export type Feedback = {
  __typename?: 'Feedback';
  content?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Timestamp']['output'];
  event?: Maybe<Event>;
  id: Scalars['Int']['output'];
  rating?: Maybe<Scalars['Int']['output']>;
};

export type FeedbackCreateInput = {
  content: Scalars['String']['input'];
  eventId: Scalars['Float']['input'];
  rating: Scalars['Float']['input'];
};

export type FeedbacksPayload = {
  __typename?: 'FeedbacksPayload';
  cursor?: Maybe<Scalars['String']['output']>;
  feedbacks: Array<Feedback>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createEvent: Event;
  createFeedback: Feedback;
};


export type MutationCreateEventArgs = {
  input: EventCreateInput;
};


export type MutationCreateFeedbackArgs = {
  input: FeedbackCreateInput;
};

export type Query = {
  __typename?: 'Query';
  event?: Maybe<Event>;
  events: Array<Event>;
  feedbacks: FeedbacksPayload;
};


export type QueryEventArgs = {
  input: EventUniqueInput;
};


export type QueryFeedbacksArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  eventId: Scalars['Int']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  ratings?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type Subscription = {
  __typename?: 'Subscription';
  feedbackCreated: Feedback;
};


export type SubscriptionFeedbackCreatedArgs = {
  eventId: Scalars['Int']['input'];
};

export type EventItemFragment = { __typename?: 'Event', id: number, name?: string | null } & { ' $fragmentName'?: 'EventItemFragment' };

export type GetEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEventsQuery = { __typename?: 'Query', events: Array<(
    { __typename?: 'Event', id: number }
    & { ' $fragmentRefs'?: { 'EventItemFragment': EventItemFragment } }
  )> };

export const EventItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Event"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<EventItemFragment, unknown>;
export const GetEventsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"events"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventItem"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Event"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<GetEventsQuery, GetEventsQueryVariables>;