import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const productRouter = createTRPCRouter({
  getAllProducts: publicProcedure.query(({ ctx }) => {
    return ctx.db.product.findMany({
      include: {
        category: true,
        color: true,
        images: true,
      },
    });
  }),

  getUnique: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.product.findUnique({
        where: { id: input.id },
      });
    }),
});
