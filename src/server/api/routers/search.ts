/* import { text } from "stream/consumers"; */
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const searchRouter = createTRPCRouter({
  query: publicProcedure
    .input(z.object({ searchWord: z.string() }))
    .query(({ input, ctx }) => {
      return {
        data: ctx.db.product.findMany({
          where: {
            name: {
              contains: input.searchWord,
            },
          },
        }),
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.example.findMany();
  }),
});
