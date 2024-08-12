import "reflect-metadata"
import {
  Resolver,
  Mutation,
  Args,
  Context,
  InputType,
  Field,
  Query,
  ResolveField,
  Root,
  Int,
} from "@nestjs/graphql"
import { Inject } from "@nestjs/common"
import { PrismaService } from "../../prisma.service"
import { Event } from "./event"
import { Feedback as FeedbackRow } from "@prisma/client"
import { Feedback } from "../feedback/feedback"

@InputType()
class EventCreateInput {
  @Field()
  name: string
}

@InputType()
class EventUniqueInput {
  @Field(() => Int)
  id: number
}

@Resolver(Event)
export class EventResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @Mutation((returns) => Event)
  async createEvent(
    @Args("input") input: EventCreateInput,
    @Context() ctx,
  ): Promise<Event> {
    return this.prismaService.event.create({
      data: input,
    })
  }

  @Query((returns) => Event, { nullable: true })
  async event(@Args("input") input: EventUniqueInput, @Context() ctx) {
    return this.prismaService.event.findUnique({
      where: {
        id: input.id,
      },
    })
  }

  @Query((returns) => [Event])
  async events(@Context() ctx) {
    return this.prismaService.event.findMany()
  }

  @ResolveField((returns) => Feedback)
  async feedbacks(@Root() event: Event): Promise<FeedbackRow[]> {
    return this.prismaService.feedback.findMany({
      where: {
        eventId: event.id,
      },
    })
  }
}
