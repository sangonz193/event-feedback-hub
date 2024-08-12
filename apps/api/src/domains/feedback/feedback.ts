import "reflect-metadata"
import { ObjectType, Field, Int } from "@nestjs/graphql"
import { Event } from "../events/event"

@ObjectType()
export class Feedback {
  @Field((type) => Int)
  id: number

  @Field((type) => String, { nullable: true })
  content?: string | null

  @Field((type) => Event, { nullable: true })
  event?: Event | null

  @Field((type) => Int, { nullable: true })
  rating: number | null

  @Field((type) => Date)
  createdAt: Date
}
