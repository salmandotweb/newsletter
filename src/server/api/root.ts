import { createTRPCRouter } from "~/server/api/trpc";
import { subscriptionRouter } from "./routers/subscription";

export const appRouter = createTRPCRouter({
  subscription: subscriptionRouter,
});

export type AppRouter = typeof appRouter;
