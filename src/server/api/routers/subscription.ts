import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { DynamoDB } from "aws-sdk"
import { env } from "~/env.mjs";

const client = new DynamoDB.DocumentClient({
  region: env.AWS_REGION,
  accessKeyId: env.AWS_ACCESS_KEY_ID,
  secretAccessKey: env.AWS_SECRET_KEY_ID,
})

export const subscriptionRouter = createTRPCRouter({
  subscribe: publicProcedure
    .input(z.object({ email: z.string() }))
    .mutation(async ({ input }) => {
      await client.put({
        TableName: env.DYNAMODB_TABLE,
        Item: {
          pk: `SUB#${input.email}`,
          sk: `SUB#${input.email}`,
          email: input.email,
        }
      }).promise()

      return { success: true }
    }),
});
