import {
  Args,
  Context,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Subscription,
} from "@nestjs/graphql"
import { Feedback } from "./feedback"
import { PrismaService } from "src/prisma.service"
import { Inject } from "@nestjs/common"
import { PubSub } from "graphql-subscriptions"

const MAX_TAKE = 20
const MIN_TAKE = 1
const DEFAULT_TAKE = 5

@InputType()
class FeedbackCreateInput {
  @Field()
  rating: number

  @Field()
  content: string

  @Field()
  eventId: number
}

@ObjectType()
class FeedbacksPayload {
  @Field(() => String, { nullable: true })
  cursor?: string | null

  @Field(() => [Feedback])
  feedbacks: Feedback[]
}

const pubSub = new PubSub()

@Resolver(Feedback)
export class FeedbackResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @Mutation(() => Feedback)
  async createFeedback(
    @Args("input") input: FeedbackCreateInput,
    @Context() ctx: any,
  ) {
    const feedback = await this.prismaService.feedback.create({
      data: {
        rating: input.rating,
        content: input.content,
        eventId: input.eventId,
      },
    })

    pubSub.publish("feedbackCreated", { feedbackCreated: feedback })

    return feedback
  }

  @Subscription(() => Feedback, {
    filter: (payload, variables) =>
      payload.feedbackCreated.eventId === variables.eventId,
  })
  feedbackCreated(@Args("eventId", { type: () => Int }) eventId: number) {
    return pubSub.asyncIterator("feedbackCreated")
  }

  @Query(() => FeedbacksPayload)
  async feedbacks(
    @Args("eventId", { type: () => Int }) eventId: number,
    @Args("cursor", { nullable: true }) cursor: string | null | undefined,
    @Args("limit", { type: () => Int, nullable: true })
    limit: number | null | undefined,
    @Args("ratings", { type: () => [Int], nullable: true })
    ratings: number[] | null | undefined,
  ) {
    const cursorNumber =
      typeof cursor === "string" ? parseInt(cursor, 10) : undefined

    const findOptions: Parameters<
      typeof this.prismaService.feedback.findMany
    >[0] = {
      where: {
        eventId,
        rating: ratings && ratings.length > 0 ? { in: ratings } : undefined,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: Math.max(Math.min(limit || DEFAULT_TAKE, MAX_TAKE), MIN_TAKE),
    }

    if (cursorNumber) {
      findOptions.cursor = {
        id: cursorNumber,
      }
      findOptions.skip = 1
    }

    const feedbacks = await this.prismaService.feedback.findMany(findOptions)

    return {
      cursor: feedbacks[feedbacks.length - 1]?.id.toString(),
      feedbacks: feedbacks,
    } satisfies FeedbacksPayload
  }
}
