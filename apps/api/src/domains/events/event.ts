import "reflect-metadata"
import { ObjectType, Field, Int } from "@nestjs/graphql"
import { Feedback } from "../feedback/feedback"

@ObjectType()
export class Event {
  @Field((type) => Int)
  id: number

  @Field((type) => String, { nullable: true })
  name?: string | null

  @Field((type) => [Feedback], { nullable: true })
  feedback?: [Feedback] | null
}
