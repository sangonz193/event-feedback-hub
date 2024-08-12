import { join } from "path"
import { Module } from "@nestjs/common"
import { GraphQLModule } from "@nestjs/graphql"
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"
import { PrismaService } from "./prisma.service"
import { EventResolver } from "./domains/events/event.resolvers"
import { FeedbackResolver } from "./domains/feedback/feedback.resolvers"

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      buildSchemaOptions: { dateScalarMode: "timestamp" },
      subscriptions: {
        "graphql-ws": true,
        "subscriptions-transport-ws": true,
      },
      path: "/api/graphql",
    }),
  ],
  controllers: [],
  providers: [PrismaService, EventResolver, FeedbackResolver],
})
export class AppModule {}
