import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const subscriptionRouter = createTRPCRouter({
  subscribe: publicProcedure
    .input(z.object({ email: z.string() }))
    .mutation(({ input }) => {
      return {
        greeting: `${input.email}`,
      };
    }),
});
